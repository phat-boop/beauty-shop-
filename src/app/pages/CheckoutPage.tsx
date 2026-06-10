import { useState } from "react";
import { Link } from "react-router";
import { CreditCard, MapPin, ShieldCheck, Tag } from "lucide-react";
import { useApp } from "../context/AppContext";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    cartTotal,
    couponCode,
    discountAmount,
    applyCoupon,
    clearCart,
  } = useApp();

  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponMessage, setCouponMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleApplyCoupon = () => {
    const normalizedCode = couponInput.trim().toUpperCase();

    applyCoupon(normalizedCode);

    if (!normalizedCode) {
      setCouponMessage("Vui lòng nhập mã giảm giá.");
      return;
    }

    if (["SAVE10", "BEAUTY50", "FREESHIP"].includes(normalizedCode)) {
      setCouponMessage(`Đã áp dụng mã ${normalizedCode}.`);
      return;
    }

    setCouponMessage("Mã giảm giá không hợp lệ.");
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-10 shadow-sm">
          <ShieldCheck className="mx-auto size-14 text-emerald-600" />
          <h1 className="mt-5 text-4xl font-bold text-stone-950">
            Đặt hàng thành công
          </h1>
          <p className="mt-4 text-stone-600">
            Cảm ơn bạn đã mua sắm tại Beauty Shop. Đơn hàng mẫu của bạn đã được
            ghi nhận.
          </p>
          <Link
            to="/san-pham"
            className="mt-8 inline-flex rounded-full bg-rose-600 px-8 py-3 font-semibold text-white hover:bg-rose-700"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-stone-950">
          Chưa có sản phẩm để thanh toán
        </h1>
        <p className="mt-4 text-stone-600">
          Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán.
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
      <div>
        <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
          Secure checkout
        </p>
        <h1 className="mt-2 text-4xl font-bold text-stone-950">Thanh toán</h1>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <MapPin className="size-5 text-rose-600" />
              Thông tin giao hàng
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                placeholder="Họ và tên"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                placeholder="Số điện thoại"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                placeholder="Email"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                placeholder="Tỉnh / Thành phố"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                placeholder="Quận / Huyện"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                placeholder="Phường / Xã"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <textarea
                placeholder="Địa chỉ cụ thể"
                className="min-h-28 rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300 md:col-span-2"
              />
            </div>
          </section>

          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <CreditCard className="size-5 text-rose-600" />
              Phương thức thanh toán
            </h2>

            <div className="mt-5 grid gap-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-rose-100 p-4">
                <input type="radio" name="payment" defaultChecked />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-rose-100 p-4">
                <input type="radio" name="payment" />
                <span>Chuyển khoản ngân hàng</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-rose-100 p-4">
                <input type="radio" name="payment" />
                <span>Ví điện tử / thẻ nội địa</span>
              </label>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Đơn hàng của bạn</h2>

          <div className="mt-5 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.nameVi}
                  className="size-16 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="line-clamp-1 font-semibold">{item.nameVi}</h3>
                  <p className="text-sm text-stone-500">
                    SL: {item.quantity}
                  </p>
                </div>

                <strong className="text-rose-700">
                  {formatPrice(item.price * item.quantity)}
                </strong>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-4">
            <label
              htmlFor="checkout-coupon"
              className="flex items-center gap-2 text-sm font-bold text-stone-950"
            >
              <Tag className="size-4 text-rose-600" />
              Mã giảm giá
            </label>

            <div className="mt-3 flex gap-2">
              <input
                id="checkout-coupon"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
                placeholder="SAVE10, BEAUTY50, FREESHIP"
                className="min-w-0 flex-1 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm outline-none focus:border-rose-300"
              />

              <button
                type="button"
                onClick={handleApplyCoupon}
                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Áp dụng
              </button>
            </div>

            {couponMessage && (
              <p
                className={`mt-2 text-sm ${
                  couponCode ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {couponMessage}
              </p>
            )}
          </div>

          <div className="mt-6 space-y-3 border-t border-rose-100 pt-5 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>

            <div className="flex justify-between">
              <span>Vận chuyển</span>
              <strong>
                {shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}
              </strong>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Giảm giá {couponCode ? `(${couponCode})` : ""}</span>
                <strong>-{formatPrice(discountAmount)}</strong>
              </div>
            )}

            {couponCode === "FREESHIP" && discountAmount === 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Mã Freeship</span>
                <strong>Đã áp dụng</strong>
              </div>
            )}

            <div className="border-t border-rose-100 pt-3">
              <div className="flex justify-between text-lg">
                <span className="font-bold">Tổng cộng</span>
                <strong className="text-rose-700">
                  {formatPrice(cartTotal)}
                </strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="mt-6 w-full rounded-full bg-rose-600 py-3 font-semibold text-white hover:bg-rose-700"
          >
            Đặt hàng
          </button>
        </aside>
      </div>
    </section>
  );
}