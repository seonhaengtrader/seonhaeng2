/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShoppingBag, ArrowUpRight, Flame } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ cartCount, onCartClick, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-[#F5F5F0]/10 py-4 px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Identity Logo */}
        <div 
          onClick={() => onNavigate("hero")} 
          className="flex items-center space-x-3 cursor-pointer group"
          id="brand-logo-btn"
        >
          <div className="bg-[#FF4E00] text-black font-mono text-xs font-bold px-2 py-1 tracking-widest rounded-sm flex items-center gap-1 group-hover:bg-[#F5F5F0] transition-colors">
            <Flame className="w-3.5 h-3.5 text-black animate-pulse" />
            先行
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm tracking-tighter uppercase italic text-[#F5F5F0]">
              SEONHAENG
            </span>
            <span className="font-mono text-[9px] tracking-widest text-[#FF4E00] font-medium">
              WHO MOVES FIRST
            </span>
          </div>
        </div>

        {/* Navigation Menus */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest text-gray-400">
          <button 
            onClick={() => onNavigate("story")} 
            className="hover:text-[#FF4E00] transition-colors cursor-pointer"
            id="nav-story-btn"
          >
            BRAND STORY
          </button>
          <button 
            onClick={() => onNavigate("shop")} 
            className="hover:text-[#FF4E00] transition-colors cursor-pointer"
            id="nav-shop-btn"
          >
            SELECT SHOP
          </button>
          <button 
            onClick={() => onNavigate("custom")} 
            className="hover:text-[#FF4E00] transition-colors cursor-pointer"
            id="nav-custom-btn"
          >
            CUSTOM LAB
          </button>
          <button 
            onClick={() => onNavigate("ai-guide")} 
            className="hover:text-[#FF4E00] transition-colors text-[#FF4E00] font-bold flex items-center gap-1 cursor-pointer"
            id="nav-ai-btn"
          >
            AI GUIDE <span className="inline-block w-1.5 h-1.5 bg-[#FF4E00] rounded-full animate-ping" />
          </button>
          <button 
            onClick={() => onNavigate("guestbook")} 
            className="hover:text-[#FF4E00] transition-colors cursor-pointer"
            id="nav-guestbook-btn"
          >
            LEDGER
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-4">
          {/* Cart Trigger */}
          <button
            onClick={onCartClick}
            className="relative p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer"
            aria-label="Open Shopping Cart"
            id="header-cart-btn"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF4E00] text-black text-[9px] font-mono font-bold w-4 h-4 flex items-center justify-center rounded-full border border-zinc-950 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick External Link style button */}
          <button 
            onClick={() => onNavigate("shop")}
            className="hidden sm:flex items-center gap-1 text-[11px] font-mono bg-[#FF4E00] text-white px-4 py-2 hover:bg-[#F5F5F0] hover:text-black transition-colors font-semibold tracking-wider cursor-pointer"
            id="header-shop-now-btn"
          >
            SHOP NOW
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
