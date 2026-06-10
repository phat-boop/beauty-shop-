import { Link, useNavigate } from "react-router";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

export default function Header() {
  const { cartItems, wishlist } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="text-muted-foreground">
            Miễn phí vận chuyển cho đơn hàng từ 500.000₫
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-muted-foreground hover:text-rose-600">
              Hotline: 1900 1234
            </a>
            <a href="#" className="text-muted-foreground hover:text-rose-600">
              Cửa hàng
            </a>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl lg:text-3xl tracking-tight">
              Beauty<span className="text-rose-600">Shop</span>
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-xl mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Link
              to="/tim-kiem"
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              to="/yeu-thich"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/tai-khoan"
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/gio-hang"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center justify-center space-x-8 py-3">
          <Link
            to="/"
            className="text-foreground hover:text-rose-600 transition-colors"
          >
            Trang Chủ
          </Link>
          <Link
            to="/san-pham"
            className="text-foreground hover:text-rose-600 transition-colors"
          >
            Sản Phẩm
          </Link>
          <Link
            to="/san-pham?category=skincare"
            className="text-foreground hover:text-rose-600 transition-colors"
          >
            Chăm Sóc Da
          </Link>
          <Link
            to="/san-pham?category=makeup"
            className="text-foreground hover:text-rose-600 transition-colors"
          >
            Trang Điểm
          </Link>
          <Link
            to="/blog"
            className="text-foreground hover:text-rose-600 transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/san-pham?sale=true"
            className="text-rose-600 font-medium"
          >
            Flash Sale 🔥
          </Link>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang Chủ
              </Link>
              <Link
                to="/san-pham"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sản Phẩm
              </Link>
              <Link
                to="/san-pham?category=skincare"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chăm Sóc Da
              </Link>
              <Link
                to="/san-pham?category=makeup"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang Điểm
              </Link>
              <Link
                to="/blog"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/tai-khoan"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tài Khoản
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
