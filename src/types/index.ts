// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
  createdAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  wishlist: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}