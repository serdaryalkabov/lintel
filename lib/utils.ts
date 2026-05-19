import { type ClassValue, clsx } from "clsx";
import { Severity } from "./types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getSeverityColor(severity: Severity): string {
  const colors = {
    critical: "from-red-950/20 to-red-900/10 border-red-900/30",
    high: "from-orange-950/20 to-orange-900/10 border-orange-900/30",
    medium: "from-yellow-950/20 to-yellow-900/10 border-yellow-900/30",
    low: "from-blue-950/20 to-blue-900/10 border-blue-900/30",
  };
  return colors[severity];
}

export function getSeverityTextColor(severity: Severity): string {
  const colors = {
    critical: "text-red-400",
    high: "text-orange-400",
    medium: "text-yellow-400",
    low: "text-blue-400",
  };
  return colors[severity];
}

export function formatConfidence(confidence: number): string {
  return `${Math.round(confidence * 100)}% confidence`;
}
