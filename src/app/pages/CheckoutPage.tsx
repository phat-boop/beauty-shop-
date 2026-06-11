import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  CreditCard,
  Gift,
  Lock,
  MapPin,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

type PaymentMethod = "cod" | "bank" | "wallet";
type ShippingMethod = "standard" | "express";

interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  note: string;
}

const initialForm: CheckoutForm = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  district: "",
  ward: "",
  address: "",
  note: "",
};

export default function CheckoutPage() {
  const navigate = useNavigate();

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

  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("standard");
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponMessage, setCouponMessage] = useState("");
  const [formError, setFormError] = useState("");

  const expressShippingFee = shippingMethod === "express" ? 25000 : 0;
  const finalTotal = cartTotal + expressShippingFee;

  const estimatedDelivery = useMemo(() => {
    return shippingMethod === "express"
      ? "1-2 ngày làm việc"
      : "2-4 ngày làm việc";
  }, [shippingMethod]);

  const updateFormField = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

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

  const validateForm = () => {
    if (!form.fullName.trim()) return "Vui lòng nhập họ và tên.";
    if (!form.phone.trim()) return "Vui lòng nhập số điện thoại.";
    if (!form.email.trim()) return "Vui lòng nhập email.";
    if (!form.city.trim()) return "Vui lòng nhập tỉnh / thành phố.";
    if (!form.district.trim()) return "Vui lòng nhập quận / huyện.";
    if (!form.ward.trim()) return "Vui lòng nhập phường / xã.";
    if (!form.address.trim()) return "Vui lòng nhập địa chỉ cụ thể.";

    return "";
  };

  const handlePlaceOrder = () => {
    const error = validateForm();

    if (error) {
      setFormError(error);
      return;
    }

    setFormError("");
    clearCart();
    navigate("/dat-hang-thanh-cong");
  };

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
    <section className="mx-auto max-w-7xl px-4 py-12 pb-28 lg:pb-12">
      <div>
        <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
          Secure checkout
        </p>
        <h1 className="mt-2 text-4xl font-bold text-stone-950">Thanh toán</h1>
        <p className="mt-3 text-stone-600">
          Hoàn tất thông tin để BeautyShop chuẩn bị đơn hàng cho bạn.
        </p>
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
                value={form.fullName}
                onChange={(event) =>
                  updateFormField("fullName", event.target.value)
                }
                placeholder="Họ và tên"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                value={form.phone}
                onChange={(event) =>
                  updateFormField("phone", event.target.value)
                }
                placeholder="Số điện thoại"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                value={form.email}
                onChange={(event) =>
                  updateFormField("email", event.target.value)
                }
                placeholder="Email"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                value={form.city}
                onChange={(event) =>
                  updateFormField("city", event.target.value)
                }
                placeholder="Tỉnh / Thành phố"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                value={form.district}
                onChange={(event) =>
                  updateFormField("district", event.target.value)
                }
                placeholder="Quận / Huyện"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <input
                value={form.ward}
                onChange={(event) =>
                  updateFormField("ward", event.target.value)
                }
                placeholder="Phường / Xã"
                className="rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300"
              />
              <textarea
                value={form.address}
                onChange={(event) =>
                  updateFormField("address", event.target.value)
                }
                placeholder="Địa chỉ cụ thể"
                className="min-h-28 rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300 md:col-span-2"
              />
              <textarea
                value={form.note}
                onChange={(event) => updateFormField("note", event.target.value)}
                placeholder="Ghi chú cho đơn hàng, ví dụ: giao giờ hành chính"
                className="min-h-24 rounded-2xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-300 md:col-span-2"
              />
            </div>

            {formError && (
              <p className="mt-4 rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-700">
                {formError}
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Truck className="size-5 text-rose-600" />
              Phương thức giao hàng
            </h2>

            <div className="mt-5 grid gap-3">
              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-rose-100 p-4">
                <div className="flex gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Giao hàng tiêu chuẩn</p>
                    <p className="mt-1 text-sm text-stone-500">
                      Dự kiến {estimatedDelivery}
                    </p>
                  </div>
                </div>
                <strong>{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</strong>
              </label>

              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-rose-100 p-4">
                <div className="flex gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Giao nhanh ưu tiên</p>
                    <p className="mt-1 text-sm text-stone-500">
                      Dự kiến 1-2 ngày làm việc
                    </p>
                  </div>
                </div>
                <strong>{formatPrice(25000)}</strong>
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <CreditCard className="size-5 text-rose-600" />
              Phương thức thanh toán
            </h2>

            <div className="mt-5 grid gap-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-rose-100 p-4">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-rose-100 p-4">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                <span>Chuyển khoản ngân hàng</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-rose-100 p-4">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                />
                <span>Ví điện tử / thẻ nội địa</span>
              </label>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-rose-50 p-5">
              <ShieldCheck className="size-6 text-rose-600" />
              <h3 className="mt-3 font-bold">Chính hãng 100%</h3>
              <p className="mt-1 text-sm text-stone-600">
                Cam kết nguồn gốc rõ ràng.
              </p>
            </div>

            <div className="rounded-3xl bg-rose-50 p-5">
              <Lock className="size-6 text-rose-600" />
              <h3 className="mt-3 font-bold">Thanh toán an toàn</h3>
              <p className="mt-1 text-sm text-stone-600">
                Thông tin được bảo vệ.
              </p>
            </div>

            <div className="rounded-3xl bg-rose-50 p-5">
              <Gift className="size-6 text-rose-600" />
              <h3 className="mt-3 font-bold">Ưu đãi thành viên</h3>
              <p className="mt-1 text-sm text-stone-600">
                Nhận voucher cho đơn sau.
              </p>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-rose-100 bg-white p-6 shadow-sm lg:sticky lg:top-36">
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
                  <p className="text-sm text-stone-500">SL: {item.quantity}</p>
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

            {expressShippingFee > 0 && (
              <div className="flex justify-between">
                <span>Phí giao nhanh</span>
                <strong>{formatPrice(expressShippingFee)}</strong>
              </div>
            )}

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
                  {formatPrice(finalTotal)}
                </strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="mt-6 hidden w-full rounded-full bg-rose-600 py-3 font-semibold text-white hover:bg-rose-700 lg:block"
          >
            Đặt hàng
          </button>

          <p className="mt-4 text-center text-xs text-stone-500">
            Bằng cách đặt hàng, bạn đồng ý với điều khoản mua hàng của
            BeautyShop.
          </p>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-rose-100 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
        <button
          type="button"
          onClick={handlePlaceOrder}
          className="w-full rounded-full bg-rose-600 py-4 font-semibold text-white"
        >
          Đặt hàng • {formatPrice(finalTotal)}
        </button>
      </div>
    </section>
  );
}