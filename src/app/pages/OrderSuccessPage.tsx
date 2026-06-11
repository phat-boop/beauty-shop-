import { Link } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  Package,
  Receipt,
  Truck,
} from "lucide-react";

import { products } from "../data/products";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function OrderSuccessPage() {
  const recommendedProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  const orderNumber = `BS${Date.now().toString().slice(-8)}`;

  return (
    <div className="bg-gradient-to-b from-rose-50 to-white">
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl md:p-12">
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="size-14 text-emerald-600" />
          </div>

          <h1 className="mt-6 text-4xl font-bold text-stone-950">
            Đặt hàng thành công 🎉
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-stone-600">
            Cảm ơn bạn đã mua sắm tại Beauty Shop. Đơn hàng của bạn đang
            được xử lý và sẽ sớm được giao đến địa chỉ đã đăng ký.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-rose-50 p-5">
              <p className="text-sm text-stone-500">Mã đơn hàng</p>
              <strong className="mt-2 block text-lg">
                #{orderNumber}
              </strong>
            </div>

            <div className="rounded-3xl bg-rose-50 p-5">
              <p className="text-sm text-stone-500">
                Thanh toán
              </p>
              <strong className="mt-2 block text-lg">
                COD
              </strong>
            </div>

            <div className="rounded-3xl bg-rose-50 p-5">
              <p className="text-sm text-stone-500">
                Tổng tiền
              </p>
              <strong className="mt-2 block text-lg text-rose-700">
                {formatPrice(2590000)}
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
              className="rounded-full border border-rose-200 px-8 py-4 font-semibold text-rose-700"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Trạng thái đơn hàng
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-emerald-50 p-5">
              <Receipt className="size-8 text-emerald-600" />
              <h3 className="mt-3 font-bold">
                Đơn hàng đã xác nhận
              </h3>
            </div>

            <div className="rounded-3xl bg-rose-50 p-5">
              <Package className="size-8 text-rose-600" />
              <h3 className="mt-3 font-bold">
                Đang đóng gói
              </h3>
            </div>

            <div className="rounded-3xl bg-amber-50 p-5">
              <Truck className="size-8 text-amber-600" />
              <h3 className="mt-3 font-bold">
                Chờ vận chuyển
              </h3>
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
                Sử dụng mã BEAUTY10 để giảm 10%
                cho lần mua sắm tiếp theo.
              </p>
            </div>

            <div className="rounded-2xl bg-white/20 px-6 py-4 text-center backdrop-blur">
              <p className="text-sm">Mã giảm giá</p>
              <strong className="text-3xl">
                BEAUTY10
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Có thể bạn sẽ thích
          </h2>

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