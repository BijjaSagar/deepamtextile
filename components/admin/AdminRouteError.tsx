"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, RefreshCw, Database, ArrowLeft, ChevronDown } from "lucide-react";

type AdminRouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function AdminRouteError({ error, reset }: AdminRouteErrorProps) {
  const [repairing, setRepairing] = useState(false);
  const [repairMessage, setRepairMessage] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("[AdminRouteError]", error);
  }, [error]);

  async function handleRepairDatabase() {
    setRepairing(true);
    setRepairMessage(null);
    try {
      const res = await fetch("/api/admin/db/init", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setRepairMessage("Database tables successfully synchronized! Reloading...");
        setTimeout(() => {
          reset();
        }, 1500);
      } else {
        setRepairMessage(
          `Setup notice: ${data.message || data.error || "Could not complete auto-setup. Check database credentials."}`,
        );
      }
    } catch (err) {
      setRepairMessage("Connection error while attempting auto-repair.");
    } finally {
      setRepairing(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl p-6 md:p-8" role="alert">
      <div className="flex items-center gap-2 text-amber-700">
        <AlertCircle className="h-4 w-4" />
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em]">
          Admin Notice
        </p>
      </div>

      <h1 className="mt-2 font-display text-2xl text-taupe">
        Could not load this section
      </h1>
      <p className="mt-2 font-body text-sm text-muted">
        This usually occurs if the remote MySQL database is missing tables or
        needs initial setup after deployment.
      </p>

      {repairMessage && (
        <div className="mt-4 rounded border border-sage/40 bg-pearl p-3 text-xs text-taupe">
          {repairMessage}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={handleRepairDatabase}
          disabled={repairing}
          className="flex items-center gap-2 bg-taupe text-pearl hover:bg-taupe/90"
        >
          {repairing ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          {repairing ? "Repairing Database..." : "1-Click Initialize Tables"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={reset}
          disabled={repairing}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>

        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 rounded border border-hairline px-3.5 py-2 text-xs font-medium text-taupe hover:bg-oat"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Dashboard
        </Link>
      </div>

      <div className="mt-6 border-t border-hairline pt-4">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1 text-xs text-muted hover:text-taupe"
        >
          <span>Technical details</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${showDetails ? "rotate-180" : ""}`}
          />
        </button>

        {showDetails && (
          <div className="mt-2 rounded bg-oat/50 p-3 font-mono text-xs text-taupe break-words">
            <p className="font-semibold text-muted">Error message:</p>
            <p className="mt-1">{error.message || "Unknown error"}</p>
            {error.digest && (
              <p className="mt-2 text-[11px] text-muted">Digest: {error.digest}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

