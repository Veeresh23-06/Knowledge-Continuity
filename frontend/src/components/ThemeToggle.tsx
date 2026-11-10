"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex items-center justify-center gap-1.5 p-2 rounded-lg transition-all duration-200 cursor-pointer ${
        isDark
          ? "bg-white/[0.06] hover:bg-white/[0.12] text-amber-300 border border-white/10"
          : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 shrink-0 transition-transform duration-300 hover:-rotate-12" />
      )}
      {showLabel && (
        <span className="text-xs font-mono font-medium">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}

