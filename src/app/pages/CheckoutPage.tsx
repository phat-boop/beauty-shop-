import { Link } from "react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function CartPage() {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    cartTotal,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
  } = useApp();

  const remainingForFreeShipping = Math.max(
    freeShippingThreshold - cartSubtotal,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-stone-950">Giỏ hàng trống</h1>
        <p className="mt-4 text-stone-600">
          Hãy khám phá các sản phẩm làm đẹp cao cấp dành cho bạn.
        </p>
        <Link
          to="/san-pham"
          className="mt-8 inline-flex rounded-full bg-rose-600 px-8 py-3 font-semibold text-white hover:bg-rose-700"
        >
          Mua sắm ngay
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold text-stone-950">Giỏ hàng</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-3xl border border-rose-100 bg-white p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.nameVi}
                className="size-28 rounded-2xl object-cover"
              />

              <div className="flex flex-1 flex-col">
                <div className="flex gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                      {item.brand}
                    </p>
                    <h2 className="mt-1 font-bold text-stone-950">
                      {item.nameVi}
                    </h2>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto rounded-full p-2 text-stone-400 hover:bg-rose-50 hover:text-rose-700"
                    aria-label="Xóa sản phẩm"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="flex items-center rounded-full border border-rose-100">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-10 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  <strong className="text-rose-700">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Tóm tắt đơn hàng</h2>

          {remainingForFreeShipping > 0 ? (
            <p className="mt-4 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">
              Mua thêm {formatPrice(remainingForFreeShipping)} để được miễn phí vận chuyển.
            </p>
          ) : (
            <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">
              Đơn hàng của bạn đã được miễn phí vận chuyển.
            </p>
          )}

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Vận chuyển</span>
              <strong>{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</strong>
            </div>
            <div className="border-t border-rose-100 pt-3">
              <div className="flex justify-between text-lg">
                <span className="font-bold">Tổng cộng</span>
                <strong className="text-rose-700">{formatPrice(cartTotal)}</strong>
              </div>
            </div>
          </div>

          <Link
            to="/thanh-toan"
            className="mt-6 flex w-full justify-center rounded-full bg-rose-600 py-3 font-semibold text-white hover:bg-rose-700"
          >
            Tiến hành thanh toán
          </Link>
        </aside>
      </div>
    </section>
  );
}