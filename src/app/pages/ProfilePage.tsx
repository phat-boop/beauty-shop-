import { useState } from "react";
import { User, Package, MapPin, Heart, Settings } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8">Tài Khoản Của Tôi</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 text-2xl mb-3">
                  N
                </div>
                <h3 className="mb-1">Nguyễn Văn A</h3>
                <p className="text-sm text-muted-foreground">nguyenvana@email.com</p>
              </div>
              <nav className="space-y-1">
                {[
                  { id: "profile", label: "Thông Tin Cá Nhân", icon: User },
                  { id: "orders", label: "Đơn Hàng", icon: Package },
                  { id: "addresses", label: "Địa Chỉ", icon: MapPin },
                  { id: "wishlist", label: "Yêu Thích", icon: Heart },
                  { id: "settings", label: "Cài Đặt", icon: Settings },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-rose-50 text-rose-600"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl mb-6">Thông Tin Cá Nhân</h2>
                <form className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">Họ và tên</label>
                      <input
                        type="text"
                        defaultValue="Nguyễn Văn A"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Số điện thoại</label>
                      <input
                        type="tel"
                        defaultValue="0123456789"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="nguyenvana@email.com"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">Ngày sinh</label>
                      <input
                        type="date"
                        defaultValue="1990-01-01"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Giới tính</label>
                      <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500">
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    Cập Nhật Thông Tin
                  </button>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl mb-6">Đơn Hàng Của Tôi</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="mb-1">Đơn hàng #DH00{i}</h3>
                          <p className="text-sm text-muted-foreground">
                            Ngày đặt: 2026-06-0{i}
                          </p>
                        </div>
                        <div className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm">
                          Đã giao
                        </div>
                      </div>
                      <p className="text-rose-600 text-xl">
                        {(1250000 * i).toLocaleString()}₫
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl">Địa Chỉ Của Tôi</h2>
                  <button className="px-4 py-2 border border-rose-600 text-rose-600 rounded-lg hover:bg-rose-50">
                    Thêm Địa Chỉ Mới
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-2">Nguyễn Văn A</h3>
                        <p className="text-sm text-muted-foreground mb-1">0123456789</p>
                        <p className="text-sm text-muted-foreground">
                          123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-rose-100 text-rose-600 text-sm rounded-full">
                        Mặc định
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
