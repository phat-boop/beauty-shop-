import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Gift,
  MapPin,
  Package,
  Receipt,
  Truck,
} from "lucide-react";

import { products } from "../data/products";
import type { Order, PaymentMethod, ShippingMethod } from "../types";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

const formatDate = (value?: string | Date) => {
  if (!value) return "Không xác định";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Không xác định";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const paymentMethodLabel: Record<PaymentMethod, string> = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank: "Chuyển khoản ngân hàng",
  wallet: "Ví điện tử / thẻ nội địa",
};

const shippingMethodLabel: Record<ShippingMethod, string> = {
  standard: "Giao hàng tiêu chuẩn",
  express: "Giao hàng nhanh",
};

type StoredOrder = Order & {
  note?: string;
  createdAt?: string | Date;
  shippingAddress: Order["shippingAddress"] & {
    email?: string;
  };
};

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const order = useMemo<StoredOrder | null>(() => {
    if (!orderId) return null;

    try {
      const stored = localStorage.getItem("beauty-shop-orders");

      if (!stored) return null;

      const orders = JSON.parse(stored) as StoredOrder[];

      return orders.find((item) => item.id === orderId) ?? null;
    } catch {
      return null;
    }
  }, [orderId]);

  const recommendedProducts = useMemo(() => {
    return products.filter((product) => product.featured).slice(0, 4);
  }, []);

  if (!orderId || !order) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-stone-950">
          Không tìm thấy đơn hàng
        </h1>

        <p className="mt-4 text-stone-600">
          Đơn hàng không tồn tại, đã bị xóa hoặc đường dẫn không hợp lệ.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/san-pham"
            className="inline-flex rounded-full bg-rose-600 px-8 py-3 font-semibold text-white hover:bg-rose-700"
          >
            Quay về trang sản phẩm
          </Link>

          <Link
            to="/"
            className="inline-flex rounded-full border border-rose-200 px-8 py-3 font-semibold text-rose-700 hover:bg-rose-50"
          >
            Về trang chủ
          </Link>
        </div>
      </section>
    );
  }

  const paymentLabel =
    paymentMethodLabel[order.paymentMethod] ?? "Chưa xác định";

  const shippingLabel =
    shippingMethodLabel[order.shippingMethod] ?? "Chưa xác định";

  const shortOrderId = order.id.slice(0, 8).toUpperCase();

  const fullAddress = [
    order.shippingAddress.address,
    order.shippingAddress.ward,
    order.shippingAddress.district,
    order.shippingAddress.city,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-gradient-to-b from-rose-50 to-white">
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl md:p-12">
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="size-14 text-emerald-600" />
          </div>

          <h1 className="mt-6 text-4xl font-bold text-stone-950">
            Đặt hàng thành công 🛍
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-stone-600">
            Cảm ơn bạn đã mua sắm tại BeautyShop. Đơn hàng của bạn đang được xử
            lý và sẽ sớm được giao đến địa chỉ đã đăng ký.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-rose-50 p-5">
              <p className="text-sm text-stone-500">Mã đơn hàng</p>
              <strong className="mt-2 block break-all text-base">
                #{shortOrderId}
              </strong>
            </div>

            <div className="rounded-3xl bg-rose-50 p-5">
              <p className="text-sm text-stone-500">Thanh toán</p>
              <strong className="mt-2 block text-base">{paymentLabel}</strong>
            </div>

            <div className="rounded-3xl bg-rose-50 p-5">
              <p className="text-sm text-stone-500">Tổng tiền</p>
              <strong className="mt-2 block text-lg text-rose-700">
                {formatPrice(order.total)}
              </strong>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-rose-50 p-5 text-left">
              <div className="flex items-center gap-2">
                <Truck className="size-5 text-rose-600" />
                <p className="text-sm font-semibold text-stone-950">
                  Vận chuyển
                </p>
              </div>

              <strong className="mt-2 block">{shippingLabel}</strong>

              {order.estimatedDelivery && (
                <p className="mt-1 text-sm text-stone-500">
                  Dự kiến: {order.estimatedDelivery}
                </p>
              )}
            </div>

            <div className="rounded-3xl bg-rose-50 p-5 text-left">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-5 text-rose-600" />
                <p className="text-sm font-semibold text-stone-950">
                  Thời gian đặt hàng
                </p>
              </div>

              <strong className="mt-2 block">{formatDate(order.createdAt)}</strong>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-stone-100 p-5 text-left">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-rose-600" />
              <h2 className="font-bold text-stone-950">Thông tin giao hàng</h2>
            </div>

            <div className="mt-3 space-y-1 text-sm text-stone-600">
              <p>
                <span className="font-semibold text-stone-900">Người nhận:</span>{" "}
                {order.shippingAddress.fullName}
              </p>

              <p>
                <span className="font-semibold text-stone-900">
                  Số điện thoại:
                </span>{" "}
                {order.shippingAddress.phone}
              </p>

              {order.shippingAddress.email && (
                <p>
                  <span className="font-semibold text-stone-900">Email:</span>{" "}
                  {order.shippingAddress.email}
                </p>
              )}

              <p>
                <span className="font-semibold text-stone-900">Địa chỉ:</span>{" "}
                {fullAddress || "Không có địa chỉ"}
              </p>

              {order.note && (
                <p>
                  <span className="font-semibold text-stone-900">Ghi chú:</span>{" "}
                  {order.note}
                </p>
              )}
            </div>
          </div>

          {order.items.length > 0 && (
            <div className="mt-8 divide-y divide-stone-100 rounded-3xl border border-stone-100 text-left">
              {order.items.map((item) => (
                <div
                  key={`${item.productId}-${item.nameVi}`}
                  className="flex items-center gap-4 p-4"
                >
                  <img
                    src={item.image}
                    alt={item.nameVi}
                    className="size-16 flex-shrink-0 rounded-2xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 font-semibold text-stone-900">
                      {item.nameVi}
                    </p>

                    <p className="mt-0.5 text-xs text-stone-400">
                      {item.brand}
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      {formatPrice(item.unitPrice)} × {item.quantity}
                    </p>
                  </div>

                  <p className="flex-shrink-0 font-semibold text-rose-700">
                    {formatPrice(item.lineTotal)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 space-y-2 rounded-3xl border border-stone-100 p-5 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Tạm tính</span>
              <strong>{formatPrice(order.subtotal)}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Vận chuyển</span>
              <strong>
                {order.shippingFee === 0
                  ? "Miễn phí"
                  : formatPrice(order.shippingFee)}
              </strong>
            </div>

            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>
                  Giảm giá{order.couponCode ? ` (${order.couponCode})` : ""}
                </span>
                <strong>-{formatPrice(order.discountAmount)}</strong>
              </div>
            )}

            {order.couponCode && order.discountAmount === 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Mã giảm giá</span>
                <strong>{order.couponCode}</strong>
              </div>
            )}

            <div className="flex justify-between border-t border-stone-100 pt-2 text-base">
              <span className="font-bold">Tổng cộng</span>
              <strong className="text-rose-700">
                {formatPrice(order.total)}
              </strong>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/theo-doi-don-hang"
              className="rounded-full bg-rose-600 px-8 py-4 font-semibold text-white hover:bg-rose-700"
            >
              Theo dõi đơn hàng
            </Link>

            <Link
              to="/san-pham"
              className="rounded-full border border-rose-200 px-8 py-4 font-semibold text-rose-700 hover:bg-rose-50"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Trạng thái đơn hàng</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-emerald-50 p-5">
              <Receipt className="size-8 text-emerald-600" />
              <h3 className="mt-3 font-bold">Đơn hàng đã xác nhận</h3>
            </div>

            <div className="rounded-3xl bg-rose-50 p-5">
              <Package className="size-8 text-rose-600" />
              <h3 className="mt-3 font-bold">Đang đóng gói</h3>
            </div>

            <div className="rounded-3xl bg-amber-50 p-5">
              <Truck className="size-8 text-amber-600" />
              <h3 className="mt-3 font-bold">Chờ vận chuyển</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-[2rem] bg-gradient-to-r from-rose-600 to-pink-500 p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <Gift className="size-7" />
                <h2 className="text-2xl font-bold">
                  Quà tặng cho đơn tiếp theo
                </h2>
              </div>

              <p className="mt-3 text-rose-100">
                Sử dụng mã BEAUTY10 để giảm 10% cho lần mua sắm tiếp theo.
              </p>
            </div>

            <div className="rounded-2xl bg-white/20 px-6 py-4 text-center backdrop-blur">
              <p className="text-sm">Mã giảm giá</p>
              <strong className="text-3xl">BEAUTY10</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Có thể bạn sẽ thích</h2>

          <Link
            to="/san-pham"
            className="flex items-center gap-2 font-semibold text-rose-700"
          >
            Xem tất cả
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/san-pham/${product.id}`}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={product.image}
                alt={product.nameVi}
                className="aspect-square w-full object-cover"
              />

              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                  {product.brand}
                </p>

                <h3 className="mt-2 line-clamp-2 font-bold">
                  {product.nameVi}
                </h3>

                <strong className="mt-3 block text-rose-700">
                  {formatPrice(product.price)}
                </strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}