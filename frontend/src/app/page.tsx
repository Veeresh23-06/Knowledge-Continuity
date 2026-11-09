"use client";

import React, { useState } from "react";
import { Sidebar, NavTab } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { UploadModal } from "@/components/UploadModal";
import { NewProjectModal } from "@/components/NewProjectModal";
import { AuthView } from "@/components/AuthView";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";
import { useToast } from "@/components/Toast";

// Views
import { DashboardView } from "@/views/DashboardView";
import { ProjectsView } from "@/views/ProjectsView";
import { SourcesView } from "@/views/SourcesView";
import { KnowledgeView } from "@/views/KnowledgeView";
import { TimelineView } from "@/views/TimelineView";
import { RisksView } from "@/views/RisksView";
import { HandoverView } from "@/views/HandoverView";
import { ReviewView } from "@/views/ReviewView";
import { TeamView } from "@/views/TeamView";
import { SettingsView } from "@/views/SettingsView";
import { LandingPageView } from "@/views/LandingPageView";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const { user, isLoading, currentProject, setCurrentProject, refreshProjects, switchDemoRole } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { toast } = useToast();

  const handleOpenUpload = () => {
    if (!currentProject) {
      toast.warning("Please select or initialize a project first before ingesting sources.");
      setShowNewProjectModal(true);
      return;
    }
    setShowUploadModal(true);
  };

  // 1. Landing Page View (with interactive 3D Knowledge Network)
  if (showLanding) {
    return (
      <LandingPageView
        onEnterApp={() => setShowLanding(false)}
        onSelectRole={async (role) => {
          await switchDemoRole(role);
          setShowLanding(false);
        }}
      />
    );
  }

  // Authentication Loading State
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-teal-500/30 border-t-teal-400 rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Loading Knowledge Continuity Platform...
          </span>
        </div>
      </div>
    );
  }

  // Protected Routes: Require authenticated user
  if (!user) {
    return <AuthView />;
  }

  return (
    <div
      className={`flex h-screen w-screen overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-[#020202] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* 1. Left Navy Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewProject={() => setShowNewProjectModal(true)}
        onViewLanding={() => setShowLanding(true)}
      />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <TopNav
          onNewProject={() => setShowNewProjectModal(true)}
          onUpload={handleOpenUpload}
        />

        {/* View Container */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div key={activeTab} className="max-w-7xl mx-auto transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
            {activeTab === "dashboard" && (
              <DashboardView
                onNavigate={(tab) => setActiveTab(tab)}
                onUpload={handleOpenUpload}
              />
            )}

            {activeTab === "projects" && (
              <ProjectsView
                onNewProject={() => setShowNewProjectModal(true)}
                onSelectProject={(proj) => {
                  setCurrentProject(proj);
                  setActiveTab("dashboard");
                }}
              />
            )}

            {activeTab === "sources" && (
              <SourcesView onUpload={handleOpenUpload} />
            )}

            {activeTab === "knowledge" && <KnowledgeView />}

            {activeTab === "timeline" && <TimelineView />}

            {activeTab === "risks" && <RisksView />}

            {activeTab === "handover" && <HandoverView />}

            {activeTab === "review" && <ReviewView />}

            {activeTab === "team" && <TeamView />}

            {activeTab === "settings" && <SettingsView />}
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      {showUploadModal && currentProject && (
        <UploadModal
          projectId={currentProject.id}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            refreshProjects();
            toast.success("Source files ingested and parsed into page chunks successfully!");
          }}
        />
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <NewProjectModal
          onClose={() => setShowNewProjectModal(false)}
          onSuccess={async (newProj) => {
            await refreshProjects();
            setCurrentProject(newProj);
            setShowNewProjectModal(false);
            toast.success(`Project '${newProj.name}' initialized and set as active.`);
          }}
        />
      )}
    </div>
  );
}
