import { Link, useParams } from "react-router";
import { Calendar, Eye, User } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Quy trình chăm sóc da buổi sáng cho làn da căng bóng",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200",
    category: "Skincare",
    date: "2026-06-01",
    views: 2450,
    author: "BeautyShop Editorial",
    content: [
      "Một chu trình chăm sóc da buổi sáng tốt không cần quá phức tạp. Điều quan trọng là làm sạch nhẹ nhàng, cấp ẩm đủ và bảo vệ da khỏi ánh nắng.",
      "Bắt đầu với sữa rửa mặt dịu nhẹ, sau đó dùng toner hoặc essence để cân bằng da. Tiếp theo là serum phù hợp với nhu cầu của bạn, ví dụ Vitamin C cho da xỉn màu hoặc Hyaluronic Acid cho da thiếu nước.",
      "Kem dưỡng giúp khóa ẩm và duy trì hàng rào bảo vệ da. Cuối cùng, kem chống nắng là bước bắt buộc để ngăn ngừa lão hóa sớm và thâm nám.",
    ],
  },
  {
    id: 2,
    title: "Cách chọn serum Vitamin C phù hợp với từng loại da",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200",
    category: "Serum",
    date: "2026-05-28",
    views: 1830,
    author: "BeautyShop Editorial",
    content: [
      "Serum Vitamin C là lựa chọn phổ biến cho làn da xỉn màu, có thâm sau mụn hoặc bắt đầu xuất hiện dấu hiệu lão hóa.",
      "Da nhạy cảm nên bắt đầu với nồng độ thấp và dùng cách ngày. Da dầu có thể chọn kết cấu mỏng nhẹ, còn da khô nên ưu tiên công thức có thêm thành phần dưỡng ẩm.",
      "Luôn dùng kem chống nắng vào ban ngày khi sử dụng Vitamin C để đạt hiệu quả tốt hơn.",
    ],
  },
  {
    id: 3,
    title: "Xu hướng makeup tự nhiên đang được yêu thích",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200",
    category: "Makeup",
    date: "2026-05-20",
    views: 3120,
    author: "BeautyShop Editorial",
    content: [
      "Makeup tự nhiên tập trung vào làn da khỏe, lớp nền mỏng và màu sắc hài hòa.",
      "Bạn có thể chọn cushion hoặc skin tint thay vì kem nền dày. Má hồng dạng kem, son bóng và chân mày mềm mại sẽ giúp tổng thể tươi tắn hơn.",
      "Điểm quan trọng là chăm sóc da tốt trước khi makeup để lớp nền mịn và bền hơn.",
    ],
  },
];

export default function BlogDetailPage() {
  const { id } = useParams();
  const post = posts.find((item) => item.id === Number(id));

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-stone-950">
          Không tìm thấy bài viết
        </h1>
        <Link
          to="/blog"
          className="mt-8 inline-flex rounded-full bg-rose-600 px-8 py-3 font-semibold text-white"
        >
          Quay lại Blog
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link to="/blog" className="font-semibold text-rose-700">
        ← Quay lại Blog
      </Link>

      <div className="mt-8">
        <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700">
          {post.category}
        </span>

        <h1 className="mt-5 text-4xl font-bold leading-tight text-stone-950 md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-stone-500">
          <span className="flex items-center gap-1">
            <User className="size-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="size-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="size-4" />
            {post.views} lượt xem
          </span>
        </div>
      </div>

      <img
        src={post.image}
        alt={post.title}
        className="mt-8 aspect-[16/9] w-full rounded-[2rem] object-cover"
      />

      <div className="prose prose-stone mt-8 max-w-none">
        {post.content.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-8 text-stone-700">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}