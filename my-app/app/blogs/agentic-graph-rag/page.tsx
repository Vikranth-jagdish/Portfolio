"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl md:text-3xl font-bold text-stone-900 mt-16 mb-4 tracking-tight"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      {children}
    </h2>
  );
}

function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "insight" }) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    insight: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };

  return (
    <div className={`my-6 px-5 py-4 rounded-xl border ${styles[type]} text-sm leading-relaxed`}>
      {children}
    </div>
  );
}

function ConceptCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="my-4 bg-stone-50 border border-stone-200 rounded-xl p-5">
      <h4 className="font-bold text-stone-900 mb-3 text-sm uppercase tracking-wider">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-stone-700 text-sm leading-relaxed">
            <span className="text-stone-400 mt-0.5 shrink-0">&#x2022;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AgenticGraphRAG() {
  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        background: "#fafaf9",
        color: "#1c1917",
      }}
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-stone-50/80 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>
          <a
            href="https://www.linkedin.com/in/vikranth-jagdish-b37798126/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            LinkedIn <ExternalLink size={14} />
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 rounded-full">
                Deep Dive
              </span>
              <span className="text-xs text-stone-400">8 min read</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4"
              style={{ fontFamily: "'Space Mono', monospace", lineHeight: 1.1 }}
            >
              Agentic Graph RAG:<br />
              <span className="text-stone-500">The Future of Knowledge Retrieval</span>
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed">
              What happens when you combine graph-based knowledge with autonomous AI agents?
              You get a system that doesn&apos;t just search &mdash; it <em>reasons</em> its way to answers.
            </p>
          </header>

          {/* ─── Section 1: The Problem ─── */}
          <section>
            <SectionHeading>The Problem with Traditional RAG</SectionHeading>
            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              Retrieval-Augmented Generation (RAG) changed the game for AI applications. Instead of
              relying solely on what a model learned during training, RAG lets you fetch relevant
              documents at query time and inject them into the prompt. The model gets fresh, specific
              context &mdash; and gives better answers.
            </p>
            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              But traditional RAG has a fundamental limitation: <strong>it treats knowledge as flat.</strong> You
              embed documents into vectors, run a similarity search, and retrieve the top-K results. This works
              well for simple queries, but falls apart when the answer requires connecting multiple pieces of
              information across different documents.
            </p>

            <Callout type="warning">
              <strong>Example:</strong> &quot;Which of our engineering teams worked on projects that impacted
              Q3 revenue?&quot; &mdash; This requires connecting team data, project data, and financial data.
              A vector search on any single document won&apos;t cut it.
            </Callout>
          </section>

          {/* ─── Section 2: Three Concepts ─── */}
          <section>
            <SectionHeading>Three Ideas, One Architecture</SectionHeading>
            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              Agentic Graph RAG is the convergence of three powerful concepts. Each one is useful on its own,
              but together they create something far more capable than the sum of their parts.
            </p>

            <div className="grid gap-4 my-8">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs font-mono font-bold bg-purple-200 text-purple-800 rounded">01</span>
                  <h4 className="font-bold text-purple-900">Graph-Based Knowledge</h4>
                </div>
                <p className="text-sm text-purple-800 leading-relaxed">
                  Instead of flat documents, information is organized as <strong>nodes</strong> (entities)
                  and <strong>edges</strong> (relationships). A person is connected to a company, which is
                  connected to a product, which is connected to a market. The structure itself carries meaning.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs font-mono font-bold bg-blue-200 text-blue-800 rounded">02</span>
                  <h4 className="font-bold text-blue-900">Retrieval-Augmented Generation</h4>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Dynamically fetching relevant context at query time and injecting it into the LLM prompt.
                  Instead of the model relying on memorized training data, it gets fresh, specific information
                  exactly when it needs it.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-200 text-emerald-800 rounded">03</span>
                  <h4 className="font-bold text-emerald-900">Agentic Behavior</h4>
                </div>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Autonomous decision-making that allows the system to <strong>plan, reason, and adapt</strong> its
                  retrieval strategy. Instead of a fixed pipeline, an agent decides what to look for, where
                  to look, and when it has enough information to answer.
                </p>
              </div>
            </div>
          </section>

          {/* ─── Section 3: Why Graphs ─── */}
          <section>
            <SectionHeading>Why Graphs Beat Vectors</SectionHeading>
            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              Vector embeddings are great at finding <em>similar</em> content. But similarity isn&apos;t
              the same as relevance. When information is structured as a graph, you unlock capabilities
              that flat retrieval simply can&apos;t match.
            </p>

            <div className="my-8 bg-stone-900 rounded-2xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3">Vector Search</h4>
                  <ul className="space-y-2 text-stone-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 shrink-0">&#x2717;</span>
                      <span>Flattens hierarchical information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 shrink-0">&#x2717;</span>
                      <span>Misses non-obvious connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 shrink-0">&#x2717;</span>
                      <span>Fixed retrieval strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 shrink-0">&#x2717;</span>
                      <span>Single-hop lookups only</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">Graph RAG</h4>
                  <ul className="space-y-2 text-stone-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">&#x2713;</span>
                      <span>Preserves relationships and structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">&#x2713;</span>
                      <span>Multi-hop reasoning across nodes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">&#x2713;</span>
                      <span>Dynamic, context-aware exploration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">&#x2713;</span>
                      <span>Discovers indirect connections</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Callout type="insight">
              <strong>Multi-hop reasoning</strong> is the killer feature. A graph lets the system follow
              edges from one entity to another, discovering relevant information that no similarity search
              would ever surface. Think of it like browsing Wikipedia &mdash; you start at one article and
              follow links to discover connected knowledge.
            </Callout>
          </section>

          {/* ─── Section 4: The Agentic Layer ─── */}
          <section>
            <SectionHeading>The Agentic Layer</SectionHeading>
            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              What makes this architecture truly powerful is the <strong>agentic component</strong>. Instead
              of a fixed retrieval pipeline where you always run the same query against the same index, an
              agentic system can think about <em>how</em> to retrieve.
            </p>

            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              An AI agent sitting on top of a knowledge graph can:
            </p>

            <div className="my-6 space-y-3">
              {[
                { label: "Plan", desc: "Break down a complex query into sub-questions and determine the best traversal path through the graph" },
                { label: "Adapt", desc: "Adjust its retrieval strategy based on what it finds. If one path is a dead end, try another" },
                { label: "Reason", desc: "Evaluate which nodes are actually relevant and which are noise, pruning unnecessary branches" },
                { label: "Synthesize", desc: "Combine information from multiple graph traversals into a coherent, complete answer" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-4 bg-stone-50 border border-stone-200 rounded-lg p-4">
                  <span className="px-2 py-0.5 text-xs font-mono font-bold bg-stone-200 text-stone-700 rounded mt-0.5 shrink-0">
                    {label}
                  </span>
                  <p className="text-stone-700 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Section 5: Building It ─── */}
          <section>
            <SectionHeading>How to Build One</SectionHeading>
            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              Building an Agentic Graph RAG system involves three core components working together.
              Each one is a deep topic on its own, but here&apos;s the high-level architecture.
            </p>

            <div className="my-8 bg-stone-100 rounded-xl p-6">
              <pre className="text-sm font-mono text-stone-600 text-center leading-loose">
{`  User Query
      │
      ▼
┌─────────────┐
│  AI Agent   │  ← Plans retrieval strategy
│  (Reasoner) │  ← Decomposes complex queries
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Knowledge  │  ← Entities, relationships,
│    Graph    │  ← properties, metadata
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    LLM      │  ← Synthesizes retrieved
│  (Generator)│  ← context into answers
└─────────────┘`}
              </pre>
            </div>

            <ConceptCard
              title="1. Knowledge Graph Construction"
              items={[
                "Extract entities and relationships from your data sources (documents, databases, APIs)",
                "Design a graph schema that models your domain — what are the node types and edge types?",
                "Store in a graph database like Neo4j, Amazon Neptune, or even a lightweight in-memory graph",
                "Index nodes with vector embeddings for hybrid search (combine graph traversal with semantic similarity)",
              ]}
            />

            <ConceptCard
              title="2. Agentic Reasoning Engine"
              items={[
                "Query understanding — parse what the user is actually asking and identify required entity types",
                "Path planning — determine which nodes to start from and which edges to follow",
                "Iterative exploration — traverse the graph, evaluate relevance at each step, backtrack if needed",
                "Termination logic — know when you have enough information to generate a complete answer",
              ]}
            />

            <ConceptCard
              title="3. LLM Integration"
              items={[
                "Context window management — fit the most relevant graph data within token limits",
                "Structured prompting — present graph data in a format the LLM can reason about effectively",
                "Feedback loops — use the LLM's output to refine future retrievals in a multi-turn process",
              ]}
            />
          </section>

          {/* ─── Section 6: Applications ─── */}
          <section>
            <SectionHeading>Where This Shines</SectionHeading>
            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              Agentic Graph RAG is particularly powerful in domains where information is deeply
              interconnected and queries require reasoning across multiple data points.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-8">
              {[
                {
                  title: "Research & Discovery",
                  desc: "Navigate scientific literature by following citation networks, author collaborations, and concept hierarchies to surface non-obvious insights.",
                  color: "bg-violet-50 border-violet-200",
                },
                {
                  title: "Enterprise Knowledge",
                  desc: "Connect internal wikis, Slack threads, Jira tickets, and code repos into a unified graph that understands how your organization actually works.",
                  color: "bg-sky-50 border-sky-200",
                },
                {
                  title: "Legal & Compliance",
                  desc: "Traverse case law, regulations, and internal policies to find relevant precedents and identify compliance gaps across jurisdictions.",
                  color: "bg-amber-50 border-amber-200",
                },
                {
                  title: "Technical Documentation",
                  desc: "Link APIs, configuration options, error codes, and troubleshooting guides so developers can find exactly what they need in context.",
                  color: "bg-rose-50 border-rose-200",
                },
              ].map(({ title, desc, color }) => (
                <div key={title} className={`${color} border rounded-xl p-5`}>
                  <h4 className="font-bold text-stone-900 mb-2 text-sm">{title}</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Section 7: Challenges ─── */}
          <section>
            <SectionHeading>The Hard Parts</SectionHeading>
            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              This architecture is powerful, but it comes with real engineering challenges.
              Understanding these tradeoffs is critical before you commit to building one.
            </p>

            <div className="my-6 space-y-4">
              <div className="border-l-4 border-red-300 pl-5 py-2">
                <h4 className="font-bold text-stone-900 text-sm mb-1">Scalability</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Graph traversal can be computationally expensive, especially with large knowledge graphs.
                  Each hop multiplies the search space. You need smart pruning strategies and efficient
                  graph databases to keep latency reasonable.
                </p>
              </div>
              <div className="border-l-4 border-amber-300 pl-5 py-2">
                <h4 className="font-bold text-stone-900 text-sm mb-1">Graph Quality</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  The system is only as good as the underlying knowledge graph. Garbage in, garbage out.
                  Entity extraction, relationship identification, and schema design require significant
                  domain expertise and ongoing maintenance.
                </p>
              </div>
              <div className="border-l-4 border-blue-300 pl-5 py-2">
                <h4 className="font-bold text-stone-900 text-sm mb-1">Complexity vs. Value</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Not every use case needs a knowledge graph. If your queries are simple and your data is
                  flat, traditional vector RAG will serve you well at a fraction of the complexity. Use
                  graph RAG when the relational structure of your data is a core part of the problem.
                </p>
              </div>
            </div>
          </section>

          {/* ─── Section 8: What's Next ─── */}
          <section>
            <SectionHeading>What&apos;s Next</SectionHeading>
            <p className="text-stone-700 leading-relaxed mb-4" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              The field is moving fast. Here are the directions that excite me most:
            </p>

            <ul className="space-y-2 mb-6 text-stone-700 list-disc pl-5" style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>
              <li>
                <strong>Hybrid retrieval</strong> &mdash; combining vector similarity with graph traversal
                in a single query, getting the best of both worlds
              </li>
              <li>
                <strong>Learned graph navigation</strong> &mdash; using ML models to predict the most
                promising paths through the graph, reducing unnecessary exploration
              </li>
              <li>
                <strong>Explainable reasoning</strong> &mdash; showing users <em>why</em> the system
                retrieved specific information, making the reasoning chain transparent and auditable
              </li>
              <li>
                <strong>Self-updating graphs</strong> &mdash; agents that automatically update the
                knowledge graph as new information arrives, keeping it perpetually current
              </li>
            </ul>

            <div className="my-8 p-8 bg-stone-900 rounded-2xl text-center">
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-4">
                The future of RAG isn&apos;t just retrieval.<br />
                <span className="text-purple-400">It&apos;s intelligent navigation</span><br />
                through a web of knowledge.
              </p>
              <p className="text-stone-400 text-sm max-w-md mx-auto">
                Agentic Graph RAG represents a shift from &quot;find similar documents&quot; to
                &quot;reason your way to the answer.&quot; That&apos;s a fundamentally different
                &mdash; and more powerful &mdash; paradigm.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-stone-200">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to all blogs
            </Link>
          </footer>
        </motion.article>
      </main>
    </div>
  );
}
