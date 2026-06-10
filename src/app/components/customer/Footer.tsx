import { Link } from "react-router";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Cảm ơn bạn đã đăng ký nhận tin! Email: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-50 border-t border-border">
      {/* Newsletter */}
      <div className="bg-rose-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl mb-2">Đăng Ký Nhận Tin</h3>
              <p className="text-muted-foreground">
                Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                required
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 flex-1 md:w-80"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors whitespace-nowrap"
              >
                Đăng Ký
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl mb-4">
              Beauty<span className="text-rose-600">Shop</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Hệ thống mỹ phẩm cao cấp hàng đầu Việt Nam. Chúng tôi cam kết mang đến những sản phẩm chính hãng, chất lượng tốt nhất.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Mua Sắm</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/san-pham" className="hover:text-rose-600">
                  Tất Cả Sản Phẩm
                </Link>
              </li>
              <li>
                <Link to="/san-pham?category=skincare" className="hover:text-rose-600">
                  Chăm Sóc Da
                </Link>
              </li>
              <li>
                <Link to="/san-pham?category=makeup" className="hover:text-rose-600">
                  Trang Điểm
                </Link>
              </li>
              <li>
                <Link to="/san-pham?sale=true" className="hover:text-rose-600">
                  Flash Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/theo-doi-don-hang" className="hover:text-rose-600">
                  Theo Dõi Đơn Hàng
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600">
                  Chính Sách Đổi Trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600">
                  Hướng Dẫn Mua Hàng
                </a>
              </li>
              <li>
                <Link to="/blog" className="hover:text-rose-600">
                  Blog Làm Đẹp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>1900 1234</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>support@beautyshop.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2026 BeautyShop. Tất cả quyền được bảo lưu.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-rose-600">
              Điều Khoản Dịch Vụ
            </a>
            <a href="#" className="hover:text-rose-600">
              Chính Sách Bảo Mật
            </a>
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 transition-all hover:scale-110 flex items-center justify-center z-50">
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>
    </footer>
  );
}
