import { Heart, MapPin, Package, Settings, User } from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "profile", label: "Thông Tin Cá Nhân", icon: User },
  { id: "orders", label: "Đơn Hàng", icon: Package },
  { id: "addresses", label: "Địa Chỉ", icon: MapPin },
  { id: "wishlist", label: "Yêu Thích", icon: Heart },
  { id: "settings", label: "Cài Đặt", icon: Settings },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold text-stone-950">Tài khoản của tôi</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4 border-b border-rose-100 pb-6">
            <div className="grid size-14 place-items-center rounded-full bg-rose-100 text-xl font-bold text-rose-700">
              N
            </div>
            <div>
              <h2 className="font-bold">Nguyễn Văn A</h2>
              <p className="text-sm text-stone-500">nguyenvana@email.com</p>
            </div>
          </div>

          <nav className="mt-6 grid gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                    activeTab === tab.id
                      ? "bg-rose-50 text-rose-700"
                      : "hover:bg-stone-50"
                  }`}
                >
                  <Icon className="size-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label>
                  <span className="font-semibold">Họ và tên</span>
                  <input
                    defaultValue="Nguyễn Văn A"
                    className="mt-2 w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
                  />
                </label>
                <label>
                  <span className="font-semibold">Số điện thoại</span>
                  <input
                    defaultValue="0123456789"
                    className="mt-2 w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
                  />
                </label>
                <label>
                  <span className="font-semibold">Email</span>
                  <input
                    defaultValue="nguyenvana@email.com"
                    className="mt-2 w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
                  />
                </label>
                <label>
                  <span className="font-semibold">Ngày sinh</span>
                  <input
                    type="date"
                    className="mt-2 w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
                  />
                </label>
              </div>

              <button className="mt-6 rounded-full bg-rose-600 px-8 py-3 font-semibold text-white">
                Cập nhật thông tin
              </button>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold">Đơn hàng của tôi</h2>

              <div className="mt-6 space-y-4">
                {[1, 2, 3].map((item) => (
                  <article
                    key={item}
                    className="rounded-2xl border border-rose-100 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold">Đơn hàng #DH00{item}</h3>
                        <p className="mt-1 text-sm text-stone-500">
                          Ngày đặt: 2026-06-0{item}
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                        Đã giao
                      </span>
                    </div>

                    <p className="mt-4 font-bold text-rose-700">
                      {(1250000 * item).toLocaleString("vi-VN")}₫
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Địa chỉ của tôi</h2>
                <button className="rounded-full bg-rose-600 px-5 py-3 font-semibold text-white">
                  Thêm địa chỉ mới
                </button>
              </div>

              <article className="mt-6 rounded-2xl border border-rose-100 p-5">
                <h3 className="font-bold">Nguyễn Văn A</h3>
                <p className="mt-2 text-stone-600">0123456789</p>
                <p className="mt-2 text-stone-600">
                  123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM
                </p>
                <span className="mt-4 inline-flex rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700">
                  Mặc định
                </span>
              </article>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-2xl font-bold">Sản phẩm yêu thích</h2>
              <p className="mt-3 text-stone-600">
                Quản lý wishlist tại trang Yêu thích.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold">Cài đặt</h2>
              <div className="mt-6 space-y-4">
                <label className="flex items-center justify-between rounded-2xl border border-rose-100 p-4">
                  <span>Nhận email khuyến mãi</span>
                  <input type="checkbox" defaultChecked />
                </label>
                <label className="flex items-center justify-between rounded-2xl border border-rose-100 p-4">
                  <span>Thông báo đơn hàng</span>
                  <input type="checkbox" defaultChecked />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}