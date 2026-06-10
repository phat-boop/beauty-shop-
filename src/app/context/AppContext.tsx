import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "../data/products";
import type { CartItem, Product } from "../types";

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  shippingFee: number;
  cartTotal: number;
  couponCode: string;
  discountAmount: number;
  applyCoupon: (code: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const CART_STORAGE_KEY = "beauty-shop-cart";
const WISHLIST_STORAGE_KEY = "beauty-shop-wishlist";
const COUPON_STORAGE_KEY = "beauty-shop-coupon";

const FREE_SHIPPING_THRESHOLD = 1_500_000;
const STANDARD_SHIPPING_FEE = 30_000;

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures, such as private browsing restrictions.
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(CART_STORAGE_KEY, [])
  );

  const [wishlist, setWishlist] = useState<Product[]>(() =>
    readStorage<Product[]>(WISHLIST_STORAGE_KEY, [])
  );

  const [couponCode, setCouponCode] = useState(() =>
    readStorage<string>(COUPON_STORAGE_KEY, "")
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    writeStorage(CART_STORAGE_KEY, cart);
  }, [cart]);

  useEffect(() => {
    writeStorage(WISHLIST_STORAGE_KEY, wishlist);
  }, [wishlist]);

  useEffect(() => {
    writeStorage(COUPON_STORAGE_KEY, couponCode);
  }, [couponCode]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const safeQuantity = Math.max(1, quantity);
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        );
      }

      return [...prev, { ...product, quantity: safeQuantity }];
    });

    setCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode("");
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const isInWishlist = (productId: number) =>
    wishlist.some((item) => item.id === productId);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const baseShippingFee =
    cartSubtotal === 0 || cartSubtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_FEE;

  const shippingFee = couponCode === "FREESHIP" ? 0 : baseShippingFee;

  const discountAmount = useMemo(() => {
    if (cartSubtotal === 0) return 0;

    if (couponCode === "SAVE10") {
      return Math.round(cartSubtotal * 0.1);
    }

    if (couponCode === "BEAUTY50") {
      return Math.min(50_000, cartSubtotal);
    }

    return 0;
  }, [cartSubtotal, couponCode]);

  const cartTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  const applyCoupon = (code: string) => {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      setCouponCode("");
      return;
    }

    if (["SAVE10", "BEAUTY50", "FREESHIP"].includes(normalizedCode)) {
      setCouponCode(normalizedCode);
      return;
    }

    setCouponCode("");
  };

  const value = useMemo<AppContextType>(
    () => ({
      products,
      cart,
      wishlist,
      searchQuery,
      selectedCategory,
      sortBy,
      isCartOpen,
      isWishlistOpen,
      cartCount,
      cartSubtotal,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      shippingFee,
      cartTotal,
      couponCode,
      discountAmount,
      applyCoupon,
      setSearchQuery,
      setSelectedCategory,
      setSortBy,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      setCartOpen,
      setWishlistOpen,
    }),
    [
      cart,
      wishlist,
      searchQuery,
      selectedCategory,
      sortBy,
      isCartOpen,
      isWishlistOpen,
      cartCount,
      cartSubtotal,
      shippingFee,
      cartTotal,
      couponCode,
      discountAmount,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
}