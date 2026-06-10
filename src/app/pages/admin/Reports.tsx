import { TrendingUp, Download, Calendar } from "lucide-react";

export default function AdminReports() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Báo Cáo Doanh Thu</h1>
          <p className="text-muted-foreground">Thống kê chi tiết về doanh thu</p>
        </div>
        <button className="flex items-center space-x-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors">
          <Download className="w-5 h-5" />
          <span>Xuất Báo Cáo</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Doanh Thu Tháng", value: "128,500,000₫", change: "+12.5%" },
          { label: "Đơn Hàng Thành Công", value: "342", change: "+8.2%" },
          { label: "Giá Trị Đơn TB", value: "375,731₫", change: "+3.8%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-3xl mb-2">{stat.value}</p>
            <div className="flex items-center space-x-1 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg p-6 border border-border mb-8">
        <h2 className="text-xl mb-6">Biểu Đồ Doanh Thu</h2>
        <div className="h-80 flex items-end justify-between space-x-2">
          {[65, 78, 55, 82, 91, 73, 88, 95, 70, 85, 92, 98].map((height, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-rose-600 rounded-t"
                style={{ height: `${height}%` }}
              />
              <p className="text-xs text-muted-foreground mt-2">T{idx + 1}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-lg p-6 border border-border">
        <h2 className="text-xl mb-6">Doanh Thu Theo Danh Mục</h2>
        <div className="space-y-4">
          {[
            { category: "Chăm Sóc Da", revenue: 52000000, percentage: 40 },
            { category: "Trang Điểm", revenue: 38000000, percentage: 30 },
            { category: "Serum", revenue: 25500000, percentage: 20 },
            { category: "Phụ Kiện", revenue: 13000000, percentage: 10 },
          ].map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{item.category}</span>
                <span className="text-rose-600">{item.revenue.toLocaleString()}₫</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-rose-600 h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
