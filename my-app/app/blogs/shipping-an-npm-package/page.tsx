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

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-stone-700 leading-relaxed mb-4"
      style={{ fontSize: "1.125rem", lineHeight: 1.85 }}
    >
      {children}
    </p>
  );
}

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "insight";
}) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    insight: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };
  return (
    <div
      className={`my-6 px-5 py-4 rounded-xl border ${styles[type]} text-sm leading-relaxed`}
    >
      {children}
    </div>
  );
}

export default function ShippingAnNpmPackage() {
  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        background: "#fafaf9",
        color: "#1c1917",
      }}
    >
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
            href="https://www.npmjs.com/package/@vikranth2005/vtop-mcp"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            The package <ExternalLink size={14} />
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 rounded-full">
                Story · Lessons
              </span>
              <span className="text-xs text-stone-400">11 min read</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4"
              style={{ fontFamily: "'Space Mono', monospace", lineHeight: 1.1 }}
            >
              I shipped a tiny tool.
              <br />
              <span className="text-stone-500">
                It taught me more than the code.
              </span>
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed">
              The honest, jargon-free story of building and publishing a small
              developer tool with an AI sitting next to me — including the
              two-day bug that had nothing to do with the code, and why my own
              computer physically couldn&apos;t ship it.
            </p>
          </header>

          <section>
            <SectionHeading>What I was building</SectionHeading>
            <P>
              My college has a student portal called VTOP — attendance, marks,
              timetable, exam seats, all of it. I wanted to just{" "}
              <em>ask</em> for that info in plain English instead of clicking
              through pages. So I built a small program that knows how to log
              into VTOP and read those pages, and exposes it in a way that AI
              assistants (Claude, Cursor, VS Code) can use as a tool.
            </P>
            <P>
              The plan was to put it online so anyone at my college could
              install it with one command. That last part — &quot;put it
              online&quot; — is where the real story is. The code was the easy
              bit. Shipping it taught me everything.
            </P>
          </section>

          <section>
            <SectionHeading>It felt like working with a person</SectionHeading>
            <P>
              I did this with an AI assistant the whole way. What struck me
              wasn&apos;t that it wrote code — it was how much it behaved like a
              slightly-too-confident colleague.
            </P>
            <P>
              It made a guess about why something was broken, confidently fixed
              &quot;that,&quot; shipped it, and the bug was still there. It had
              to stop, admit the guess was wrong, and dig deeper — twice. When
              it needed the login captcha solved, it showed me the wobbly image
              and read the letters itself instead of making me type them. When
              login needed a password it didn&apos;t have, it didn&apos;t crash
              — it asked me, in the chat, like a person would.
            </P>
            <Callout type="insight">
              The lesson that stuck: the difference between a tool and a
              teammate is what happens when something goes wrong. A tool stops.
              A teammate says &quot;huh, that&apos;s weird&quot; and keeps
              pulling the thread. The interesting part of this whole project was
              watching the thread get pulled.
            </Callout>
          </section>

          <section>
            <SectionHeading>
              First: what does &quot;publish&quot; even mean?
            </SectionHeading>
            <P>
              When you install a tool with a command like{" "}
              <code className="font-mono text-sm bg-stone-200 px-1.5 py-0.5 rounded">
                npm i something
              </code>
              , your computer downloads a little zipped-up parcel from a public
              warehouse (npm — think of it as an app store for code). That
              parcel is called a <strong>tarball</strong>.
            </P>
            <P>
              A tarball is genuinely just that: a folder, squashed into one file
              so it travels as a single thing — like vacuum-sealing a packed
              suitcase. When you &quot;publish,&quot; you&apos;re sealing your
              suitcase and mailing it to the warehouse. When someone installs,
              they get the suitcase and unpack it. Simple.
            </P>
            <P>
              Except the suitcase remembers more than the clothes inside it. It
              also remembers little labels on each item. And one specific label
              is where everything went wrong.
            </P>
          </section>

          <section>
            <SectionHeading>
              The bug: my computer couldn&apos;t ship it
            </SectionHeading>
            <P>
              The tool worked perfectly on my machine. I published it. People
              on Mac and Linux could use it. But anyone on Windows who tried to
              run it got a blunt error: <em>&quot;not recognized as a
              command.&quot;</em> The thing simply wouldn&apos;t start for them.
            </P>
            <P>
              Here&apos;s the part that took embarrassingly long to accept: the
              code was fine. The problem was a single invisible label on one
              file inside the suitcase — a label that says{" "}
              <strong>&quot;this file is allowed to be run as a
              program&quot;</strong>.
            </P>
            <P>
              On Mac and Linux, every file carries a tiny stamp: <em>is this
              just data, or is it something you&apos;re allowed to execute?</em>{" "}
              A program needs the &quot;you can run me&quot; stamp. My tool&apos;s
              main file was going out <em>without</em> that stamp — so when a
              Windows machine unpacked the suitcase and tried to run it, it
              found a file that, as far as the label said, wasn&apos;t a program
              at all.
            </P>
            <Callout type="warning">
              The kicker: Windows itself has no concept of that stamp. So when
              you publish <em>from</em> Windows, your computer literally cannot
              put the &quot;runnable&quot; label on the file — it doesn&apos;t
              own a stamp it doesn&apos;t believe in. Every time I published
              from my laptop, the tool shipped &quot;unstamped&quot; and broke
              for everyone else, no matter what I changed in the code.
            </Callout>
            <P>
              Sit with that for a second. The reason I couldn&apos;t ship a
              working tool had nothing to do with the tool. It was a property of
              the machine I was mailing it from.
            </P>
          </section>

          <section>
            <SectionHeading>The wrong turn (and why it matters)</SectionHeading>
            <P>
              Before we found the real cause, we chased a wrong one. The tool
              had a name, and the command to run it had a name, and they
              didn&apos;t quite match. That <em>looked</em> like a plausible
              culprit, so we renamed things, re-shipped, and… still broken.
            </P>
            <P>
              We&apos;d pattern-matched. We saw something that resembled a known
              kind of problem and &quot;fixed&quot; it without proving it was
              the problem. Classic. The actual fix only came from stopping the
              guessing, installing the published parcel ourselves, and looking
              at the literal label on the literal file — at which point the
              missing &quot;runnable&quot; stamp was sitting there in plain
              sight.
            </P>
            <Callout type="insight">
              The most useful debugging move all week wasn&apos;t clever. It was
              boring: reproduce it exactly, then read what&apos;s actually there
              instead of what you assume is there. Every hour we lost was an
              hour spent fixing a theory instead of checking one.
            </Callout>
          </section>

          <section>
            <SectionHeading>The fix: let a robot in a clean room mail it</SectionHeading>
            <P>
              If my Windows laptop can&apos;t apply the &quot;runnable&quot;
              stamp, the answer is to not mail the suitcase from my laptop at
              all. Instead, every time I want to release, a fresh Linux computer
              spins up in the cloud, builds the tool, applies the stamp
              properly, double-checks it starts, and mails it. Then it
              evaporates.
            </P>
            <P>
              This is what people mean by &quot;CI&quot; — it&apos;s just a
              robot in a clean room that does the release the same careful way
              every single time, so a human&apos;s messy laptop is never in the
              loop. I push a version tag; the robot does the rest.
            </P>
            <P>
              There was a bonus problem here too: how does the warehouse know
              the robot is <em>me</em> and not an impostor? The old answer was a
              password-like token you paste into the robot. The modern answer,
              which we used, is closer to a trusted handshake: the warehouse and
              the robot&apos;s home (the code host) vouch for each other
              directly, so there&apos;s no secret to leak or expire. No
              password sitting in a settings file.
            </P>
          </section>

          <section>
            <SectionHeading>The receipt nobody can fake</SectionHeading>
            <P>
              One more thing the robot does: it attaches a tamper-proof
              receipt. It says, publicly and cryptographically, &quot;this exact
              parcel was built from this exact code by this exact robot.&quot;
              That&apos;s called <strong>provenance</strong>. If someone ever
              hijacked my account and shipped a poisoned version, it
              couldn&apos;t produce a matching receipt — the lie wouldn&apos;t
              check out.
            </P>
            <P>
              The catch: that public receipt only works if the code is public
              too. So I made the repository public — which sounds scary until
              you realise the built tool was already downloadable by anyone the
              moment it was published. The source being open just lets people
              verify it instead of trusting me. (Worth a sanity check first:
              we scanned every branch of history to be sure no password ever
              got committed. It hadn&apos;t.)
            </P>
            <Callout type="info">
              &quot;Public repo&quot; also doesn&apos;t mean anyone can change
              your code. Read access and write access are different doors.
              Strangers can read and suggest; only you can merge and release.
            </Callout>
          </section>

          <section>
            <SectionHeading>The small human touches</SectionHeading>
            <P>
              After the shipping mechanics were solved, the remaining work was
              all about how it <em>feels</em> to use. When the tool didn&apos;t
              have your login saved, an early version dumped a wall of
              &quot;Option A, Option B, here&apos;s how to configure environment
              variables, also which campus are you&quot; — technically correct,
              completely exhausting.
            </P>
            <P>
              The fix wasn&apos;t code. It was tone. We told the assistant, in
              effect: just ask one short human question — &quot;what&apos;s your
              username and password?&quot; — and nothing else. Don&apos;t
              lecture. The tool got friendlier without getting smarter, and that
              was the right trade.
            </P>
          </section>

          <section>
            <SectionHeading>What I&apos;d tell past-me</SectionHeading>
            <div className="my-6 space-y-4">
              <div className="border-l-4 border-amber-300 pl-5 py-2">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  The code is rarely the hard part
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Building the thing took an afternoon. Shipping it correctly,
                  for everyone, took days. Packaging, permissions, and
                  distribution are real engineering, not an afterthought.
                </p>
              </div>
              <div className="border-l-4 border-blue-300 pl-5 py-2">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Reproduce before you theorise
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We burned the most time fixing confident guesses. The
                  unglamorous loop — reproduce exactly, read what&apos;s really
                  there — is what actually closed the bug.
                </p>
              </div>
              <div className="border-l-4 border-emerald-300 pl-5 py-2">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Take the human out of the release
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  &quot;Works on my machine&quot; is a warning, not a milestone.
                  A clean automated release removes a whole category of bugs
                  that come from the machine, not the code.
                </p>
              </div>
              <div className="border-l-4 border-violet-300 pl-5 py-2">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  Working with AI is managing a teammate
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  It moves fast and is sometimes confidently wrong — same as
                  any of us. The value isn&apos;t blind trust; it&apos;s a
                  partner that keeps pulling the thread while you keep it
                  honest.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="my-12 p-8 bg-stone-900 rounded-2xl text-center">
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-4">
                The tool was 400 lines.
                <br />
                <span className="text-amber-400">
                  The lesson was everything around it.
                </span>
              </p>
              <p className="text-stone-400 text-sm max-w-md mx-auto">
                You can try the actual thing —{" "}
                <a
                  href="https://www.vikranth.space/labs/vtop-mcp"
                  className="text-amber-400 underline"
                >
                  vtop-mcp
                </a>{" "}
                — or read the code. The bug is fixed. The story is the point.
              </p>
            </div>
          </section>

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
