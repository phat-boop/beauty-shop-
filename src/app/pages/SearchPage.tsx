import { Link, useSearchParams } from "react-router";
import { Heart, Search, Star } from "lucide-react";
import { products } from "../data/products";
import { useApp } from "../context/AppContext";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const query = searchParams.get("q") ?? "";

  const results = products.filter((product) => {
    const keyword = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(keyword) ||
      product.nameVi.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword) ||
      product.tags.some((tag) => tag.toLowerCase().includes(keyword))
    );
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold text-stone-950">Tìm kiếm</h1>

      <div className="relative mt-6 max-w-2xl">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
        <input
          value={query}
          onChange={(event) => setSearchParams({ q: event.target.value })}
          placeholder="Tìm sản phẩm, thương hiệu..."
          className="w-full rounded-full border border-rose-100 bg-white py-4 pl-12 pr-5 outline-none focus:border-rose-300"
        />
      </div>

      <p className="mt-6 text-stone-600">
        Tìm thấy {results.length} kết quả cho “{query}”
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm"
          >
            <Link to={`/san-pham/${product.id}`} className="relative block aspect-square">
              <img
                src={product.image}
                alt={product.nameVi}
                className="size-full object-cover"
              />
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
                <h2 className="mt-2 line-clamp-2 font-bold">{product.nameVi}</h2>
              </Link>

              <div className="mt-3 flex items-center gap-1 text-sm text-stone-600">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {product.rating}
              </div>

              <strong className="mt-4 block text-rose-700">
                {formatPrice(product.price)}
              </strong>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full rounded-full bg-rose-600 py-3 font-semibold text-white"
              >
                Thêm vào giỏ
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}