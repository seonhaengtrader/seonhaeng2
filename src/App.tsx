/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Flame, ArrowDown, ShieldAlert, CheckCircle, Github, Info } from "lucide-react";
import { CartItem } from "./types";

// Import Custom Modular Components
import Header from "./components/Header";
import BrandStory from "./components/BrandStory";
import Shop from "./components/Shop";
import AiGuide from "./components/AiGuide";
import Guestbook from "./components/Guestbook";
import CartModal from "./components/CartModal";

export default function App() {
  // States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem("seonhaeng_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse saved cart:", e);
      }
    }
  }, []);

  // Sync cart to localStorage on state change
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("seonhaeng_cart", JSON.stringify(items));
  };

  // Add item to cart
  const handleAddToCart = (newItem: Omit<CartItem, "id">) => {
    // Generate unique identification key based on options
    let lineId = newItem.productId + `-${newItem.size}`;
    if (newItem.isCustom && newItem.customConfig) {
      const cfg = newItem.customConfig;
      lineId += `-${cfg.fabricColor.split(" ")[0]}-${cfg.embroideryColor.split(" ")[0]}`;
      if (cfg.customText) lineId += `-${cfg.customText}`;
    }

    const existingIdx = cartItems.findIndex((item) => item.id === lineId);
    if (existingIdx > -1) {
      const updated = [...cartItems];
      updated[existingIdx].quantity += newItem.quantity;
      saveCart(updated);
    } else {
      const itemWithId: CartItem = {
        ...newItem,
        id: lineId,
      };
      saveCart([...cartItems, itemWithId]);
    }
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const updated = cartItems.map((item) => 
      item.id === id ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    saveCart(updated);
  };

  // Clear cart
  const handleClearCart = () => {
    saveCart([]);
  };

  // Section Scroll Navigation
  const handleNavigate = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cart total items count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] overflow-x-hidden font-sans selection:bg-[#FF4E00] selection:text-black">
      {/* 1. Sticky Navigation Bar */}
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onNavigate={handleNavigate} 
      />

      {/* 2. Hero Cinematic Landing Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden bg-[#0A0A0A] border-b border-[#F5F5F0]/10"
      >
        {/* Background Ambient Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4E00]/5 rounded-full filter blur-[150px] pointer-events-none" />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,245,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,245,240,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40 pointer-events-none" />

        <div className="max-w-4xl mx-auto z-10 space-y-8 flex flex-col items-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2 bg-[#FF4E00]/10 border border-[#FF4E00]/25 px-4 py-1.5 rounded-full"
          >
            <Flame className="w-4 h-4 text-[#FF4E00] animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-[#FF4E00] uppercase">
              SEONHAENG SPECIALTY CO.
            </span>
          </motion.div>

          {/* Main Visual Title: 한자 先行 */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-7xl md:text-[120px] tracking-tighter uppercase italic leading-none relative select-none"
            >
              Walk Ahead
            </motion.h1>
            
            {/* Subtitle brand motto */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-serif italic text-xl md:text-2xl text-[#FF4E00] tracking-wide"
            >
              선행(先行): Who Moves First
            </motion.div>
          </div>

          {/* Intro brief text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-sm md:text-base text-[#F5F5F0]/70 font-serif italic max-w-lg leading-relaxed"
          >
            "남이 만들어 놓은 궤적을 걷지 않는다.<br />
            오직 스스로의 확신으로 가장 어두운 밤, 최초의 발걸음을 떼는 자들.<br />
            그 주체적인 대담함을 수놓은 한정판 볼캡 컬렉션."
          </motion.p>

          {/* Action triggers */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              onClick={() => handleNavigate("shop")}
              className="bg-[#FF4E00] hover:bg-[#F5F5F0] hover:text-black text-[#F5F5F0] font-mono text-xs font-bold tracking-widest px-8 py-4 transition-all duration-300 shadow-xl shadow-black/50 cursor-pointer animate-none"
              id="hero-shop-btn"
            >
              VIEW COLLECTION
            </button>
            <button
              onClick={() => handleNavigate("custom")}
              className="bg-[#0A0A0A] hover:bg-[#FF4E00] hover:text-black border border-[#F5F5F0]/20 text-[#F5F5F0] font-mono text-xs font-bold tracking-widest px-8 py-4 transition-all duration-300 cursor-pointer"
              id="hero-custom-btn"
            >
              CUSTOM LAB
            </button>
          </motion.div>
        </div>

        {/* Scroll helper mouse animation */}
        <div 
          onClick={() => handleNavigate("story")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-zinc-500 hover:text-white transition-colors cursor-pointer select-none"
          id="scroll-indicator"
        >
          <span className="font-mono text-[9px] tracking-widest">SCROLL DOWN</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-[#FF4E00]" />
          </motion.div>
        </div>
      </section>

      {/* 3. Brand Story Section */}
      <BrandStory onExploreProducts={() => handleNavigate("shop")} />

      {/* 4. Select Shop & Custom Lab (Combined in Shop.tsx) */}
      <Shop onAddToCart={handleAddToCart} />

      {/* 5. AI Motivation & Style Recommender */}
      <AiGuide />

      {/* 6. Guestbook Ledger */}
      <Guestbook />

      {/* 7. Footer Section */}
      <footer className="bg-[#0A0A0A] border-t border-[#F5F5F0]/10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-[#F5F5F0]/50 font-sans text-xs">
          {/* Left Block (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-3 text-[#F5F5F0]">
              <div className="bg-[#FF4E00] text-black font-mono text-[10px] font-bold px-2 py-0.5 tracking-widest rounded-sm">
                先行
              </div>
              <span className="font-display font-extrabold tracking-widest uppercase">
                SEONHAENG
              </span>
            </div>
            <p className="leading-relaxed text-[#F5F5F0]/70 max-w-sm font-serif italic">
              선행(先行)은 관습과 기준에 연연하지 않고 스스로의 신념을 수호하며 가장 먼저 길을 여는 주체자들을 위한 프리미엄 하이 스트릿 브랜드입니다.
            </p>
            <div className="text-[10px] text-zinc-600 font-mono">
              © 2026 SEONHAENG CO. ALL RIGHTS RESERVED. DESIGNED FOR PIONEERS.
            </div>
          </div>

          {/* Center Info links (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-mono font-bold tracking-widest text-zinc-400 uppercase">
                EXPLORE
              </h4>
              <ul className="space-y-2 font-mono text-[11px]">
                <li>
                  <button onClick={() => handleNavigate("story")} className="hover:text-white transition-colors cursor-pointer">
                    BRAND MANIFEST
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate("shop")} className="hover:text-white transition-colors cursor-pointer">
                    SELECT SHOP
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate("custom")} className="hover:text-white transition-colors cursor-pointer">
                    CUSTOM LAB
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate("ai-guide")} className="hover:text-white transition-colors text-red-400 font-semibold cursor-pointer">
                    AI GUIDE
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono font-bold tracking-widest text-zinc-400 uppercase">
                SUPPORT
              </h4>
              <ul className="space-y-2 font-mono text-[11px]">
                <li className="hover:text-white transition-colors cursor-pointer">
                  SHIPPING POLICY
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  CRAFT MANSHIP
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  TERMS OF USE
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  PRIVACY LEGAL
                </li>
              </ul>
            </div>
          </div>

          {/* Right Brand Disclaimer Block (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono font-bold tracking-widest text-zinc-400 uppercase">
              LEGAL NOTICE
            </h4>
            <div className="space-y-2 bg-[#151515] p-4 border border-[#F5F5F0]/10 rounded-sm text-[10px] leading-relaxed text-[#F5F5F0]/40 font-mono">
              <div className="flex items-center gap-1.5 text-[#F5F5F0]/70 font-semibold mb-1">
                <Info className="w-3.5 h-3.5 text-[#FF4E00]" />
                PORTFOLIO PREVIEW
              </div>
              본 어플리케이션은 디자이너 '선행'을 소개하고 제품 제작을 가상 시뮬레이션 및 사전 검증해볼 수 있도록 특수 제작된 포트폴리오용 웹사이트입니다. 실제 카드 결제나 상업적 상품 수급은 발생하지 않습니다.
            </div>
          </div>
        </div>
      </footer>

      {/* 8. Global Shopping Cart Drawer Modal */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveItem={handleRemoveItem} 
        onClearCart={handleClearCart} 
      />
    </div>
  );
}

