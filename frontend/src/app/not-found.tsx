import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans">
      <h1 className="text-4xl font-extrabold text-teal-400">404</h1>
      <h2 className="text-lg font-bold">Page Not Found</h2>
      <p className="text-xs text-slate-400 max-w-sm">
        The requested page could not be located in this workspace.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Platform
      </Link>
    </div>
  );
}

