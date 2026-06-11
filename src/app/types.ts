// ─────────────────────────────────────────────
// PRIMITIVE / SHARED VALUE TYPES
// ─────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cod" | "bank" | "wallet";

export type ShippingMethod = "standard" | "express";

export type CouponType = "percentage" | "fixed" | "free_shipping";

export type Language = "vi" | "en";

// ─────────────────────────────────────────────
// PRODUCT
// ─────────────────────────────────────────────

export interface FlashSale {
  endTime: Date;
  discountPercent: number;
}

export interface Product {
  id: number;
  name: string;
  nameVi: string;
  brand: string;
  category: string;
  /** Giá bán hiện tại (đã giảm nếu có). Đây là giá dùng để tính tiền. */
  price: number;
  /** Giá gốc trước khi giảm, chỉ hiển thị nếu có khuyến mãi. */
  originalPrice?: number;
  /** Phần trăm giảm để hiển thị badge, không dùng để tính giá. */
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
  flashSale?: FlashSale;
}

// ─────────────────────────────────────────────
// CART
//
// CartItem KHÔNG extends Product để tránh:
//   - Stale pricing khi giá sản phẩm thay đổi sau khi add to cart
//   - Duplicate toàn bộ Product data vào localStorage
//   - Coupling giữa cart state và product catalog
//
// CartItem chỉ lưu: tham chiếu (productId), giá đã chốt lúc add,
// và quantity. Mọi thông tin hiển thị (tên, ảnh...) lấy từ
// product catalog qua productId khi render.
// ─────────────────────────────────────────────

export interface CartItem {
  productId: number;
  /** Giá đã chốt tại thời điểm add to cart — dùng để tính tổng tiền. */
  unitPrice: number;
  quantity: number;
}

/**
 * CartItem đã được hydrate với Product để render UI.
 * Chỉ tạo trong component/selector, KHÔNG lưu vào storage.
 */
export interface CartItemView extends CartItem {
  product: Product;
  lineTotal: number;
}

// ─────────────────────────────────────────────
// ORDER
//
// OrderLineItem là snapshot bất biến tại thời điểm đặt hàng.
// Lưu đủ tên, giá, ảnh để hiển thị lịch sử mà không phụ thuộc
// vào catalog hiện tại (product có thể bị xóa/đổi giá).
// ─────────────────────────────────────────────

export interface OrderLineItem {
  productId: number;
  /** Snapshot tên sản phẩm tại thời điểm đặt hàng */
  nameVi: string;
  /** Snapshot ảnh tại thời điểm đặt hàng */
  image: string;
  /** Snapshot brand tại thời điểm đặt hàng */
  brand: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  customerId?: number;
  items: OrderLineItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  shippingAddress: Address;
  couponCode?: string;
  estimatedDelivery?: string;
  createdAt: Date;
}

// ─────────────────────────────────────────────
// ADDRESS
// ─────────────────────────────────────────────

export interface Address {
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
}

// ─────────────────────────────────────────────
// USER
//
// User.orders chỉ lưu order IDs để tránh deeply nested
// mutable state. Order đầy đủ lấy từ order store riêng.
// ─────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  /** Chỉ lưu IDs — tránh User object trở thành god object */
  orderIds: string[];
}

// ─────────────────────────────────────────────
// COUPON
// ─────────────────────────────────────────────

export interface Coupon {
  code: string;
  type: CouponType;
  /** Phần trăm (0–100) cho type=percentage, số tiền cho type=fixed */
  value: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate: Date;
  description: string;
  active: boolean;
}

// ─────────────────────────────────────────────
// CATEGORY / REVIEW / BLOG
// ─────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Review {
  id: number;
  productId: number;
  userId?: number;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  images?: string[];
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