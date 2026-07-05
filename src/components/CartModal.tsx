/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, OrderDetails } from "../types";
import { X, Trash2, Plus, Minus, CreditCard, ShieldCheck, ShoppingBag, Receipt, Sparkles } from "lucide-react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartModalProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || cartItems.length === 0) return;

    // Generate random order receipt
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const dateObj = new Date();
    const dateStr = dateObj.toISOString().slice(0, 10).replace(/-/g, "");
    const orderNumber = `SEONHAENG-${dateStr}-${randomNum}`;

    const newOrder: OrderDetails = {
      orderNumber,
      items: [...cartItems],
      totalAmount,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerAddress: address.trim(),
      orderDate: dateObj.toISOString()
    };

    setOrderDetails(newOrder);
    setIsCheckingOut(false);
    onClearCart(); // empties cart after success
  };

  const handleCloseAll = () => {
    setOrderDetails(null);
    setIsCheckingOut(false);
    setName("");
    setPhone("");
    setAddress("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleCloseAll} />

      {/* Main Container */}
      <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-[#F5F5F0]/10 rounded-sm overflow-hidden z-10 max-h-[90vh] flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#F5F5F0]/10 bg-[#151515]">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#FF4E00]" />
            <h3 className="text-sm font-mono font-bold tracking-widest text-white uppercase">
              {orderDetails ? "ORDER SUCCESS" : isCheckingOut ? "DELIVERY REGISTER" : "BAG SUMMARY"}
            </h3>
          </div>
          <button 
            onClick={handleCloseAll}
            className="p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            id="close-cart-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Content Body */}
        <div className="flex-1 overflow-y-auto p-6" id="cart-modal-body">
          <AnimatePresence mode="wait">
            {orderDetails ? (
              /* Scenario 1: Order success Receipt */
              <motion.div
                key="receipt"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Visual success seal */}
                <div className="text-center space-y-2 py-4">
                  <div className="inline-flex p-3 bg-[#FF4E00]/10 text-[#FF4E00] rounded-full mb-2 animate-bounce">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-serif font-extrabold text-[#F5F5F0]">행동을 향한 주문 완료</h4>
                  <p className="text-xs text-zinc-500">선행자의 대열에 합류하신 것을 환영합니다.</p>
                </div>

                {/* Styled Receipt paper */}
                <div className="bg-[#151515] border border-[#F5F5F0]/10 p-5 rounded-sm font-mono text-xs space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF4E00]/10 rounded-bl-full pointer-events-none" />
                  
                  <div className="border-b border-dashed border-[#F5F5F0]/10 pb-3 flex justify-between items-center text-[10px] text-zinc-500">
                    <span>SEONHAENG OFFICIAL RECEIPT</span>
                    <span>No. {orderDetails.orderNumber}</span>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2">
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">ORDERED LIST</span>
                    {orderDetails.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-zinc-300">
                        <span>
                          {item.name} {item.isCustom ? "(CUSTOM)" : `(${item.size})`} x {item.quantity}
                        </span>
                        <span className="font-mono text-white">{(item.price * item.quantity).toLocaleString()}원</span>
                      </div>
                    ))}
                  </div>

                  <hr className="border-dashed border-[#F5F5F0]/10" />

                  {/* Delivery details */}
                  <div className="space-y-2 text-[11px] text-zinc-400">
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">DELIVERY DESTINATION</span>
                    <div>수령인: <span className="text-white">{orderDetails.customerName}</span></div>
                    <div>연락처: <span className="text-white">{orderDetails.customerPhone}</span></div>
                    <div>배송지: <span className="text-white">{orderDetails.customerAddress}</span></div>
                  </div>

                  <hr className="border-dashed border-[#F5F5F0]/10" />

                  {/* Pricing Total */}
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-zinc-400 font-bold">TOTAL VIRTUAL PAY</span>
                    <span className="text-base font-bold text-[#FF4E00] font-mono">
                      {orderDetails.totalAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={handleCloseAll}
                  className="w-full bg-[#FF4E00] hover:bg-[#F5F5F0] hover:text-black text-white font-mono text-xs font-bold py-3.5 tracking-widest transition-colors cursor-pointer"
                  id="receipt-done-btn"
                >
                  CONFIRM RECEIPT (완료)
                </button>
              </motion.div>
            ) : isCheckingOut ? (
              /* Scenario 2: Checkout Form */
              <motion.form
                key="checkout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleCheckoutSubmit}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    RECIPIENT SPECIFICATIONS
                  </h4>
                  <p className="text-xs text-zinc-500">배송에 필요한 실제 수령 정보를 바르게 등록해 주십시오.</p>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    Receiver Name (수령인)
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full bg-[#151515] border border-[#F5F5F0]/10 rounded-sm py-3 px-4 text-xs font-sans text-white focus:outline-none focus:border-[#FF4E00] transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    Contact Phone (연락처)
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full bg-[#151515] border border-[#F5F5F0]/10 rounded-sm py-3 px-4 text-xs font-sans text-white focus:outline-none focus:border-[#FF4E00] transition-colors"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    Delivery Address (배송지 주소)
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="서울특별시 강남구 테헤란로..."
                    className="w-full bg-[#151515] border border-[#F5F5F0]/10 rounded-sm p-4 text-xs font-sans text-white focus:outline-none focus:border-[#FF4E00] transition-colors resize-none"
                  />
                </div>

                <div className="bg-[#151515] p-4 border border-[#F5F5F0]/10 rounded-sm flex items-start space-x-3 text-[11px] text-zinc-500">
                  <ShieldCheck className="w-5 h-5 text-[#FF4E00] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    본 쇼핑몰은 포트폴리오 데모 버전입니다. 입력하신 정보는 로컬 세션 내의 주문 영수증 시뮬레이션용으로만 안전하게 일시 활용되며, 외부 서버로 전송되지 않습니다.
                  </span>
                </div>

                {/* Final Order Price check */}
                <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-500">최종 청구액</span>
                  <span className="text-lg font-bold text-[#FF4E00]">{totalAmount.toLocaleString()}원</span>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="py-3.5 bg-[#151515] hover:bg-zinc-800 border border-[#F5F5F0]/10 text-white font-mono text-xs font-bold tracking-widest transition-colors cursor-pointer"
                    id="checkout-cancel-btn"
                  >
                    BACK TO BAG
                  </button>
                  <button
                    type="submit"
                    className="py-3.5 bg-[#FF4E00] hover:bg-[#F5F5F0] hover:text-black text-white font-mono text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    id="checkout-submit-btn"
                  >
                    <CreditCard className="w-4 h-4" />
                    SUBMIT ORDER
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Scenario 3: General Cart Items List */
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="text-zinc-700 font-mono text-4xl">EMPTY</div>
                    <p className="text-xs text-zinc-500 font-sans max-w-xs mx-auto">
                      장바구니가 비어 있습니다. 셀렉트 샵에서 당신에게 어울리는 고품질 선행 볼캡을 채워 보십시오.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center space-x-4 bg-[#151515] p-4 border border-[#F5F5F0]/10 rounded-sm relative"
                      >
                        {/* Cap Image */}
                        <div className="w-16 h-16 shrink-0 bg-[#0A0A0A] overflow-hidden border border-[#F5F5F0]/10 rounded-sm">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Item Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-sans font-bold text-white truncate pr-4">
                            {item.name}
                          </h4>
                          <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] font-mono text-zinc-500">
                            <span>컬러: {item.colorName.split(" ")[1] || item.colorName}</span>
                            <span>/</span>
                            <span>피팅: {item.size}</span>
                            {item.isCustom && (
                              <>
                                <span>/</span>
                                <span className="text-[#FF4E00]">커스텀제작</span>
                              </>
                            )}
                          </div>
                          <span className="block text-xs font-mono font-semibold text-zinc-300">
                            {(item.price * item.quantity).toLocaleString()}원
                          </span>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex flex-col items-end space-y-2">
                          {/* Trash button */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-zinc-600 hover:text-[#FF4E00] transition-colors cursor-pointer"
                            title="Remove item"
                            id={`remove-item-${item.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Plus Minus */}
                          <div className="flex items-center space-x-2 bg-[#0A0A0A] border border-[#F5F5F0]/10 px-1.5 py-0.5 rounded-sm">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 text-zinc-500 hover:text-white disabled:opacity-30 cursor-pointer"
                              id={`minus-qty-${item.id}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-semibold text-white px-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-zinc-500 hover:text-white cursor-pointer"
                              id={`plus-qty-${item.id}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sticky pricing at bottom when items exist */}
                {cartItems.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-[#F5F5F0]/10 font-mono text-xs">
                    <div className="flex justify-between text-zinc-500">
                      <span>총 수량</span>
                      <span className="text-white">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}개</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-zinc-500">결제 예상 총액</span>
                      <span className="text-xl font-bold text-[#FF4E00]">
                        {totalAmount.toLocaleString()}원
                      </span>
                    </div>

                    {/* Checkout Trigger */}
                    <button
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full flex items-center justify-center gap-2.5 bg-[#FF4E00] hover:bg-[#F5F5F0] hover:text-black text-white font-mono text-xs font-bold py-4 tracking-widest transition-colors cursor-pointer"
                      id="go-to-checkout-btn"
                    >
                      <CreditCard className="w-4 h-4" />
                      PROCEED TO CHECKOUT (구매하기)
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
