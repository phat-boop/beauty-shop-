import { TrendingUp, ShoppingBag, Users, DollarSign, Package, Eye } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Doanh Thu Tháng", value: "128,500,000₫", change: "+12.5%", icon: DollarSign, color: "bg-green-100 text-green-600" },
    { label: "Đơn Hàng", value: "342", change: "+8.2%", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
    { label: "Khách Hàng", value: "1,234", change: "+15.3%", icon: Users, color: "bg-purple-100 text-purple-600" },
    { label: "Sản Phẩm", value: "156", change: "+5", icon: Package, color: "bg-orange-100 text-orange-600" },
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
    { name: "Bộ Cọ Trang Điểm", sold: 4567, revenue: 6622150000 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Tổng quan hoạt động kinh doanh</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
              <p className="text-2xl mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg p-6 border border-border">
          <h2 className="text-xl mb-6">Đơn Hàng Gần Đây</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium mb-1">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-rose-600 mb-1">{order.total.toLocaleString()}₫</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Đã giao"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Đang giao"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg p-6 border border-border">
          <h2 className="text-xl mb-6">Sản Phẩm Bán Chạy</h2>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{product.name}</p>
                  <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full">
                    #{idx + 1}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Đã bán: {product.sold}</span>
                  <span className="text-rose-600">{product.revenue.toLocaleString()}₫</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
