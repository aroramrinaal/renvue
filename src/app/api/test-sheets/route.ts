import { NextResponse } from "next/server";
import { appendToSheet } from "@/utils/googleSheets";

export async function GET() {
  try {
    const testData = {
      productIdea: "Test Product",
      analysisResult: {
        problem_statement: "Test problem",
        competitive_analysis: {
          overview: "Test overview",
          competitors: [{ name: "Test Competitor", features: ["test"], unique_elements: "test" }]
        },
        unique_selling_proposition: {
          suggested_improvements: "Test improvements"
        },
        conclusion: {
          viability_summary: "Test summary",
          originality_score: 85
        }
      },
      timestamp: new Date().toISOString()
    };

    const result = await appendToSheet(testData);
    
    return NextResponse.json({
      success: result,
      message: result ? "Test data added to sheet" : "Failed to add test data"
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return NextResponse.json(
      { error: "Test failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 