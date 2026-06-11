import { Link } from "react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useApp } from "../context/AppContext";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  if (wishlist.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <Heart className="mx-auto size-14 text-rose-300" />
        <h1 className="mt-6 text-4xl font-bold text-stone-950">
          Danh sách yêu thích trống
        </h1>
        <p className="mt-4 text-stone-600">
          Bạn chưa có sản phẩm yêu thích nào.
        </p>
        <Link
          to="/san-pham"
          className="mt-8 inline-flex rounded-full bg-rose-600 px-8 py-3 font-semibold text-white"
        >
          Khám phá sản phẩm
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold text-stone-950">
        Sản phẩm yêu thích ({wishlist.length})
      </h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((product) => (
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
                <Heart className="size-5 fill-rose-600 text-rose-600" />
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
                type="button"
                onClick={() => addToCart(product, 1)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 py-3 font-semibold text-white"
              >
                <ShoppingCart className="size-5" />
                Thêm vào giỏ
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}