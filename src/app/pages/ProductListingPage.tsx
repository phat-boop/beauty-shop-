import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Heart, SlidersHorizontal, Star } from "lucide-react";
import { brands, categories, products } from "../data/products";
import { useApp } from "../context/AppContext";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5_000_000);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const categoryParam = searchParams.get("category");
    const saleParam = searchParams.get("sale");

    if (categoryParam) {
      result = result.filter((product) => product.category === categoryParam);
    }

    if (saleParam === "true") {
      result = result.filter((product) => product.flashSale || product.discount);
    }

    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand));
    }

    result = result.filter((product) => product.price <= maxPrice);

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
      default:
        result.sort((a, b) => b.sold - a.sold);
    }

    return result;
  }, [searchParams, selectedCategories, selectedBrands, maxPrice, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  };

  return (
    <div className="bg-[#fffaf7]">
      <section className="bg-gradient-to-br from-rose-50 to-stone-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-600">
            Beauty Collection
          </p>
          <h1 className="mt-3 text-4xl font-bold text-stone-950">Danh Sách Sản Phẩm</h1>
          <p className="mt-3 text-stone-600">Tìm thấy {filteredProducts.length} sản phẩm</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr]">
        <aside
          className={`${
            showFilters ? "fixed inset-0 z-50 overflow-auto bg-white p-6" : "hidden"
          } lg:sticky lg:top-36 lg:block lg:h-fit lg:rounded-3xl lg:border lg:border-rose-100 lg:bg-white lg:p-6`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Bộ lọc</h2>
            <button className="lg:hidden" onClick={() => setShowFilters(false)}>
              Đóng
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 font-semibold">Danh mục</h3>
              <div className="grid gap-3">
                {categories.slice(1).map((category) => (
                  <label key={category.id} className="flex items-center justify-between gap-3">
                    <span>{category.name}</span>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Thương hiệu</h3>
              <div className="grid gap-3">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center justify-between gap-3">
                    <span>{brand}</span>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Giá tối đa</h3>
              <input
                type="range"
                min={0}
                max={5_000_000}
                step={100_000}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="w-full"
              />
              <p className="mt-2 text-sm text-stone-600">{formatPrice(maxPrice)}</p>
            </div>

            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedBrands([]);
                setMaxPrice(5_000_000);
              }}
              className="w-full rounded-full border border-rose-200 px-5 py-3 font-semibold text-rose-700 hover:bg-rose-50"
            >
              Xóa bộ lọc
            </button>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              Lọc
            </button>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="ml-auto rounded-full border border-rose-200 bg-white px-4 py-2 outline-none"
            >
              <option value="popular">Phổ biến</option>
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá thấp - cao</option>
              <option value="price-desc">Giá cao - thấp</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-rose-100 bg-white p-10 text-center">
              Không tìm thấy sản phẩm phù hợp.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link to={`/san-pham/${product.id}`} className="relative block aspect-square overflow-hidden bg-rose-50">
                    <img
                      src={product.image}
                      alt={product.nameVi}
                      className="size-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {product.discount && (
                      <span className="absolute left-4 top-4 rounded-full bg-rose-600 px-3 py-1 text-sm font-semibold text-white">
                        -{product.discount}%
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        toggleWishlist(product);
                      }}
                      className="absolute right-4 top-4 rounded-full bg-white p-2 shadow"
                    >
                      <Heart
                        className={`size-5 ${
                          isInWishlist(product.id) ? "fill-rose-600 text-rose-600" : ""
                        }`}
                      />
                    </button>
                  </Link>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                      {product.brand}
                    </p>

                    <Link to={`/san-pham/${product.id}`}>
                      <h3 className="mt-2 line-clamp-2 min-h-12 font-bold text-stone-950">
                        {product.nameVi}
                      </h3>
                    </Link>

                    <div className="mt-3 flex items-center gap-2 text-sm text-stone-600">
                      <span className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`size-4 ${
                              index < Math.round(product.rating) ? "fill-current" : ""
                            }`}
                          />
                        ))}
                      </span>
                      ({product.reviewCount})
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <strong className="text-lg text-rose-700">{formatPrice(product.price)}</strong>
                      {product.originalPrice && (
                        <span className="text-sm text-stone-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-5 w-full rounded-full bg-rose-600 py-3 font-semibold text-white hover:bg-rose-700"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}