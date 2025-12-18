// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  tags: string[];
  createdAt?: Date;
  weight?: number;
  discount?: number;
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

export interface OrderItem {
  category: string;
  price: number;
  updatedAt: string;
  material: string;
  addedAt: string;
  quantity: number;
  productId: string;
  image: string;
  name: string;
  status: string;
}

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  userEmail: string;
  userPhone: string;
  userName: string;
  uid: string;
  totalAmount: number;
  status: string;
  deliveryAddress: {
    address: string;
    city: string;
    country: string;
    id: string;
    isDefault: boolean;
    name: string;
    phone: string;
    state: string;
    type: string;
    zipCode: string;
  };
  items: OrderItem[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}