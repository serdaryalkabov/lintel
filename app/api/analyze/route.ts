import { NextRequest, NextResponse } from "next/server";
import { AnalysisPipeline } from "@/lib/pipeline";
import { AnalysisInput } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diff, rules, context } = body as AnalysisInput;

    if (!diff || !rules) {
      return NextResponse.json(
        { error: "Missing required fields: diff and rules" },
        { status: 400 }
      );
    }

    const pipeline = new AnalysisPipeline();
    const result = await pipeline.analyze({ diff, rules, context });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
