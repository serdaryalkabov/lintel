export const CONTEXT_EXTRACTION_PROMPT = `You are a senior staff engineer analyzing architectural rules and constraints.

Extract structured information from the provided architecture rules and repository context.

Focus on:
- Architectural invariants (things that must always be true)
- Business rules and domain constraints
- Service boundaries and communication patterns
- Async vs sync expectations
- Explicitly forbidden patterns
- Operational assumptions and SLAs

Return ONLY a JSON object with this exact structure:
{
  "invariants": ["string array of architectural invariants"],
  "businessRules": ["string array of business rules"],
  "serviceBoundaries": ["string array describing service boundaries"],
  "asyncSyncExpectations": ["string array of async/sync patterns"],
  "forbiddenPatterns": ["string array of forbidden patterns"],
  "operationalAssumptions": ["string array of operational constraints"]
}

Be precise. Each item should be a clear, actionable constraint.
If a category has no relevant information, use an empty array.

Architecture Rules:
{rules}

Repository Context:
{context}`;

export const DIFF_ANALYSIS_PROMPT = `You are a senior staff engineer performing architectural code review.

Analyze this pull request diff for HIGH-SIGNAL architectural risks only.

Extracted Architectural Context:
{architecturalContext}

Pull Request Diff:
{diff}

Focus ONLY on:
- Architectural invariant violations
- Cross-service coupling or boundary violations
- Runtime risks (N+1 queries, unbounded operations, race conditions)
- Transactional integrity issues
- Async consistency risks
- Layering violations (presentation → data, skipping domain logic)
- Deployment risks (breaking changes, migration requirements)
- Blast radius of changes

EXPLICITLY IGNORE:
- Code style and formatting
- Naming conventions
- Test coverage comments
- Generic cleanup suggestions
- Low-confidence speculation

For each finding, provide:
1. Severity: critical | high | medium | low
2. Concise title (< 10 words)
3. Technical reasoning (why this matters architecturally)
4. Which specific invariant is impacted
5. Operational/business implications (blast radius, runtime impact, data consistency)
6. Confidence score (0.0 to 1.0)

Only report findings with confidence >= 0.7.
Be precise and technical. Avoid alarm. State facts.

Return ONLY a JSON array of findings:
[
  {
    "severity": "critical",
    "title": "string",
    "reasoning": "string",
    "impactedInvariant": "string",
    "implications": "string",
    "confidence": 0.9
  }
]`;

export const RISK_SCORING_PROMPT = `You are a senior staff engineer prioritizing architectural findings.

Findings to score:
{findings}

For each finding, calculate:
1. Blast radius (1-10): How many systems/users are affected?
2. Operational impact (1-10): Runtime performance, availability, data integrity impact?

Return ONLY a JSON array with the same findings enhanced with scores:
[
  {
    "id": "original-finding-id or generate uuid",
    "severity": "critical",
    "title": "string",
    "reasoning": "string",
    "impactedInvariant": "string",
    "implications": "string",
    "confidence": 0.9,
    "blastRadius": 8,
    "operationalImpact": 9
  }
]`;

export const COMPRESSION_PROMPT = `You are a senior staff engineer finalizing an architectural code review.

Current findings:
{findings}

Your task:
1. Remove findings with weak evidence or low confidence
2. Merge overlapping or duplicate findings
3. Keep ONLY the top 3-5 most architecturally significant findings
4. Reduce verbosity while preserving technical precision
5. Ensure each finding is distinct and actionable

Prioritize by:
- Architectural significance
- Blast radius
- Operational impact
- Confidence

Return ONLY a JSON array of the final findings (3-5 max):
[
  {
    "id": "string",
    "severity": "critical",
    "title": "string (concise, < 10 words)",
    "reasoning": "string (precise, technical, 2-3 sentences max)",
    "impactedInvariant": "string",
    "implications": "string (concrete operational impact, 1-2 sentences)",
    "confidence": 0.95,
    "blastRadius": 8,
    "operationalImpact": 9
  }
]`;
