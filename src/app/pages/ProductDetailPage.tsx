import { useState } from "react";
import { useParams, Link } from "react-router";
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RefreshCw } from "lucide-react";
import { products } from "../data/products";
import { useApp } from "../context/AppContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const product = products.find((p) => p.id === parseInt(id || "0"));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Không tìm thấy sản phẩm</h2>
          <Link to="/san-pham" className="text-rose-600 hover:underline">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const reviews = [
    { id: 1, user: "Nguyễn Thị A", rating: 5, comment: "Sản phẩm tuyệt vời, rất đáng tiền!", date: "2026-05-15" },
    { id: 2, user: "Trần Văn B", rating: 4, comment: "Chất lượng tốt, giao hàng nhanh", date: "2026-05-10" },
    { id: 3, user: "Lê Thị C", rating: 5, comment: "Mình đã dùng và rất hài lòng", date: "2026-05-05" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Section */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100">
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.nameVi}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? "border-rose-600" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="mb-2">
                <span className="text-sm text-muted-foreground">{product.brand}</span>
              </div>
              <h1 className="text-3xl mb-4">{product.nameVi}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} đánh giá)
                </span>
                <span className="text-sm text-muted-foreground">
                  Đã bán {product.sold}
                </span>
              </div>

              <div className="mb-6">
                {product.flashSale && (
                  <div className="bg-rose-50 p-4 rounded-lg mb-4">
                    <div className="text-rose-600 text-sm mb-2">⚡ FLASH SALE</div>
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl text-rose-600">
                        {product.price.toLocaleString()}₫
                      </div>
                      {product.originalPrice && (
                        <div className="text-xl text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}₫
                        </div>
                      )}
                      <div className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm">
                        -{product.flashSale.discountPercent}%
                      </div>
                    </div>
                  </div>
                )}
                {!product.flashSale && (
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl text-rose-600">
                      {product.price.toLocaleString()}₫
                    </div>
                    {product.originalPrice && (
                      <>
                        <div className="text-xl text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}₫
                        </div>
                        <div className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm">
                          -{product.discount}%
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="mb-3">Số Lượng</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-x border-border focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} sản phẩm có sẵn
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      addToCart(product);
                    }
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 bg-rose-600 text-white px-8 py-4 rounded-lg hover:bg-rose-700 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Thêm Vào Giỏ</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    isInWishlist(product.id)
                      ? "border-rose-600 bg-rose-50 text-rose-600"
                      : "border-border hover:border-rose-600 hover:bg-rose-50"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isInWishlist(product.id) ? "fill-rose-600" : ""}`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-6 h-6 text-rose-600 mb-2" />
                  <span className="text-xs text-center">Miễn phí vận chuyển</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-6 h-6 text-rose-600 mb-2" />
                  <span className="text-xs text-center">Chính hãng 100%</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <RefreshCw className="w-6 h-6 text-rose-600 mb-2" />
                  <span className="text-xs text-center">Đổi trả 30 ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex border-b border-border mb-6">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 ${
                  activeTab === tab
                    ? "border-b-2 border-rose-600 text-rose-600"
                    : "text-muted-foreground"
                }`}
              >
                {tab === "description" ? "Mô Tả" : "Đánh Giá"}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p>{product.descriptionVi}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{review.user}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{review.date}</div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl mb-6">Sản Phẩm Liên Quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/san-pham/${p.id}`}
                  className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.nameVi}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 line-clamp-2">{p.nameVi}</h3>
                    <p className="text-rose-600">{p.price.toLocaleString()}₫</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
