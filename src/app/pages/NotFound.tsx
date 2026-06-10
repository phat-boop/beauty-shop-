import { Link } from "react-router";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl text-rose-600 mb-4">404</h1>
        <h2 className="text-3xl mb-4">Không Tìm Thấy Trang</h2>
        <p className="text-muted-foreground mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Về Trang Chủ</span>
        </Link>
      </div>
    </div>
  );
}
