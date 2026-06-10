import { Link } from "react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Star } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl mb-4">Danh Sách Yêu Thích Trống</h2>
          <p className="text-muted-foreground mb-8">
            Bạn chưa có sản phẩm yêu thích nào
          </p>
          <Link
            to="/san-pham"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Khám Phá Sản Phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8">Sản Phẩm Yêu Thích ({wishlist.length})</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all group"
            >
              <Link
                to={`/san-pham/${product.id}`}
                className="block relative aspect-square overflow-hidden"
              >
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
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-rose-50"
                >
                  <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
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
                  className="w-full flex items-center justify-center space-x-2 bg-rose-600 text-white py-2.5 rounded-lg hover:bg-rose-700 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Thêm Vào Giỏ</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
