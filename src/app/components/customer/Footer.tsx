import { Link } from "react-router";
import { Heart } from "lucide-react";

const footerLinks = [
  {
    title: "Mua sắm",
    links: [
      { label: "Tất cả sản phẩm", to: "/san-pham" },
      { label: "Chăm Sóc Da", to: "/san-pham?category=skincare" },
      { label: "Trang Điểm", to: "/san-pham?category=makeup" },
      { label: "Flash Sale", to: "/san-pham?sale=true" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Theo dõi đơn hàng", to: "/theo-doi-don-hang" },
      { label: "Chính sách đổi trả", to: "/" },
      { label: "Hướng dẫn mua hàng", to: "/" },
      { label: "Blog làm đẹp", to: "/blog" },
    ],
  },
  {
    title: "Tài khoản",
    links: [
      { label: "Đăng nhập", to: "/dang-nhap" },
      { label: "Đăng ký", to: "/dang-ky" },
      { label: "Tài khoản của tôi", to: "/tai-khoan" },
      { label: "Danh sách yêu thích", to: "/yeu-thich" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-rose-700"
            >
              Beauty<span className="text-[#2b1813]">Shop</span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-stone-500">
              Mỹ phẩm chính hãng, giao hàng nhanh toàn quốc. Miễn phí vận
              chuyển cho đơn từ 1.500.000₫.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-stone-950">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-stone-500 hover:text-rose-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rose-50 pt-8 text-sm text-stone-400">
          <p>© 2026 BeautyShop. Tất cả quyền được bảo lưu.</p>
          <p className="flex items-center gap-1">
            Làm với <Heart className="size-4 fill-rose-400 text-rose-400" /> tại
            Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}