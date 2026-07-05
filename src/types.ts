/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CapProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  colorName: string;
  colorHex: string;
  imageUrl: string;
  description: string;
  specifications: {
    material: string;
    size: string;
    brim: string;
    depth: string;
    origin: string;
  };
}

export interface CustomCapConfig {
  fabricColor: string;
  fabricHex: string;
  embroideryColor: string;
  embroideryHex: string;
  size: "Standard" | "Large";
  customText?: string;
}

export interface CartItem {
  id: string; // unique cart line ID
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  colorName: string;
  size: string;
  isCustom: boolean;
  customConfig?: CustomCapConfig;
  quantity: number;
}

export interface GuestPost {
  id: string;
  name: string;
  message: string;
  goal: string;
  createdAt: string;
}

export interface OrderDetails {
  orderNumber: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: string;
}
