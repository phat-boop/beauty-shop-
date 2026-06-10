import { useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

const navLinks = [
  { label: "Trang Chủ", to: "/" },
  { label: "Sản Phẩm", to: "/san-pham" },
  { label: "Chăm Sóc Da", to: "/san-pham?category=skincare" },
  { label: "Trang Điểm", to: "/san-pham?category=makeup" },
  { label: "Blog", to: "/blog" },
];

export default function Header() {
  const navigate = useNavigate();
  const { cartCount, wishlist } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    navigate(`/tim-kiem?q=${encodeURIComponent(trimmedQuery)}`);
    setQuery("");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 backdrop-blur">
      <div className="bg-[#2b1813] px-4 py-2 text-center text-sm text-white">
        Miễn phí vận chuyển cho đơn hàng từ 1.500.000₫
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <Link to="/" className="shrink-0 text-2xl font-bold tracking-tight text-rose-700">
          Beauty<span className="text-[#2b1813]">Shop</span>
        </Link>

        <form onSubmit={handleSearch} className="relative hidden flex-1 md:block">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm kiếm sản phẩm, thương hiệu..."
            className="w-full rounded-full border border-rose-100 bg-rose-50/60 py-3 pl-12 pr-4 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/yeu-thich" className="relative rounded-full p-2 hover:bg-rose-50">
            <Heart className="size-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-rose-600 px-1.5 text-xs text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/gio-hang" className="relative rounded-full p-2 hover:bg-rose-50">
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-rose-600 px-1.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/tai-khoan" className="hidden rounded-full p-2 hover:bg-rose-50 md:block">
            <User className="size-5" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-full p-2 hover:bg-rose-50 md:hidden"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-rose-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 py-3 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "text-rose-700" : "text-stone-700 hover:text-rose-700"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/san-pham?sale=true" className="ml-auto text-rose-700">
            Flash Sale
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-rose-100 bg-white px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full rounded-full border border-rose-100 bg-rose-50 py-3 pl-12 pr-4 outline-none"
            />
          </form>

          <div className="grid gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-rose-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/dang-nhap"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2 hover:bg-rose-50"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}