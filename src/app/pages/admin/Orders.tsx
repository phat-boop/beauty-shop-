import { Eye, Search } from "lucide-react";
import { useMemo, useState } from "react";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

const orders = [
  {
    id: "DH001",
    customer: "Nguyễn Văn A",
    email: "a@example.com",
    total: 1250000,
    status: "Đang giao",
    payment: "COD",
    date: "2026-06-04",
  },
  {
    id: "DH002",
    customer: "Trần Thị B",
    email: "b@example.com",
    total: 890000,
    status: "Đã giao",
    payment: "Bank Transfer",
    date: "2026-06-04",
  },
  {
    id: "DH003",
    customer: "Lê Văn C",
    email: "c@example.com",
    total: 2350000,
    status: "Đang xử lý",
    payment: "COD",
    date: "2026-06-03",
  },
];

export default function AdminOrders() {
  const [query, setQuery] = useState("");

  const filteredOrders = useMemo(() => {
    const keyword = query.toLowerCase().trim();

    if (!keyword) return orders;

    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(keyword) ||
        order.customer.toLowerCase().includes(keyword) ||
        order.email.toLowerCase().includes(keyword) ||
        order.status.toLowerCase().includes(keyword)
    );
  }, [query]);

  return (
    <div>
      <div>
        <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
          Sales
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Quản lý đơn hàng
        </h1>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo mã đơn, khách hàng, email..."
            className="w-full rounded-full border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-rose-300"
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500">
                <th className="py-3">Mã đơn</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Ngày</th>
                <th>Thanh toán</th>
                <th>Tổng</th>
                <th>Trạng thái</th>
                <th className="text-right">Chi tiết</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100">
                  <td className="py-4 font-bold">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.email}</td>
                  <td>{order.date}</td>
                  <td>{order.payment}</td>
                  <td className="font-semibold">{formatPrice(order.total)}</td>
                  <td>
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700">
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end">
                      <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                        <Eye className="size-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              Không tìm thấy đơn hàng phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}