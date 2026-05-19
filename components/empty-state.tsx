"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="py-20 text-center"
    >
      <div className="max-w-md mx-auto space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500/60" />
        </motion.div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-white">No architectural risks detected</h3>
          <p className="text-white/50 leading-relaxed">
            This change appears to respect your architectural constraints.
            <br />
            No high-signal findings to report.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
