import { NextResponse } from "next/server";
import OpenAI from "openai";
import { appendToSheet } from "@/utils/googleSheets";
import { headers } from 'next/headers';
import { searchGitHub } from "@/utils/githubSearch";

// Change runtime to nodejs
export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const client = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

const systemPrompt = `You are a product analysis assistant. Analyze the provided product idea and return a JSON response.
IMPORTANT: Your response must be ONLY valid JSON with NO markdown, NO code blocks, and NO additional text.
The originality score must be a number between 0 and 100 depending on how unique the product idea is. If there are multiple products doing the exact same thing, the originality score should be less than 20. 
If there are no other products with the exact same features, the originality score should be above 85. 
Otherwise, if there are few other products with similar features, depending on how similar they are, and how many of them there are, the originality score should be between 20 and 85.

For competitors:
- Only include direct competitors that are actually operating in the market
- For the URL field, you must:
  * Include ONLY the official website URL of the competitor
  * Ensure it's the company's main domain (e.g., "https://company.com")
  * Do NOT include URLs to news articles, press releases, or third-party websites
  * If you cannot find or verify the official URL, use an empty string ""
- Include only relevant competitors
- If there are no relevant competitors, return an empty array

The response must exactly match this structure:
{
  "result": {
    "problem_statement": "string describing the problem being solved",
    "competitive_analysis": {
      "overview": "string summarizing market analysis",
      "competitors": [
        {
          "name": "string",
          "description": "string",
          "features": ["string"],
          "unique_elements": "string",
          "url": "string with ONLY the official company website URL or empty string"
        }
      ]
    },
    "unique_selling_proposition": {
      "suggested_improvements": "string"
    },
    "conclusion": {
      "viability_summary": "string",
      "originality_score": number
    }
  }
}

Remember: Return ONLY the JSON. No text before or after. No markdown formatting.`;

export async function POST(request: Request) {
  // Move headers definition outside try block
  const responseHeaders: Record<string, string> = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  try {
    if (!process.env.PERPLEXITY_API_KEY) {
      throw new Error("PERPLEXITY_API_KEY is not configured");
    }

    const { productIdea } = await request.json();
    if (!productIdea) {
      return NextResponse.json(
        { error: "Product idea is required" },
        { status: 400 }
      );
    }

    console.log("Analyzing product idea:", productIdea);

    // Perform GitHub search in parallel with AI analysis
    const githubSearchPromise = searchGitHub(productIdea);

    try {
      const [response, githubResults] = await Promise.all([
        client.chat.completions.create({
          model: "llama-3.1-sonar-large-128k-online",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: productIdea,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
        githubSearchPromise
      ]);

      if (!response.choices?.[0]?.message?.content) {
        throw new Error("No response content from API");
      }

      const content = response.choices[0].message.content;
      console.log("Raw API Response:", content);

      let cleanContent = content.trim();

      if (cleanContent.startsWith("```") && cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(3, -3).trim();
      }
      if (cleanContent.startsWith("json")) {
        cleanContent = cleanContent.slice(4).trim();
      }

      console.log("Cleaned content for parsing:", cleanContent);

      try {
        const parsed = JSON.parse(cleanContent);
        console.log("Successfully parsed JSON:", parsed);

        if (!parsed || !parsed.result) {
          throw new Error("Invalid JSON structure: missing result object");
        }

        const analysisResult = parsed.result;
        console.log("Analysis result structure:", {
          has_problem_statement: !!analysisResult.problem_statement,
          has_competitive_analysis: !!analysisResult.competitive_analysis,
          has_conclusion: !!analysisResult.conclusion,
        });

        const sheetResult = await appendToSheet({
          productIdea,
          analysisResult,
          timestamp: new Date().toISOString(),
        });

        console.log("Sheet update result:", sheetResult);

        return NextResponse.json({
          content: cleanContent,
          githubResults,
          sheetUpdated: sheetResult,
        }, { headers: responseHeaders });
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.error("Failed   content:", cleanContent);
        return NextResponse.json(
          {
            error: "Failed to parse API response as JSON",
            details:
              parseError instanceof Error
                ? parseError.message
                : "Unknown parsing error",
            content: cleanContent,
            rawContent: content,
          },
          { status: 422, headers: responseHeaders }
        );
      }
    } catch (apiError) {
      console.error("API Error:", apiError);
      return NextResponse.json(
        {
          error: "Failed to get analysis from API",
          details:
            apiError instanceof Error ? apiError.message : "Unknown API error",
        },
        { status: 500, headers: responseHeaders }
      );
    }
  } catch (error) {
    console.error("Request Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400, headers: responseHeaders }
    );
  }
}
