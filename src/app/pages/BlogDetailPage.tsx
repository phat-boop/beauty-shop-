import { useParams } from "react-router";
import { Calendar, User } from "lucide-react";

export default function BlogDetailPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556228852-80f1b7093dae?w=1200"
            alt="Blog post"
            className="w-full aspect-[21/9] object-cover"
          />
          <div className="p-8 lg:p-12">
            <div className="inline-block px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm mb-6">
              Chăm Sóc Da
            </div>
            <h1 className="text-4xl mb-6">
              10 Bước Chăm Sóc Da Cơ Bản Cho Da Khỏe Đẹp
            </h1>
            <div className="flex items-center space-x-6 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>BeautyShop</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>2026-06-01</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Chăm sóc da là một phần quan trọng trong thói quen làm đẹp hàng ngày. Dưới đây là 10 bước chăm sóc da cơ bản giúp bạn có làn da khỏe mạnh và tươi sáng.
              </p>

              <h2 className="text-2xl mt-8 mb-4">1. Tẩy Trang</h2>
              <p className="text-muted-foreground mb-6">
                Bước đầu tiên và quan trọng nhất là làm sạch da. Sử dụng sản phẩm tẩy trang phù hợp để loại bỏ lớp makeup, bụi bẩn và dầu thừa trên da.
              </p>

              <h2 className="text-2xl mt-8 mb-4">2. Sữa Rửa Mặt</h2>
              <p className="text-muted-foreground mb-6">
                Sau khi tẩy trang, sử dụng sữa rửa mặt để làm sạch sâu hơn. Chọn sữa rửa mặt phù hợp với loại da của bạn.
              </p>

              <h2 className="text-2xl mt-8 mb-4">3. Toner</h2>
              <p className="text-muted-foreground mb-6">
                Toner giúp cân bằng độ pH cho da, se khít lỗ chân lông và chuẩn bị da để hấp thụ các sản phẩm dưỡng da tiếp theo.
              </p>

              <h2 className="text-2xl mt-8 mb-4">4. Serum</h2>
              <p className="text-muted-foreground mb-6">
                Serum chứa các thành phần dưỡng chất tập trung cao, giúp giải quyết các vấn đề cụ thể của da như lão hóa, thâm nám, mụn.
              </p>

              <h2 className="text-2xl mt-8 mb-4">5. Kem Dưỡng Mắt</h2>
              <p className="text-muted-foreground mb-6">
                Vùng da quanh mắt rất mỏng manh và dễ bị lão hóa. Sử dụng kem dưỡng mắt để giảm thâm quầng, bọng mắt và nếp nhăn.
              </p>

              <h2 className="text-2xl mt-8 mb-4">Kết Luận</h2>
              <p className="text-muted-foreground mb-6">
                Chăm sóc da đều đặn và đúng cách sẽ giúp bạn có làn da khỏe đẹp và tươi trẻ lâu dài. Hãy kiên trì thực hiện quy trình chăm sóc da mỗi ngày để đạt được kết quả tốt nhất.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
