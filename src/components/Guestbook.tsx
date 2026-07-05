/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GuestPost } from "../types";
import { Send, Clock, User, Award, Quote } from "lucide-react";

export default function Guestbook() {
  const [posts, setPosts] = useState<GuestPost[]>([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");

  // Seed data for immediate aesthetic placeholder on first load
  const initialSeeds: GuestPost[] = [
    {
      id: "seed-1",
      name: "선행(先行)",
      goal: "망설임보다 실행이 앞서는 삶.",
      message: "먼저 움직인 사람만이 새로운 기준을 만든다.",
      createdAt: "2026-07-04T12:00:00"
    },
    {
      id: "seed-2",
      name: "강진우",
      goal: "수년간 벼려왔던 1인 개발 스타트업 첫 홈페이지 런칭하기",
      message: "완벽해질 때를 기다리지 않겠습니다. 가장 어설픈 지금 이 순간이야말로 먼저 나아가 시작하기에 완벽한 무대입니다.",
      createdAt: "2026-07-04T13:45:00"
    }
  ];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("seonhaeng_ledger");
    if (saved) {
      try {
        let parsed: GuestPost[] = JSON.parse(saved);
        
        // Filter out any entries containing '김레코'
        parsed = parsed.filter(post => 
          !post.name.includes("김레코") && 
          !post.goal.includes("김레코") && 
          !post.message.includes("김레코")
        );

        // Synchronize and update the default seed-1 entry if found in cache
        parsed = parsed.map(post => {
          if (post.id === "seed-1") {
            return {
              ...post,
              name: "선행(先行)",
              goal: "망설임보다 실행이 앞서는 삶.",
              message: "먼저 움직인 사람만이 새로운 기준을 만든다."
            };
          }
          return post;
        });

        localStorage.setItem("seonhaeng_ledger", JSON.stringify(parsed));
        setPosts(parsed);
      } catch (e) {
        setPosts(initialSeeds);
      }
    } else {
      setPosts(initialSeeds);
      localStorage.setItem("seonhaeng_ledger", JSON.stringify(initialSeeds));
    }
  }, []);

  // Save to localStorage
  const savePosts = (newPosts: GuestPost[]) => {
    setPosts(newPosts);
    localStorage.setItem("seonhaeng_ledger", JSON.stringify(newPosts));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !goal.trim() || !message.trim()) return;

    const newPost: GuestPost = {
      id: `post-${Date.now()}`,
      name: name.trim(),
      goal: goal.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    // Reset inputs
    setName("");
    setGoal("");
    setMessage("");
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <section id="guestbook" className="relative py-24 px-6 border-t border-[#F5F5F0]/10 bg-[#0A0A0A]">
      {/* Dynamic particles style background */}
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-zinc-800/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="text-[#FF4E00] font-mono text-xs font-bold tracking-widest uppercase mb-3">
            Ledger of Pioneers
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tighter text-[#F5F5F0] uppercase italic mb-4">
            선행자 연대 명부
          </h2>
          <p className="text-sm text-[#F5F5F0]/70 font-serif italic max-w-xl">
            "가장 먼저 행동하기로 약속한 개척자들의 생생한 기록 장부입니다. 그대의 각오와 목표를 각인하고 먼저 행동하는 자들의 연대에 참여해 주십시오."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Input Form (5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-8 border border-[#F5F5F0]/10 rounded-sm h-fit">
            <h3 className="text-lg font-mono font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF4E00]" />
              ADD NEW REVOLT
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono tracking-wider text-zinc-400">
                  선행자 서명 (이름 / 닉네임)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    required
                    type="text"
                    maxLength={15}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 남겨주십시오"
                    className="w-full bg-[#151515] border border-[#F5F5F0]/10 rounded-sm py-3 pl-10 pr-4 text-xs font-sans text-white focus:outline-none focus:border-[#FF4E00] transition-colors placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono tracking-wider text-zinc-400">
                  내가 선두로 나아갈 목표/과제
                </label>
                <input
                  required
                  type="text"
                  maxLength={50}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="예: 영작 공부 미루지 않고 하루 1시간 먼저 돌파하기"
                  className="w-full bg-[#151515] border border-[#F5F5F0]/10 rounded-sm py-3 px-4 text-xs font-sans text-white focus:outline-none focus:border-[#FF4E00] transition-colors placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono tracking-wider text-zinc-400">
                  선행자의 한마디 (투지 / 각오)
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={200}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="가장 먼저 도전을 실행으로 옮기기 위한 그대만의 맹세를 각인하십시오."
                  className="w-full bg-[#151515] border border-[#F5F5F0]/10 rounded-sm p-4 text-xs font-sans text-white focus:outline-none focus:border-[#FF4E00] transition-colors placeholder:text-zinc-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#FF4E00] hover:bg-[#F5F5F0] hover:text-black text-white font-mono text-xs font-bold tracking-widest py-3.5 transition-all duration-300 cursor-pointer"
                id="guestbook-submit-btn"
              >
                <Send className="w-4 h-4" />
                SIGN THE LEDGER
              </button>
            </form>
          </div>

          {/* Right: Posts Grid (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 max-h-[550px] overflow-y-auto pr-2" id="ledger-posts-scroll">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="glass-panel p-6 border-l-4 border-l-[#FF4E00] border border-[#F5F5F0]/10 relative group hover:border-[#F5F5F0]/20 transition-all"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-zinc-900 group-hover:text-[#FF4E00]/10 transition-colors pointer-events-none" />

                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#FF4E00] rounded-full" />
                        {post.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(post.createdAt)}
                      </span>
                    </div>

                    {/* Goal Spec Card */}
                    <div className="bg-[#151515] px-3.5 py-2.5 border border-[#F5F5F0]/10 rounded-sm text-[11px] font-sans">
                      <span className="font-mono text-[#FF4E00] font-bold uppercase tracking-wider mr-2">
                        PIONEER GOAL:
                      </span>
                      <span className="text-zinc-300 font-medium">
                        {post.goal}
                      </span>
                    </div>

                    {/* Message Body */}
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
                      "{post.message}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {posts.length === 0 && (
              <div className="text-center py-12 text-zinc-600 font-sans text-xs">
                장부가 비어있습니다. 첫 번째 서명의 영예를 차지하십시오.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
