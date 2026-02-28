"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCcw, ArrowRight } from "lucide-react";

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
  const [prevMessageCount, setPrevMessageCount] = useState(0);
  const displayMessages = visibleMessages.filter((m) => m.role !== "system");
  const apiPayload = visibleMessages;
  const isConversationDone = currentStep >= CONVERSATION_STEPS.length;

  function sendNextMessage() {
    if (isTyping || isConversationDone) return;

    setPrevMessageCount(visibleMessages.length);
    const nextMsg = CONVERSATION_STEPS[currentStep];

    if (nextMsg.role === "system") {
      setVisibleMessages((prev) => [...prev, nextMsg]);
      setCurrentStep((prev) => prev + 1);
      const userMsg = CONVERSATION_STEPS[currentStep + 1];
      if (userMsg) {
        setVisibleMessages((prev) => [...prev, userMsg]);
        setCurrentStep((prev) => prev + 1);
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
    setPrevMessageCount(0);
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "system": return "text-purple-400";
      case "user": return "text-blue-400";
      case "assistant": return "text-emerald-400";
      default: return "text-stone-400";
    }
  };

  return (
    <div className="my-8">
      {/* Label */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          What you see
        </div>
        <ArrowRight size={12} className="text-stone-300" />
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          What&apos;s actually sent to the API
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 lg:gap-0 rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
        {/* ─── LEFT: Chat Panel ─── */}
        <div className="bg-white flex flex-col border-b lg:border-b-0 lg:border-r border-stone-200">
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
                Click &quot;Send next message&quot; to start
              </div>
            )}

            <AnimatePresence>
              {displayMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
          </div>

          {/* Send button */}
          <div className="px-4 py-3 border-t border-stone-200 bg-stone-50">
            <button
              onClick={sendNextMessage}
              disabled={isTyping || isConversationDone}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
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
          </div>
        </div>

        {/* ─── RIGHT: JSON Array Panel (always visible) ─── */}
        <div className="bg-stone-900 flex flex-col">
          <div className="px-4 py-3 bg-stone-800 border-b border-stone-700 flex items-center justify-between">
            <span className="text-sm font-medium text-stone-300">
              API Request Payload
            </span>
            {apiPayload.length > 0 && (
              <span className="text-xs text-amber-400 font-mono">
                {apiPayload.length} message{apiPayload.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="flex-1 p-4 overflow-y-auto min-h-[320px] max-h-[420px]">
            {apiPayload.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-stone-500 text-sm mb-1">No messages yet</p>
                  <p className="text-stone-600 text-xs">Send a message to see the JSON array grow here</p>
                </div>
              </div>
            ) : (
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

                {apiPayload.map((msg, i) => {
                  const isNew = i >= prevMessageCount;
                  return (
                    <motion.div
                      key={`${i}-${msg.role}-${msg.content.slice(0, 10)}`}
                      initial={isNew ? { backgroundColor: "rgba(251, 191, 36, 0.2)" } : false}
                      animate={{ backgroundColor: "rgba(251, 191, 36, 0)" }}
                      transition={{ duration: 2.5 }}
                      className={`rounded px-1 -mx-1 ${isNew ? "ring-1 ring-amber-500/30" : ""}`}
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
                      <span className="text-stone-300">&quot;{msg.content.length > 50 ? msg.content.slice(0, 50) + "..." : msg.content}&quot;</span>
                      {"\n"}
                      <span className="text-stone-500">{"    }"}{i < apiPayload.length - 1 ? "," : ""}</span>
                      {isNew && (
                        <span className="text-amber-400 text-[10px] ml-2">{"← NEW"}</span>
                      )}
                    </motion.div>
                  );
                })}

                {"\n"}
                <span className="text-stone-500">{"  ]"}</span>
                {"\n"}
                <span className="text-stone-500">{"}"}</span>
              </pre>
            )}
          </div>

          {/* Footer with explicit message */}
          {apiPayload.length > 0 && (
            <div className="px-4 py-3 border-t border-stone-700 bg-stone-800">
              <div className="flex items-center gap-2 text-xs">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-amber-400 shrink-0"
                />
                <span className="text-amber-300 font-medium">
                  This entire array is passed to the model every time you send a message
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-stone-500 text-[10px]">
                  The model has no memory — it needs ALL previous messages re-sent
                </span>
                <span className="text-stone-500 font-mono text-[10px]">
                  ~{Math.round(apiPayload.reduce((acc, m) => acc + m.content.length, 0) / 4)} tokens
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System prompt callout */}
      {apiPayload.length > 0 && apiPayload[0].role === "system" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 px-5 py-4 rounded-xl border border-purple-200 bg-purple-50 text-sm leading-relaxed text-purple-900"
        >
          <strong>What&apos;s that &quot;system&quot; message?</strong> The first message in the array is the{" "}
          <strong>system prompt</strong> — a hidden instruction set by the developer that the user never sees.
          It tells the AI how to behave, what tone to use, what to avoid, and what role to play.
          For example, ChatGPT has a system prompt that says something like &quot;You are a helpful assistant.&quot;
          Every app that uses an AI model writes its own system prompt to shape the AI&apos;s personality and behavior.
          It&apos;s sent with <em>every single request</em>, always as the first message.
        </motion.div>
      )}
    </div>
  );
}
