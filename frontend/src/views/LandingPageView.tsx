"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Scale,
  Shield,
} from "lucide-react";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { UserRole } from "@/lib/types";

interface LandingPageViewProps {
  onEnterApp: () => void;
  onSelectRole: (role: UserRole) => Promise<void>;
}

export function LandingPageView({ onEnterApp, onSelectRole }: LandingPageViewProps) {
  const [activeStage, setActiveStage] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    hero: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const sectionIds = [
    { id: "hero", label: "Overview" },
    { id: "pipeline", label: "5-Stage Pipeline" },
    { id: "entities", label: "10 Entity Engine" },
    { id: "evidence", label: "Evidence Engine" },
    { id: "demo-roles", label: "Demo Accounts" },
    { id: "dossier", label: "13-Section Package" },
  ];

  // IntersectionObserver to slowly fade in sections as they appear
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll("section[data-section-id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section-id");
          if (id && entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      {
        root: container,
        threshold: 0.15,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const height = container.clientHeight;
      const index = Math.round(scrollPos / height);
      if (index >= 0 && index < sectionIds.length && index !== activeSection) {
        setActiveSection(index);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeSection, sectionIds.length]);

  // Keyboard navigation for section switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToSection(Math.min(sectionIds.length - 1, activeSection + 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSection(Math.max(0, activeSection - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, sectionIds.length]);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.children[index] as HTMLElement;
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(index);
    }
  };

  const stages = [
    {
      num: "01",
      title: "CONNECT & INGEST",
      subtitle: "Multi-Format Source Ingestion",
      desc: "Ingests authorized architecture specifications (PDF), handover notes (DOCX), and sprint retrospectives (TXT). Automatically validates MIME signatures, verifies file size constraints, performs SHA-256 deduplication, and indexes text into character-precise page chunks.",
      icon: UploadCloud,
      detail: "Preserves page provenance, chunk index, and character offsets for reverse-traceability.",
    },
    {
      num: "02",
      title: "EXTRACT & RECONSTRUCT",
      subtitle: "Deterministic & LLM Extraction",
      desc: "Extracts 10 structured entity types: Decisions, Tasks, Deadlines, Risks, Blockers, Dependencies, Questions, and Responsibilities. Reconstructs chronological decision timelines, task schedules, and inter-service coupling graphs.",
      icon: BrainCircuit,
      detail: "Zero-Hallucination policy: unstated owners or deadlines are strictly tagged as null.",
    },
    {
      num: "03",
      title: "EVIDENCE VERIFICATION",
      subtitle: "SequenceMatcher Citation Grounding",
      desc: "Every finding is audited against source chunk text using string alignment and SequenceMatcher token overlap. Automatically detects cross-document contradictions and flags ambiguous ownership.",
      icon: ShieldCheck,
      detail: "Flags contradictory deadlines, ungrounded claims, and ambiguous ownership for human review.",
    },
    {
      num: "04",
      title: "HUMAN REVIEW WORKSPACE",
      subtitle: "Managerial Audit & Correction",
      desc: "Project Managers inspect the review queue to correct titles, reassign owners, adjust deadlines, and sign off. Every edit, approval, or investigation flag is preserved in immutable audit logs.",
      icon: CheckSquare,
      detail: "Incoming members cannot view unapproved drafts: backend returns 403 Forbidden.",
    },
    {
      num: "05",
      title: "HANDOVER SYNTHESIS & EXPORT",
      subtitle: "13-Section Dossier & ReportLab PDF",
      desc: "Compiles verified findings into an official 13-section onboarding package tailored to the recipient's domain. Complete with executive status, ADR register, risk matrix, Day-1 / Week-1 action plans, and ReportLab PDF export.",
      icon: FileCheck2,
      detail: "Single-click downloadable enterprise PDF report with audit verification stamps.",
    },
  ];

  const entities = [
    { id: "DECISION", label: "Decisions", desc: "Architectural choices, rationale, and tech stack selections.", icon: GitFork, spec: "ADR Schema" },
    { id: "TASK", label: "Tasks", desc: "Concrete engineering items with state and ownership.", icon: CheckSquare, spec: "Sprint Tracked" },
    { id: "DEADLINE", label: "Deadlines", desc: "Milestone targets, delivery dates, and SLA cutoffs.", icon: Milestone, spec: "ISO-8601 Validated" },
    { id: "RISK", label: "Risks", desc: "Technical debt, single points of failure, scaling bottlenecks.", icon: ShieldAlert, spec: "Severity Matrix" },
    { id: "BLOCKER", label: "Blockers", desc: "Active impediments requiring immediate escalation.", icon: AlertTriangle, spec: "Escalation Flag" },
    { id: "DEPENDENCY", label: "Dependencies", desc: "Third-party APIs, vendor couplings, and upstream services.", icon: Layers, spec: "Coupling Graph" },
    { id: "QUESTION", label: "Questions", desc: "Open RFCs, ambiguous requirements, and architectural inquiries.", icon: BrainCircuit, spec: "RFC Queue" },
    { id: "RESPONSIBILITY", label: "Roles", desc: "Domain owners, maintainers, and escalation points.", icon: Users, spec: "Ownership Table" },
  ];

  async function handleDemoRoleClick(role: UserRole) {
    setIsLoggingIn(role);
    try {
      await onSelectRole(role);
      onEnterApp();
    } finally {
      setIsLoggingIn(null);
    }
  }

  return (
    <div className="relative h-screen w-full bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-white overflow-hidden font-sans">
      {/* 3D Interactive Connected Knowledge Network */}
      <ThreeCanvas />

      {/* Subtle Ambient Depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-2xl blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-slate-800/20 rounded-2xl blur-[160px]" />
      </div>

      {/* Fixed Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection(0)}>
            <div className="w-8 h-8 rounded-md bg-teal-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              KC
            </div>
            <div>
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white block">
                KNOWLEDGE CONTINUITY
              </span>
              <span className="text-[10px] text-teal-400 font-semibold tracking-wide block">
                Enterprise Handover Platform
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            {sectionIds.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(idx)}
                className={`transition cursor-pointer ${
                  activeSection === idx
                    ? "text-teal-400 font-bold border-b-2 border-teal-400 pb-0.5"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {sec.label}
              </button>
            ))}
            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400 transition flex items-center gap-1 text-slate-400"
            >
              API Docs <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onEnterApp}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-md shadow-sm transition cursor-pointer"
            >
              Launch Console
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Section Indicators (Right Rectangles) */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-2.5">
        {sectionIds.map((sec, idx) => {
          const isActive = activeSection === idx;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(idx)}
              className="group relative flex items-center justify-end p-1 transition cursor-pointer"
              aria-label={`Jump to ${sec.label}`}
            >
              <span className="absolute right-6 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {sec.label}
              </span>
              <div
                className={`transition-all rounded-xs ${
                  isActive
                    ? "w-2.5 h-7 bg-teal-400 shadow-sm"
                    : "w-2 h-2 bg-slate-700 hover:bg-slate-400"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Responsive Section-by-Section Container */}
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth relative z-10"
      >
        {/* ======================================================== */}
        {/* Slide 1: Hero Section */}
        {/* ======================================================== */}
        <section
          id="hero"
          data-section-id="hero"
          className="min-h-screen w-full snap-start flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8 relative"
        >
          <div
            className={`max-w-4xl w-full mx-auto text-center space-y-6 transition-all duration-1000 ease-out transform ${
              visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-xs bg-teal-400" />
              <span>Evidence-Linked Knowledge Transfer & Handover Synthesis</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Automated Knowledge Handover Platform for Engineering Teams
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              When key engineers transition off projects, architectural rationale and operational risks are often lost.
              <strong> Knowledge Continuity</strong> parses authorized engineering documentation, grounds every finding to exact source quotations, identifies contradictory dates, and compiles an audited 13-section handover dossier.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onEnterApp}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold rounded-md shadow-md transition cursor-pointer"
              >
                Enter Handover Console
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection(4)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-md border border-slate-700 transition cursor-pointer"
              >
                <Users className="w-4 h-4 text-teal-400" />
                Select Demo Role
              </button>

              <a
                href="http://127.0.0.1:8000/docs"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium rounded-md border border-slate-800 transition"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                FastAPI Docs
              </a>
            </div>

            {/* Real Concrete Specifications (No fake counters or fake metrics) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
              <div className="p-3.5 bg-slate-900/70 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-teal-400 block uppercase">10 Entity Schemas</span>
                <p className="text-[11px] text-slate-400 mt-1">Structured AST & Pydantic model validation</p>
              </div>
              <div className="p-3.5 bg-slate-900/70 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-teal-400 block uppercase">Source Provenance</span>
                <p className="text-[11px] text-slate-400 mt-1">Exact character offset & page-level chunking</p>
              </div>
              <div className="p-3.5 bg-slate-900/70 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-teal-400 block uppercase">13 Dossier Sections</span>
                <p className="text-[11px] text-slate-400 mt-1">Structured Markdown and ReportLab PDF output</p>
              </div>
              <div className="p-3.5 bg-slate-900/70 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-teal-400 block uppercase">Verification Gate</span>
                <p className="text-[11px] text-slate-400 mt-1">Manager sign-off required prior to release</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection(1)}
            className="mt-8 flex flex-col items-center gap-1 text-slate-400 hover:text-teal-400 transition cursor-pointer text-xs"
          >
            <span>Architecture & Pipeline</span>
            <ArrowDown className="w-4 h-4 text-teal-400" />
          </button>
        </section>

        {/* ======================================================== */}
        {/* Slide 2: 5-Stage Architecture Pipeline */}
        {/* ======================================================== */}
        <section
          id="pipeline"
          data-section-id="pipeline"
          className="min-h-screen w-full snap-start flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8"
        >
          <div
            className={`max-w-5xl w-full mx-auto space-y-6 transition-all duration-1000 ease-out transform ${
              visibleSections["pipeline"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                System Workflow
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                The 5-Stage Ingestion & Verification Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                From raw document parsing to verified, role-gated PDF export.
              </p>
            </div>

            {/* Interactive Pipeline Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {stages.map((st, idx) => {
                const Icon = st.icon;
                const isSelected = activeStage === idx;
                return (
                  <button
                    key={st.num}
                    onClick={() => setActiveStage(idx)}
                    className={`p-3 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? "bg-slate-900 border-teal-500 ring-1 ring-teal-500/30 shadow-md"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${isSelected ? "text-teal-400" : "text-slate-500"}`}>
                        {st.num}
                      </span>
                      <Icon className={`w-4 h-4 ${isSelected ? "text-teal-400" : "text-slate-500"}`} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white tracking-wide truncate">{st.title}</h4>
                      <span className="text-[10px] text-slate-400 truncate block">{st.subtitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Highlight Card */}
            <div className="p-5 sm:p-6 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono font-bold">
                    Stage {stages[activeStage].num}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {stages[activeStage].title}: {stages[activeStage].subtitle}
                  </h3>
                </div>
                <span className="text-[11px] text-teal-400 font-mono">{stages[activeStage].detail}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {stages[activeStage].desc}
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* Slide 3: 10 Knowledge Entity Types */}
        {/* ======================================================== */}
        <section
          id="entities"
          data-section-id="entities"
          className="min-h-screen w-full snap-start flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8"
        >
          <div
            className={`max-w-5xl w-full mx-auto space-y-6 transition-all duration-1000 ease-out transform ${
              visibleSections["entities"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Data Modeling
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                10 Structured Knowledge Entity Types
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                Categorizing high-impact engineering facts with strict typing and schema validation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {entities.map((ent) => {
                const Icon = ent.icon;
                return (
                  <div
                    key={ent.id}
                    className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 hover:border-slate-700 transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-md bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono text-teal-400 font-semibold">{ent.spec}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{ent.label}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-2">{ent.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* Slide 4: Evidence & Zero-Hallucination Showcase */}
        {/* ======================================================== */}
        <section
          id="evidence"
          data-section-id="evidence"
          className="min-h-screen w-full snap-start flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8"
        >
          <div
            className={`max-w-5xl w-full mx-auto space-y-6 transition-all duration-1000 ease-out transform ${
              visibleSections["evidence"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Integrity & Auditability
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                Evidence Before Confidence
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                No assertion enters the handover report without an audited source citation and chunk offset.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Traditional Unverified AI output */}
              <div className="p-5 bg-rose-950/20 rounded-xl border border-rose-500/30 space-y-3.5">
                <div className="flex items-center justify-between border-b border-rose-500/30 pb-2.5">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Unverified LLM Generation
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                    High Risk
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/60 p-3 rounded border border-slate-800">
                  &ldquo;The payment system was refactored by Marcus Chen and completed in Q2. Everything should run fine.&rdquo;
                </p>
                <div className="text-[11px] text-rose-300 space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>No document provenance or page reference</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Invented owner name without source quotation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Misses conflicting release cutoffs across sprint logs</span>
                  </div>
                </div>
              </div>

              {/* Right: Knowledge Continuity Verified finding */}
              <div className="p-5 bg-teal-950/20 rounded-xl border border-teal-500/40 space-y-3.5">
                <div className="flex items-center justify-between border-b border-teal-500/30 pb-2.5">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Knowledge Continuity Engine
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">
                    Audited
                  </span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded border border-slate-800 text-xs font-mono text-teal-300 leading-relaxed">
                  &ldquo;We migrated the analytical ingestion engine to Kafka on May 20. Target cut-off is Sprint 25.&rdquo;
                </div>
                <div className="text-[11px] text-teal-300 space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Anchored to: <strong className="text-white">Apollo_Architecture_Decisions.pdf, Page 1</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Match Score: <strong className="text-white">0.96 (SequenceMatcher Overlap)</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Cross-Doc Conflict: <span className="text-amber-300">Sprint 24 note cites May 30 (Flagged for Review)</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* Slide 5: Role-Based Access Accounts */}
        {/* ======================================================== */}
        <section
          id="demo-roles"
          data-section-id="demo-roles"
          className="min-h-screen w-full snap-start flex flex-col justify-center items-center py-20 px-4 sm:px-6 md:px-8"
        >
          <div
            className={`max-w-5xl w-full mx-auto space-y-6 transition-all duration-1000 ease-out transform ${
              visibleSections["demo-roles"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Access Control
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                Role-Based Access Governance
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                Authenticate as any of the four roles to inspect backend authorization enforcement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* PM */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-teal-500/40 hover:border-teal-400 transition flex flex-col justify-between space-y-3 shadow-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">
                      PROJECT_MANAGER
                    </span>
                    <CheckSquare className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Elena Rostova</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Full project governance, human review queue, approve or edit findings, and publish handovers.
                  </p>
                </div>
                <button
                  onClick={() => handleDemoRoleClick("PROJECT_MANAGER")}
                  disabled={Boolean(isLoggingIn)}
                  className="w-full py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-bold rounded-md transition cursor-pointer"
                >
                  {isLoggingIn === "PROJECT_MANAGER" ? "Authenticating..." : "Launch as Lead PM"}
                </button>
              </div>

              {/* Incoming Engineer */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-cyan-500/40 hover:border-cyan-400 transition flex flex-col justify-between space-y-3 shadow-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      INCOMING_MEMBER
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Marcus Chen</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Authorized to view only manager-approved handovers. Unapproved drafts return 403 Forbidden.
                  </p>
                </div>
                <button
                  onClick={() => handleDemoRoleClick("INCOMING_MEMBER")}
                  disabled={Boolean(isLoggingIn)}
                  className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold rounded-md transition cursor-pointer"
                >
                  {isLoggingIn === "INCOMING_MEMBER" ? "Authenticating..." : "Launch as Incoming Eng"}
                </button>
              </div>

              {/* Outgoing Lead */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700 hover:border-slate-600 transition flex flex-col justify-between space-y-3 shadow-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      OUTGOING_MEMBER
                    </span>
                    <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Sarah Jenkins</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Authorized to ingest files, upload sprint notes, inspect source text chunks, and verify evidence.
                  </p>
                </div>
                <button
                  onClick={() => handleDemoRoleClick("OUTGOING_MEMBER")}
                  disabled={Boolean(isLoggingIn)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-bold rounded-md transition cursor-pointer"
                >
                  {isLoggingIn === "OUTGOING_MEMBER" ? "Authenticating..." : "Launch as Outgoing Lead"}
                </button>
              </div>

              {/* Admin */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700 hover:border-slate-600 transition flex flex-col justify-between space-y-3 shadow-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      ADMIN
                    </span>
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Alexander Vance</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Full system administration across all projects, member permissions, immutable audit logs, and settings.
                  </p>
                </div>
                <button
                  onClick={() => handleDemoRoleClick("ADMIN")}
                  disabled={Boolean(isLoggingIn)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-bold rounded-md transition cursor-pointer"
                >
                  {isLoggingIn === "ADMIN" ? "Authenticating..." : "Launch as System Admin"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* Slide 6: 13-Section Dossier Architecture & Footer */}
        {/* ======================================================== */}
        <section
          id="dossier"
          data-section-id="dossier"
          className="min-h-screen w-full snap-start flex flex-col justify-between items-center py-20 px-4 sm:px-6 md:px-8"
        >
          <div
            className={`max-w-5xl w-full mx-auto space-y-6 my-auto transition-all duration-1000 ease-out transform ${
              visibleSections["dossier"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Official Report Architecture
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                The 13-Section Handover Dossier
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                Synthesized for engineering legibility and downloadable as a ReportLab PDF report.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
              {[
                "1. Project Overview & Scope",
                "2. Current Status & Health",
                "3. Completed Work & Sprints",
                "4. Pending Tasks & Deadlines",
                "5. Task Ownership Matrix",
                "6. Decisions Record (ADR)",
                "7. Dependencies & Couplings",
                "8. Blockers & Escalations",
                "9. Technical Debt & Risks",
                "10. Unresolved RFC Questions",
                "11. Next Actions (Day 1 / Week 1)",
                "12. Evidence Citation Table",
                "13. Managerial Sign-Off Stamp",
              ].map((title, i) => (
                <div key={i} className="p-2.5 bg-slate-900/60 rounded-md border border-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-teal-500/20 text-teal-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-medium text-slate-200 text-[11px] truncate">{title.split(". ")[1]}</span>
                </div>
              ))}
            </div>

            {/* Launch Console Button */}
            <div className="pt-3 text-center">
              <button
                onClick={onEnterApp}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold rounded-md shadow-md transition cursor-pointer"
              >
                Launch Console Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clean Enterprise Footer (No Team Names, Includes Privacy & Terms) */}
          <footer className="w-full max-w-5xl border-t border-slate-800 pt-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Knowledge Continuity</span>
              <span>© 2026. All rights reserved.</span>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs">
              <Link href="/privacy" className="hover:text-teal-400 transition flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-teal-400 transition flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" /> Terms and Conditions
              </Link>
              <a
                href="http://127.0.0.1:8000/docs"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-teal-400 transition flex items-center gap-1"
              >
                API Docs <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
