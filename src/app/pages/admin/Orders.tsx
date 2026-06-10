import { useState } from "react";
import { Search, Eye, Download } from "lucide-react";

const orders = [
  { id: "DH001", customer: "Nguyễn Văn A", email: "nguyenvana@email.com", total: 1250000, status: "Đang giao", date: "2026-06-04 10:30", items: 3 },
  { id: "DH002", customer: "Trần Thị B", email: "tranthib@email.com", total: 890000, status: "Đã giao", date: "2026-06-04 09:15", items: 2 },
  { id: "DH003", customer: "Lê Văn C", email: "levanc@email.com", total: 2350000, status: "Đang xử lý", date: "2026-06-03 16:45", items: 5 },
  { id: "DH004", customer: "Phạm Thị D", email: "phamthid@email.com", total: 680000, status: "Đã giao", date: "2026-06-03 14:20", items: 1 },
  { id: "DH005", customer: "Hoàng Văn E", email: "hoangvane@email.com", total: 1450000, status: "Đã hủy", date: "2026-06-02 11:30", items: 4 },
];

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Quản Lý Đơn Hàng</h1>
          <p className="text-muted-foreground">Tổng {orders.length} đơn hàng</p>
        </div>
        <button className="flex items-center space-x-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors">
          <Download className="w-5 h-5" />
          <span>Xuất Excel</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 border border-border mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm đơn hàng..."
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Đã giao">Đã giao</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm">Mã Đơn</th>
                <th className="px-6 py-4 text-left text-sm">Khách Hàng</th>
                <th className="px-6 py-4 text-left text-sm">Ngày Đặt</th>
                <th className="px-6 py-4 text-left text-sm">Số SP</th>
                <th className="px-6 py-4 text-left text-sm">Tổng Tiền</th>
                <th className="px-6 py-4 text-left text-sm">Trạng Thái</th>
                <th className="px-6 py-4 text-right text-sm">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{order.date}</td>
                  <td className="px-6 py-4 text-sm">{order.items}</td>
                  <td className="px-6 py-4 text-sm text-rose-600">{order.total.toLocaleString()}₫</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Đã giao"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Đang giao"
                        ? "bg-blue-100 text-blue-600"
                        : order.status === "Đang xử lý"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button className="p-2 hover:bg-blue-50 rounded text-blue-600">
                        <Eye className="w-4 h-4" />
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
