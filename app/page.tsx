"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnalysisForm } from "@/components/analysis-form";
import { FindingCard } from "@/components/finding-card";
import { LoadingState } from "@/components/loading-state";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { AnalysisInput, AnalysisResult } from "@/lib/types";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (input: AnalysisInput) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setCurrentStep("context");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data: AnalysisResult = await response.json();
      
      // Simulate step progression for better UX
      setCurrentStep("analysis");
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCurrentStep("scoring");
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCurrentStep("compression");
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
      setCurrentStep("");
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Architectural Code Review</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text">
              Architectural code review.
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Find the risks other AI reviewers miss.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Analysis Panel */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 subtle-glow backdrop-blur-sm">
            <AnalysisForm onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
          </div>
        </motion.div>
      </section>

      {/* Results Section */}
      {(isAnalyzing || result || error) && (
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            {isAnalyzing && <LoadingState currentStep={currentStep} />}

            {error && <ErrorState message={error} onRetry={handleReset} />}

            {result && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {result.findings.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-semibold text-white mb-2">
                          Architectural Findings
                        </h2>
                        <p className="text-white/50">
                          {result.findings.length} high-signal{" "}
                          {result.findings.length === 1 ? "risk" : "risks"} detected
                        </p>
                      </div>
                      <button
                        onClick={handleReset}
                        className="text-sm text-white/50 hover:text-white/70 transition-colors"
                      >
                        New Analysis
                      </button>
                    </div>

                    <div className="space-y-4">
                      {result.findings.map((finding, index) => (
                        <FindingCard key={finding.id} finding={finding} index={index} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-5xl mx-auto text-center text-sm text-white/30">
          <p>Powered by Claude Sonnet 4 • Built for high-signal engineering teams</p>
        </div>
      </footer>
    </main>
  );
}
