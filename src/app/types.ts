export interface Product {
  id: number;
  name: string;
  nameVi: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  description: string;
  descriptionVi: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sold: number;
  tags: string[];
  featured: boolean;
  flashSale?: {
    endTime: Date;
    discountPercent: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  images?: string[];
}

export interface Order {
  id: string;
  customerId: number;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  createdAt: Date;
  estimatedDelivery?: Date;
}

export interface Address {
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  expiryDate: Date;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  titleVi: string;
  excerpt: string;
  excerptVi: string;
  content: string;
  contentVi: string;
  image: string;
  author: string;
  category: string;
  publishedAt: Date;
  views: number;
}
