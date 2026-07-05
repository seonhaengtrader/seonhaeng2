/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Flame, RotateCcw, AlertCircle, ShoppingCart } from "lucide-react";

// Product images for display in suggestion
import blackCapImg from "../assets/images/black_cap_seonhaeng_1783199718907.jpg";
import whiteCapImg from "../assets/images/white_cap_seonhaeng_1783199734048.jpg";
import navyCapImg from "../assets/images/navy_cap_seonhaeng_1783199746243.jpg";

interface AiResult {
  message: string;
  suggestedColor: string;
  reason: string;
}

export default function AiGuide() {
  const [goal, setGoal] = useState("");
  const [feeling, setFeeling] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Preset quick inputs to help users
  const presets = [
    { goal: "새로운 사이드 프로젝트 뼈대 코드 다짜고 퇴근하기", feeling: "실패하거나 도중에 포기할까 봐 망설여지는 마음" },
    { goal: "어색하고 소원해진 팀원에게 다가가 커피 사며 먼저 인사하기", feeling: "상대방이 차갑게 반응할까 봐 눈치 보고 있는 감정" },
    { goal: "비 오고 피곤하지만 헬스장 가장 먼저 출석해서 땀 흘리기", feeling: "누워있고 싶고 내일로 미루고 싶은 게으른 마음" }
  ];

  const handleApplyPreset = (idx: number) => {
    setGoal(presets[idx].goal);
    setFeeling(presets[idx].feeling);
    setError(null);
  };

  const handleFetchRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || !feeling.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: goal.trim(), feeling: feeling.trim() }),
      });

      if (!response.ok) {
        throw new Error("서버와의 통신이 원활하지 않습니다.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.message || data.error);
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "추천 정보를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGoal("");
    setFeeling("");
    setResult(null);
    setError(null);
  };

  // Match color key to local image
  const getSuggestedImage = (color: string) => {
    const c = color.toLowerCase();
    if (c.includes("white")) return whiteCapImg;
    if (c.includes("navy") || c.includes("blue")) return navyCapImg;
    return blackCapImg;
  };

  const getSuggestedColorName = (color: string) => {
    const c = color.toLowerCase();
    if (c.includes("white")) return "Minimal White (미니멀 화이트 볼캡)";
    if (c.includes("navy") || c.includes("blue")) return "Urban Navy (어반 네이비 볼캡)";
    return "Signature Black (시그니처 블랙 볼캡)";
  };

  return (
    <section id="ai-guide" className="relative py-24 px-6 border-t border-[#F5F5F0]/10 bg-[#0A0A0A]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF4E00]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#FF4E00]/10 text-[#FF4E00] text-xs font-mono font-bold tracking-widest px-3 py-1.5 rounded-full mb-3 uppercase animate-pulse">
            <Sparkles className="w-4 h-4" />
            Gemini AI Integration
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tighter text-[#F5F5F0] uppercase italic mb-4">
            AI 선행자 지침소
          </h2>
          <p className="text-sm text-[#F5F5F0]/70 font-serif italic max-w-xl">
            "가장 먼저 길을 여는 것은 외롭고 흔들리는 여정입니다. 오늘 당신이 도전하려는 첫 걸음을 기록해 주십시오. 선행(先行)의 철학으로 당신의 투지에 불을 지피는 문장과 코디를 선사합니다."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Form Section (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-8 border border-[#F5F5F0]/10 rounded-sm">
            <AnimatePresence mode="wait">
              {!result ? (
                <form key="form" onSubmit={handleFetchRecommendation} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">
                      DECISION DECK
                    </h3>
                    <p className="text-xs text-[#F5F5F0]/40">당신의 오늘의 전진 계획을 들려주십시오.</p>
                  </div>

                  {/* Goal Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono tracking-widest text-[#F5F5F0]/50">
                      Q1. 오늘 가장 먼저 시도하려는 도전/행동
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="예: 어색했던 개발 팀원에게 먼저 커피 사주며 용기 있게 친해지기"
                      className="w-full bg-[#151515] border border-[#F5F5F0]/10 rounded-sm p-3.5 text-xs font-sans text-white focus:outline-none focus:border-[#FF4E00] transition-colors placeholder:text-zinc-600 resize-none"
                    />
                  </div>

                  {/* Feeling Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono tracking-widest text-[#F5F5F0]/50">
                      Q2. 망설이게 만드는 생각이나 현재의 감정
                    </label>
                    <input
                      required
                      type="text"
                      value={feeling}
                      onChange={(e) => setFeeling(e.target.value)}
                      placeholder="예: 상대가 거절하거나 서먹함이 심해질까봐 주저되는 마음"
                      className="w-full bg-[#151515] border border-[#F5F5F0]/10 rounded-sm p-3.5 text-xs font-sans text-white focus:outline-none focus:border-[#FF4E00] transition-colors placeholder:text-zinc-600"
                    />
                  </div>

                  {/* Preset Buttons */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-mono tracking-wider text-zinc-500">
                      지침 예시 불러오기 (PRESETS)
                    </span>
                    <div className="flex flex-col gap-2">
                      {presets.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleApplyPreset(idx)}
                          className="text-left bg-white/5 hover:bg-white/10 border border-[#F5F5F0]/10 rounded-sm p-2 text-[10px] text-zinc-400 font-sans truncate transition-colors cursor-pointer"
                        >
                          📌 {p.goal.substring(0, 30)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Error Notification */}
                  {error && (
                    <div className="flex items-start space-x-2 bg-[#FF4E00]/10 border border-[#FF4E00]/30 p-3 rounded-sm text-[#FF4E00]">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="text-[10px] font-sans leading-normal">{error}</span>
                    </div>
                  )}

                  {/* Submit Trigger */}
                  <button
                    type="submit"
                    disabled={isLoading || !goal.trim() || !feeling.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-[#FF4E00] hover:bg-[#F5F5F0] hover:text-black disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-mono text-xs font-bold tracking-widest py-4 transition-all duration-300 cursor-pointer"
                    id="ai-submit-btn"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        선행자 지침 조율 중...
                      </div>
                    ) : (
                      <>
                        REQUEST BRAND COMMAND
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div key="actions" className="space-y-6 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-green-500 font-mono text-[10px] font-bold tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                      Command Decoded
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-white">
                      선행자의 지침 수령완료
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans">
                      당신의 훌륭한 발걸음에 화답하는 맞춤형 지침과 컬러 처방이 준비되었습니다. 우측 카드에서 세부 내용을 정독하십시오.
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-2 bg-[#151515] hover:bg-[#FF4E00] hover:text-black border border-[#F5F5F0]/10 text-white font-mono text-xs font-bold tracking-widest py-3.5 transition-colors cursor-pointer"
                      id="ai-retry-btn"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      새로운 결심 분석하기
                    </button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: AI Suggestion Card Section (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full aspect-[4/3] min-h-[350px] glass-panel border border-[#F5F5F0]/10 rounded-sm flex flex-col items-center justify-center text-center p-8 relative overflow-hidden"
                >
                  {/* Subtle matrix-like animated pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#FF4E00_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-5 pointer-events-none" />
                  
                  <div className="relative">
                    <Flame className="w-10 h-10 text-[#FF4E00] animate-bounce mb-4" />
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#FF4E00] rounded-full animate-ping" />
                  </div>
                  
                  <h4 className="text-sm font-mono tracking-widest text-white font-bold mb-2 uppercase">
                    GENESIS DECODING PROCESS...
                  </h4>
                  <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden relative mb-4">
                    <div className="absolute top-0 left-0 h-full w-1/2 bg-[#FF4E00] rounded-full animate-[shimmer_1.5s_infinite]" />
                  </div>
                  <p className="text-xs text-zinc-500 font-sans max-w-sm">
                    "오늘 그대의 전진은 가상 속에 머물지 않는다. 실체가 있는 단단함으로 탄생하는 철학을 설계하고 있습니다."
                  </p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-full glass-panel border border-[#FF4E00]/20 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl"
                >
                  {/* Left Column of Result Card: Caps visual (White/Navy/Black) */}
                  <div className="md:w-5/12 bg-[#151515] flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#F5F5F0]/10">
                    <div className="relative w-full aspect-square max-w-[200px] overflow-hidden rounded-sm border border-[#F5F5F0]/10 mb-4 shadow-lg bg-[#0A0A0A]">
                      <img
                        src={getSuggestedImage(result.suggestedColor)}
                        alt="Suggested Cap"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="block text-[10px] font-mono text-[#F5F5F0]/40 tracking-wider text-center uppercase mb-1">
                      RECOMMENDED STYLE
                    </span>
                    <span className="block text-xs font-mono font-bold text-[#FF4E00] text-center uppercase">
                      {result.suggestedColor.toUpperCase()}
                    </span>
                  </div>

                  {/* Right Column of Result Card: AI Text Message */}
                  <div className="md:w-7/12 p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-1 bg-[#FF4E00] text-black text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-sm">
                        선행자 지침 제97조
                      </div>

                      {/* Main Message */}
                      <p className="text-base md:text-lg font-serif font-bold text-white leading-relaxed tracking-tight italic">
                        "{result.message}"
                      </p>

                      <hr className="border-[#F5F5F0]/10" />

                      {/* Color suggestion description */}
                      <div className="space-y-1">
                        <span className="block text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                          DESIGNER'S PERSPECTIVE (스타일링 제안)
                        </span>
                        <h5 className="text-xs font-bold text-zinc-200">
                          {getSuggestedColorName(result.suggestedColor)}
                        </h5>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                          {result.reason}
                        </p>
                      </div>
                    </div>

                    {/* Meta specifications */}
                    <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>CRAFT: 3D EMBROIDERY</span>
                      <span>FABRIC: PREMIUM COTTON</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full aspect-[4/3] min-h-[350px] bg-[#0A0A0A] border border-[#F5F5F0]/20 border-dashed rounded-sm flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="p-4 bg-white/5 rounded-full mb-4">
                    <Sparkles className="w-6 h-6 text-zinc-500" />
                  </div>
                  <h4 className="text-sm font-mono tracking-widest text-[#F5F5F0]/30 font-bold mb-2 uppercase">
                    AWAITING CONFLICT RESOLUTION
                  </h4>
                  <p className="text-xs text-zinc-600 font-sans max-w-xs leading-relaxed">
                    왼쪽 패널에 당신의 도전 목표를 입력하고 제출 버튼을 클릭해 주십시오. 즉시 선행자의 우직한 대답을 도출하겠습니다.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
