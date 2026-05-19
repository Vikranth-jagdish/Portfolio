"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  Check,
  Github,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Boxes,
} from "lucide-react";

const ACCENT = "rgb(255, 223, 0)";
const PKG = "@vikranth2005/vtop-mcp";
const REPO = "https://github.com/Vikranth-jagdish/VtopMCP";
const NPM_URL = "https://www.npmjs.com/package/@vikranth2005/vtop-mcp";

/** Inner MCP server config shared by every client. */
const SERVER_CONFIG = {
  command: "npx",
  args: ["-y", PKG],
  env: { NODE_OPTIONS: "--use-system-ca" },
};

const TOOLS: { name: string; desc: string }[] = [
  { name: "get_captcha", desc: "Fetch the login captcha image (the model OCRs it)" },
  { name: "login", desc: "Authenticate. Uses env creds or asks you in chat" },
  { name: "logout", desc: "End the VTOP session" },
  { name: "get_semesters", desc: "List every available semester" },
  { name: "get_profile", desc: "Name, reg no, branch, school, contact" },
  { name: "get_attendance", desc: "Per-course attended / total / %" },
  { name: "get_timetable", desc: "Slots, venues, faculty, credits" },
  { name: "get_marks", desc: "Component-wise internal assessment marks" },
  { name: "get_exam_schedule", desc: "CAT-1 / CAT-2 / FAT dates + seats" },
  { name: "get_semester_grades", desc: "Course grades + GPA for a term" },
  { name: "get_grade_history", desc: "CGPA, credits, per-semester GPA" },
  { name: "get_curriculum_progress", desc: "Credits left, baskets, grade spread" },
];

