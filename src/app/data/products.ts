import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Luxury Hydrating Face Cream",
    nameVi: "Kem Dưỡng Ẩm Cao Cấp",
    brand: "La Beauté",
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
      "Kem dưỡng ẩm cao cấp với khả năng cấp ẩm 24 giờ, chiết xuất từ thiên nhiên giúp da mềm mại, săn chắc và tươi trẻ. Công thức đặc biệt phù hợp cho mọi loại da.",
    rating: 4.8,
    reviewCount: 1247,
    stock: 156,
    sold: 3420,
    tags: ["Dưỡng Ẩm", "Cao Cấp", "Bestseller"],
    featured: true,
    flashSale: {
      endTime: new Date(Date.now() + 86400000 * 2),
      discountPercent: 25
    }
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    nameVi: "Serum Vitamin C Sáng Da",
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
      "Serum dưỡng trắng sáng da với Vitamin C tinh khiết, giúp mờ thâm nám, đều màu da và chống lão hóa hiệu quả. Kết cấu nhẹ, thấm nhanh không gây bết dính.",
    rating: 4.9,
    reviewCount: 2134,
    stock: 234,
    sold: 5678,
    tags: ["Vitamin C", "Sáng Da", "Chống Lão Hóa"],
    featured: true
  },
  {
    id: 3,
    name: "Luxury Makeup Essentials",
    nameVi: "Bộ Trang Điểm Cao Cấp",
    brand: "Élégance",
    category: "makeup",
    price: 2350000,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"],
    description: "Complete luxury makeup collection.",
    descriptionVi:
      "Bộ sưu tập trang điểm cao cấp hoàn chỉnh bao gồm phấn nền, má hồng, phấn mắt và son môi. Chất lượng vượt trội, màu sắc tươi tắn và lâu trôi.",
    rating: 4.7,
    reviewCount: 856,
    stock: 89,
    sold: 1234,
    tags: ["Trang Điểm", "Set", "Cao Cấp"],
    featured: true
  }
];

export const categories = [
  { id: "all", name: "Tất Cả Sản Phẩm", count: products.length },
  { id: "skincare", name: "Chăm Sóc Da", count: 1 },
  { id: "makeup", name: "Trang Điểm", count: 1 },
  { id: "serum", name: "Serum", count: 1 }
];

export const brands = Array.from(new Set(products.map((product) => product.brand)));