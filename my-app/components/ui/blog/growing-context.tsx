"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";

interface ApiCall {
  label: string;
  messages: { role: string; content: string }[];
}

const API_CALLS: ApiCall[] = [
  {
    label: "API Call #1",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "What is the capital of France?" },
    ],
  },
  {
    label: "API Call #2",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "What is the capital of France?" },
      { role: "assistant", content: "The capital of France is Paris!" },
      { role: "user", content: "What about Germany?" },
    ],
  },
  {
    label: "API Call #3",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "What is the capital of France?" },
      { role: "assistant", content: "The capital of France is Paris!" },
      { role: "user", content: "What about Germany?" },
      { role: "assistant", content: "The capital of Germany is Berlin!" },
      { role: "user", content: "Which one has more people?" },
    ],
  },
  {
    label: "API Call #4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "What is the capital of France?" },
      { role: "assistant", content: "The capital of France is Paris!" },
      { role: "user", content: "What about Germany?" },
      { role: "assistant", content: "The capital of Germany is Berlin!" },
      { role: "user", content: "Which one has more people?" },
      { role: "assistant", content: "Berlin has about 3.6M, Paris about 2.1M..." },
      { role: "user", content: "Thanks! What should I visit in Berlin?" },
    ],
  },
];

const ROLE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  system: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  user: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  assistant: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
};

export default function GrowingContext() {
  const [currentCall, setCurrentCall] = useState(0);

  const call = API_CALLS[currentCall];
  const prevCount = currentCall > 0 ? API_CALLS[currentCall - 1].messages.length : 0;
  const totalTokens = Math.round(call.messages.reduce((acc, m) => acc + m.content.length, 0) / 4);
  const maxTokens = Math.round(API_CALLS[API_CALLS.length - 1].messages.reduce((acc, m) => acc + m.content.length, 0) / 4);

  return (
    <div className="my-8">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Header with step controls */}
        <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <span className="text-sm font-medium text-stone-700">
            {call.label}
            <span className="text-stone-400 ml-2">
              ({call.messages.length} messages sent)
            </span>
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentCall(Math.max(0, currentCall - 1))}
              disabled={currentCall === 0}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-1 px-2">
              {API_CALLS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentCall(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentCall ? "bg-blue-500 scale-125" : "bg-stone-300 hover:bg-stone-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentCall(Math.min(API_CALLS.length - 1, currentCall + 1))}
              disabled={currentCall === API_CALLS.length - 1}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => setCurrentCall(0)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-200 transition-all ml-1"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Token usage bar */}
        <div className="px-4 py-2 bg-stone-50 border-b border-stone-100">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span>Payload size</span>
            <span className="font-mono">~{totalTokens} tokens</span>
          </div>
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, #3b82f6, ${currentCall >= 2 ? "#f59e0b" : "#3b82f6"}, ${currentCall >= 3 ? "#ef4444" : "#3b82f6"})`,
              }}
              initial={false}
              animate={{ width: `${(totalTokens / maxTokens) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Messages list */}
        <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
          {call.messages.map((msg, i) => {
            const colors = ROLE_COLORS[msg.role] || ROLE_COLORS.user;
            const isNew = i >= prevCount;

            return (
              <motion.div
                key={`${currentCall}-${i}`}
                initial={isNew ? { opacity: 0, x: -10 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: isNew ? (i - prevCount) * 0.1 : 0 }}
                className={`flex items-start gap-3 px-3 py-2.5 rounded-lg border ${colors.bg} ${colors.border} ${
                  isNew ? "ring-2 ring-amber-300/50" : ""
                }`}
              >
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider mt-0.5 shrink-0 ${colors.text}`}
                >
                  {msg.role}
                </span>
                <span className="text-xs text-stone-700 leading-relaxed">
                  {msg.content.length > 80 ? msg.content.slice(0, 80) + "..." : msg.content}
                </span>
                {isNew && (
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider shrink-0 ml-auto">
                    new
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Insight footer */}
        <div className="px-4 py-3 bg-amber-50 border-t border-amber-200">
          <p className="text-xs text-amber-800">
            {currentCall === 0 && "This is the first API call. Just the system prompt and the user's question."}
            {currentCall === 1 && "Notice: the first exchange is sent AGAIN, plus the new question. Nothing is remembered."}
            {currentCall === 2 && "The payload keeps growing. Every previous message is re-sent with every new question."}
            {currentCall === 3 && (
              <>
                <strong>4 API calls in, and we&apos;re sending {call.messages.length} messages every time.</strong>
                {" "}This is why long conversations cost more and eventually hit token limits.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