function CopyButton({
  text,
  label,
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className={`inline-flex items-center gap-2 transition-colors ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check size={15} style={{ color: ACCENT }} />
      ) : (
        <Copy size={15} className="opacity-60 group-hover:opacity-100" />
      )}
      {label && <span>{copied ? "Copied" : label}</span>}
    </button>
  );
}

function InstallCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-white/20">
      <div className="mb-3">
        <h3 className="text-sm font-bold tracking-wide text-white">{title}</h3>
        <p className="text-xs text-white/40">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export default function VtopMcpPage() {
  const { cursorDeeplink, vscodeDeeplink, claudeCodeCmd, claudeDesktopJson } =
    useMemo(() => {
      const b64 =
        typeof window !== "undefined"
          ? window.btoa(JSON.stringify(SERVER_CONFIG))
          : Buffer.from(JSON.stringify(SERVER_CONFIG)).toString("base64");

      const cursor = `cursor://anysphere.cursor-deeplink/mcp/install?name=vtop&config=${encodeURIComponent(
        b64
      )}`;

      const vscodeCfg = JSON.stringify({ name: "vtop", ...SERVER_CONFIG });
      const vscode = `vscode:mcp/install?${encodeURIComponent(vscodeCfg)}`;

      const claudeCode = `claude mcp add vtop -- npx -y ${PKG}`;

      const desktop = JSON.stringify(
        { mcpServers: { vtop: SERVER_CONFIG } },
        null,
        2
      );

      return {
        cursorDeeplink: cursor,
        vscodeDeeplink: vscode,
        claudeCodeCmd: claudeCode,
        claudeDesktopJson: desktop,
      };
    }, []);

  return (
    <div className="relative min-h-screen w-full text-white">
      <div className="mx-auto w-full max-w-4xl px-5 py-10 md:py-16">
        {/* Back */}
        <Link
          href="/labs"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} /> Back to Labs
        </Link>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-10"
        >
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span
              className="rounded-full px-2 py-1"
              style={{ background: "rgba(255,223,0,0.12)", color: ACCENT }}
            >
              Labs · NPM Package
            </span>
            <span className="rounded-full border border-white/10 px-2 py-1">
              MCP Server
            </span>
          </div>

          <h1
            className="text-4xl font-bold leading-none tracking-tight md:text-6xl"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            vtop<span style={{ color: ACCENT }}>-mcp</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            A programmatic <span className="text-white/80">VTOP API</span> for{" "}
            <span className="text-white/80">VIT Chennai</span>, packaged as a
            Model Context Protocol (MCP) server. Ask any AI client (Claude,
            Cursor, VS Code) about your attendance, marks, timetable, exam
            seats, CGPA or curriculum progress in plain language, or script
            VTOP access yourself.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <img
              alt="npm version"
              src="https://img.shields.io/npm/v/@vikranth2005/vtop-mcp?style=flat-square&color=%23ffdf00&labelColor=%23111"
            />
            <img
              alt="license"
              src="https://img.shields.io/npm/l/@vikranth2005/vtop-mcp?style=flat-square&color=%23888&labelColor=%23111"
            />
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white"
            >
              <Github size={14} /> Source
            </a>
            <a
              href={NPM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white"
            >
              <ExternalLink size={14} /> npm
            </a>
            <span className="text-xs text-white/30">· VIT Chennai only</span>
          </div>
        </motion.header>

        {/* Install command */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-10"
        >
          <div className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/40 px-5 py-4">
            <code
              className="overflow-x-auto whitespace-nowrap text-sm md:text-base"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span className="select-none" style={{ color: ACCENT }}>
                ${" "}
              </span>
              npm i {PKG}
            </code>
            <CopyButton
              text={`npm i ${PKG}`}
              className="shrink-0 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/30 hover:text-white"
              label="Copy"
            />
          </div>
        </motion.section>

        {/* One-click add */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
          className="mt-12"
        >
          <h2 className="mb-1 flex items-center gap-2 text-lg font-bold">
            <Boxes size={18} style={{ color: ACCENT }} /> Add to your client
          </h2>
          <p className="mb-5 text-xs text-white/40">
            One click for Cursor &amp; VS Code. Copy-paste for Claude.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <InstallCard title="Cursor" subtitle="One-click deeplink">
              <a
                href={cursorDeeplink}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
                style={{ background: ACCENT }}
              >
                Add to Cursor <ExternalLink size={14} />
              </a>
            </InstallCard>

            <InstallCard title="VS Code" subtitle="One-click deeplink">
              <a
                href={vscodeDeeplink}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 py-2.5 text-sm font-bold text-white transition-colors hover:border-white/40"
              >
                Add to VS Code <ExternalLink size={14} />
              </a>
            </InstallCard>

            <InstallCard title="Claude Code" subtitle="Run in your terminal">
              <div className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5">
                <code className="overflow-x-auto whitespace-nowrap text-xs text-white/80">
                  <Terminal
                    size={12}
                    className="mr-2 inline opacity-50"
                  />
                  {claudeCodeCmd}
                </code>
                <CopyButton
                  text={claudeCodeCmd}
                  className="shrink-0 text-white/60 hover:text-white"
                />
              </div>
            </InstallCard>

            <InstallCard
              title="Claude Desktop"
              subtitle="Paste into claude_desktop_config.json"
            >
              <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5">
                <code className="truncate text-xs text-white/60">
                  {'{ "mcpServers": { "vtop": { … } } }'}
                </code>
                <CopyButton
                  text={claudeDesktopJson}
                  className="shrink-0 rounded-md border border-white/10 px-2.5 py-1 text-xs text-white/70 hover:border-white/30 hover:text-white"
                  label="Copy JSON"
                />
              </div>
            </InstallCard>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-white/35">
            On first use the assistant fetches a captcha, reads it, and logs in.
            Set <code className="text-white/60">VTOP_USERNAME</code> /{" "}
            <code className="text-white/60">VTOP_PASSWORD</code> in the{" "}
            <code className="text-white/60">env</code> block for hands-free
            login, or it&apos;ll ask you in chat. Windows: keep{" "}
            <code className="text-white/60">NODE_OPTIONS=--use-system-ca</code>.
          </p>
        </motion.section>

        {/* Tools */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26, ease: "easeOut" }}
          className="mt-14"
        >
          <h2 className="mb-1 flex items-center gap-2 text-lg font-bold">
            <ShieldCheck size={18} style={{ color: ACCENT }} /> 12 read-only
            tools
          </h2>
          <p className="mb-5 text-xs text-white/40">
            Scrapes like a browser using cookies, CSRF and captcha. Nothing is
            written back to VTOP.
          </p>
          <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-1 bg-black/60 p-4 transition-colors hover:bg-black/30"
              >
                <code
                  className="text-sm"
                  style={{ color: ACCENT, fontFamily: "'Space Mono', monospace" }}
                >
                  {t.name}
                </code>
                <span className="text-xs leading-relaxed text-white/50">
                  {t.desc}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 border-t border-white/10 pt-6 text-[11px] text-white/30"
        >
          An open-source VTOP API / MCP server for VIT Chennai. VTOP
          attendance, marks, timetable, exam schedule, CGPA and curriculum
          progress, scriptable or via Claude, Cursor or VS Code. Built by
          reverse-engineering the android-vtop-chennai app. Not affiliated with
          VIT. MIT licensed · credentials stay on your machine.
        </motion.footer>
      </div>
    </div>
  );
}
