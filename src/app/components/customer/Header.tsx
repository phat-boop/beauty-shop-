import { useMemo, useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  Flame,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { products } from "../../data/products";

const navLinks = [
  { label: "Trang Chủ", to: "/" },
  { label: "Sản Phẩm", to: "/san-pham" },
  { label: "Chăm Sóc Da", to: "/san-pham?category=skincare" },
  { label: "Trang Điểm", to: "/san-pham?category=makeup" },
  { label: "Blog", to: "/blog" },
];

const quickSearches = ["Serum", "Vitamin C", "Dưỡng Ẩm", "Trang Điểm"];

export default function Header() {
  const navigate = useNavigate();
  const { cartCount, wishlist } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) return [];

    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(keyword) ||
          product.nameVi.toLowerCase().includes(keyword) ||
          product.brand.toLowerCase().includes(keyword) ||
          product.tags.some((tag) => tag.toLowerCase().includes(keyword))
      )
      .slice(0, 6);
  }, [query]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    navigate(`/tim-kiem?q=${encodeURIComponent(trimmedQuery)}`);
    setQuery("");
    setSearchFocused(false);
    setMobileMenuOpen(false);
  };

  const handleQuickSearch = (keyword: string) => {
    navigate(`/tim-kiem?q=${encodeURIComponent(keyword)}`);
    setQuery("");
    setSearchFocused(false);
    setMobileMenuOpen(false);
  };

  const closeSearch = () => {
    setQuery("");
    setSearchFocused(false);
  };

  const shouldShowSuggestions =
    searchFocused && query.trim().length > 0;

  const renderSearchSuggestions = () => {
    if (!shouldShowSuggestions) return null;

    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-2xl">
        {searchResults.length > 0 ? (
          <>
            <div className="border-b border-rose-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              Gợi ý sản phẩm
            </div>

            {searchResults.map((product) => (
              <Link
                key={product.id}
                to={`/san-pham/${product.id}`}
                onClick={closeSearch}
                className="flex items-center gap-3 border-b border-rose-50 px-4 py-3 transition hover:bg-rose-50"
              >
                <img
                  src={product.image}
                  alt={product.nameVi}
                  className="size-14 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-semibold text-stone-950">
                    {product.nameVi}
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    {product.brand}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                  Xem
                </span>
              </Link>
            ))}

            <button
              type="button"
              onClick={() => handleQuickSearch(query)}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 font-semibold text-rose-700 hover:bg-rose-50"
            >
              <Search className="size-4" />
              Xem tất cả kết quả cho “{query.trim()}”
            </button>
          </>
        ) : (
          <div className="p-5">
            <p className="font-semibold text-stone-950">
              Không tìm thấy sản phẩm phù hợp
            </p>
            <p className="mt-1 text-sm text-stone-500">
              Hãy thử tìm “Serum”, “Vitamin C” hoặc “Dưỡng Ẩm”.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 backdrop-blur">
      <div className="bg-[#2b1813] px-4 py-2 text-center text-sm text-white">
        <span className="inline-flex items-center justify-center gap-2">
          <Sparkles className="size-4 text-rose-200" />
          Miễn phí vận chuyển cho đơn hàng từ 1.500.000₫
        </span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <Link
          to="/"
          className="shrink-0 text-2xl font-bold tracking-tight text-rose-700"
        >
          Beauty<span className="text-[#2b1813]">Shop</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="relative hidden flex-1 md:block"
        >
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Tìm kiếm sản phẩm, thương hiệu..."
            className="w-full rounded-full border border-rose-100 bg-rose-50/60 py-3 pl-12 pr-4 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
          />

          {renderSearchSuggestions()}
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/yeu-thich"
            className="relative rounded-full p-2 transition hover:bg-rose-50"
            aria-label="Danh sách yêu thích"
          >
            <Heart className="size-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-rose-600 px-1.5 text-xs font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/gio-hang"
            className="relative rounded-full p-2 transition hover:bg-rose-50"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-rose-600 px-1.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/tai-khoan"
            className="hidden rounded-full p-2 transition hover:bg-rose-50 md:block"
            aria-label="Tài khoản"
          >
            <User className="size-5" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-full p-2 transition hover:bg-rose-50 md:hidden"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
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
                isActive
                  ? "text-rose-700"
                  : "text-stone-700 hover:text-rose-700"
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/san-pham?sale=true"
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 font-semibold text-rose-700 hover:bg-rose-100"
          >
            <Flame className="size-4 fill-rose-600 text-rose-600" />
            Flash Sale
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-rose-100 bg-white px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="absolute left-4 top-6 size-5 -translate-y-1/2 text-stone-400" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Tìm kiếm..."
              className="w-full rounded-full border border-rose-100 bg-rose-50 py-3 pl-12 pr-4 outline-none"
            />

            {renderSearchSuggestions()}
          </form>

          <div className="mb-4 flex flex-wrap gap-2">
            {quickSearches.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => handleQuickSearch(keyword)}
                className="rounded-full bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
              >
                {keyword}
              </button>
            ))}
          </div>

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
              to="/san-pham?sale=true"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 font-semibold text-rose-700 hover:bg-rose-50"
            >
              <Flame className="size-4 fill-rose-600 text-rose-600" />
              Flash Sale
            </Link>

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