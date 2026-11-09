import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Knowledge Continuity",
  description: "Privacy policy and data retention practices for the Knowledge Continuity platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4 text-teal-400" />
            Back to Platform
          </Link>
          <span className="text-xs font-bold text-white tracking-tight">KNOWLEDGE CONTINUITY</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-3 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono">
            <Shield className="w-3.5 h-3.5" />
            Last Updated: November 2026
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            This Privacy Policy describes how Knowledge Continuity handles document ingestion, user authentication, and data retention across project workspaces.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-400" /> 1. Data Ingestion & Scope
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Knowledge Continuity processes engineering artifacts, including architecture documents, sprint logs, meeting notes, and configuration files uploaded by authorized project members. Ingested files are parsed, chunked, and stored solely within the customer's isolated workspace.
          </p>
          <ul className="text-xs sm:text-sm text-slate-400 space-y-2 list-disc pl-5">
            <li>We do not share uploaded project documentation across distinct client projects or organizational tenants.</li>
            <li>Source text chunks are retained solely to compute citation evidence and maintain traceability.</li>
            <li>Sensitive tokens and passwords identified during regex normalization are flagged or redacted.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-400" /> 2. Model Processing & Zero Data Retention
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            When structured entities (decisions, risks, tasks) are extracted via external LLM APIs (such as Google Gemini Pro / Flash), requests are transmitted over encrypted TLS connections under enterprise API terms:
          </p>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
            <div className="flex items-center gap-2 text-teal-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Zero-Model-Training Guarantee</span>
            </div>
            <p>
              Customer input data, documentation chunks, and extracted knowledge findings are never used to train or fine-tune public foundation models.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">3. Role-Based Access Control & Permissions</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Access to handover drafts is strictly governed by Role-Based Access Control (RBAC). Incoming team members cannot access unvetted knowledge findings or draft handovers until formal approval is submitted by an authorized Project Manager or System Administrator.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">4. Audit Trails & Lineage</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All administrative actions, member role modifications, item dismissals, and handover export operations generate immutable audit records containing user IDs, timestamps, and action types to satisfy organizational compliance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">5. Data Deletion & Export</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Project Administrators retain full authority to archive projects, delete uploaded documents, or trigger complete data purge. Generated handover packages may be exported at any time in standardized PDF and structured JSON formats.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-800 text-xs text-slate-500">
          <p>
            For privacy inquiries or enterprise compliance queries, contact our governance team at{" "}
            <span className="text-teal-400 font-mono">privacy@knowledgecontinuity.io</span>.
          </p>
        </section>
      </main>
    </div>
  );
}

