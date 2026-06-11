import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Luxury Hydrating Face Cream",
    nameVi: "Kem DÆ°á»¡ng áº¨m Cao Cáº¥p",
    brand: "La BeautĂ©",
    category: "skincare",
    price: 1250000,
    originalPrice: 1550000,
    discount: 19,
    image: "https://images.unsplash.com/photo-1772191530787-b9546da02fbc?w=600",
    images: [
      "https://images.unsplash.com/photo-1772191530787-b9546da02fbc?w=600",
      "https://images.unsplash.com/photo-1770048792338-aaf6a575305f?w=600"
    ],
    description: "Premium moisturizing cream with 24-hour hydration.",
    descriptionVi:
      "Kem dÆ°á»¡ng áº©m cao cáº¥p vá»›i kháº£ nÄƒng cáº¥p áº©m 24 giá», chiáº¿t xuáº¥t tá»« thiĂªn nhiĂªn giĂºp da má»m máº¡i, sÄƒn cháº¯c vĂ  tÆ°Æ¡i tráº». CĂ´ng thá»©c Ä‘áº·c biá»‡t phĂ¹ há»£p cho má»i loáº¡i da.",
    rating: 4.8,
    reviewCount: 1247,
    stock: 156,
    sold: 3420,
    tags: ["DÆ°á»¡ng áº¨m", "Cao Cáº¥p", "Bestseller"],
    featured: true,
    flashSale: {
      endTime: new Date(Date.now() + 86400000 * 2),
      discountPercent: 25
    }
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    nameVi: "Serum Vitamin C SĂ¡ng Da",
    brand: "GlowLux",
    category: "serum",
    price: 890000,
    originalPrice: 1200000,
    discount: 26,
    image: "https://images.unsplash.com/photo-1748543668646-e81cda0890f3?w=600",
    images: [
      "https://images.unsplash.com/photo-1748543668646-e81cda0890f3?w=600",
      "https://images.unsplash.com/photo-1697201358649-ca8e6ecc3ac0?w=600"
    ],
    description: "Brightening serum with pure Vitamin C.",
    descriptionVi:
      "Serum dÆ°á»¡ng tráº¯ng sĂ¡ng da vá»›i Vitamin C tinh khiáº¿t, giĂºp má» thĂ¢m nĂ¡m, Ä‘á»u mĂ u da vĂ  chá»‘ng lĂ£o hĂ³a hiá»‡u quáº£. Káº¿t cáº¥u nháº¹, tháº¥m nhanh khĂ´ng gĂ¢y báº¿t dĂ­nh.",
    rating: 4.9,
    reviewCount: 2134,
    stock: 234,
    sold: 5678,
    tags: ["Vitamin C", "SĂ¡ng Da", "Chá»‘ng LĂ£o HĂ³a"],
    featured: true
  },
  {
    id: 3,
    name: "Luxury Makeup Essentials",
    nameVi: "Bá»™ Trang Äiá»ƒm Cao Cáº¥p",
    brand: "Ă‰lĂ©gance",
    category: "makeup",
    price: 2350000,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"],
    description: "Complete luxury makeup collection.",
    descriptionVi:
      "Bá»™ sÆ°u táº­p trang Ä‘iá»ƒm cao cáº¥p hoĂ n chá»‰nh bao gá»“m pháº¥n ná»n, mĂ¡ há»“ng, pháº¥n máº¯t vĂ  son mĂ´i. Cháº¥t lÆ°á»£ng vÆ°á»£t trá»™i, mĂ u sáº¯c tÆ°Æ¡i táº¯n vĂ  lĂ¢u trĂ´i.",
    rating: 4.7,
    reviewCount: 856,
    stock: 89,
    sold: 1234,
    tags: ["Trang Äiá»ƒm", "Set", "Cao Cáº¥p"],
    featured: true
  }
];

const countByCategory = (categoryId: string) =>
  products.filter((product) => product.category === categoryId).length;

export const categories = [
  { id: "all", name: "Táº¥t Cáº£ Sáº£n Pháº©m", count: products.length },
  { id: "skincare", name: "ChÄƒm SĂ³c Da", count: countByCategory("skincare") },
  { id: "makeup", name: "Trang Äiá»ƒm", count: countByCategory("makeup") },
  { id: "serum", name: "Serum", count: countByCategory("serum") }
];

export const brands = Array.from(new Set(products.map((product) => product.brand)));