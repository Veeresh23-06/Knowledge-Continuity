"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { FolderPlus, UploadCloud, Award, Calendar } from "lucide-react";

interface TopNavProps {
  onNewProject: () => void;
  onUpload: () => void;
}

export function TopNav({ onNewProject, onUpload }: TopNavProps) {
  const { currentProject, user } = useAuth();
  const isIncoming = user?.role === "INCOMING_MEMBER";

  const score = currentProject?.readiness_score || 0;
  const scoreColor =
    score >= 80
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : score >= 50
      ? "text-teal-700 bg-teal-50 border-teal-200"
      : "text-amber-700 bg-amber-50 border-amber-200";

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0 shadow-2xs z-20">
      {/* Left: Project title & metadata with clean wrapping */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-full">
            {currentProject?.name || "No Project Selected"}
          </h2>
          {currentProject ? (
            <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
              {currentProject.domain || currentProject.category || "Engineering"}
            </span>
          ) : (
            <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
              Inactive
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 mt-1 flex-wrap">
          {currentProject ? (
            <>
              <span className="flex items-center gap-1 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                Target:{" "}
                <strong className="text-slate-700 font-medium">
                  {currentProject.target_handover_date || currentProject.expected_completion_date
                    ? new Date(
                        currentProject.target_handover_date || currentProject.expected_completion_date!
                      ).toLocaleDateString()
                    : "Immediate Sprint"}
                </strong>
              </span>
              <span className="text-slate-300">•</span>
              <span className="truncate">
                Handover Role:{" "}
                <strong className="text-slate-700 font-medium">
                  {currentProject.handover_role || "Incoming Engineer"}
                </strong>
              </span>
            </>
          ) : (
            <span className="text-slate-400">
              Select a project from the sidebar to inspect knowledge findings
            </span>
          )}
        </div>
      </div>

      {/* Right: Readiness Score & Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
        {/* Handover Readiness Score */}
        {currentProject && (
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shrink-0 ${scoreColor}`}
            title={`Handover Readiness: ${score}%`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span>Readiness:</span>
            <span className="font-bold">{score}%</span>
          </div>
        )}

        {/* Action Buttons */}
        {currentProject && !isIncoming && (
          <button
            onClick={onUpload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-xs transition shrink-0 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 shrink-0" />
            <span>Ingest Sources</span>
          </button>
        )}

        <button
          onClick={onNewProject}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer"
        >
          <FolderPlus className="w-4 h-4 text-slate-500 shrink-0" />
          <span>New Project</span>
        </button>
      </div>
    </header>
  );
}
