import { useState } from "react";
import { CheckCircle, Clock, Package, Search, Truck } from "lucide-react";

export default function OrderTrackingPage() {
  const [orderCode, setOrderCode] = useState("");

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-bold text-stone-950">Theo dõi đơn hàng</h1>
      <p className="mt-3 text-stone-600">
        Nhập mã đơn hàng để kiểm tra trạng thái giao hàng.
      </p>

      <div className="mt-8 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
          <input
            value={orderCode}
            onChange={(event) => setOrderCode(event.target.value)}
            placeholder="Ví dụ: DH001"
            className="w-full rounded-full border border-rose-100 py-4 pl-12 pr-4 outline-none focus:border-rose-300"
          />
        </div>

        <button className="mt-4 rounded-full bg-rose-600 px-8 py-3 font-semibold text-white hover:bg-rose-700">
          Kiểm tra đơn hàng
        </button>
      </div>

      <div className="mt-10 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Đơn hàng mẫu #DH001</h2>
        <p className="mt-2 text-stone-600">Dự kiến giao: 12/06/2026</p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            { label: "Đã đặt hàng", icon: CheckCircle, done: true },
            { label: "Đang xử lý", icon: Clock, done: true },
            { label: "Đang giao", icon: Truck, done: true },
            { label: "Đã nhận hàng", icon: Package, done: false },
          ].map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.label}
                className={`rounded-3xl p-5 ${
                  step.done ? "bg-rose-50 text-rose-700" : "bg-stone-50 text-stone-400"
                }`}
              >
                <Icon className="size-8" />
                <h3 className="mt-4 font-bold">{step.label}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}