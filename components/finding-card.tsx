"use client";

import { Finding } from "@/lib/types";
import { getSeverityColor, getSeverityTextColor, formatConfidence } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface FindingCardProps {
  finding: Finding;
  index: number;
}

export function FindingCard({ finding, index }: FindingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className={`relative rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm ${getSeverityColor(
        finding.severity
      )}`}
    >
      {/* Severity Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getSeverityTextColor(
              finding.severity
            )} bg-black/20`}
          >
            <AlertTriangle className="w-3 h-3" />
            {finding.severity}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <TrendingUp className="w-3 h-3" />
            <span>Impact: {finding.operationalImpact}/10</span>
            <span>•</span>
            <span>Blast: {finding.blastRadius}/10</span>
          </div>
        </div>
        <div className="text-xs text-white/40">{formatConfidence(finding.confidence)}</div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-3">{finding.title}</h3>

      {/* Reasoning */}
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-white/70 leading-relaxed">{finding.reasoning}</p>
        </div>

        {/* Impacted Invariant */}
        <div className="pt-3 border-t border-white/5">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
            Impacted Invariant
          </div>
          <p className="text-white/60 font-mono text-xs">{finding.impactedInvariant}</p>
        </div>

        {/* Implications */}
        <div className="pt-3 border-t border-white/5">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
            Operational Implications
          </div>
          <p className="text-white/60">{finding.implications}</p>
        </div>
      </div>
    </motion.div>
  );
}
