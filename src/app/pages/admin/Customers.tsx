import { Search, Eye, Mail } from "lucide-react";
import { useState } from "react";

const customers = [
  { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", phone: "0123456789", orders: 12, spent: 15000000, joined: "2025-01-15" },
  { id: 2, name: "Trần Thị B", email: "tranthib@email.com", phone: "0987654321", orders: 8, spent: 8500000, joined: "2025-03-22" },
  { id: 3, name: "Lê Văn C", email: "levanc@email.com", phone: "0369852147", orders: 15, spent: 22000000, joined: "2024-11-10" },
  { id: 4, name: "Phạm Thị D", email: "phamthid@email.com", phone: "0741258963", orders: 5, spent: 4200000, joined: "2026-02-18" },
];

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Quản Lý Khách Hàng</h1>
        <p className="text-muted-foreground">Tổng {customers.length} khách hàng</p>
      </div>

      <div className="bg-white rounded-lg p-6 border border-border mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm khách hàng..."
            className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm">Khách Hàng</th>
                <th className="px-6 py-4 text-left text-sm">Liên Hệ</th>
                <th className="px-6 py-4 text-left text-sm">Đơn Hàng</th>
                <th className="px-6 py-4 text-left text-sm">Tổng Chi Tiêu</th>
                <th className="px-6 py-4 text-left text-sm">Ngày Tham Gia</th>
                <th className="px-6 py-4 text-right text-sm">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                        {customer.name[0]}
                      </div>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{customer.orders} đơn</td>
                  <td className="px-6 py-4 text-sm text-rose-600">{customer.spent.toLocaleString()}₫</td>
                  <td className="px-6 py-4 text-sm">{customer.joined}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 hover:bg-blue-50 rounded text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded text-green-600">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
