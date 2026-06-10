import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import {
  Heart,
  Minus,
  Plus,
  RefreshCw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { products } from "../data/products";
import { useApp } from "../context/AppContext";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

const reviews = [
  {
    id: 1,
    user: "Nguyễn Thị A",
    rating: 5,
    comment: "Sản phẩm tuyệt vời, cấp ẩm tốt và đóng gói rất đẹp.",
    date: "2026-05-15",
  },
  {
    id: 2,
    user: "Trần Minh B",
    rating: 4,
    comment: "Chất lượng tốt, giao hàng nhanh, mùi hương dễ chịu.",
    date: "2026-05-10",
  },
  {
    id: 3,
    user: "Lê Thị C",
    rating: 5,
    comment: "Mình đã dùng một tuần và da mềm hơn rõ rệt.",
    date: "2026-05-05",
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const product = products.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-stone-950">
          Không tìm thấy sản phẩm
        </h1>
        <Link
          to="/san-pham"
          className="mt-8 inline-flex rounded-full bg-rose-600 px-8 py-3 font-semibold text-white"
        >
          Quay lại danh sách sản phẩm
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-[2rem] bg-rose-50">
            <img
              src={product.images[selectedImage] ?? product.image}
              alt={product.nameVi}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-2xl border-2 ${
                  selectedImage === index ? "border-rose-600" : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.nameVi} ${index + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-600">
            {product.brand}
          </p>

          <h1 className="mt-3 text-4xl font-bold text-stone-950">
            {product.nameVi}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-stone-600">
            <span className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`size-5 ${
                    index < Math.round(product.rating) ? "fill-current" : ""
                  }`}
                />
              ))}
            </span>
            <span>{product.rating}</span>
            <span>({product.reviewCount} đánh giá)</span>
            <span>Đã bán {product.sold}</span>
          </div>

          <div className="mt-6 rounded-3xl bg-rose-50 p-5">
            {product.flashSale && (
              <p className="mb-2 font-bold text-rose-700">⚡ FLASH SALE</p>
            )}

            <div className="flex flex-wrap items-baseline gap-3">
              <strong className="text-3xl text-rose-700">
                {formatPrice(product.price)}
              </strong>

              {product.originalPrice && (
                <span className="text-lg text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}

              {(product.discount || product.flashSale) && (
                <span className="rounded-full bg-rose-600 px-3 py-1 text-sm font-semibold text-white">
                  -
                  {product.flashSale?.discountPercent ??
                    product.discount}
                  %
                </span>
              )}
            </div>
          </div>

          <p className="mt-6 leading-7 text-stone-600">{product.descriptionVi}</p>

          <div className="mt-6">
            <h2 className="font-bold">Số lượng</h2>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex rounded-full border border-rose-100 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="p-3"
                >
                  <Minus className="size-4" />
                </button>
                <input
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(1, Number(event.target.value) || 1))
                  }
                  className="w-14 border-x border-rose-100 text-center outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="p-3"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <span className="text-sm text-stone-500">
                {product.stock} sản phẩm có sẵn
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => addToCart(product, quantity)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-rose-600 px-8 py-4 font-semibold text-white hover:bg-rose-700"
            >
              <ShoppingCart className="size-5" />
              Thêm vào giỏ
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`rounded-full border-2 p-4 ${
                isInWishlist(product.id)
                  ? "border-rose-600 bg-rose-50 text-rose-600"
                  : "border-rose-100 hover:border-rose-600"
              }`}
            >
              <Heart
                className={`size-5 ${
                  isInWishlist(product.id) ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <Truck className="size-6 text-rose-600" />
              <p className="mt-2 font-semibold">Miễn phí vận chuyển</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <Shield className="size-6 text-rose-600" />
              <p className="mt-2 font-semibold">Chính hãng 100%</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <RefreshCw className="size-6 text-rose-600" />
              <p className="mt-2 font-semibold">Đổi trả 30 ngày</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 rounded-3xl border border-rose-100 bg-white p-6">
        <div className="flex gap-6 border-b border-rose-100">
          {(["description", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-semibold ${
                activeTab === tab ? "border-b-2 border-rose-600 text-rose-600" : ""
              }`}
            >
              {tab === "description" ? "Mô tả" : "Đánh giá"}
            </button>
          ))}
        </div>

        {activeTab === "description" ? (
          <p className="mt-6 leading-8 text-stone-600">{product.descriptionVi}</p>
        ) : (
          <div className="mt-6 space-y-5">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-2xl bg-rose-50 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <strong>{review.user}</strong>
                  <span className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`size-4 ${
                          index < review.rating ? "fill-current" : ""
                        }`}
                      />
                    ))}
                  </span>
                  <span className="text-sm text-stone-500">{review.date}</span>
                </div>
                <p className="mt-3 text-stone-600">{review.comment}</p>
              </article>
            ))}
          </div>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-14">
          <h2 className="text-3xl font-bold text-stone-950">
            Sản phẩm liên quan
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/san-pham/${item.id}`}
                className="rounded-3xl border border-rose-100 bg-white p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.nameVi}
                  className="aspect-square rounded-2xl object-cover"
                />
                <h3 className="mt-4 font-bold">{item.nameVi}</h3>
                <p className="mt-2 font-bold text-rose-700">
                  {formatPrice(item.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}