"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, Project } from "./types";
import { api, setToken, removeToken } from "./api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    full_name: string,
    password: string,
    confirm_password: string,
    role?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  switchDemoRole: (role: UserRole) => Promise<void>;
  currentProject: Project | null;
  setCurrentProject: (p: Project | null) => void;
  projects: Project[];
  refreshProjects: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_CREDENTIALS: Record<UserRole, { email: string; name: string; role: UserRole }> = {
  ADMIN: { email: "admin@knowledgecontinuity.io", name: "Alexander Vance (Admin)", role: "ADMIN" },
  PROJECT_MANAGER: { email: "pm@knowledgecontinuity.io", name: "Elena Rostova (Lead PM)", role: "PROJECT_MANAGER" },
  OUTGOING_MEMBER: { email: "outgoing@knowledgecontinuity.io", name: "Sarah Jenkins (Outgoing Lead)", role: "OUTGOING_MEMBER" },
  INCOMING_MEMBER: { email: "incoming@knowledgecontinuity.io", name: "Marcus Chen (Incoming Engineer)", role: "INCOMING_MEMBER" },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    async function initAuth() {
      try {
        const me = await api.getMe();
        setUser(me);
        await loadProjects();
      } catch {
        // Fallback to default PM user session if local dev
        try {
          const res = await api.login("pm@knowledgecontinuity.io", "Password123!");
          setUser(res.user);
          await loadProjects();
        } catch {
          // If offline/no backend yet, set demo user so UI renders cleanly
          setUser({
            id: "demo-pm",
            email: "pm@knowledgecontinuity.io",
            full_name: "Elena Rostova (Lead PM)",
            role: "PROJECT_MANAGER",
            is_active: true,
            created_at: new Date().toISOString(),
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
    initAuth();
  }, []);

  async function loadProjects() {
    try {
      const list = await api.listProjects();
      setProjects(list);
      if (list.length > 0) {
        const savedId = typeof window !== "undefined" ? localStorage.getItem("kc_current_project_id") : null;
        if (savedId === "NONE") {
          setCurrentProject(null);
          return;
        }
        const matched = savedId ? list.find((p) => p.id === savedId) : null;
        const selected = matched || list[0];
        setCurrentProject(selected);
        if (typeof window !== "undefined") {
          localStorage.setItem("kc_current_project_id", selected.id);
        }
      } else {
        setCurrentProject(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("kc_current_project_id");
        }
      }
    } catch (e) {
      console.warn("Failed to load projects:", e);
    }
  }

  const handleSetCurrentProject = (p: Project | null) => {
    setCurrentProject(p);
    if (typeof window !== "undefined") {
      if (p) {
        localStorage.setItem("kc_current_project_id", p.id);
      } else {
        localStorage.setItem("kc_current_project_id", "NONE");
      }
    }
  };

  async function refreshUser() {
    try {
      const me = await api.getMe();
      setUser(me);
    } catch (e) {
      console.warn("Failed to refresh user:", e);
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const res = await api.login(email, password);
      setUser(res.user);
      await loadProjects();
    } finally {
      setIsLoading(false);
    }
  }

  async function register(
    email: string,
    full_name: string,
    password: string,
    confirm_password: string,
    role: string = "INCOMING_MEMBER"
  ) {
    setIsLoading(true);
    try {
      const res = await api.register({
        email,
        full_name,
        password,
        confirm_password,
        role,
      });
      setUser(res.user);
      await loadProjects();
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await api.logout();
    } catch {
      removeToken();
    }
    setUser(null);
    setCurrentProject(null);
    setProjects([]);
  }

  async function switchDemoRole(role: UserRole) {
    setIsLoading(true);
    try {
      const creds = DEMO_CREDENTIALS[role];
      const res = await api.login(creds.email, "Password123!");
      setUser(res.user);
      await loadProjects();
    } catch {
      setUser({
        id: `demo-${role.toLowerCase()}`,
        email: DEMO_CREDENTIALS[role].email,
        full_name: DEMO_CREDENTIALS[role].name,
        role: role,
        is_active: true,
        created_at: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        switchDemoRole,
        currentProject,
        setCurrentProject: handleSetCurrentProject,
        projects,
        refreshProjects: loadProjects,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
