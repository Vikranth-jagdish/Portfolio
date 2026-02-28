"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Eye, EyeOff, RotateCcw } from "lucide-react";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const CONVERSATION_STEPS: Message[] = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Hey! What is the capital of France?" },
  { role: "assistant", content: "The capital of France is Paris! It's known as the \"City of Light\" and is famous for the Eiffel Tower, the Louvre, and its incredible food." },
  { role: "user", content: "What about Germany?" },
  { role: "assistant", content: "The capital of Germany is Berlin! It's a vibrant city known for its rich history, the Brandenburg Gate, and its thriving arts and culture scene." },
  { role: "user", content: "Which one has more people?" },
  { role: "assistant", content: "Berlin is actually larger by population! Berlin has about 3.6 million residents, while Paris proper has about 2.1 million. However, if you count the greater metropolitan area, Paris is much larger at around 12 million people." },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-stone-400"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export default function ChatSimulator() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const jsonEndRef = useRef<HTMLDivElement>(null);

  // The system message is always present but not displayed in chat
  const displayMessages = visibleMessages.filter((m) => m.role !== "system");

  // The full payload that would be sent to the API at the current point
  const apiPayload = visibleMessages;

  const isConversationDone = currentStep >= CONVERSATION_STEPS.length;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, isTyping]);

  useEffect(() => {
    jsonEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages]);

  function sendNextMessage() {
    if (isTyping || isConversationDone) return;

    const nextMsg = CONVERSATION_STEPS[currentStep];

    if (nextMsg.role === "system") {
      // Add system message silently and immediately move to next
      setVisibleMessages((prev) => [...prev, nextMsg]);
      setCurrentStep((prev) => prev + 1);
      // Immediately add the next user message too
      const userMsg = CONVERSATION_STEPS[currentStep + 1];
      if (userMsg) {
        setVisibleMessages((prev) => [...prev, userMsg]);
        setCurrentStep((prev) => prev + 1);
        // Then show typing for assistant
        const assistantMsg = CONVERSATION_STEPS[currentStep + 2];
        if (assistantMsg && assistantMsg.role === "assistant") {
          setIsTyping(true);
          setTimeout(() => {
            setVisibleMessages((prev) => [...prev, assistantMsg]);
            setCurrentStep((prev) => prev + 1);
            setIsTyping(false);
          }, 1200);
        }
      }
      return;
    }

    if (nextMsg.role === "user") {
      setVisibleMessages((prev) => [...prev, nextMsg]);
      setCurrentStep((prev) => prev + 1);

      // Check if next is assistant response
      const assistantMsg = CONVERSATION_STEPS[currentStep + 1];
      if (assistantMsg && assistantMsg.role === "assistant") {
        setIsTyping(true);
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, assistantMsg]);
          setCurrentStep((prev) => prev + 1);
          setIsTyping(false);
        }, 1200);
      }
    }
  }

  function resetConversation() {
    setVisibleMessages([]);
    setCurrentStep(0);
    setIsTyping(false);
    setIsRevealed(false);
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "system": return "text-purple-600";
      case "user": return "text-blue-600";
      case "assistant": return "text-emerald-600";
      default: return "text-stone-600";
    }
  };

  const getRoleBg = (role: string) => {
    switch (role) {
      case "system": return "bg-purple-50 border-purple-200";
      case "user": return "bg-blue-50 border-blue-200";
      case "assistant": return "bg-emerald-50 border-emerald-200";
      default: return "bg-stone-50 border-stone-200";
    }
  };

  return (
    <div className="my-8">
      {/* Main container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chat Panel */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-stone-700">ChatGPT</span>
            </div>
            <button
              onClick={resetConversation}
              className="text-stone-400 hover:text-stone-600 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <div className="flex-1 p-4 space-y-3 min-h-[320px] max-h-[420px] overflow-y-auto">
            {displayMessages.length === 0 && !isTyping && (
              <div className="flex items-center justify-center h-full text-stone-300 text-sm">
                Click &quot;Send next message&quot; to start the conversation
              </div>
            )}

            <AnimatePresence>
              {displayMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-stone-100 text-stone-800 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-stone-100 rounded-2xl rounded-bl-md">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Controls */}
          <div className="px-4 py-3 border-t border-stone-200 bg-stone-50 flex items-center gap-2">
            <button
              onClick={sendNextMessage}
              disabled={isTyping || isConversationDone}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isTyping || isConversationDone
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 active:scale-[0.98]"
              }`}
            >
              <Send size={14} />
              {isConversationDone
                ? "Conversation complete"
                : isTyping
                ? "AI is typing..."
                : "Send next message"}
            </button>

            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                isRevealed
                  ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
                  : "bg-white border-stone-300 text-stone-600 hover:bg-stone-50"
              }`}
            >
              {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
              <span className="hidden sm:inline">{isRevealed ? "Hide" : "Reveal"}</span>
            </button>
          </div>
        </div>

        {/* JSON Reveal Panel */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-stone-900 rounded-2xl border border-stone-700 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="px-4 py-3 bg-stone-800 border-b border-stone-700 flex items-center justify-between">
                <span className="text-sm font-medium text-stone-300">
                  What&apos;s actually being sent to the API
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {apiPayload.length} message{apiPayload.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto min-h-[320px] max-h-[420px]">
                <pre className="text-xs font-mono leading-relaxed">
                  <span className="text-stone-500">{"{"}</span>
                  {"\n"}
                  <span className="text-stone-500">{"  "}</span>
                  <span className="text-amber-400">&quot;model&quot;</span>
                  <span className="text-stone-500">: </span>
                  <span className="text-emerald-400">&quot;gpt-4&quot;</span>
                  <span className="text-stone-500">,</span>
                  {"\n"}
                  <span className="text-stone-500">{"  "}</span>
                  <span className="text-amber-400">&quot;messages&quot;</span>
                  <span className="text-stone-500">: [</span>

                  {apiPayload.map((msg, i) => (
                    <motion.div
                      key={`${i}-${msg.role}`}
                      initial={{ backgroundColor: "rgba(251, 191, 36, 0.15)" }}
                      animate={{ backgroundColor: "rgba(251, 191, 36, 0)" }}
                      transition={{ duration: 2 }}
                      className="rounded px-1 -mx-1"
                    >
                      <span className="text-stone-500">{"    {"}</span>
                      {"\n"}
                      <span className="text-stone-500">{"      "}</span>
                      <span className="text-amber-400">&quot;role&quot;</span>
                      <span className="text-stone-500">: </span>
                      <span className={getRoleColor(msg.role)}>&quot;{msg.role}&quot;</span>
                      <span className="text-stone-500">,</span>
                      {"\n"}
                      <span className="text-stone-500">{"      "}</span>
                      <span className="text-amber-400">&quot;content&quot;</span>
                      <span className="text-stone-500">: </span>
                      <span className="text-stone-300">&quot;{msg.content.length > 60 ? msg.content.slice(0, 60) + "..." : msg.content}&quot;</span>
                      {"\n"}
                      <span className="text-stone-500">{"    }"}{i < apiPayload.length - 1 ? "," : ""}</span>
                    </motion.div>
                  ))}

                  {apiPayload.length === 0 && (
                    <div className="text-stone-600 italic py-2 pl-4">
                      {"  // No messages yet — send one to see the payload"}
                    </div>
                  )}

                  {"\n"}
                  <span className="text-stone-500">{"  ]"}</span>
                  {"\n"}
                  <span className="text-stone-500">{"}"}</span>
                </pre>
                <div ref={jsonEndRef} />
              </div>

              {apiPayload.length > 0 && (
                <div className="px-4 py-3 border-t border-stone-700 bg-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">
                      Every message above is sent <span className="text-amber-400 font-semibold">every single time</span>
                    </span>
                    <span className="text-stone-500 font-mono">
                      ~{Math.round(apiPayload.reduce((acc, m) => acc + m.content.length, 0) / 4)} tokens
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Placeholder when not revealed */}
        {!isRevealed && (
          <div className="hidden lg:flex items-center justify-center bg-stone-100 rounded-2xl border border-dashed border-stone-300 p-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-stone-400 text-sm">
                Click <strong>&quot;Reveal&quot;</strong> to see what&apos;s actually<br />
                being sent to the AI behind the scenes
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
