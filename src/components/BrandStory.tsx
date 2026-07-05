/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { MoveRight, Star, Award, Shield, Flame } from "lucide-react";

interface BrandStoryProps {
  onExploreProducts: () => void;
}

export default function BrandStory({ onExploreProducts }: BrandStoryProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="story" className="relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden bg-[#0A0A0A] border-b border-[#F5F5F0]/10">
      {/* Background Subtle Elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FF4E00]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#F5F5F0]/3 rounded-full filter blur-[120px] pointer-events-none" />
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,245,240,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,245,240,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Side: Bold Brand Typography & Character */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#FF4E00] rounded-full animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-[#F5F5F0]/60 font-semibold uppercase">
                Brand Manifest
              </span>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-[60px] font-display font-extrabold tracking-tighter text-[#F5F5F0] uppercase italic leading-none mb-6"
            >
              Walk Ahead <br />
              <span className="text-[#FF4E00]">先行者 (선행자)</span>
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-[#F5F5F0]/80 font-serif italic leading-relaxed max-w-xl"
            >
              "어둠 속에서 모두가 주저하고 두려워할 때, 바람의 방향보다 자신의 심장 소리를 믿고 최초의 한 걸음을 내딛는 자들이 있습니다. 우리는 그 본능적인 대담함을 <span className="text-white font-semibold">‘선행(先行)’</span>이라 부릅니다.
              <br /><br />
              선행은 단순한 물리적 앞섬이 아닌, 관습에 의문을 품고 스스로 길을 개척하는 독립적인 태도입니다. 선행(先行) 볼캡은 당신이 세상의 기준보다 스스로의 확신을 앞세울 때, 그 용기를 증명하는 전유물이 될 것입니다."
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={onExploreProducts}
                className="group flex items-center gap-2 bg-[#FF4E00] hover:bg-[#F5F5F0] hover:text-black text-white font-mono text-xs font-bold tracking-widest px-6 py-4 transition-all duration-300 shadow-lg shadow-black/40 cursor-pointer"
                id="story-explore-btn"
              >
                EXPLORE SELECT SHOP
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Side: Visual Graphic Bento Panel */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <motion.div 
              variants={itemVariants}
              className="glass-panel p-6 border border-[#F5F5F0]/10 relative group hover:border-[#FF4E00]/20 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-zinc-800 font-mono text-3xl font-bold group-hover:text-[#FF4E00]/20 transition-colors">
                01
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#FF4E00]/10 text-[#FF4E00] rounded-sm">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-mono text-sm tracking-wider font-bold text-white mb-2">
                    주체적 독창성
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    타인의 트렌드를 복제하지 않습니다. 우리는 거리에 서서 오직 우리만의 문법과 고유한 아방가르드 실루엣을 전개합니다.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="glass-panel p-6 border border-[#F5F5F0]/10 relative group hover:border-[#FF4E00]/20 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-zinc-800 font-mono text-3xl font-bold group-hover:text-[#FF4E00]/20 transition-colors">
                02
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#FF4E00]/10 text-[#FF4E00] rounded-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm tracking-wider font-bold text-white mb-2">
                    자수의 장인정신
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    고밀도의 입체 3D 자수 공법을 활용하여 모자 전면의 ‘先行’ 한자와 브랜드 각인을 볼륨감 있고 견고하게 새겨 넣습니다.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="glass-panel p-6 border border-[#F5F5F0]/10 relative group hover:border-[#FF4E00]/20 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-zinc-800 font-mono text-3xl font-bold group-hover:text-[#FF4E00]/20 transition-colors">
                03
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#FF4E00]/10 text-[#FF4E00] rounded-sm">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm tracking-wider font-bold text-white mb-2">
                    견고한 헤리티지
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    시간이 흐를수록 깊은 태를 이루는 고밀도 7수 트윌 코튼을 아낌없이 채택하여, 완벽한 핏감과 강력한 구김 복원력을 자랑합니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
