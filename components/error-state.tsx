"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="py-20 text-center"
    >
      <div className="max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <AlertCircle className="w-16 h-16 mx-auto text-red-500/60" />
        </motion.div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-white">Analysis failed</h3>
          <p className="text-white/50 leading-relaxed">
            {message || "Something went wrong during the analysis. Please try again."}
          </p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="ghost" className="text-white/70">
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
}
