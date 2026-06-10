import { Mail, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";

const customers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    phone: "0901234567",
    orders: 8,
    spent: 12500000,
    joinedAt: "2026-01-15",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "b@example.com",
    phone: "0912345678",
    orders: 4,
    spent: 5860000,
    joinedAt: "2026-02-20",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "c@example.com",
    phone: "0923456789",
    orders: 2,
    spent: 3200000,
    joinedAt: "2026-03-10",
  },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function AdminCustomers() {
  const [query, setQuery] = useState("");

  const filteredCustomers = useMemo(() => {
    const keyword = query.toLowerCase().trim();

    if (!keyword) return customers;

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(keyword) ||
        customer.email.toLowerCase().includes(keyword) ||
        customer.phone.includes(keyword)
    );
  }, [query]);

  return (
    <div>
      <div>
        <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
          CRM
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Quản lý khách hàng
        </h1>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm khách hàng..."
            className="w-full rounded-full border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-rose-300"
          />
        </div>

        <div className="mt-6 grid gap-4">
          {filteredCustomers.map((customer) => (
            <article
              key={customer.id}
              className="rounded-3xl border border-slate-100 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="grid size-14 place-items-center rounded-full bg-rose-100 text-lg font-bold text-rose-700">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-bold">{customer.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Tham gia: {customer.joinedAt}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <Mail className="size-4" />
                    {customer.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="size-4" />
                    {customer.phone}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Đơn hàng</p>
                  <p className="text-xl font-bold">{customer.orders}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Đã chi tiêu</p>
                  <p className="text-xl font-bold text-rose-700">
                    {formatPrice(customer.spent)}
                  </p>
                </div>
              </div>
            </article>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              Không tìm thấy khách hàng phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}