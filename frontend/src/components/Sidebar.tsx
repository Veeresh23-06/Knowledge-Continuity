"use client";

import React from "react";
import {
  LayoutDashboard,
  FolderGit2,
  FileArchive,
  BrainCircuit,
  Milestone,
  ShieldAlert,
  FileCheck2,
  CheckSquare,
  Users2,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  Shield,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/lib/types";

export type NavTab =
  | "dashboard"
  | "projects"
  | "sources"
  | "knowledge"
  | "timeline"
  | "risks"
  | "handover"
  | "review"
  | "team"
  | "settings";

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onNewProject: () => void;
  onViewLanding?: () => void;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  onNewProject,
  onViewLanding,
}: SidebarProps) {
  const {
    user,
    logout,
    switchDemoRole,
    currentProject,
    setCurrentProject,
    projects,
  } = useAuth();

  const isIncomingMember = user?.role === "INCOMING_MEMBER";

  const navItems: Array<{
    id: NavTab;
    label: string;
    icon: any;
    badge?: string;
    restricted?: boolean;
  }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderGit2, badge: `${projects.length}` },
    {
      id: "sources",
      label: "Sources",
      icon: FileArchive,
      badge: currentProject ? `${currentProject.documents_count || 0}` : undefined,
    },
    {
      id: "knowledge",
      label: "Knowledge",
      icon: BrainCircuit,
      badge: currentProject ? `${currentProject.findings_count || 0}` : undefined,
    },
    { id: "timeline", label: "Timeline", icon: Milestone },
    { id: "risks", label: "Risks & Dependencies", icon: ShieldAlert },
    { id: "handover", label: "Handover Dossier", icon: FileCheck2 },
    {
      id: "review",
      label: "Review & Approval",
      icon: CheckSquare,
      restricted: isIncomingMember,
    },
    { id: "team", label: "Team & Permissions", icon: Users2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none overflow-y-auto">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-xs tracking-tight text-white block truncate">
              KNOWLEDGE CONTINUITY
            </span>
            <span className="text-[9px] text-teal-400 uppercase tracking-wider font-semibold block truncate">
              Evidence-Linked Handover
            </span>
          </div>
        </div>

        {/* Project Switcher */}
        <div className="mt-3">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Active Project
          </label>
          <div className="relative">
            <select
              value={currentProject?.id || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (!val) {
                  setCurrentProject(null);
                } else {
                  const found = projects.find((p) => p.id === val);
                  if (found) setCurrentProject(found);
                }
              }}
              className="w-full bg-slate-800 text-white text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 appearance-none focus:outline-teal-500 truncate pr-6 cursor-pointer"
            >
              <option value="">-- No Project Selected --</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {onViewLanding && (
            <button
              onClick={onViewLanding}
              className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[11px] font-semibold transition cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-teal-400 shrink-0" />
              <span>Overview & Landing Page</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 min-h-[220px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isRestricted = item.restricted;

          return (
            <button
              key={item.id}
              disabled={isRestricted}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition group ${
                isRestricted
                  ? "opacity-40 cursor-not-allowed hover:bg-transparent"
                  : isActive
                  ? "bg-teal-600 text-white shadow-xs font-semibold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-teal-400"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 ${
                    isActive ? "bg-teal-700 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {item.badge}
                </span>
              )}
              {isRestricted && (
                <span className="text-[9px] uppercase px-1 rounded bg-slate-800 text-slate-500 font-bold shrink-0">
                  Restricted
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Demo RBAC Switcher Footer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2 shrink-0 mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Shield className="w-3 h-3 text-teal-400 shrink-0" />
            Switch Active Role (RBAC)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {(["ADMIN", "PROJECT_MANAGER", "OUTGOING_MEMBER", "INCOMING_MEMBER"] as UserRole[]).map(
            (r) => {
              const isCurrent = user?.role === r;
              const shortLabels: Record<UserRole, string> = {
                ADMIN: "Admin",
                PROJECT_MANAGER: "Lead PM",
                OUTGOING_MEMBER: "Outgoing",
                INCOMING_MEMBER: "Incoming",
              };
              return (
                <button
                  key={r}
                  onClick={() => switchDemoRole(r)}
                  className={`text-[10px] py-1 px-1.5 rounded font-semibold transition truncate border ${
                    isCurrent
                      ? "bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-xs"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-white"
                  }`}
                >
                  {shortLabels[r]}
                </button>
              );
            }
          )}
        </div>

        {/* Legal & Docs links */}
        <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-500">
          <a href="/privacy" className="hover:text-slate-300 transition">Privacy</a>
          <span>•</span>
          <a href="/terms" className="hover:text-slate-300 transition">Terms</a>
          <span>•</span>
          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noreferrer"
            className="hover:text-teal-400 transition"
          >
            API Docs
          </a>
        </div>

        {/* Current User Badge & Logout */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-850">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-750 flex items-center justify-center font-bold text-teal-400 text-xs shrink-0">
              {user?.full_name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-white block truncate">
                {user?.full_name || "User"}
              </span>
              <span className="text-[10px] text-teal-400 font-mono block truncate">
                {user?.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => logout()}
            title="Sign out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-850 transition shrink-0 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
