import Anthropic from "@anthropic-ai/sdk";
import { v4 as uuidv4 } from "uuid";
import {
  AnalysisInput,
  AnalysisResult,
  ArchitecturalContext,
  Finding,
  PipelineStep,
} from "./types";
import {
  CONTEXT_EXTRACTION_PROMPT,
  DIFF_ANALYSIS_PROMPT,
  RISK_SCORING_PROMPT,
  COMPRESSION_PROMPT,
} from "./prompts";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class AnalysisPipeline {
  private onProgress?: (step: PipelineStep) => void;

  constructor(onProgress?: (step: PipelineStep) => void) {
    this.onProgress = onProgress;
  }

  private updateProgress(step: string, status: PipelineStep["status"], message?: string) {
    this.onProgress?.({ step, status, message });
  }

  async analyze(input: AnalysisInput): Promise<AnalysisResult> {
    try {
      // Pass 1: Context Extraction
      this.updateProgress("context", "running", "Extracting architectural constraints");
      const context = await this.extractContext(input.rules, input.context);

      // Pass 2: Diff Analysis
      this.updateProgress("analysis", "running", "Analyzing architectural risks");
      const rawFindings = await this.analyzeDiff(input.diff, context);

      if (rawFindings.length === 0) {
        this.updateProgress("scoring", "complete");
        this.updateProgress("compression", "complete");
        return {
          findings: [],
          analysisTimestamp: new Date().toISOString(),
          totalFindings: 0,
          highestSeverity: null,
        };
      }

      // Pass 3: Risk Scoring
      this.updateProgress("scoring", "running", "Scoring operational impact");
      const scoredFindings = await this.scoreRisks(rawFindings);

      // Pass 4: Compression
      this.updateProgress("compression", "running", "Prioritizing findings");
      const finalFindings = await this.compressFindings(scoredFindings);

      this.updateProgress("compression", "complete");

      return {
        findings: finalFindings,
        analysisTimestamp: new Date().toISOString(),
        totalFindings: finalFindings.length,
        highestSeverity: this.getHighestSeverity(finalFindings),
      };
    } catch(error) {
      console.error("Analysis pipeline error:", error);
      throw error;
    }
  }

  private async extractContext(
    rules: string,
    context?: string
  ): Promise<ArchitecturalContext> {
    const prompt = CONTEXT_EXTRACTION_PROMPT.replace("{rules}", rules).replace(
      "{context}",
      context || "No additional context provided."
    );

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from context extraction");
    }

    return this.parseJSON<ArchitecturalContext>(content.text);
  }

  private async analyzeDiff(
    diff: string,
    context: ArchitecturalContext
  ): Promise<Partial<Finding>[]> {
    const prompt = DIFF_ANALYSIS_PROMPT.replace("{diff}", diff).replace(
      "{architecturalContext}",
      JSON.stringify(context, null, 2)
    );

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from diff analysis");
    }

    return this.parseJSON<Partial<Finding>[]>(content.text);
  }

  private async scoreRisks(findings: Partial<Finding>[]): Promise<Finding[]> {
    const findingsWithIds = findings.map(f => ({
      ...f,
      id: uuidv4(),
    }));

    const prompt = RISK_SCORING_PROMPT.replace(
      "{findings}",
      JSON.stringify(findingsWithIds, null, 2)
    );

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from risk scoring");
    }

    return this.parseJSON<Finding[]>(content.text);
  }

  private async compressFindings(findings: Finding[]): Promise<Finding[]> {
    const prompt = COMPRESSION_PROMPT.replace(
      "{findings}",
      JSON.stringify(findings, null, 2)
    );

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from compression");
    }

    return this.parseJSON<Finding[]>(content.text);
  }

  private parseJSON<T>(text: string): T {
    // Remove markdown code blocks if present
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse JSON:", cleaned);
      throw new Error("Failed to parse AI response as JSON");
    }
  }

  private getHighestSeverity(findings: Finding[]): "critical" | "high" | "medium" | "low" | null {
    if (findings.length === 0) return null;

    const severityOrder = ["critical", "high", "medium", "low"];
    for (const severity of severityOrder) {
      if (findings.some((f) => f.severity === severity)) {
        return severity as "critical" | "high" | "medium" | "low";
      }
    }
    return null;
  }
}
