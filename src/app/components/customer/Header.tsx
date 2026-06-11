import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
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
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 backdrop-blur-md">
      <div className="bg-gradient-to-r from-rose-600 to-pink-500 py-2 text-center text-xs font-medium tracking-wide text-white">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="size-3.5 animate-pulse" />
          Miễn phí vận chuyển cho đơn hàng từ 1.500.000₫!
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-50 lg:hidden"
            aria-label="Mở menu"
          >
            <Menu className="size-6" />
          </button>

          <Link to="/" className="text-2xl font-bold tracking-tight text-rose-700">
            Beauty<span className="text-[#2b1813]">Shop</span>
          </Link>

          <nav className="hidden lg:flex lg:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-rose-600 ${
                    isActive ? "text-rose-600" : "text-stone-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div ref={searchRef} className="relative hidden max-w-md flex-1 md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-full border border-stone-200 bg-stone-50 py-2.5 pl-11 pr-10 text-sm outline-none focus:border-rose-400 focus:bg-white"
              />
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
              {query && (
                <button
                  type="button"
                  onClick={closeSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                >
                  <X className="size-4" />
                </button>
              )}
            </form>

            {searchFocused && (
              <div className="absolute top-full mt-2 w-full rounded-2xl border border-stone-100 bg-white p-4 shadow-xl">
                {query.trim().length === 0 ? (
                  <div>
                    <p className="text-xs font-semibold uppercase text-stone-400">Tìm kiếm phổ biến</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {quickSearches.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleQuickSearch(item)}
                          className="inline-flex items-center gap-1 rounded-full bg-stone-50 px-3 py-1 text-xs text-stone-600 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Flame className="size-3 text-rose-500" />
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold uppercase text-stone-400">Sản phẩm gợi ý</p>
                    <div className="mt-2 space-y-1">
                      {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleQuickSearch(product.nameVi)}
                            className="flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm hover:bg-stone-50"
                          >
                            <div className="size-10 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                              <img src={product.image} alt={product.nameVi} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-stone-900">{product.nameVi}</p>
                              <p className="text-xs text-stone-400">{product.brand}</p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <p className="py-2 text-center text-sm text-stone-400">Không tìm thấy kết quả.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/tai-khoan" className="rounded-full p-2.5 text-stone-600 hover:text-rose-600">
              <User className="size-5" />
            </Link>

            <Link to="/yeu-thich" className="relative rounded-full p-2.5 text-stone-600 hover:text-rose-600">
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/gio-hang" className="relative rounded-full p-2.5 text-stone-600 hover:text-rose-600">
              <ShoppingBag className="size-5" />
              {cartCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed bottom-0 left-0 top-0 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-rose-700">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-stone-500">
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-stone-700 hover:text-rose-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
