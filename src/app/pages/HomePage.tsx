import { Link } from "react-router";
import {
  ArrowRight,
  HeadphonesIcon,
  Heart,
  ShieldCheck,
  Star,
  TruckIcon,
} from "lucide-react";

import { products } from "../data/products";
import { useApp } from "../context/AppContext";
import FlashSaleCountdown from "../components/customer/FlashSaleCountdown";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function HomePage() {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 8);

  const flashSaleProducts = products.filter((product) => product.flashSale);

  return (
    <div>
      <section className="bg-gradient-to-br from-[#fff1f4] via-[#fffaf7] to-[#f7ebe7] px-4 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-600">
              Bộ sưu tập mùa hè 2026
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight text-stone-950 lg:text-7xl">
              Khám phá vẻ đẹp tự nhiên của bạn
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              Mỹ phẩm cao cấp được tuyển chọn kỹ lưỡng cho chăm sóc da, trang
              điểm và trải nghiệm spa tại nhà.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/san-pham"
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-8 py-4 font-semibold text-white hover:bg-rose-700"
              >
                Mua sắm ngay
                <ArrowRight className="size-5" />
              </Link>

              <Link
                to="/blog"
                className="inline-flex rounded-full border border-rose-200 px-8 py-4 font-semibold text-rose-700 hover:bg-white"
              >
                Blog làm đẹp
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <img
                key={product.id}
                src={product.image}
                alt={product.nameVi}
                className={`aspect-[4/5] rounded-[2rem] object-cover shadow-lg ${
                  index % 2 === 1 ? "mt-10" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <TruckIcon className="size-8 text-rose-600" />
          <h3 className="mt-4 text-lg font-bold">Miễn phí vận chuyển</h3>
          <p className="mt-2 text-stone-600">Cho đơn hàng từ 1.500.000₫</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <ShieldCheck className="size-8 text-rose-600" />
          <h3 className="mt-4 text-lg font-bold">100% chính hãng</h3>
          <p className="mt-2 text-stone-600">Cam kết nguồn gốc rõ ràng.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <HeadphonesIcon className="size-8 text-rose-600" />
          <h3 className="mt-4 text-lg font-bold">Hỗ trợ 24/7</h3>
          <p className="mt-2 text-stone-600">Tư vấn chăm sóc da tận tâm.</p>
        </div>
      </section>

      {flashSaleProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="rounded-[2rem] bg-[#2b1813] p-6 text-white md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-semibold text-rose-200">⚡ Flash Sale</p>
                <h2 className="mt-2 text-3xl font-bold">Ưu đãi hôm nay</h2>
              </div>

              <Link
                to="/san-pham?sale=true"
                className="font-semibold text-rose-200"
              >
                Xem tất cả
              </Link>
            </div>

            <div className="mt-6 max-w-xl">
              <FlashSaleCountdown />
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {flashSaleProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/san-pham/${product.id}`}
                  className="rounded-3xl bg-white p-4 text-stone-950 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.nameVi}
                      className="aspect-square w-full rounded-2xl object-cover"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-sm font-semibold text-white">
                      -{product.flashSale?.discountPercent}%
                    </span>
                  </div>

                  <h3 className="mt-4 line-clamp-2 font-bold">
                    {product.nameVi}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <strong className="text-rose-700">
                      {formatPrice(product.price)}
                    </strong>

                    {product.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-stone-500">
                    Đã bán {product.sold}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
              Editor&apos;s pick
            </p>

            <h2 className="mt-2 text-3xl font-bold text-stone-950">
              Sản phẩm nổi bật
            </h2>

            <p className="mt-2 text-stone-600">
              Bộ sưu tập mỹ phẩm cao cấp được tuyển chọn kỹ lưỡng.
            </p>
          </div>

          <Link
            to="/san-pham"
            className="inline-flex items-center gap-2 font-semibold text-rose-700"
          >
            Xem tất cả
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                to={`/san-pham/${product.id}`}
                className="relative block aspect-square"
              >
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
                  aria-label="Thêm vào yêu thích"
                >
                  <Heart
                    className={`size-5 ${
                      isInWishlist(product.id)
                        ? "fill-rose-600 text-rose-600"
                        : ""
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
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  {product.rating} ({product.reviewCount})
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <strong className="text-lg text-rose-700">
                    {formatPrice(product.price)}
                  </strong>

                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="mt-5 w-full rounded-full bg-rose-600 py-3 font-semibold text-white hover:bg-rose-700"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}