"use client";

import React, { useState } from "react";
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
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme-context";
import { UserRole } from "@/lib/types";

interface LandingPageViewProps {
  onEnterApp: () => void;
  onSelectRole: (role: UserRole) => Promise<void>;
}

export function LandingPageView({ onEnterApp, onSelectRole }: LandingPageViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isLoggingIn, setIsLoggingIn] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
    <div
      className={`min-h-screen transition-colors duration-300 font-sans relative overflow-x-hidden ${
        isDark
          ? "bg-[#020202] text-white selection:bg-teal-500/30 selection:text-teal-200"
          : "bg-[#f8fafc] text-slate-900 selection:bg-teal-500/30 selection:text-teal-900"
      }`}
    >
      {/* 3D Knowledge Network & Interactive Polyhedron Background */}
      <ThreeCanvas />

      {/* Subtle Halftone Grid Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)"
            : "radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Floating Glassmorphism Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors duration-300 ${
          isDark
            ? "bg-[#020202]/85 border-b border-white/10"
            : "bg-white/90 border-b border-slate-200 shadow-xs"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-500 shadow-sm">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`text-sm font-black tracking-wider font-mono ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              KNOWLEDGE CONTINUITY
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-teal-500 tracking-widest uppercase">
              // VERIFIED HANDOVER
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav
          className={`hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider transition-colors ${
            isDark ? "text-neutral-400" : "text-slate-600"
          }`}
        >
          <a href="#services" className="hover:text-teal-500 transition">
            SERVICES
          </a>
          <a href="#case-studies" className="hover:text-teal-500 transition">
            CASE STUDIES
          </a>
          <a href="#tech-stack" className="hover:text-teal-500 transition">
            TECH STACK
          </a>
          <a href="#metrics" className="hover:text-teal-500 transition">
            METRICS
          </a>
          <a href="#roles" className="hover:text-teal-500 transition">
            DEMO ROLES
          </a>
          <a href="#faq" className="hover:text-teal-500 transition">
            FAQ
          </a>
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noreferrer"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition ${
              isDark
                ? "text-neutral-400 hover:text-white border-white/10 hover:border-white/20"
                : "text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>API Docs</span>
          </a>
          <button
            onClick={onEnterApp}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer shadow-sm active:scale-95 ${
              isDark
                ? "bg-white hover:bg-neutral-200 text-black"
                : "bg-slate-900 hover:bg-slate-800 text-white"
            }`}
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
          <div
            className={`inline-flex items-center gap-2.5 px-3.5 py-1 rounded-md text-xs font-mono mb-8 backdrop-blur-sm border ${
              isDark
                ? "bg-white/[0.04] border-white/10 text-neutral-300"
                : "bg-white/80 border-slate-200 text-slate-700 shadow-2xs"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span>We help automate your engineering handover processes</span>
          </div>

          {/* Giant Title */}
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase font-sans mb-6 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            KNOWLEDGE <br className="hidden sm:inline" />
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-b ${
                isDark
                  ? "from-white via-neutral-200 to-neutral-500"
                  : "from-slate-950 via-slate-800 to-slate-500"
              }`}
            >
              CONTINUITY
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10 ${
              isDark ? "text-neutral-400" : "text-slate-600"
            }`}
          >
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
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold rounded-lg transition cursor-pointer shadow-md active:scale-95 ${
                isDark
                  ? "bg-white hover:bg-neutral-200 text-black"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
            >
              <span>Launch Knowledge Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#case-studies"
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg border transition cursor-pointer backdrop-blur-sm ${
                isDark
                  ? "bg-neutral-900/90 hover:bg-neutral-800 text-white border-white/15"
                  : "bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs"
              }`}
            >
              <span>Explore Case Studies</span>
              <ArrowDown className="w-4 h-4 text-neutral-400" />
            </a>
          </div>

          {/* 3D Spatial Indicator */}
          <div
            className={`mt-16 pt-8 border-t flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono ${
              isDark ? "border-white/10 text-neutral-500" : "border-slate-200 text-slate-500"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>3D KNOWLEDGE NEXUS ACTIVE</span>
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
        <section
          className={`border-y py-8 px-4 sm:px-6 transition-colors ${
            isDark
              ? "border-white/10 bg-[#050505]/80"
              : "border-slate-200 bg-slate-100/90"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <p
              className={`text-center text-xs font-mono uppercase tracking-widest mb-6 ${
                isDark ? "text-neutral-500" : "text-slate-500"
              }`}
            >
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
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center transition ${
                    isDark
                      ? "bg-neutral-900/50 border-white/5"
                      : "bg-white border-slate-200 shadow-2xs"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${
                      isDark ? "text-neutral-200" : "text-slate-800"
                    }`}
                  >
                    {tech.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      isDark ? "text-neutral-500" : "text-slate-500"
                    }`}
                  >
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
          className={`px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-500 font-bold">
              OUR SERVICES
            </span>
            <h2
              className={`text-3xl sm:text-5xl font-black mt-2 tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              What we offer
            </h2>
            <p
              className={`max-w-2xl mt-3 text-sm sm:text-base leading-relaxed ${
                isDark ? "text-neutral-400" : "text-slate-600"
              }`}
            >
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
                  className={`group relative p-7 sm:p-8 rounded-xl border transition duration-300 backdrop-blur-sm ${
                    isDark
                      ? "bg-neutral-900/60 border-white/10 hover:border-teal-500/40"
                      : "bg-white border-slate-200 hover:border-teal-500/50 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-xs font-mono font-bold transition ${
                        isDark ? "text-neutral-500 group-hover:text-teal-400" : "text-slate-400 group-hover:text-teal-600"
                      }`}
                    >
                      {service.num}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-teal-500 transition ${
                        isDark ? "bg-white/[0.04] border border-white/10" : "bg-teal-50 border border-teal-200"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2.5 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isDark ? "text-neutral-400" : "text-slate-600"
                    }`}
                  >
                    {service.desc}
                  </p>
                  <div
                    className={`pt-4 border-t flex items-center gap-2 text-xs font-mono text-teal-500 ${
                      isDark ? "border-white/5" : "border-slate-100"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
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
          className={`px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-500 font-bold">
              USE CASES
            </span>
            <h2
              className={`text-3xl sm:text-5xl font-black mt-2 tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Case studies
            </h2>
            <p
              className={`max-w-2xl mt-3 text-sm sm:text-base leading-relaxed ${
                isDark ? "text-neutral-400" : "text-slate-600"
              }`}
            >
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
              },
              {
                num: "02",
                badge: "STREAMING DATA",
                title: "Event Broker Pipeline",
                category: "Kafka & Flink Cluster",
                stats: "38 Verified Decisions • 82% Readiness",
                summary:
                  "Real-time event streaming pipeline handover with verified schema evolution and zero message loss.",
              },
              {
                num: "03",
                badge: "COMPLIANCE & AUDIT",
                title: "FinTech Ledger",
                category: "SOC-2 / ISO Audit",
                stats: "46 Audit Spans • 91% Readiness",
                summary:
                  "Strict evidence anchoring with cryptographic tamper-evident review logs for financial examiners.",
              },
              {
                num: "04",
                badge: "CLOUD INFRASTRUCTURE",
                title: "Kubernetes Migration",
                category: "DevOps & IAM Runbooks",
                stats: "29 Cloud Runbooks • 75% Readiness",
                summary:
                  "Automated IAM credential rotation, ingress topologies, and cluster failover procedures.",
              },
            ].map((cs) => (
              <div
                key={cs.num}
                className={`p-6 rounded-xl border transition flex flex-col justify-between ${
                  isDark
                    ? "bg-neutral-900/60 border-white/10 hover:border-white/20"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="text-teal-500 font-bold">{cs.num}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border ${
                        isDark
                          ? "text-neutral-400 bg-white/[0.04] border-white/10"
                          : "text-slate-600 bg-slate-100 border-slate-200"
                      }`}
                    >
                      {cs.badge}
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {cs.title}
                  </h3>
                  <div
                    className={`text-xs font-mono mb-3 ${
                      isDark ? "text-neutral-400" : "text-slate-500"
                    }`}
                  >
                    {cs.category}
                  </div>
                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      isDark ? "text-neutral-400" : "text-slate-600"
                    }`}
                  >
                    {cs.summary}
                  </p>
                </div>
                <div
                  className={`pt-4 border-t ${
                    isDark ? "border-white/5" : "border-slate-100"
                  }`}
                >
                  <div className="text-[11px] font-mono text-teal-500 font-semibold mb-3">
                    {cs.stats}
                  </div>
                  <button
                    onClick={onEnterApp}
                    className={`w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition cursor-pointer border ${
                      isDark
                        ? "text-white bg-white/5 hover:bg-white/10 border-white/10"
                        : "text-slate-800 bg-slate-100 hover:bg-slate-200 border-slate-200"
                    }`}
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
          className={`px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-500 font-bold">
              TECH STACK
            </span>
            <h2
              className={`text-3xl sm:text-5xl font-black mt-2 tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Technology we use
            </h2>
            <p
              className={`max-w-2xl mt-3 text-sm sm:text-base leading-relaxed ${
                isDark ? "text-neutral-400" : "text-slate-600"
              }`}
            >
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
                  className={`p-6 rounded-xl border transition flex flex-col justify-between ${
                    isDark
                      ? "bg-neutral-900/60 border-white/10 hover:border-teal-500/30"
                      : "bg-white border-slate-200 hover:border-teal-500/40 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isDark ? "text-neutral-500" : "text-slate-400"
                        }`}
                      >
                        {t.num}
                      </span>
                      <Icon className="w-5 h-5 text-teal-500" />
                    </div>
                    <h3
                      className={`text-base font-bold mb-2 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {t.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed mb-4 ${
                        isDark ? "text-neutral-400" : "text-slate-600"
                      }`}
                    >
                      {t.desc}
                    </p>
                  </div>
                  <div
                    className={`pt-3 border-t ${
                      isDark ? "border-white/5" : "border-slate-100"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-500 font-semibold">
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
          className={`px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className={`text-3xl sm:text-5xl font-black tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              10x your Handover Output. Save Hours in Engineering Transitions.
            </h2>
            <p
              className={`text-sm sm:text-base mt-4 ${
                isDark ? "text-neutral-400" : "text-slate-600"
              }`}
            >
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
                className={`p-7 rounded-xl border flex flex-col justify-between ${
                  isDark
                    ? "bg-neutral-900/60 border-white/10"
                    : "bg-white border-slate-200 shadow-xs"
                }`}
              >
                <div>
                  <div
                    className={`text-4xl sm:text-5xl font-black mb-3 tracking-tight font-mono ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {m.value}
                  </div>
                  <h3
                    className={`text-sm font-bold mb-2 ${
                      isDark ? "text-neutral-200" : "text-slate-800"
                    }`}
                  >
                    {m.label}
                  </h3>
                </div>
                <p
                  className={`text-xs leading-relaxed mt-4 pt-4 border-t ${
                    isDark ? "text-neutral-400 border-white/5" : "text-slate-600 border-slate-100"
                  }`}
                >
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
          className={`px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-500 font-bold">
              WHY CHOOSE US
            </span>
            <h2
              className={`text-3xl sm:text-5xl font-black mt-2 tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              We Deliver Verification That Works.
            </h2>
            <p
              className={`max-w-2xl mt-3 text-sm sm:text-base leading-relaxed ${
                isDark ? "text-neutral-400" : "text-slate-600"
              }`}
            >
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
                className={`p-8 rounded-xl border flex flex-col justify-between ${
                  isDark
                    ? "bg-neutral-900/60 border-white/10"
                    : "bg-white border-slate-200 shadow-xs"
                }`}
              >
                <div>
                  <div className="text-xs font-mono text-teal-500 mb-2 font-bold">
                    // 0{idx + 1} PRINCIPLE
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2.5 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isDark ? "text-neutral-400" : "text-slate-600"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
                <div
                  className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
                    isDark ? "border-white/5" : "border-slate-100"
                  }`}
                >
                  <span className={isDark ? "text-neutral-500" : "text-slate-500"}>
                    Benchmark:
                  </span>
                  <span className="text-teal-500 font-bold">{item.metric}</span>
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
          className={`px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-500 font-bold">
              ACCESS &amp; ROLES
            </span>
            <h2
              className={`text-3xl sm:text-5xl font-black mt-2 tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Role-Based Governance Built In
            </h2>
            <p
              className={`text-sm sm:text-base mt-3 ${
                isDark ? "text-neutral-400" : "text-slate-600"
              }`}
            >
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
                className={`p-6 rounded-xl border flex flex-col justify-between ${
                  isDark
                    ? "bg-neutral-900/60 border-white/10"
                    : "bg-white border-slate-200 shadow-xs"
                }`}
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-4">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3
                    className={`text-base font-bold mb-1.5 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {persona.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-6 ${
                      isDark ? "text-neutral-400" : "text-slate-600"
                    }`}
                  >
                    {persona.desc}
                  </p>
                </div>
                <button
                  onClick={() => handleRoleClick(persona.role, persona.id)}
                  disabled={isLoggingIn === persona.id}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition cursor-pointer active:scale-95 disabled:opacity-50 border ${
                    isDark
                      ? "bg-white/10 hover:bg-white/20 border-white/15 text-white"
                      : "bg-teal-600 hover:bg-teal-700 text-white border-teal-700 shadow-xs"
                  }`}
                >
                  {isLoggingIn === persona.id ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>{persona.action}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
          className={`px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-24 border-b ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-500 font-bold">
              FAQS
            </span>
            <h2
              className={`text-3xl sm:text-5xl font-black mt-2 tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Common Questions Answered
            </h2>
            <p
              className={`text-sm sm:text-base mt-3 ${
                isDark ? "text-neutral-400" : "text-slate-600"
              }`}
            >
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
                  className={`rounded-xl border overflow-hidden transition ${
                    isDark
                      ? "bg-neutral-900/60 border-white/10"
                      : "bg-white border-slate-200 shadow-2xs"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className={`w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer transition ${
                      isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`text-sm sm:text-base font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-teal-500 shrink-0" />
                    ) : (
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 ${
                          isDark ? "text-neutral-400" : "text-slate-400"
                        }`}
                      />
                    )}
                  </button>
                  {isOpen && (
                    <div
                      className={`px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                        isDark
                          ? "text-neutral-400 border-white/5"
                          : "text-slate-600 border-slate-100"
                      }`}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CALL TO ACTION BANNER                                                     */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-24">
          <div
            className={`relative rounded-2xl border p-8 sm:p-14 text-center overflow-hidden shadow-2xl backdrop-blur-md ${
              isDark
                ? "bg-gradient-to-b from-neutral-900/90 to-[#080808] border-white/15 text-white"
                : "bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 text-white"
            }`}
          >
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                GET STARTED TODAY
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 mb-4 tracking-tight">
                Let&apos;s Build Unbreakable Continuity.
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base mb-8 leading-relaxed">
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
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold rounded-lg transition"
                >
                  <Terminal className="w-4 h-4 text-neutral-300" />
                  <span>Interactive API Docs</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer
        className={`border-t py-12 px-4 sm:px-8 relative z-10 text-xs font-mono transition-colors ${
          isDark
            ? "border-white/10 bg-[#020202] text-neutral-500"
            : "border-slate-200 bg-white text-slate-500 shadow-2xs"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <span
                className={`font-bold tracking-wider ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                KNOWLEDGE CONTINUITY
              </span>
              <p
                className={`text-[10px] mt-0.5 ${
                  isDark ? "text-neutral-500" : "text-slate-400"
                }`}
              >
                Evidence-Linked Project Knowledge Handover Platform
              </p>
            </div>
          </div>

          <div
            className={`flex flex-wrap items-center justify-center gap-6 ${
              isDark ? "text-neutral-400" : "text-slate-600"
            }`}
          >
            <button
              onClick={onEnterApp}
              className={`transition cursor-pointer ${
                isDark ? "hover:text-white" : "hover:text-slate-900"
              }`}
            >
              Console
            </button>
            <Link
              href="/privacy"
              className={`transition ${
                isDark ? "hover:text-white" : "hover:text-slate-900"
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`transition ${
                isDark ? "hover:text-white" : "hover:text-slate-900"
              }`}
            >
              Terms of Service
            </Link>
            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noreferrer"
              className={`transition ${
                isDark ? "hover:text-white" : "hover:text-slate-900"
              }`}
            >
              API Reference
            </a>
          </div>

          <div
            className={`text-center md:text-right text-[11px] ${
              isDark ? "text-neutral-600" : "text-slate-400"
            }`}
          >
            &copy; {new Date().getFullYear()} Knowledge Continuity. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
