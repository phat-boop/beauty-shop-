import {
  DollarSign,
  Eye,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Doanh thu tháng",
      value: "128,500,000₫",
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Đơn hàng",
      value: "342",
      change: "+8.2%",
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Khách hàng",
      value: "1,234",
      change: "+15.3%",
      icon: Users,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Sản phẩm",
      value: "156",
      change: "+5",
      icon: Package,
      color: "bg-orange-50 text-orange-700",
    },
  ];

  const recentOrders = [
    { id: "DH001", customer: "Nguyễn Văn A", total: 1250000, status: "Đang giao", date: "2026-06-04" },
    { id: "DH002", customer: "Trần Thị B", total: 890000, status: "Đã giao", date: "2026-06-04" },
    { id: "DH003", customer: "Lê Văn C", total: 2350000, status: "Đang xử lý", date: "2026-06-03" },
    { id: "DH004", customer: "Phạm Thị D", total: 680000, status: "Đã giao", date: "2026-06-03" },
  ];

  const topProducts = [
    { name: "Kem Dưỡng Ẩm Cao Cấp", sold: 3420, revenue: 4275000000 },
    { name: "Serum Vitamin C", sold: 5678, revenue: 5053420000 },
    { name: "Bộ Trang Điểm Cao Cấp", sold: 1234, revenue: 2899900000 },
  ];

  return (
    <div>
      <div>
        <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
          Overview
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Dashboard</h1>
        <p className="mt-2 text-slate-500">Tổng quan hoạt động kinh doanh.</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`rounded-2xl p-3 ${stat.color}`}>
                  <Icon className="size-6" />
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  <TrendingUp className="size-4" />
                  {stat.change}
                </span>
              </div>
              <strong className="mt-5 block text-3xl">{stat.value}</strong>
              <p className="mt-1 text-slate-500">{stat.label}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Đơn hàng gần đây</h2>
            <Eye className="size-5 text-slate-400" />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-sm text-slate-500">
                  <th className="py-3">Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Ngày</th>
                  <th>Tổng</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100">
                    <td className="py-4 font-semibold">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td className="font-semibold">{formatPrice(order.total)}</td>
                    <td>
                      <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Sản phẩm bán chạy</h2>

          <div className="mt-5 space-y-4">
            {topProducts.map((product, index) => (
              <article
                key={product.name}
                className="rounded-2xl border border-slate-100 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">
                    #{index + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Đã bán: {product.sold.toLocaleString("vi-VN")}
                </p>
                <p className="mt-1 font-bold text-rose-700">
                  {formatPrice(product.revenue)}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}