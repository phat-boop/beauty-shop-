import { Link } from "react-router";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Bước Chăm Sóc Da Cơ Bản",
    titleVi: "10 Bước Chăm Sóc Da Cơ Bản Cho Da Khỏe Đẹp",
    excerpt: "Hướng dẫn chi tiết quy trình chăm sóc da 10 bước để có làn da khỏe mạnh và tươi sáng...",
    image: "https://images.unsplash.com/photo-1556228852-80f1b7093dae?w=600",
    author: "BeautyShop",
    category: "Chăm Sóc Da",
    date: "2026-06-01",
    views: 1234,
  },
  {
    id: 2,
    title: "Cách Chọn Serum Phù Hợp",
    titleVi: "Cách Chọn Serum Phù Hợp Với Từng Loại Da",
    excerpt: "Serum là bước quan trọng trong quy trình dưỡng da. Tìm hiểu cách chọn serum phù hợp...",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
    author: "BeautyShop",
    category: "Serum",
    date: "2026-05-28",
    views: 2341,
  },
  {
    id: 3,
    title: "Xu Hướng Makeup 2026",
    titleVi: "Top Xu Hướng Makeup Hot Nhất 2026",
    excerpt: "Cập nhật những xu hướng trang điểm mới nhất trong năm 2026 từ các fashion week...",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600",
    author: "BeautyShop",
    category: "Trang Điểm",
    date: "2026-05-25",
    views: 3456,
  },
  {
    id: 4,
    title: "Chống Lão Hóa Da Hiệu Quả",
    titleVi: "Bí Quyết Chống Lão Hóa Da Hiệu Quả Tại Nhà",
    excerpt: "Những phương pháp chống lão hóa da đơn giản nhưng hiệu quả mà bạn có thể áp dụng...",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600",
    author: "BeautyShop",
    category: "Chống Lão Hóa",
    date: "2026-05-20",
    views: 1876,
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl mb-4">Blog Làm Đẹp</h1>
          <p className="text-lg text-muted-foreground">
            Khám phá những bí quyết làm đẹp, xu hướng mỹ phẩm và cẩm nang chăm sóc da
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {["Tất Cả", "Chăm Sóc Da", "Trang Điểm", "Serum", "Chống Lão Hóa"].map((cat) => (
            <button
              key={cat}
              className="px-6 py-2 bg-white border border-border rounded-full hover:border-rose-600 hover:text-rose-600 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {blogPosts[0] && (
          <Link
            to={`/blog/${blogPosts[0].id}`}
            className="block bg-white rounded-2xl overflow-hidden mb-12 group hover:shadow-xl transition-all"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].titleVi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:py-12">
                <div className="inline-block px-4 py-1 bg-rose-100 text-rose-600 rounded-full text-sm mb-4">
                  {blogPosts[0].category}
                </div>
                <h2 className="text-3xl mb-4 group-hover:text-rose-600 transition-colors">
                  {blogPosts[0].titleVi}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="bg-white rounded-xl overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.titleVi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm mb-3">
                  {post.category}
                </div>
                <h3 className="text-xl mb-3 group-hover:text-rose-600 transition-colors line-clamp-2">
                  {post.titleVi}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-rose-600 group-hover:underline">
                    <span>Đọc thêm</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
