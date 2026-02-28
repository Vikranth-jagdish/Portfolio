"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

const INPUT_MESSAGES = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "What is 2+2?" },
];

const OUTPUT_TOKENS = ["The", " answer", " is", " 4", "."];

export default function BlackBoxVisualizer() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<"idle" | "input" | "processing" | "output">("idle");
  const [outputIndex, setOutputIndex] = useState(0);
  const [inputHighlight, setInputHighlight] = useState(-1);

  function runDemo() {
    if (isRunning) return;
    setIsRunning(true);
    setPhase("input");
    setOutputIndex(0);
    setInputHighlight(0);

    // Animate input messages flowing in
    let step = 0;
    const inputTimer = setInterval(() => {
      step++;
      if (step < INPUT_MESSAGES.length) {
        setInputHighlight(step);
      } else {
        clearInterval(inputTimer);
        // Processing phase
        setPhase("processing");
        setInputHighlight(-1);
        setTimeout(() => {
          // Output phase - emit tokens one by one
          setPhase("output");
          let tokenIdx = 0;
          const outputTimer = setInterval(() => {
            tokenIdx++;
            setOutputIndex(tokenIdx);
            if (tokenIdx >= OUTPUT_TOKENS.length) {
              clearInterval(outputTimer);
              setTimeout(() => {
                setIsRunning(false);
              }, 1000);
            }
          }, 400);
        }, 1500);
      }
    }, 600);
  }

  function reset() {
    setIsRunning(false);
    setPhase("idle");
    setOutputIndex(0);
    setInputHighlight(-1);
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "system": return "text-purple-600 bg-purple-50 border-purple-200";
      case "user": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-stone-600 bg-stone-50 border-stone-200";
    }
  };

  return (
    <div className="my-8">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 overflow-hidden">
        {/* The 3-column visualization */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center min-h-[200px]">
          {/* INPUT: Messages array */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">
              Input (Full Context)
            </div>
            {INPUT_MESSAGES.map((msg, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: inputHighlight === i ? 1.02 : 1,
                  boxShadow: inputHighlight === i
                    ? "0 0 12px rgba(59, 130, 246, 0.3)"
                    : "0 0 0px rgba(0,0,0,0)",
                }}
                className={`text-xs font-mono px-3 py-2 rounded-lg border ${getRoleColor(msg.role)} transition-colors`}
              >
                <span className="font-semibold">{msg.role}:</span>{" "}
                <span className="opacity-80">{msg.content}</span>
              </motion.div>
            ))}
          </div>

          {/* BLACK BOX in the middle */}
          <div className="flex flex-col items-center gap-3">
            {/* Arrow in */}
            <motion.div
              animate={{
                opacity: phase === "input" ? [0.3, 1, 0.3] : 0.3,
              }}
              transition={{ duration: 1, repeat: phase === "input" ? Infinity : 0 }}
              className="text-stone-300 text-xl"
            >
              →
            </motion.div>

            {/* The box */}
            <motion.div
              animate={{
                boxShadow:
                  phase === "processing"
                    ? [
                        "0 0 0px rgba(0,0,0,0.3)",
                        "0 0 30px rgba(99,102,241,0.4)",
                        "0 0 0px rgba(0,0,0,0.3)",
                      ]
                    : "0 0 0px rgba(0,0,0,0.3)",
              }}
              transition={{
                duration: 1.5,
                repeat: phase === "processing" ? Infinity : 0,
              }}
              className="bg-stone-900 text-white rounded-xl px-6 py-8 text-center relative overflow-hidden"
            >
              <div className="text-lg font-bold tracking-tight">LLM</div>
              <div className="text-[10px] text-stone-400 mt-1 font-mono">
                {phase === "processing" ? "thinking..." : "stateless"}
              </div>

              {phase === "processing" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Arrow out */}
            <motion.div
              animate={{
                opacity: phase === "output" ? [0.3, 1, 0.3] : 0.3,
              }}
              transition={{ duration: 1, repeat: phase === "output" ? Infinity : 0 }}
              className="text-stone-300 text-xl"
            >
              →
            </motion.div>
          </div>

          {/* OUTPUT: Tokens */}
          <div>
            <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">
              Output (Next Tokens)
            </div>

            <div className="font-mono text-sm text-stone-800 min-h-[60px] bg-stone-50 rounded-lg border border-stone-200 px-3 py-2">
              <AnimatePresence>
                {OUTPUT_TOKENS.slice(0, outputIndex).map((token, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, color: "#3b82f6" }}
                    animate={{ opacity: 1, color: "#1c1917" }}
                    transition={{ duration: 0.5 }}
                  >
                    {token}
                  </motion.span>
                ))}
              </AnimatePresence>
              {phase === "output" && outputIndex < OUTPUT_TOKENS.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-blue-500"
                >
                  ▋
                </motion.span>
              )}
              {phase === "idle" && (
                <span className="text-stone-300 italic">waiting...</span>
              )}
              {phase === "input" && (
                <span className="text-stone-300 italic">receiving input...</span>
              )}
              {phase === "processing" && (
                <span className="text-stone-300 italic">processing...</span>
              )}
            </div>
          </div>
        </div>

        {/* Key insight + Controls */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-stone-500 max-w-md">
            <strong className="text-stone-700">Key insight:</strong> The model has{" "}
            <strong className="text-red-600">no memory</strong>. It receives the entire
            conversation as input and predicts the next token. Every single time.
          </p>

          <div className="flex gap-2">
            <button
              onClick={runDemo}
              disabled={isRunning}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                isRunning
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 active:scale-[0.98]"
              }`}
            >
              <Play size={12} />
              {isRunning ? "Running..." : "Run demo"}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-stone-100 text-stone-500 hover:bg-stone-200 transition-all"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
