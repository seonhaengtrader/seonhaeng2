/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CapProduct, CartItem, CustomCapConfig } from "../types";
import { Check, ShoppingCart, Sliders, ChevronRight, HelpCircle, Package, RefreshCw } from "lucide-react";

// Import generated cap images
import blackCapImg from "../assets/images/black_cap_seonhaeng_1783199718907.jpg";
import whiteCapImg from "../assets/images/white_cap_seonhaeng_1783199734048.jpg";
import navyCapImg from "../assets/images/navy_cap_seonhaeng_1783199746243.jpg";

interface ShopProps {
  onAddToCart: (item: Omit<CartItem, "id">) => void;
}

export default function Shop({ onAddToCart }: ShopProps) {
  // Predefined Select Cap Products
  const capProducts: CapProduct[] = [
    {
      id: "seonhaeng-black",
      name: "선행(先行) 3D 볼캡 - 시그니처 블랙",
      price: 39000,
      originalPrice: 45000,
      colorName: "Signature Black",
      colorHex: "#0b0b0c",
      imageUrl: blackCapImg,
      description: "어떠한 기류에도 타협하지 않고 먼저 묵직하게 전진하는 자를 상징합니다. 고탄력 3D 자수 입체 공법으로 수놓아진 백색 '先行' 로고와 Crimson Red 레터링은 흑색 원단 위에서 선명한 궤적을 그립니다.",
      specifications: {
        material: "100% Cotton (고밀도 7수 트윌)",
        size: "Standard (56 ~ 60cm, 조절 가능)",
        brim: "7.2cm (인체공학적 곡률 설계)",
        depth: "11.5cm (한국인 두상 맞춤 설계)",
        origin: "Premium Handcraft in Korea"
      }
    },
    {
      id: "seonhaeng-white",
      name: "선행(先行) 3D 볼캡 - 미니멀 화이트",
      price: 39000,
      originalPrice: 45000,
      colorName: "Minimal White",
      colorHex: "#f4f4f5",
      imageUrl: whiteCapImg,
      description: "가장 순수하고 거침없는 시작을 상징하는 화이트 에디션입니다. 어떠한 배경 위에서도 뚜렷하게 나아가는 흑색의 입체 자수와 열정의 레드 각인이 극도로 세련되고 대담한 도시 감성을 표출합니다.",
      specifications: {
        material: "100% Cotton (고밀도 7수 트윌)",
        size: "Standard (56 ~ 60cm, 조절 가능)",
        brim: "7.2cm",
        depth: "11.5cm",
        origin: "Premium Handcraft in Korea"
      }
    },
    {
      id: "seonhaeng-navy",
      name: "선행(先行) 3D 볼캡 - 어반 네이비",
      price: 39000,
      originalPrice: 45000,
      colorName: "Urban Navy",
      colorHex: "#1e1b4b",
      imageUrl: navyCapImg,
      description: "깊고 찬란한 새벽녘 밤하늘을 대변하는 딥 네이비 에디션입니다. 백색의 '先行' 한자 자수와 활활 타오르는 진홍빛 'WHO MOVES FIRST' 레터링의 극명한 대비로 격조 높은 트렌디 스트릿 룩을 매칭합니다.",
      specifications: {
        material: "100% Cotton (고밀도 7수 트윌)",
        size: "Standard (56 ~ 60cm, 조절 가능)",
        brim: "7.2cm",
        depth: "11.5cm",
        origin: "Premium Handcraft in Korea"
      }
    }
  ];

  // Component States
  const [selectedCap, setSelectedCap] = useState<CapProduct>(capProducts[0]);
  const [selectedSize, setSelectedSize] = useState<"Standard" | "Large">("Standard");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Custom Lab States
  const fabricColors = [
    { name: "Ink Black (블랙)", hex: "#0b0b0c" },
    { name: "Off White (화이트)", hex: "#f4f4f5" },
    { name: "Deep Navy (네이비)", hex: "#171a2b" },
    { name: "Burnt Burgundy (버건디)", hex: "#4c0519" },
    { name: "Asphalt Charcoal (차콜)", hex: "#27272a" }
  ];

  const embroideryColors = [
    { name: "Brand Orange (브랜드 오렌지)", hex: "#FF4E00" },
    { name: "Snow White (스노우 화이트)", hex: "#ffffff" },
    { name: "Matte Black (매트 블랙)", hex: "#09090b" },
    { name: "Solid Gold (골드)", hex: "#d97706" }
  ];

  const [customFabric, setCustomFabric] = useState(fabricColors[0]);
  const [customEmbroidery, setCustomEmbroidery] = useState(embroideryColors[0]);
  const [customSize, setCustomSize] = useState<"Standard" | "Large">("Standard");
  const [customText, setCustomText] = useState("선행");

  // Trigger Notification
  const triggerNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Add standard product to cart
  const handleAddProductToCart = () => {
    onAddToCart({
      productId: selectedCap.id,
      name: selectedCap.name,
      price: selectedCap.price,
      imageUrl: selectedCap.imageUrl,
      colorName: selectedCap.colorName,
      size: selectedSize,
      isCustom: false,
      quantity: 1
    });
    triggerNotification(`${selectedCap.name} (${selectedSize})이(가) 장바구니에 담겼습니다.`);
  };

  // Add custom design to cart
  const handleAddCustomToCart = () => {
    const config: CustomCapConfig = {
      fabricColor: customFabric.name,
      fabricHex: customFabric.hex,
      embroideryColor: customEmbroidery.name,
      embroideryHex: customEmbroidery.hex,
      size: customSize,
      customText: customText.trim() || undefined
    };

    onAddToCart({
      productId: `custom-${customFabric.name.split(" ")[0].toLowerCase()}`,
      name: `선행(先行) 3D 볼캡 - CUSTOM LAB 설계품`,
      price: 49000, // custom caps are premium-priced
      imageUrl: blackCapImg, // uses base black cap image as thumbnail placeholder
      colorName: `${customFabric.name} x ${customEmbroidery.name}`,
      size: customSize,
      isCustom: true,
      customConfig: config,
      quantity: 1
    });

    triggerNotification(`나만의 선행 커스텀 모자가 장바구니에 담겼습니다.`);
  };

  return (
    <div className="bg-[#0A0A0A] pb-24">
      {/* 1. SELECT SHOP SECTION */}
      <section id="shop" className="relative py-24 px-6 max-w-7xl mx-auto">
        {/* Background Ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4E00]/5 rounded-full filter blur-[150px] pointer-events-none" />

        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="text-[#FF4E00] font-mono text-xs font-bold tracking-widest uppercase mb-3">
            Premium Handcraft Series
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tighter text-[#F5F5F0] uppercase italic mb-4">
            SELECT SHOP
          </h2>
          <p className="text-sm text-[#F5F5F0]/70 font-serif italic max-w-xl">
            "가장 선두에서 걸어 나가는 고유한 실루엣. 선행만의 엄선된 원단과 3D 자수로 빚어낸 오리지널 볼캡 셀렉션입니다."
          </p>
        </div>

        {/* Product Viewer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start" id="product-details-container">
          {/* Left: High-res Dynamic Product Image Showcase (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-square w-full bg-[#151515] overflow-hidden border border-[#F5F5F0]/10 rounded-sm shadow-2xl">
              {/* Hot badge */}
              <div className="absolute top-6 left-6 z-10 bg-[#FF4E00] text-black font-mono text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">
                Best Seller
              </div>

              {/* Original embroidered look watermark */}
              <div className="absolute bottom-6 right-6 z-10 text-right opacity-30 font-mono text-[10px] tracking-widest text-[#F5F5F0]">
                MODEL: {selectedCap.colorName.toUpperCase()}<br />
                LIMITED SEONHAENG SERIES
              </div>

              {/* Main Product Image with key referrerPolicy */}
              <img
                src={selectedCap.imageUrl}
                alt={selectedCap.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                id="main-product-image"
              />
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 gap-4">
              {capProducts.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => setSelectedCap(cap)}
                  className={`relative aspect-square rounded-sm overflow-hidden border transition-all ${
                    selectedCap.id === cap.id 
                      ? "border-[#FF4E00] ring-2 ring-[#FF4E00]/25" 
                      : "border-[#F5F5F0]/10 opacity-60 hover:opacity-100"
                  }`}
                  id={`thumb-btn-${cap.id}`}
                >
                  <img
                    src={cap.imageUrl}
                    alt={cap.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                    <span className="font-mono text-[9px] text-white tracking-wider truncate">
                      {cap.colorName.split(" ")[1]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detailed Product Purchase Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 glass-panel p-8 border border-[#F5F5F0]/10 rounded-sm">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#F5F5F0]/50">
                <span>NEW ARRIVAL</span>
                <span>/</span>
                <span className="text-[#FF4E00] font-bold">{selectedCap.colorName}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-extrabold tracking-tighter text-[#F5F5F0] uppercase italic leading-tight">
                {selectedCap.name}
              </h3>
              
              <div className="flex items-baseline space-x-3 pt-2">
                <span className="text-2xl font-mono font-bold text-[#FF4E00]">
                  {selectedCap.price.toLocaleString()}원
                </span>
                <span className="text-sm font-mono text-[#F5F5F0]/40 line-through">
                  {selectedCap.originalPrice.toLocaleString()}원
                </span>
                <span className="text-xs bg-[#FF4E00]/10 text-[#FF4E00] px-2 py-0.5 rounded-sm font-mono font-semibold">
                  13% OFF
                </span>
              </div>
            </div>

            <hr className="border-[#F5F5F0]/10" />

            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              {selectedCap.description}
            </p>

            {/* Size selector */}
            <div className="space-y-3">
              <label className="block text-xs font-mono font-bold tracking-widest text-[#F5F5F0]/55">
                FIT SIZE SELECT
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedSize("Standard")}
                  className={`py-3 px-4 text-xs font-mono font-semibold tracking-wider border rounded-sm transition-all text-center flex flex-col justify-center items-center ${
                    selectedSize === "Standard"
                      ? "border-[#FF4E00] bg-[#FF4E00]/10 text-white"
                      : "border-[#F5F5F0]/10 hover:border-[#F5F5F0]/30 text-zinc-400"
                  }`}
                  id="size-std-btn"
                >
                  <span>STANDARD FIT</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">56cm - 60cm</span>
                </button>
                <button
                  onClick={() => setSelectedSize("Large")}
                  className={`py-3 px-4 text-xs font-mono font-semibold tracking-wider border rounded-sm transition-all text-center flex flex-col justify-center items-center ${
                    selectedSize === "Large"
                      ? "border-[#FF4E00] bg-[#FF4E00]/10 text-white"
                      : "border-[#F5F5F0]/10 hover:border-[#F5F5F0]/30 text-zinc-400"
                  }`}
                  id="size-lrg-btn"
                >
                  <span>OVERSIZED LARGE</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">59cm - 62cm</span>
                </button>
              </div>
            </div>

            {/* Spec details accordian */}
            <div className="bg-[#151515] p-4 border border-[#F5F5F0]/10 rounded-sm space-y-2">
              <div className="text-[11px] font-mono font-bold text-[#F5F5F0]/70 flex items-center gap-1.5 mb-2">
                <Package className="w-3.5 h-3.5 text-[#FF4E00]" />
                PRODUCT SPECIFICATIONS
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] font-sans text-[#F5F5F0]/65">
                <div className="font-mono text-zinc-500">원단 사양</div>
                <div>{selectedCap.specifications.material}</div>
                <div className="font-mono text-zinc-500">챙 깊이 / 곡률</div>
                <div>{selectedCap.specifications.brim}</div>
                <div className="font-mono text-zinc-500">모자 깊이</div>
                <div>{selectedCap.specifications.depth}</div>
                <div className="font-mono text-zinc-500">생산 공정</div>
                <div>{selectedCap.specifications.origin}</div>
              </div>
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={handleAddProductToCart}
              className="w-full flex items-center justify-center gap-3 bg-[#FF4E00] hover:bg-[#F5F5F0] hover:text-black text-white font-mono text-xs font-bold tracking-widest py-4 transition-all duration-300 cursor-pointer"
              id="add-to-cart-original-btn"
            >
              <ShoppingCart className="w-4 h-4" />
              ADD TO CART
            </button>
          </div>
        </div>
      </section>

      {/* 2. CUSTOM LAB SECTION (INTERACTIVE PREVIEW) */}
      <section id="custom" className="relative py-24 px-6 border-t border-[#F5F5F0]/10 bg-[#0A0A0A]">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#FF4E00]/5 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="text-[#FF4E00] font-mono text-xs font-bold tracking-widest uppercase mb-3">
              Craft Your Identity
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tighter text-[#F5F5F0] uppercase italic mb-4">
              CUSTOM LAB
            </h2>
            <p className="text-sm text-[#F5F5F0]/70 font-serif italic max-w-xl">
              "어떤 컬러와 질감으로 당신의 앞길을 개척할 것인가요? 모자의 베이스 원단과 입체 3D 자수의 실 컬러를 직접 디자인해 보세요."
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Dynamic 2D SVG Cap Mockup Generator (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div 
                className="relative w-full max-w-[450px] aspect-square rounded-sm flex items-center justify-center p-8 border border-[#F5F5F0]/10 shadow-2xl transition-all duration-500 overflow-hidden"
                style={{ 
                  background: "radial-gradient(circle at center, #3F3F46 0%, #111112 100%)"
                }}
              >
                {/* Visual Label */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-[#F5F5F0]/40 tracking-wider">
                  PREVIEW: VIRTUAL PROTOTYPE
                </div>

                {/* Simulated Baseball Cap Vector Structure using SVG */}
                <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] transition-all duration-500">
                  <defs>
                    <radialGradient id="cap-shadow" cx="50%" cy="85%" r="45%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="cap-depth" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>

                  {/* Drop Shadow */}
                  <ellipse cx="200" cy="340" rx="140" ry="25" fill="url(#cap-shadow)" />

                  {/* 1. Cap Crown Panel (Back side shape) */}
                  <path 
                    d="M 100 240 Q 80 180 120 120 Q 200 60 280 120 Q 320 180 300 240 Z" 
                    fill={customFabric.hex} 
                    className="transition-colors duration-500"
                  />
                  <path 
                    d="M 100 240 Q 80 180 120 120 Q 200 60 280 120 Q 320 180 300 240 Z" 
                    fill="url(#cap-depth)" 
                    className="mix-blend-overlay pointer-events-none"
                  />

                  {/* Seams Panel Lines */}
                  <path d="M 200 80 Q 200 160 200 240" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path d="M 200 80 Q 140 140 100 240" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path d="M 200 80 Q 260 140 300 240" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />

                  {/* 2. Cap Brim (The Visor) */}
                  <path 
                    d="M 90 235 Q 150 220 200 220 Q 250 220 310 235 Q 350 285 200 285 Q 50 285 90 235 Z" 
                    fill={customFabric.hex} 
                    filter="brightness(0.85)"
                    className="transition-colors duration-500"
                  />
                  <path 
                    d="M 90 235 Q 150 220 200 220 Q 250 220 310 235 Q 350 285 200 285 Q 50 285 90 235 Z" 
                    fill="url(#cap-depth)" 
                    className="mix-blend-overlay pointer-events-none"
                  />
                  
                  {/* Brim Stitches */}
                  <path d="M 100 245 Q 150 232 200 232 Q 250 232 300 245" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                  <path d="M 108 253 Q 150 242 200 242 Q 250 242 292 253" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" fill="none" />

                  {/* 3. Top Button */}
                  <circle cx="200" cy="76" r="10" fill={customFabric.hex} filter="brightness(0.7)" className="transition-colors duration-500" />

                  {/* 4. MAIN EMBROIDERY CHINESE CHARACTERS '先行' */}
                  <g transform="translate(200, 142)" className="transition-all duration-500">
                    {/* Shadow for 3D effect */}
                    <text 
                      x="0" 
                      y="0" 
                      fill="#000000" 
                      fontFamily="'Zhi Mang Xing', cursive, sans-serif" 
                      fontSize="76" 
                      textAnchor="middle" 
                      opacity="0.65"
                      style={{ filter: "blur(1px)", transform: "translate(1.5px, 2.5px)" }}
                    >
                      先行
                    </text>
                    {/* Real Embroid Stroke */}
                    <text 
                      x="0" 
                      y="0" 
                      fill={customEmbroidery.hex} 
                      fontFamily="'Zhi Mang Xing', cursive, sans-serif" 
                      fontSize="76" 
                      textAnchor="middle" 
                      className="transition-colors duration-500"
                    >
                      先行
                    </text>
                  </g>

                  {/* 5. EMBROIDERY ENGLISH TEXT 'WHO MOVES FIRST' */}
                  <text 
                    x="200" 
                    y="185" 
                    fill={customEmbroidery.hex === "#09090b" ? "#ffffff" : "#FF4E00"} // secondary styling or default accent brand orange
                    fontFamily="Space Grotesk, sans-serif" 
                    fontWeight="bold" 
                    fontSize="13" 
                    letterSpacing="3.5" 
                    textAnchor="middle"
                    className="transition-colors duration-500 font-display font-bold"
                  >
                    WHO MOVES FIRST
                  </text>

                  {/* Rear custom text rendering if any */}
                  {customText && (
                    <g transform="translate(200, 265)">
                      <rect x="-65" y="-14" width="130" height="20" rx="3" fill="#000" opacity="0.6" />
                      <text 
                        fill="#fff" 
                        fontSize="7" 
                        fontFamily="JetBrains Mono" 
                        textAnchor="middle" 
                        letterSpacing="1"
                      >
                        REAR: {customText.toUpperCase()}
                      </text>
                    </g>
                  )}
                </svg>

                {/* Spec details in preview */}
                <div className="absolute bottom-4 left-4 flex flex-col font-mono text-[9px] text-zinc-500 space-y-1">
                  <span>BASE: {customFabric.name.toUpperCase()}</span>
                  <span>THREAD: {customEmbroidery.name.toUpperCase()}</span>
                </div>
              </div>

              {/* Notice */}
              <div className="flex items-center gap-2 mt-4 text-xs text-zinc-500 font-sans">
                <HelpCircle className="w-4 h-4 text-zinc-600" />
                <span>3D 입체 자수의 자수 질감과 로고 실루엣을 시뮬레이터로 사전 설계해 볼 수 있습니다.</span>
              </div>
            </div>

            {/* Right: Custom Control Desk Panel (5 Cols) */}
            <div className="lg:col-span-5 space-y-8 glass-panel p-8 border border-[#F5F5F0]/10 rounded-sm">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1 bg-[#FF4E00]/10 text-[#FF4E00] text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-sm">
                  <Sliders className="w-3.5 h-3.5" />
                  CUSTOM ENGINE V1.0
                </div>
                <h3 className="text-2xl font-display font-extrabold tracking-tighter text-[#F5F5F0] uppercase italic">
                  CUSTOM CONTROL DESK
                </h3>
                <p className="text-xs text-[#F5F5F0]/50 font-sans">
                  기본 사양을 탈피하여 당신의 개성을 수놓으십시오. 각 부품을 터치하면 가상 샘플이 즉시 변경됩니다.
                </p>
              </div>

              <hr className="border-[#F5F5F0]/10" />

              {/* Step 1: Fabric Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold tracking-widest text-zinc-400">
                  STEP 1: BASE FABRIC COLOR (원단 색상)
                </label>
                <div className="flex flex-wrap gap-3">
                  {fabricColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setCustomFabric(color)}
                      className={`relative w-9 h-9 rounded-full border transition-all flex items-center justify-center hover:scale-110 cursor-pointer focus:outline-none ${
                        customFabric.name === color.name 
                          ? "border-transparent ring-2 ring-[#FF4E00] ring-offset-2 ring-offset-[#111112] scale-105 shadow-lg shadow-[#FF4E00]/10" 
                          : "border-white/20 hover:border-white/40"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      id={`custom-fabric-${color.name.split(" ")[0]}`}
                    >
                      {customFabric.name === color.name && (
                        <Check className={`w-4 h-4 ${color.hex === "#f4f4f5" ? "text-black" : "text-white"}`} />
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 font-medium">
                  선택됨: <span className="text-white font-bold">{customFabric.name}</span>
                </div>
              </div>

              {/* Step 2: Thread/Embroidery Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold tracking-widest text-zinc-400">
                  STEP 2: 3D EMBROIDERY THREAD (자수 실 색상)
                </label>
                <div className="flex flex-wrap gap-3">
                  {embroideryColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setCustomEmbroidery(color)}
                      className={`relative w-9 h-9 rounded-full border transition-all flex items-center justify-center hover:scale-110 cursor-pointer focus:outline-none ${
                        customEmbroidery.name === color.name 
                          ? "border-transparent ring-2 ring-[#FF4E00] ring-offset-2 ring-offset-[#111112] scale-105 shadow-lg shadow-[#FF4E00]/10" 
                          : "border-white/20 hover:border-white/40"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      id={`custom-embroidery-${color.name.split(" ")[0]}`}
                    >
                      {customEmbroidery.name === color.name && (
                        <Check className={`w-4 h-4 ${color.hex === "#ffffff" ? "text-black" : "text-white"}`} />
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 font-medium">
                  선택됨: <span className="text-white font-bold">{customEmbroidery.name}</span>
                </div>
              </div>

              {/* Step 3: Rear custom text (Option) */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold tracking-widest text-zinc-400">
                  STEP 3: REAR ENGRAVED TEXT (뒷면 한글/영문 이니셜 각인 - 선택)
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="예: FIRST, BOLD, 1997"
                  className="w-full bg-[#151515] border border-[#F5F5F0]/10 rounded-sm py-3 px-4 text-xs font-mono text-white focus:outline-none focus:border-[#FF4E00] transition-colors"
                  id="custom-text-input"
                />
                <p className="text-[10px] text-zinc-500 font-sans">
                  * 뒷면 조절 끈 위에 각인 자수가 정교하게 추가 수놓아집니다. (최대 12자 영문/숫자 권장)
                </p>
              </div>

              {/* Step 4: Size Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold tracking-widest text-zinc-400">
                  STEP 4: CUSTOM SIZE FIT (사이즈 피팅)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCustomSize("Standard")}
                    className={`py-2 px-3 text-xs font-mono font-bold border rounded-sm transition-all cursor-pointer ${
                      customSize === "Standard"
                        ? "border-[#FF4E00] bg-[#FF4E00]/10 text-white"
                        : "border-[#F5F5F0]/10 hover:border-[#F5F5F0]/20 text-zinc-500"
                    }`}
                    id="custom-size-std"
                  >
                    STANDARD FIT
                  </button>
                  <button
                    onClick={() => setCustomSize("Large")}
                    className={`py-2 px-3 text-xs font-mono font-bold border rounded-sm transition-all cursor-pointer ${
                      customSize === "Large"
                        ? "border-[#FF4E00] bg-[#FF4E00]/10 text-white"
                        : "border-[#F5F5F0]/10 hover:border-[#F5F5F0]/20 text-zinc-500"
                    }`}
                    id="custom-size-lrg"
                  >
                    OVER LARGE
                  </button>
                </div>
              </div>

              {/* Price & Cart Trigger */}
              <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-mono text-zinc-500">CUSTOM LAB 제작 비용</span>
                  <span className="text-xl font-mono font-bold text-[#FF4E00]">49,000원</span>
                </div>
                
                <button
                  onClick={handleAddCustomToCart}
                  className="flex items-center gap-2 bg-[#FF4E00] hover:bg-[#F5F5F0] hover:text-black text-white font-mono text-xs font-bold tracking-widest px-6 py-3.5 transition-all cursor-pointer"
                  id="add-custom-cart-btn"
                >
                  <ShoppingCart className="w-4 h-4" />
                  CUSTOM CHECK-IN
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#151515] border border-[#FF4E00] text-white px-5 py-4 rounded-sm flex items-center space-x-3 shadow-2xl max-w-sm"
          >
            <div className="p-1 bg-[#FF4E00] rounded-full text-black">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-xs font-sans font-medium">
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
