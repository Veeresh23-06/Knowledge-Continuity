"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  AlertOctagon,
  GitFork,
  HelpCircle,
  AlertTriangle,
  FileText,
  User,
  ArrowRight,
  Eye,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { EvidenceModal } from "@/components/EvidenceModal";

export function RisksView() {
  const { currentProject } = useAuth();
  const [data, setData] = useState<{
    risks: any[];
    blockers: any[];
    dependencies: any[];
    questions: any[];
  }>({
    risks: [],
    blockers: [],
    dependencies: [],
    questions: [],
  });
  const [loading, setLoading] = useState(true);
  const [inspectFinding, setInspectFinding] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!currentProject) return;
      setLoading(true);
      try {
        const res = await api.getRisksAndDependencies(currentProject.id);
        setData(res);
      } catch (e) {
        console.warn("Failed to load risks:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentProject]);

  if (!currentProject) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-slate-200 p-12 text-center space-y-3 my-8 animate-in fade-in duration-300">
        <ShieldAlert className="w-10 h-10 text-slate-300 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">No Project Selected</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Please select a workspace from the left sidebar to inspect technical risks, blockers, and service couplings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-900">Risks, Blockers & System Dependencies</h2>
        <p className="text-xs text-slate-500 mt-1">
          Identifies vulnerabilities, active delivery impediments, external third-party couplings, and open questions.
        </p>
      </div>

      {/* Grid: Blockers and Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Active Blockers */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Critical Project Blockers</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
              {data.blockers.length} Active
            </span>
          </div>

          {loading ? (
            <div className="text-xs text-slate-500 py-6 text-center">Loading blockers...</div>
          ) : data.blockers.length === 0 ? (
            <div className="text-xs text-slate-500 py-6 text-center">No active blockers identified.</div>
          ) : (
            <div className="space-y-3">
              {data.blockers.map((b, idx) => (
                <div key={b.id || idx} className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-900">{b.title}</span>
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                      Page {b.page || b.page_number || 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">{b.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-rose-200/60">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      Assigned: <strong className="text-slate-800">{b.owner || "Escalation Required"}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInspectFinding(b)}
                        className="flex items-center gap-1 px-2 py-0.5 bg-white hover:bg-rose-100 text-rose-800 text-[10px] font-semibold rounded border border-rose-200 transition cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-rose-600" />
                        Inspect Evidence
                      </button>
                      <span className="font-bold uppercase text-rose-700">Immediate Action</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Risk Register */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Technical Debt & Risk Register</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
              {data.risks.length} Logged
            </span>
          </div>

          {loading ? (
            <div className="text-xs text-slate-500 py-6 text-center">Loading risk register...</div>
          ) : data.risks.length === 0 ? (
            <div className="text-xs text-slate-500 py-6 text-center">No risks logged.</div>
          ) : (
            <div className="space-y-3">
              {data.risks.map((r, idx) => (
                <div key={r.id || idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{r.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      r.severity === "CRITICAL" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {r.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{r.description}</p>
                  
                  {r.mitigation && (
                    <p className="text-[11px] text-teal-800 bg-teal-50/60 p-2 rounded border border-teal-100 font-medium">
                      <strong>Mitigation:</strong> {r.mitigation}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                    <span className="text-slate-500">Page {r.page || r.page_number || 1}</span>
                    <button
                      onClick={() => setInspectFinding(r)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-semibold rounded border border-slate-200 transition cursor-pointer"
                    >
                      <Eye className="w-3 h-3 text-teal-600" />
                      Inspect Evidence
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid: Dependencies and Unresolved Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3. System Dependencies */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <GitFork className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">External Dependencies & Integrations</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {data.dependencies.length} Couplings
            </span>
          </div>

          <div className="space-y-2.5">
            {data.dependencies.map((dep, idx) => (
              <div key={dep.id || idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                <span className="font-bold text-slate-900 block">{dep.title}</span>
                <p className="text-slate-600">{dep.description}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px]">
                  <span className="text-slate-400">Preserved from source Page {dep.page || dep.page_number || 1}</span>
                  <button
                    onClick={() => setInspectFinding(dep)}
                    className="flex items-center gap-1 px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded border border-slate-200 transition cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-indigo-600" />
                    Inspect Evidence
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Unresolved Questions */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Unresolved Technical Questions</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              {data.questions.length} Open RFCs
            </span>
          </div>

          <div className="space-y-2.5">
            {data.questions.map((q, idx) => (
              <div key={q.id || idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                <span className="font-bold text-slate-900 block">? {q.title}</span>
                <p className="text-slate-600">{q.description}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px]">
                  <span className="text-teal-700 font-semibold">
                    Requires architectural investigation during onboarding.
                  </span>
                  <button
                    onClick={() => setInspectFinding(q)}
                    className="flex items-center gap-1 px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded border border-slate-200 transition cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-teal-600" />
                    Inspect Evidence
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence Inspector Modal */}
      {inspectFinding && (
        <EvidenceModal
          finding={inspectFinding}
          onClose={() => setInspectFinding(null)}
          onRefresh={() => {
            if (currentProject) {
              api.getRisksAndDependencies(currentProject.id).then(setData);
            }
          }}
        />
      )}
    </div>
  );
}
