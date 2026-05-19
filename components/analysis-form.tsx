"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { AnalysisInput } from "@/lib/types";

interface AnalysisFormProps {
  onAnalyze: (input: AnalysisInput) => void;
  isLoading: boolean;
}

export function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
  const [diff, setDiff] = useState("");
  const [rules, setRules] = useState("");
  const [context, setContext] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diff.trim() || !rules.trim()) return;

    onAnalyze({
      diff: diff.trim(),
      rules: rules.trim(),
      context: context.trim() || undefined,
    });
  };

  const loadExample = () => {
    setDiff(`diff --git a/services/payment/handler.ts b/services/payment/handler.ts
index abc123..def456 100644
--- a/services/payment/handler.ts
+++ b/services/payment/handler.ts
@@ -12,8 +12,12 @@ export async function processPayment(orderId: string) {
   const order = await db.orders.findUnique({ where: { id: orderId } });
   
-  // Process payment synchronously
-  const result = await paymentGateway.charge(order.amount);
+  // Process payment and update inventory asynchronously
+  const result = await paymentGateway.charge(order.amount);
+  
+  // Update inventory immediately after charge
+  await Promise.all(
+    order.items.map(item => inventoryService.decrement(item.id, item.quantity))
+  );
   
   await db.orders.update({
     where: { id: orderId },`);

    setRules(`# Architectural Invariants

## Service Boundaries
- Payment service must never directly call Inventory service
- All cross-service communication must use async message queues
- Inventory updates must be eventually consistent

## Transactional Integrity
- Payment confirmation and order state changes must be atomic
- No distributed transactions across service boundaries
- Use saga pattern for multi-service workflows

## Forbidden Patterns
- No synchronous HTTP calls between services
- No direct database access across service boundaries
- No unbounded Promise.all operations in critical paths`);

    setContext(`Repository: microservices-ecommerce
Services: payment, inventory, order, notification
Message Queue: RabbitMQ
Database: PostgreSQL (per service)`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Pull Request Diff
          </label>
          <Textarea
            value={diff}
            onChange={(e) => setDiff(e.target.value)}
            placeholder="Paste your git diff here..."
            className="min-h-[200px] text-xs"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Architecture Rules
          </label>
          <Textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="Define your architectural constraints, service boundaries, and invariants..."
            className="min-h-[160px] text-xs"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Repository Context{" "}
            <span className="text-white/40 font-normal">(optional)</span>
          </label>
          <Textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Additional context about your codebase, tech stack, or conventions..."
            className="min-h-[100px] text-xs"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !diff.trim() || !rules.trim()}
          className="relative"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing
            </>
          ) : (
            "Analyze Architecture"
          )}
        </Button>

        {!diff && !rules && (
          <Button
            type="button"
            variant="ghost"
            onClick={loadExample}
            disabled={isLoading}
            className="text-white/60"
          >
            Load Example
          </Button>
        )}
      </div>
    </form>
  );
}
