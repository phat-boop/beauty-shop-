import { Link } from "react-router";
import { Calendar, Eye } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Quy trình chăm sóc da buổi sáng cho làn da căng bóng",
    excerpt:
      "Khám phá các bước skincare đơn giản nhưng hiệu quả để da luôn rạng rỡ mỗi ngày.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900",
    category: "Skincare",
    date: "2026-06-01",
    views: 2450,
  },
  {
    id: 2,
    title: "Cách chọn serum Vitamin C phù hợp với từng loại da",
    excerpt:
      "Vitamin C giúp làm sáng da, mờ thâm và chống oxy hóa nếu dùng đúng cách.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900",
    category: "Serum",
    date: "2026-05-28",
    views: 1830,
  },
  {
    id: 3,
    title: "Xu hướng makeup tự nhiên đang được yêu thích",
    excerpt:
      "Phong cách trang điểm nhẹ nhàng, trong trẻo phù hợp với vẻ đẹp hiện đại.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900",
    category: "Makeup",
    date: "2026-05-20",
    views: 3120,
  },
];

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="text-center">
        <p className="font-semibold uppercase tracking-[0.3em] text-rose-600">
          Beauty Journal
        </p>
        <h1 className="mt-3 text-4xl font-bold text-stone-950">Blog làm đẹp</h1>
        <p className="mx-auto mt-4 max-w-2xl text-stone-600">
          Cẩm nang chăm sóc da, trang điểm và lựa chọn mỹ phẩm an toàn.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <Link to={`/blog/${post.id}`}>
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[4/3] w-full object-cover"
              />
            </Link>

            <div className="p-6">
              <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700">
                {post.category}
              </span>

              <Link to={`/blog/${post.id}`}>
                <h2 className="mt-4 line-clamp-2 text-xl font-bold text-stone-950">
                  {post.title}
                </h2>
              </Link>

              <p className="mt-3 line-clamp-3 text-stone-600">{post.excerpt}</p>

              <div className="mt-5 flex items-center gap-4 text-sm text-stone-500">
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="size-4" />
                  {post.views}
                </span>
              </div>

              <Link
                to={`/blog/${post.id}`}
                className="mt-5 inline-flex font-semibold text-rose-700"
              >
                Đọc tiếp →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}