"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { FolderPlus, UploadCloud, Award, Calendar } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme-context";

interface TopNavProps {
  onNewProject: () => void;
  onUpload: () => void;
}

export function TopNav({ onNewProject, onUpload }: TopNavProps) {
  const { currentProject, user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isIncoming = user?.role === "INCOMING_MEMBER";

  const score = currentProject?.readiness_score || 0;
  const scoreColor = isDark
    ? score >= 80
      ? "text-emerald-300 bg-emerald-950/60 border-emerald-500/40"
      : score >= 50
      ? "text-teal-300 bg-teal-950/60 border-teal-500/40"
      : "text-amber-300 bg-amber-950/60 border-amber-500/40"
    : score >= 80
    ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : score >= 50
    ? "text-teal-700 bg-teal-50 border-teal-200"
    : "text-amber-700 bg-amber-50 border-amber-200";

  return (
    <header
      className={`px-4 sm:px-6 py-2.5 flex flex-col gap-2 shrink-0 z-20 transition-colors duration-300 ${
        isDark
          ? "bg-[#08080a]/95 backdrop-blur-md border-b border-white/10 text-white"
          : "bg-white border-b border-slate-200 text-slate-900 shadow-2xs"
      }`}
    >
      {/* Row 1: Project Title, Domain Badge & Theme Toggle */}
      <div className="flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <h2
            className={`text-sm sm:text-base font-bold truncate ${
              isDark ? "text-white" : "text-slate-900"
            }`}
            title={currentProject?.name || "No Project Selected"}
          >
            {currentProject?.name || "No Project Selected"}
          </h2>
          {currentProject ? (
            <span
              className={`text-[10px] sm:text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md border shrink-0 ${
                isDark
                  ? "bg-[#141418] text-neutral-300 border-white/10"
                  : "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {currentProject.domain || currentProject.category || "Engineering"}
            </span>
          ) : (
            <span
              className={`text-[10px] sm:text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md border shrink-0 ${
                isDark
                  ? "bg-amber-950/40 text-amber-300 border-amber-500/30"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              Inactive
            </span>
          )}
        </div>

        {/* Theme Toggle Button */}
        <div className="shrink-0 flex items-center">
          <ThemeToggle />
        </div>
      </div>

      {/* Row 2: Target Date, Handover Role & Action Buttons */}
      <div className="flex items-center justify-between gap-2 min-w-0 pt-0.5">
        {/* Left: Metadata */}
        <div
          className={`flex items-center gap-2 text-[11px] font-mono truncate min-w-0 ${
            isDark ? "text-neutral-400" : "text-slate-500"
          }`}
        >
          {currentProject ? (
            <>
              <span className="flex items-center gap-1 shrink-0">
                <Calendar
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isDark ? "text-neutral-500" : "text-slate-400"
                  }`}
                />
                Target:{" "}
                <strong
                  className={`font-medium ${
                    isDark ? "text-neutral-200" : "text-slate-700"
                  }`}
                >
                  {currentProject.target_handover_date || currentProject.expected_completion_date
                    ? new Date(
                        currentProject.target_handover_date || currentProject.expected_completion_date!
                      ).toLocaleDateString()
                    : "Immediate Sprint"}
                </strong>
              </span>
              <span className={isDark ? "text-neutral-600" : "text-slate-300"}>•</span>
              <span className="truncate">
                Role:{" "}
                <strong
                  className={`font-medium ${
                    isDark ? "text-neutral-200" : "text-slate-700"
                  }`}
                >
                  {currentProject.handover_role || "Incoming Engineer"}
                </strong>
              </span>
            </>
          ) : (
            <span className={`truncate ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
              Select a project from the sidebar to inspect knowledge findings
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Handover Readiness Score */}
          {currentProject && (
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[11px] sm:text-xs font-semibold shrink-0 ${scoreColor}`}
              title={`Handover Readiness: ${score}%`}
            >
              <Award className="w-3.5 h-3.5 shrink-0 text-teal-500" />
              <span className="font-mono hidden sm:inline">Readiness:</span>
              <span className="font-bold font-mono">{score}%</span>
            </div>
          )}

          {/* Action Buttons */}
          {currentProject && !isIncoming && (
            <button
              onClick={onUpload}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white text-[11px] sm:text-xs font-semibold rounded-md shadow-xs transition shrink-0 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5 shrink-0" />
              <span>Ingest Sources</span>
            </button>
          )}

          <button
            onClick={onNewProject}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md border transition shrink-0 cursor-pointer ${
              isDark
                ? "bg-white/[0.04] hover:bg-white/[0.08] border-white/15 text-white"
                : "bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-2xs"
            }`}
          >
            <FolderPlus
              className={`w-3.5 h-3.5 shrink-0 ${
                isDark ? "text-neutral-400" : "text-slate-500"
              }`}
            />
            <span>New Project</span>
          </button>
        </div>
      </div>
    </header>
  );
}
