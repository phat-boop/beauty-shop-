import { BarChart3, DollarSign, ShoppingBag, TrendingUp } from "lucide-react";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function AdminReports() {
  const months = [
    { month: "T1", revenue: 82000000, orders: 210 },
    { month: "T2", revenue: 96000000, orders: 248 },
    { month: "T3", revenue: 110000000, orders: 286 },
    { month: "T4", revenue: 118000000, orders: 304 },
    { month: "T5", revenue: 128500000, orders: 342 },
  ];

  const maxRevenue = Math.max(...months.map((item) => item.revenue));

  return (
    <div>
      <div>
        <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
          Analytics
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Báo cáo doanh thu
        </h1>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <DollarSign className="size-8 text-emerald-600" />
          <p className="mt-4 text-slate-500">Doanh thu tháng này</p>
          <strong className="mt-2 block text-3xl">
            {formatPrice(128500000)}
          </strong>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <ShoppingBag className="size-8 text-blue-600" />
          <p className="mt-4 text-slate-500">Đơn hàng tháng này</p>
          <strong className="mt-2 block text-3xl">342</strong>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <TrendingUp className="size-8 text-rose-600" />
          <p className="mt-4 text-slate-500">Tăng trưởng</p>
          <strong className="mt-2 block text-3xl">+12.5%</strong>
        </article>
      </div>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Doanh thu 5 tháng gần nhất</h2>
          <BarChart3 className="size-6 text-slate-400" />
        </div>

        <div className="mt-8 flex h-80 items-end gap-5">
          {months.map((item) => (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-3">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-3xl bg-rose-500"
                  style={{
                    height: `${Math.max((item.revenue / maxRevenue) * 100, 12)}%`,
                  }}
                />
              </div>
              <p className="font-semibold">{item.month}</p>
              <p className="text-xs text-slate-500">{item.orders} đơn</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}