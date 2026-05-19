"use client";

import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

interface LoadingStateProps {
  currentStep: string;
}

const steps = [
  { id: "context", label: "Extracting constraints" },
  { id: "analysis", label: "Analyzing architecture" },
  { id: "scoring", label: "Scoring impact" },
  { id: "compression", label: "Prioritizing findings" },
];

export function LoadingState({ currentStep }: LoadingStateProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="py-20">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 className="w-8 h-8 mx-auto text-white/60 animate-spin" />
          </motion.div>
          <p className="text-white/60">Running architectural analysis</p>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => {
            const isComplete = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isComplete
                      ? "bg-white/20 text-white"
                      : isCurrent
                      ? "bg-white text-black"
                      : "bg-white/5 text-white/30"
                  }`}
                >
                  {isComplete ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isComplete || isCurrent ? "text-white/90" : "text-white/30"
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
