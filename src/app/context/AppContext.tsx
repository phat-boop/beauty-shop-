import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as productCatalog } from "../data/products";
import type {
  CartItem,
  CartItemView,
  Language,
  Product,
  User,
} from "../types";

// ─────────────────────────────────────────────
// COUPON CONFIG
// Tách ra đây để dễ thay bằng API call sau này.
// ─────────────────────────────────────────────

const VALID_COUPONS = ["SAVE10", "BEAUTY50", "FREESHIP"] as const;

function calcDiscount(couponCode: string, subtotal: number): number {
  if (subtotal === 0) return 0;
  if (couponCode === "SAVE10") return Math.round(subtotal * 0.1);
  if (couponCode === "BEAUTY50") return Math.min(50_000, subtotal);
  return 0;
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const FREE_SHIPPING_THRESHOLD = 1_500_000;
const STANDARD_SHIPPING_FEE = 30_000;

// ─────────────────────────────────────────────
// STORAGE HELPERS
// ─────────────────────────────────────────────

const CART_STORAGE_KEY = "beauty-shop-cart";
const WISHLIST_STORAGE_KEY = "beauty-shop-wishlist-ids";
const COUPON_STORAGE_KEY = "beauty-shop-coupon";
const LANGUAGE_STORAGE_KEY = "beauty-shop-language";
const USER_STORAGE_KEY = "beauty-shop-user";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures (private browsing, quota exceeded)
  }
}

// ─────────────────────────────────────────────
// CONTEXT TYPE
// ─────────────────────────────────────────────

interface AppContextType {
  // Catalog
  products: Product[];

  // Cart — raw items (productId + unitPrice + quantity)
  cart: CartItem[];
  // Cart — hydrated views for rendering
  cartViews: CartItemView[];

  // Cart derived
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  shippingFee: number;
  cartTotal: number;

  // Coupon
  couponCode: string;
  discountAmount: number;
  applyCoupon: (code: string) => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // Wishlist — stored as product IDs only
  wishlistIds: number[];
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // ── Cart: lưu CartItem[] (productId + unitPrice + quantity) ──
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(CART_STORAGE_KEY, [])
  );

  // ── Wishlist: lưu number[] (product IDs) để tối ưu storage ──
  const [wishlistIds, setWishlistIds] = useState<number[]>(() =>
    readStorage<number[]>(WISHLIST_STORAGE_KEY, [])
  );

  const [couponCode, setCouponCode] = useState<string>(() =>
    readStorage<string>(COUPON_STORAGE_KEY, "")
  );

  const [language, setLanguageState] = useState<Language>(() =>
    readStorage<Language>(LANGUAGE_STORAGE_KEY, "vi")
  );

  const [currentUser, setCurrentUserState] = useState<User | null>(() =>
    readStorage<User | null>(USER_STORAGE_KEY, null)
  );

  // ── Persist side effects ──
  useEffect(() => { writeStorage(CART_STORAGE_KEY, cart); }, [cart]);
  useEffect(() => { writeStorage(WISHLIST_STORAGE_KEY, wishlistIds); }, [wishlistIds]);
  useEffect(() => { writeStorage(COUPON_STORAGE_KEY, couponCode); }, [couponCode]);

  // ── Setters ──
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    writeStorage(LANGUAGE_STORAGE_KEY, lang);
  }, []);

  const setCurrentUser = useCallback((user: User | null) => {
    setCurrentUserState(user);
    writeStorage(USER_STORAGE_KEY, user);
  }, []);

  // ── Cart actions ──
  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const safeQty = Math.max(1, quantity);
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + safeQty }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          unitPrice: product.price, // chốt giá tại thời điểm add
          quantity: safeQty,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    setCouponCode("");
  }, []);

  // ── Wishlist actions ──
  const toggleWishlist = useCallback((product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  // ── Coupon ──
  const applyCoupon = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    setCouponCode(
      normalized && (VALID_COUPONS as readonly string[]).includes(normalized)
        ? normalized
        : ""
    );
  }, []);

  // ── Derived: hydrate cartViews từ catalog ──
  const cartViews = useMemo<CartItemView[]>(() => {
    return cart.flatMap((item) => {
      const product = productCatalog.find((p) => p.id === item.productId);
      if (!product) return []; // sản phẩm bị xóa khỏi catalog
      return [
        {
          ...item,
          product,
          lineTotal: item.unitPrice * item.quantity,
        },
      ];
    });
  }, [cart]);

  // ── Derived: wishlist Products ──
  const wishlist = useMemo<Product[]>(
    () => productCatalog.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  // ── Derived: totals ──
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cartViews.reduce((sum, v) => sum + v.lineTotal, 0),
    [cartViews]
  );

  const discountAmount = useMemo(
    () => calcDiscount(couponCode, cartSubtotal),
    [couponCode, cartSubtotal]
  );

  const shippingFee = useMemo(() => {
    if (cartSubtotal === 0 || cartSubtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return couponCode === "FREESHIP" ? 0 : STANDARD_SHIPPING_FEE;
  }, [cartSubtotal, couponCode]);

  const cartTotal = useMemo(
    () => Math.max(0, cartSubtotal + shippingFee - discountAmount),
    [cartSubtotal, shippingFee, discountAmount]
  );

  // ── Context value ──
  const value = useMemo<AppContextType>(
    () => ({
      products: productCatalog,
      cart,
      cartViews,
      cartCount,
      cartSubtotal,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      shippingFee,
      cartTotal,
      couponCode,
      discountAmount,
      applyCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      wishlistIds,
      wishlist,
      toggleWishlist,
      isInWishlist,
      language,
      setLanguage,
      currentUser,
      setCurrentUser,
    }),
    [
      cart,
      cartViews,
      cartCount,
      cartSubtotal,
      shippingFee,
      cartTotal,
      couponCode,
      discountAmount,
      applyCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      wishlistIds,
      wishlist,
      toggleWishlist,
      isInWishlist,
      language,
      setLanguage,
      currentUser,
      setCurrentUser,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}