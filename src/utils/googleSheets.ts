import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || "";
const SHEET_ID = "0"; // First sheet

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function appendToSheet(data: {
  productIdea: string;
  analysisResult: any;
  timestamp: string;
}) {
  try {
    console.log("Attempting to connect to sheet:", SPREADSHEET_ID);

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    console.log("Successfully loaded sheet. Title:", doc.title);

    const sheet = doc.sheetsById[SHEET_ID];
    if (!sheet) {
      console.error(
        "Sheet not found. Available sheets:",
        Object.keys(doc.sheetsById)
      );
      return false;
    }

    console.log("Adding row with data:", {
      timestamp: data.timestamp,
      product_idea: data.productIdea,
      problem_statement: data.analysisResult?.problem_statement,
      competitors: JSON.stringify(
        data.analysisResult?.competitive_analysis?.competitors
      ),
      originality_score: data.analysisResult?.conclusion?.originality_score,
      analysis_json: JSON.stringify(data.analysisResult),
    });

    const result = await sheet.addRow({
      timestamp: data.timestamp,
      product_idea: data.productIdea,
      problem_statement: data.analysisResult?.problem_statement,
      competitors: JSON.stringify(
        data.analysisResult?.competitive_analysis?.competitors
      ),
      originality_score: data.analysisResult?.conclusion?.originality_score,
      analysis_json: JSON.stringify(data.analysisResult),
    });

    console.log("Row added successfully:", result);
    return true;
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return false;
  }
}
