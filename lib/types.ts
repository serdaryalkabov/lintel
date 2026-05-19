export type Severity = "critical" | "high" | "medium" | "low";

export interface AnalysisInput {
  diff: string;
  rules: string;
  context?: string;
}

export interface ArchitecturalContext {
  invariants: string[];
  businessRules: string[];
  serviceBoundaries: string[];
  asyncSyncExpectations: string[];
  forbiddenPatterns: string[];
  operationalAssumptions: string[];
}

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  reasoning: string;
  impactedInvariant: string;
  implications: string;
  confidence: number;
  blastRadius: number;
  operationalImpact: number;
}

export interface AnalysisResult {
  findings: Finding[];
  analysisTimestamp: string;
  totalFindings: number;
  highestSeverity: Severity | null;
}

export interface PipelineStep {
  step: string;
  status: "pending" | "running" | "complete" | "error";
  message?: string;
}
