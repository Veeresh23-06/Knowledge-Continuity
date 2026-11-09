"use client";

import React, { useEffect, useState } from "react";
import {
  FileText,
  BrainCircuit,
  Award,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  FileCheck2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FolderGit2,
  Users,
  Activity,
  Layers,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DashboardSummary, DashboardStats, AuditLogItem } from "@/lib/types";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface DashboardViewProps {
  onNavigate: (tab: any) => void;
  onUpload: () => void;
}

export function DashboardView({ onNavigate, onUpload }: DashboardViewProps) {
  const { currentProject, setCurrentProject, user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activityLogs, setActivityLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [sumData, statData, actData] = await Promise.allSettled([
          api.getDashboardSummary(),
          api.getDashboardStats(currentProject?.id),
          api.getRecentActivity(),
        ]);

        if (sumData.status === "fulfilled") setSummary(sumData.value);
        if (statData.status === "fulfilled") setStats(statData.value);
        if (actData.status === "fulfilled") setActivityLogs(actData.value);
      } catch (e) {
        console.warn("Failed to load dashboard metrics:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentProject]);

  // Real Chart data preparation
  const entityData = stats?.findings_by_type && Object.keys(stats.findings_by_type).length > 0
    ? Object.entries(stats.findings_by_type).map(([name, value]) => ({
        name: name.replace("_", " "),
        count: value,
      }))
    : [];

  const hasEntityData = entityData.length > 0 && entityData.some((d) => d.count > 0);

  const verifData = [
    { name: "Verified", value: stats?.verification_breakdown?.["VERIFIED"] || 0, color: "#0d9488" },
    { name: "Conflicting", value: stats?.verification_breakdown?.["CONFLICTING"] || 0, color: "#f59e0b" },
    { name: "Unsupported", value: stats?.verification_breakdown?.["UNSUPPORTED"] || 0, color: "#f43f5e" },
  ];

  const totalVerifiedCount = verifData.reduce((acc, cur) => acc + cur.value, 0);

  const readinessScore = currentProject?.readiness_score || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-800 rounded-2xl text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Active Session: {user?.role}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Knowledge Handover Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {currentProject ? (
              <>
                Reconstructing verified project state for <strong className="text-white">{currentProject.name}</strong>. Every finding is anchored to authorized document pages and exact quotations.
              </>
            ) : (
              <>
                No active project selected. Select a workspace from the sidebar or click &ldquo;Browse Projects&rdquo; to begin ingesting files and synthesizing handovers.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {currentProject ? (
            <>
              <button
                onClick={onUpload}
                className="flex items-center gap-2 px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 shrink-0" />
                Ingest Source Files
              </button>
              <button
                onClick={() => onNavigate("handover")}
                className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 transition cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-teal-400 shrink-0" />
                View Handover Dossier
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate("projects")}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
            >
              <FolderGit2 className="w-4 h-4 shrink-0" />
              Browse Workspaces
            </button>
          )}
        </div>
      </div>

      {/* Primary KPI Metrics: Backed by real database queries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Accessible Projects */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Accessible Projects</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {summary ? summary.total_projects : 0}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-teal-700 font-semibold">{summary?.active_projects ?? 0} Active</span>
            <span>•</span>
            <span>{summary?.completed_projects ?? 0} Completed</span>
          </div>
        </div>

        {/* KPI 2: Extracted Findings */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Extracted Facts</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <BrainCircuit className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {currentProject ? (stats?.total_findings ?? currentProject.findings_count ?? 0) : 0}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{currentProject ? (stats?.approved_findings ?? 0) : 0} Approved</span>
          </div>
        </div>

        {/* KPI 3: Ingested Documents */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Ingested Sources</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {currentProject ? (stats?.total_documents ?? currentProject.documents_count ?? 0) : 0}
          </div>
          <p className="text-xs text-slate-500">PDF, DOCX, TXT preserved</p>
        </div>

        {/* KPI 4: Pending Review */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Review Queue</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {currentProject ? (stats?.pending_reviews ?? 0) : 0}
          </div>
          <span className="text-xs text-amber-700 font-medium">Pending human sign-off</span>
        </div>
      </div>

      {/* Recent Projects Section */}
      {summary?.recent_projects && summary.recent_projects.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Projects</h3>
              <p className="text-xs text-slate-500">Workspaces accessible to your account</p>
            </div>
            <button
              onClick={() => onNavigate("projects")}
              className="text-xs text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
            >
              All Projects <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summary.recent_projects.map((proj) => {
              const isCurrent = currentProject?.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    setCurrentProject(proj as any);
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                    isCurrent
                      ? "border-teal-500 bg-teal-50/20 ring-1 ring-teal-500/30"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {proj.category || "Engineering"}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                        {proj.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm truncate">{proj.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {proj.description || "Knowledge continuity transition"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <span className="text-slate-500">
                      Role: <strong className="text-slate-700">{proj.current_user_role || "MEMBER"}</strong>
                    </span>
                    <span className="font-bold text-teal-700">{proj.readiness_score ?? 85}% Ready</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Findings by Entity Type */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Extracted Knowledge Distribution</h3>
              <p className="text-xs text-slate-500">Structured entities extracted from project documentation</p>
            </div>
            <button
              onClick={() => onNavigate("knowledge")}
              className="text-xs text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
            >
              Explore Knowledge <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {hasEntityData ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={entityData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} interval={0} angle={-25} textAnchor="end" />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", border: "none", color: "#fff", fontSize: "12px" }}
                  />
                  <Bar dataKey="count" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 w-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-lg p-6 text-center space-y-2">
              <BrainCircuit className="w-8 h-8 text-slate-300" />
              <p className="text-xs font-semibold text-slate-700">No Extracted Findings Yet</p>
              <p className="text-[11px] text-slate-400 max-w-xs">
                {currentProject ? "Upload architecture notes or sprint logs in 'Sources' to extract knowledge findings." : "Select or create a project to begin extracting knowledge."}
              </p>
              {currentProject && (
                <button
                  onClick={onUpload}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-md transition"
                >
                  Ingest Sources
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right 1 Col: Verification Status Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Evidence Verification Status</h3>
            <p className="text-xs text-slate-500">Audit status of extracted findings against page text</p>
          </div>

          {totalVerifiedCount > 0 ? (
            <>
              <div className="h-44 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={verifData} dataKey="value" nameKey="name" innerRadius={42} outerRadius={68} paddingAngle={4}>
                      {verifData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", border: "none", color: "#fff", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                {verifData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-56 w-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-lg p-4 text-center space-y-1.5">
              <ShieldCheck className="w-7 h-7 text-slate-300" />
              <p className="text-xs font-semibold text-slate-700">No Audited Findings</p>
              <p className="text-[11px] text-slate-400 max-w-xs">
                Run verification audits against source document pages to populate evidence metrics.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Activity and Security Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real Audit Activity Stream */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-900 text-sm">Live Audit & Activity Log</h3>
            </div>
            <span className="text-xs text-slate-400">Database-backed</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
            {(activityLogs.length > 0 ? activityLogs : stats?.recent_activity || []).slice(0, 8).map((act: any, i: number) => (
              <div key={act.id || i} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800">
                      {(act.action || "ACTIVITY").replace(/_/g, " ")}
                    </span>
                    <span className="text-slate-500 block text-[11px]">
                      {act.user_name ? `by ${act.user_name}` : "System event"}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">
                  {act.created_at || act.timestamp
                    ? new Date(act.created_at || act.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : "Just now"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Spotlight */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base">Backend-Enforced RBAC</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Security permissions are validated at the FastAPI dependency layer. Incoming members are strictly prevented from viewing unapproved findings or sensitive raw source revisions.
            </p>
          </div>

          <div className="p-3 bg-slate-800 rounded-lg text-xs space-y-1.5 border border-slate-700">
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
              Quick Test Recommendation:
            </div>
            <p className="text-slate-300">
              Use the sidebar role switcher to toggle between <strong>Lead PM</strong> and <strong>Incoming Engineer</strong> to test role-based access control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
