import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import {
  BarChart3,
  FolderTree,
  LayoutDashboard,
  Menu,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  X,
} from "lucide-react";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/san-pham", label: "Sản Phẩm", icon: Package },
  { path: "/admin/danh-muc", label: "Danh Mục", icon: FolderTree },
  { path: "/admin/don-hang", label: "Đơn Hàng", icon: ShoppingCart },
  { path: "/admin/khach-hang", label: "Khách Hàng", icon: Users },
  { path: "/admin/bao-cao", label: "Báo Cáo", icon: BarChart3 },
  { path: "/admin/kho-hang", label: "Kho Hàng", icon: Warehouse },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActivePath = (path: string) =>
    location.pathname === path ||
    (path !== "/admin" && location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Đóng menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <Link to="/admin" className="text-2xl font-bold text-rose-700">
            Beauty Admin
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="Đóng menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="grid gap-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition ${
                  active
                    ? "bg-rose-50 text-rose-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon className="size-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4">
          <Link
            to="/"
            className="flex justify-center rounded-full border border-rose-200 px-4 py-3 font-semibold text-rose-700 hover:bg-rose-50"
          >
            Về trang chủ
          </Link>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="Mở menu"
          >
            <Menu className="size-6" />
          </button>

          <div>
            <p className="text-sm text-slate-500">Admin Panel</p>
            <h1 className="font-bold">BeautyShop Management</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="font-semibold">Admin User</p>
              <p className="text-sm text-slate-500">admin@beautyshop.vn</p>
            </div>
            <div className="grid size-11 place-items-center rounded-full bg-rose-100 font-bold text-rose-700">
              A
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}