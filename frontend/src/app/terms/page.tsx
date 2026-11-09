import React from "react";
import Link from "next/link";
import { ArrowLeft, FileCheck, Scale, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Knowledge Continuity",
  description: "Terms and conditions of service for using the Knowledge Continuity platform.",
};

export default function TermsPage() {
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
            <Scale className="w-3.5 h-3.5" />
            Effective: November 2026
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Terms and Conditions</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Please review these terms before using the Knowledge Continuity platform for engineering knowledge transfer and handover synthesis.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-teal-400" /> 1. Authorized Use & Workspace Governance
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Users must hold authorized credentials assigned by their organization administrator. Access to workspaces is constrained by explicit roles: Admin, Project Manager, Outgoing Team Member, and Incoming Successor. Attempting to bypass role-based gating or unauthorized inspection of unapproved drafts is strictly prohibited.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">2. Proprietary Documentation & Intellectual Property</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All source documents, architectural notes, schemas, and proprietary code uploaded to Knowledge Continuity remain the exclusive intellectual property of the uploading organization. Knowledge Continuity acts solely as an indexing and verification layer.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-teal-400" /> 3. Human-in-the-Loop Verification Requirement
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            While Knowledge Continuity provides automated entity extraction, SequenceMatcher citation scoring, and conflict detection, all generated handover dossiers require final human managerial review. A designated Project Manager or Administrator must review findings, resolve flagged contradictions, and provide an explicit digital sign-off before releasing dossiers to incoming personnel.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">4. Availability & Export Portability</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Handover reports and audit logs are exportable at any time as standardized PDF and JSON documents. Service availability is maintained in accordance with enterprise platform standards.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">5. Governing Law</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            These terms are governed by the applicable commercial laws of your enterprise agreement. For questions regarding enterprise terms, contact{" "}
            <span className="text-teal-400 font-mono">legal@knowledgecontinuity.io</span>.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-800 text-xs text-slate-500">
          <p>© 2026 Knowledge Continuity Platform. All rights reserved.</p>
        </section>
      </main>
    </div>
  );
}

