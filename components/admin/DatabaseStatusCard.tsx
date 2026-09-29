"use client";

import { useState } from "react";
import { AdminCard } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Layers,
} from "lucide-react";

type DatabaseHealth = {
  connected: boolean;
  error: string | null;
  existingTables: string[];
  missingTables: string[];
  allTablesReady: boolean;
  adminCount: number;
  productCount: number;
  inquiryCount: number;
};

export function DatabaseStatusCard({ initial }: { initial: DatabaseHealth }) {
  const [health, setHealth] = useState<DatabaseHealth>(initial);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleRefresh() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/db/status");
      const data = await res.json();
      setHealth(data);
    } catch {
      setMessage("Could not fetch database status.");
    } finally {
      setLoading(false);
    }
  }

  async function handleInit() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/db/init", { method: "POST" });
      const data = await res.json();
      if (data.health) {
        setHealth(data.health);
      }
      setMessage(data.message || (data.success ? "Database synchronized!" : data.error));
    } catch {
      setMessage("Failed to run database initialization.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminCard className="mt-8 border-hairline bg-pearl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-taupe" />
            <h2 className="font-display text-lg text-taupe">
              Database & Hostinger Sync
            </h2>
          </div>
          <p className="mt-1 font-body text-xs text-muted">
            Inspect MySQL tables, verify Hostinger connection, or initialize missing tables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Check Status
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleInit}
            disabled={loading}
            className="flex items-center gap-1.5 bg-taupe text-xs text-pearl hover:bg-taupe/90"
          >
            <Layers className="h-3.5 w-3.5" />
            1-Click Sync Tables
          </Button>
        </div>
      </div>

      {message && (
        <div className="mt-4 rounded border border-sage/40 bg-oat/50 p-3 text-xs text-taupe">
          {message}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded border border-hairline bg-oat/30 p-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-muted">Connection</span>
            {health.connected ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700">
                <AlertTriangle className="h-3.5 w-3.5" /> Offline
              </span>
            )}
          </div>
          <p className="mt-2 font-mono text-[11px] text-taupe truncate">
            127.0.0.1:3306 (MySQL)
          </p>
        </div>

        <div className="rounded border border-hairline bg-oat/30 p-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-muted">Database Tables</span>
            {health.allTablesReady ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> All 8 Ready
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                <AlertTriangle className="h-3.5 w-3.5" /> {health.existingTables.length}/8 Active
              </span>
            )}
          </div>
          <p className="mt-2 font-body text-[11px] text-muted truncate">
            {health.missingTables.length === 0
              ? "All core tables present"
              : `Missing: ${health.missingTables.join(", ")}`}
          </p>
        </div>

        <div className="rounded border border-hairline bg-oat/30 p-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-muted">Active Records</span>
            <Server className="h-3.5 w-3.5 text-muted" />
          </div>
          <p className="mt-2 font-body text-[11px] text-taupe">
            {health.productCount} products · {health.adminCount} admin · {health.inquiryCount} leads
          </p>
        </div>
      </div>

      {health.error && (
        <div className="mt-4 rounded bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800">
          <p className="font-semibold">Connection Notice:</p>
          <p className="mt-1 font-mono text-[11px]">{health.error}</p>
        </div>
      )}
    </AdminCard>
  );
}
