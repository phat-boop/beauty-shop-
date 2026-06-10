import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { Star, SlidersHorizontal, ChevronDown } from "lucide-react";
import { products, categories, brands } from "../data/products";
import { useApp } from "../context/AppContext";

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category from URL
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      result = result.filter((p) =>
        p.category.toLowerCase().includes(categoryParam.toLowerCase())
      );
    }

    // Filter by flash sale
    if (searchParams.get("sale") === "true") {
      result = result.filter((p) => p.flashSale);
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // popular
        result.sort((a, b) => b.sold - a.sold);
    }

    return result;
  }, [searchParams, selectedCategories, selectedBrands, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Danh Sách Sản Phẩm</h1>
          <p className="text-muted-foreground">
            Tìm thấy {filteredProducts.length} sản phẩm
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-border">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Lọc</span>
          </button>

          <div className="flex items-center space-x-3 ml-auto">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Sắp xếp:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="popular">Phổ Biến</option>
              <option value="newest">Mới Nhất</option>
              <option value="price-asc">Giá Thấp - Cao</option>
              <option value="price-desc">Giá Cao - Thấp</option>
              <option value="rating">Đánh Giá</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block fixed lg:sticky top-0 left-0 z-40 lg:z-0 w-80 lg:w-64 bg-white p-6 rounded-lg border border-border h-screen lg:h-fit overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="text-lg">Bộ Lọc</h3>
              <button onClick={() => setShowFilters(false)}>✕</button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="mb-4">Danh Mục</h3>
              <div className="space-y-2">
                {categories.slice(1).map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, cat.name]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== cat.name)
                          );
                        }
                      }}
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-sm">{cat.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      ({cat.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="mb-4">Thương Hiệu</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(
                            selectedBrands.filter((b) => b !== brand)
                          );
                        }
                      }}
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="mb-4">Khoảng Giá</h3>
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>0₫</span>
                <span>{priceRange[1].toLocaleString()}₫</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedBrands([]);
                setPriceRange([0, 5000000]);
              }}
              className="w-full px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Xóa Bộ Lọc
            </button>
          </aside>

          {/* Backdrop */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-border p-12 text-center">
                <p className="text-muted-foreground">
                  Không tìm thấy sản phẩm phù hợp
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all group"
                  >
                    <Link
                      to={`/san-pham/${product.id}`}
                      className="block relative aspect-square overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.nameVi}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.discount && (
                        <div className="absolute top-3 left-3 bg-rose-600 text-white px-3 py-1 rounded-full text-sm">
                          -{product.discount}%
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-rose-50"
                      >
                        <svg
                          className={`w-5 h-5 ${
                            isInWishlist(product.id)
                              ? "fill-rose-600 text-rose-600"
                              : "text-gray-600"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </Link>
                    <div className="p-4">
                      <Link to={`/san-pham/${product.id}`}>
                        <p className="text-xs text-muted-foreground mb-1">
                          {product.brand}
                        </p>
                        <h3 className="mb-2 line-clamp-2 min-h-[3rem]">
                          {product.nameVi}
                        </h3>
                      </Link>
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-rose-600 text-xl">
                            {product.price.toLocaleString()}₫
                          </p>
                          {product.originalPrice && (
                            <p className="text-sm text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()}₫
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-rose-600 text-white py-2.5 rounded-lg hover:bg-rose-700 transition-colors"
                      >
                        Thêm Vào Giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
