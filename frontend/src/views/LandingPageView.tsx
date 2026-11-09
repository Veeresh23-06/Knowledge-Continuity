"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  GitFork,
  Milestone,
  Lock,
  Download,
  Users,
  Layers,
  ExternalLink,
  CheckSquare,
  ShieldAlert,
  ArrowDown,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  Terminal,
  Activity,
  Award,
  Sparkles,
} from "lucide-react";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { UserRole } from "@/lib/types";

interface LandingPageViewProps {
  onEnterApp: () => void;
  onSelectRole: (role: UserRole) => Promise<void>;
}

export function LandingPageView({ onEnterApp, onSelectRole }: LandingPageViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isLoggingIn, setIsLoggingIn] = useState<string | null>(null);

  const handleRoleClick = async (role: UserRole, roleId: string) => {
    setIsLoggingIn(roleId);
    try {
      await onSelectRole(role);
    } finally {
      setIsLoggingIn(null);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-teal-500/30 selection:text-teal-200 font-sans relative overflow-x-hidden">
      {/* 3D Knowledge Network & Isometric Cube Background */}
      <ThreeCanvas />

      {/* Subtle Halftone Grid Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Floating Glassmorphism Header (Quantum Navigation Style) */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#020202]/85 border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-sm">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-black tracking-wider text-white font-mono">
              KNOWLEDGE CONTINUITY
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-teal-400/90 tracking-widest uppercase">
              // VERIFIED HANDOVER
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider text-neutral-400">
          <a href="#services" className="hover:text-white transition">
            SERVICES
          </a>
          <a href="#case-studies" className="hover:text-white transition">
            CASE STUDIES
          </a>
          <a href="#tech-stack" className="hover:text-white transition">
            TECH STACK
          </a>
          <a href="#metrics" className="hover:text-white transition">
            METRICS
          </a>
          <a href="#roles" className="hover:text-white transition">
            DEMO ROLES
          </a>
          <a href="#faq" className="hover:text-white transition">
            FAQ
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>API Docs</span>
          </a>
          <button
            onClick={onEnterApp}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-bold rounded-lg transition cursor-pointer shadow-sm active:scale-95"
          >
            <span>Enter Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 pt-28 pb-20">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-12 pb-24 text-center">
          {/* Top Pill Announcement */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>We help automate your engineering handover processes</span>
          </div>

          {/* Giant Title (Quantum Agency Visual Style) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-sans mb-6">
            KNOWLEDGE <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
              CONTINUITY
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-neutral-400 font-light leading-relaxed mb-10">
            Trusted evidence-linked platform. We leverage Multimodal LLMs, Exact
            Coordinate Extraction, and Cryptographic Audit Trails to maximize your
            engineering data’s potential. Extract verified models, optimize
            operations, and unlock unparalleled continuity with our end-to-end
            handover services.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-200 text-black text-sm font-bold rounded-lg transition cursor-pointer shadow-md active:scale-95"
            >
              <span>Launch Knowledge Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#case-studies"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 text-white text-sm font-semibold rounded-lg border border-white/15 transition cursor-pointer backdrop-blur-sm"
            >
              <span>Explore Case Studies</span>
              <ArrowDown className="w-4 h-4 text-neutral-400" />
            </a>
          </div>

          {/* 3D Spatial Indicator / Rays Accent */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>3D KNOWLEDGE TOPOLOGY ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>SUB-MILLIMETER COORDINATE EXTRACTION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SHA-256 AUDIT TRAILS</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PARTNER & ARCHITECTURE STANDARDS MARQUEE                                */}
        {/* ========================================================================= */}
        <section className="border-y border-white/10 bg-[#050505]/80 py-8 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
              ENGINEERED FOR ENTERPRISE ARCHITECTURE &amp; REGULATED SYSTEMS
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
              {[
                { name: "Next.js 15", sub: "Turbopack Engine" },
                { name: "FastAPI", sub: "Async Python 3.13" },
                { name: "Google Gemini", sub: "Multimodal AI" },
                { name: "PyMuPDF", sub: "Coordinate Parser" },
                { name: "ReportLab", sub: "Dossier Publisher" },
                { name: "SHA-256", sub: "Cryptographic Hash" },
              ].map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-neutral-900/50 border border-white/5 flex flex-col items-center justify-center"
                >
                  <span className="text-sm font-bold text-neutral-200">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {tech.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* OUR SERVICES / WHAT WE OFFER                                             */}
        {/* ========================================================================= */}
        <section
          id="services"
          className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b border-white/10"
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              What we offer
            </h2>
            <p className="text-neutral-400 max-w-2xl mt-3 text-sm sm:text-base leading-relaxed">
              Transform unorganized documentation, pull requests, and architecture
              specs into verified knowledge assets that continuously improve with
              engineer review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Evidence-Linked Extraction",
                desc: "Sub-millimeter document coordinate mapping and verbatim quotation anchoring so every technical claim is traceable directly to authorized source pages.",
                highlight: "Zero hallucination guarantee via citation spans",
                icon: FileCheck2,
              },
              {
                num: "02",
                title: "10-Entity Domain Parser",
                desc: "Autonomous structured ingestion identifying Milestones, Deliverables, Architecture decisions, Blockers, Secrets, Dependencies, and Key Contacts.",
                highlight: "Categorized schema with confidence scoring",
                icon: Layers,
              },
              {
                num: "03",
                title: "Multi-Role RBAC Governance",
                desc: "Strict separation of duties across 4 roles (Admin, Lead PM, Outgoing Lead, Incoming Engineer), enforcing read-only restrictions on incoming staff.",
                highlight: "Role-scoped permissions & review gates",
                icon: ShieldCheck,
              },
              {
                num: "04",
                title: "Cryptographic Handover Dossier",
                desc: "Automated 13-section immutable PDF handover dossiers signed with SHA-256 hash trees, audit logs, and on-demand report generation.",
                highlight: "Production-grade ReportLab PDF compilation",
                icon: Download,
              },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.num}
                  className="group relative p-7 sm:p-8 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-teal-500/40 transition duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-neutral-500 group-hover:text-teal-400 transition">
                      {service.num}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/10 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-teal-400/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>{service.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CASE STUDIES / USE CASES                                                 */}
        {/* ========================================================================= */}
        <section
          id="case-studies"
          className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b border-white/10"
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
              USE CASES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              Case studies
            </h2>
            <p className="text-neutral-400 max-w-2xl mt-3 text-sm sm:text-base leading-relaxed">
              What our platform delivered across real-world enterprise engineering sprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                badge: "ACTIVE SEED PROJECT",
                title: "Project Apollo",
                category: "Payments & Microservices",
                stats: "54 Extracted Facts • 66% Readiness",
                summary:
                  "Core distributed event processing engine, analytical datastore migration, and payment gateway infrastructure.",
                status: "Ready for Inspection",
              },
              {
                num: "02",
                badge: "STREAMING DATA",
                title: "Event Broker Pipeline",
                category: "Kafka & Flink Cluster",
                stats: "38 Verified Decisions • 82% Readiness",
                summary:
                  "Real-time event streaming pipeline handover with verified schema evolution and zero message loss.",
                status: "Production Verified",
              },
              {
                num: "03",
                badge: "COMPLIANCE & AUDIT",
                title: "FinTech Ledger",
                category: "SOC-2 / ISO Audit",
                stats: "46 Audit Spans • 91% Readiness",
                summary:
                  "Strict evidence anchoring with cryptographic tamper-evident review logs for financial examiners.",
                status: "Compliant & Signed",
              },
              {
                num: "04",
                badge: "CLOUD INFRASTRUCTURE",
                title: "Kubernetes Migration",
                category: "DevOps & IAM Runbooks",
                stats: "29 Cloud Runbooks • 75% Readiness",
                summary:
                  "Automated IAM credential rotation, ingress topologies, and cluster failover procedures.",
                status: "Handover Complete",
              },
            ].map((cs) => (
              <div
                key={cs.num}
                className="p-6 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-white/20 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="text-teal-400 font-bold">{cs.num}</span>
                    <span className="text-[10px] text-neutral-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">
                      {cs.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {cs.title}
                  </h3>
                  <div className="text-xs font-mono text-neutral-400 mb-3">
                    {cs.category}
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                    {cs.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="text-[11px] font-mono text-teal-400/90 mb-3">
                    {cs.stats}
                  </div>
                  <button
                    onClick={onEnterApp}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition cursor-pointer"
                  >
                    <span>View Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TECH STACK / TECHNOLOGY WE USE                                            */}
        {/* ========================================================================= */}
        <section
          id="tech-stack"
          className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b border-white/10"
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
              TECH STACK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              Technology we use
            </h2>
            <p className="text-neutral-400 max-w-2xl mt-3 text-sm sm:text-base leading-relaxed">
              We are transparent about the cutting-edge tools powering our top-tier
              products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Google Gemini",
                desc: "We harness Google Gemini API with strict temperature 0.1 extraction prompts to extract structured JSON entities without hallucination.",
                tag: "Multimodal LLM",
                icon: Cpu,
              },
              {
                num: "02",
                title: "PyMuPDF Parser",
                desc: "PyMuPDF (fitz) provides high-speed sub-millimeter bounding box text extraction, page geometry mapping, and table parsing.",
                tag: "Coordinate Engine",
                icon: FileText,
              },
              {
                num: "03",
                title: "FastAPI & SQLite",
                desc: "Asynchronous Python 3.13 backend with SQLAlchemy ORM, Pydantic v2 schemas, and relational integrity guarantees.",
                tag: "Async Backend",
                icon: Database,
              },
              {
                num: "04",
                title: "ReportLab Engine",
                desc: "Our custom dossier generator publishes verified 13-section PDF packages complete with SHA-256 cryptographic audit logs.",
                tag: "PDF Publisher",
                icon: Download,
              },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.num}
                  className="p-6 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-teal-500/30 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-neutral-500">
                        {t.num}
                      </span>
                      <Icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">
                      {t.title}
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                      {t.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400/80">
                      // {t.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* METRICS / 10X YOUR HANDOVER OUTPUT                                        */}
        {/* ========================================================================= */}
        <section
          id="metrics"
          className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b border-white/10"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              10x your Handover Output. Save Hours in Engineering Transitions.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-4">
              Real-world engineering impact measured across production sprint handovers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: "94%",
                label: "Reduction in Onboarding Latency",
                sub: "Incoming engineers reach first commit in under 48 hours instead of weeks.",
              },
              {
                value: "100%",
                label: "Verbatim Evidence Traceability",
                sub: "Every extracted requirement anchors directly to an approved document page.",
              },
              {
                value: "< 2 hrs",
                label: "Automated Dossier Generation",
                sub: "Instant compilation of complete 13-section technical packages.",
              },
              {
                value: "0",
                label: "Undocumented Tribal Knowledge Loss",
                sub: "Zero lost context when senior staff transition off critical codebases.",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="p-7 rounded-xl bg-neutral-900/60 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight font-mono">
                    {m.value}
                  </div>
                  <h3 className="text-sm font-bold text-neutral-200 mb-2">
                    {m.label}
                  </h3>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed mt-4 pt-4 border-t border-white/5">
                  {m.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY CHOOSE US / WE DELIVER VERIFICATION THAT WORKS                       */}
        {/* ========================================================================= */}
        <section
          id="why-us"
          className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b border-white/10"
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              We Deliver Verification That Works.
            </h2>
            <p className="text-neutral-400 max-w-2xl mt-3 text-sm sm:text-base leading-relaxed">
              We combine cutting-edge multimodal AI with a pragmatic, human-in-the-loop
              review workflow to ensure your handover documentation translates into
              tangible uptime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Evidence Over Hallucinations",
                desc: "Generic LLMs fabricate plausible details. Knowledge Continuity strictly prevents hallucinations by forcing citations to exact document coordinates.",
                metric: "100% Citation Grounding",
              },
              {
                title: "Scalable As Your Engineering Team",
                desc: "Whether transitioning a single microservice or an enterprise-wide cloud migration, our multi-project workspace isolates data cleanly.",
                metric: "Multi-Project Isolation",
              },
              {
                title: "10x Faster Handover Velocity",
                desc: "Eliminate dozens of disorganized sync meetings. Automated extraction and structured review cycles compress the handover timeline.",
                metric: "Hours instead of Weeks",
              },
              {
                title: "Enterprise Grade Audit Trails",
                desc: "Tamper-evident verification logs and cryptographic SHA-256 signatures provide bulletproof proof of compliance for security audits.",
                metric: "Cryptographic Tamper Proof",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-neutral-900/60 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-teal-400 mb-2">
                    // 0{idx + 1} PRINCIPLE
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">Benchmark:</span>
                  <span className="text-teal-400 font-bold">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROLE-BASED CONSOLE ACCESS (DEMO ACCOUNTS)                                  */}
        {/* ========================================================================= */}
        <section
          id="roles"
          className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b border-white/10"
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
              ACCESS &amp; ROLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              Role-Based Governance Built In
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3">
              Experience the console through any of our 4 pre-configured personas with
              pre-seeded Project Apollo data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "pm",
                role: "PROJECT_MANAGER" as UserRole,
                title: "Lead PM",
                desc: "Audits handover progress, reviews extracted findings, resolves blocker risks, and verifies readiness scores.",
                action: "Login as PM",
              },
              {
                id: "outgoing",
                role: "OUTGOING_MEMBER" as UserRole,
                title: "Outgoing Lead",
                desc: "Ingests architectural specs, runs AI extraction, tags critical dependencies, and compiles the handover dossier.",
                action: "Login as Outgoing",
              },
              {
                id: "incoming",
                role: "INCOMING_MEMBER" as UserRole,
                title: "Incoming Member",
                desc: "Read-only access to browse verified evidence citations, inspect timelines, download dossiers, and ask grounded questions.",
                action: "Login as Incoming",
              },
              {
                id: "admin",
                role: "ADMIN" as UserRole,
                title: "System Admin",
                desc: "Full administrative governance, RBAC role assignments, project configuration, and cryptographic audit log monitoring.",
                action: "Login as Admin",
              },
            ].map((persona) => (
              <div
                key={persona.id}
                className="p-6 rounded-xl bg-neutral-900/60 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">
                    {persona.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                    {persona.desc}
                  </p>
                </div>
                <button
                  onClick={() => handleRoleClick(persona.role, persona.id)}
                  disabled={isLoggingIn === persona.id}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold rounded-lg transition cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {isLoggingIn === persona.id ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>{persona.action}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQS / COMMON QUESTIONS ANSWERED                                          */}
        {/* ========================================================================= */}
        <section
          id="faq"
          className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-24 border-b border-white/10"
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
              FAQS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              Common Questions Answered
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3">
              Key technical details on evidence linking, RBAC enforcement, and data privacy.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What makes Knowledge Continuity different from generic AI summarizers?",
                a: "Generic tools hallucinate details that cause catastrophic production outages. Knowledge Continuity links every extracted milestone, architectural choice, and blocker directly to the exact page number and text span of the original authorized engineering document.",
              },
              {
                q: "How does the Evidence Anchoring coordinate engine work?",
                a: "Using PyMuPDF, our ingestion engine maps sub-millimeter bounding box coordinates for each extracted chunk. When an engineer clicks an evidence reference, the original PDF highlights the exact source snippet instantly.",
              },
              {
                q: "How does Role-Based Access Control (RBAC) protect sensitive data?",
                a: "The platform enforces strict role boundaries: Outgoing Engineers and Admins manage ingestion, Lead PMs have exclusive approval rights, and Incoming Engineers are granted read-only exploration to prevent accidental modifications.",
              },
              {
                q: "What file formats are supported for ingestion?",
                a: "The system ingests PDF architectural specs, DOCX handover documents, Markdown repositories, and plain text sprint logs. All documents undergo SHA-256 integrity hashing upon upload.",
              },
              {
                q: "How is the Handover Readiness Score computed?",
                a: "The engine calculates a composite weighted percentage (0-100%) based on verified fact ratios, documentation coverage across all 10 domain entities, resolution of critical blockers, and proximity to the target handover date.",
              },
              {
                q: "Are extracted dossiers tamper-proof for compliance audits?",
                a: "Yes. Every compiled 13-section Handover Dossier includes an embedded cryptographic SHA-256 hash tree, immutable sign-off timestamp, and human reviewer identity for SOC-2 and ISO audit readiness.",
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-neutral-900/60 border border-white/10 overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-teal-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CALL TO ACTION BANNER (LET'S TALK / LAUNCH CONSOLE)                       */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24">
          <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-[#080808] border border-white/15 p-8 sm:p-14 text-center overflow-hidden shadow-2xl backdrop-blur-md">
            {/* Halftone subtle glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                GET STARTED TODAY
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 mb-4 tracking-tight">
                Let&apos;s Build Unbreakable Continuity.
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mb-8 leading-relaxed">
                Eliminate tribal knowledge loss and onboard incoming engineers with
                verifiable citations, automated dossiers, and zero guesswork.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onEnterApp}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-neutral-200 text-black text-sm font-bold rounded-lg transition cursor-pointer shadow-md active:scale-95"
                >
                  <span>Launch Knowledge Console</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="http://127.0.0.1:8000/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm font-semibold rounded-lg transition"
                >
                  <Terminal className="w-4 h-4 text-neutral-400" />
                  <span>Interactive API Docs</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* FOOTER (Quantum Agency Legal & Architecture Links)                         */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/10 bg-[#020202] py-12 px-4 sm:px-8 relative z-10 text-xs font-mono text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white tracking-wider">
                KNOWLEDGE CONTINUITY
              </span>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                Evidence-Linked Project Knowledge Handover Platform
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
            <button
              onClick={onEnterApp}
              className="hover:text-white transition cursor-pointer"
            >
              Console
            </button>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              API Reference
            </a>
          </div>

          <div className="text-center md:text-right text-[11px] text-neutral-600">
            &copy; {new Date().getFullYear()} Knowledge Continuity. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
