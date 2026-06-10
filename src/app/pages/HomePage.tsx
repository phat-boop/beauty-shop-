import { Link } from "react-router";
import { ArrowRight, Star, TruckIcon, ShieldCheck, HeadphonesIcon } from "lucide-react";
import { products } from "../data/products";
import { useApp } from "../context/AppContext";

export default function HomePage() {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const flashSaleProducts = products.filter((p) => p.flashSale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm mb-6">
                Bộ Sưu Tập Mùa Hè 2026
              </div>
              <h1 className="text-5xl lg:text-6xl mb-6 leading-tight">
                Khám Phá Vẻ Đẹp
                <br />
                <span className="text-rose-600">Tự Nhiên</span> Của Bạn
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Mỹ phẩm cao cấp được tuyển chọn kỹ lưỡng. Nâng cao vẻ đẹp tự nhiên của bạn với bộ sưu tập sang trọng về trang điểm và chăm sóc da.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/san-pham"
                  className="inline-flex items-center space-x-2 bg-rose-600 text-white px-8 py-4 rounded-lg hover:bg-rose-700 transition-colors"
                >
                  <span>Mua Sắm Ngay</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center space-x-2 border-2 border-rose-600 text-rose-600 px-8 py-4 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <span>Blog Làm Đẹp</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1772191530787-b9546da02fbc?w=400"
                    alt="Product"
                    className="rounded-2xl shadow-lg w-full aspect-square object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1748543668646-e81cda0890f3?w=400"
                    alt="Product"
                    className="rounded-2xl shadow-lg w-full aspect-[4/3] object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"
                    alt="Product"
                    className="rounded-2xl shadow-lg w-full aspect-[4/3] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1697201343045-64b1548535cb?w=400"
                    alt="Product"
                    className="rounded-2xl shadow-lg w-full aspect-square object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TruckIcon className="w-7 h-7 text-rose-600" />
              </div>
              <div>
                <h3 className="mb-1">Miễn Phí Vận Chuyển</h3>
                <p className="text-sm text-muted-foreground">
                  Cho đơn hàng từ 500.000₫
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-7 h-7 text-rose-600" />
              </div>
              <div>
                <h3 className="mb-1">100% Chính Hãng</h3>
                <p className="text-sm text-muted-foreground">
                  Cam kết hàng chính hãng
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HeadphonesIcon className="w-7 h-7 text-rose-600" />
              </div>
              <div>
                <h3 className="mb-1">Hỗ Trợ 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Tư vấn nhiệt tình
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      {flashSaleProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-4">⚡ Flash Sale Hôm Nay</h2>
              <p className="text-rose-100 text-lg">
                Giảm giá lên đến 35% - Số lượng có hạn!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/san-pham/${product.id}`}
                  className="bg-white rounded-xl overflow-hidden group hover:shadow-2xl transition-all"
                >
                  <div className="relative aspect-square">
                    <img
                      src={product.image}
                      alt={product.nameVi}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-rose-600 text-white px-3 py-1 rounded-full text-sm">
                      -{product.flashSale?.discountPercent}%
                    </div>
                  </div>
                  <div className="p-4 text-gray-900">
                    <h3 className="text-sm mb-2 line-clamp-2">{product.nameVi}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-rose-600 text-lg">
                          {product.price.toLocaleString()}₫
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            {product.originalPrice.toLocaleString()}₫
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        Đã bán {product.sold}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Khám phá bộ sưu tập mỹ phẩm cao cấp được tuyển chọn kỹ lưỡng
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all group"
              >
                <Link to={`/san-pham/${product.id}`} className="block relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.nameVi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-rose-600 text-white px-3 py-1 rounded-full text-sm">
                      -{product.discount}%
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-rose-50"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isInWishlist(product.id)
                          ? "fill-rose-600 text-rose-600"
                          : "text-gray-600"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </Link>
                <div className="p-4">
                  <Link to={`/san-pham/${product.id}`}>
                    <p className="text-xs text-muted-foreground mb-1">
                      {product.brand}
                    </p>
                    <h3 className="mb-2 line-clamp-2 min-h-[3rem]">
                      {product.nameVi}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-rose-600 text-xl">
                        {product.price.toLocaleString()}₫
                      </p>
                      {product.originalPrice && (
                        <p className="text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}₫
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-rose-600 text-white py-2.5 rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    Thêm Vào Giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/san-pham"
              className="inline-flex items-center space-x-2 border-2 border-rose-600 text-rose-600 px-8 py-3 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <span>Xem Tất Cả Sản Phẩm</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
