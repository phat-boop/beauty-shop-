import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { Search, Star } from "lucide-react";
import { products } from "../data/products";
import { useApp } from "../context/AppContext";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const { addToCart } = useApp();

  const searchResults = query
    ? products.filter((p) =>
        p.nameVi.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-6">Tìm Kiếm Sản Phẩm</h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {query && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              Tìm thấy {searchResults.length} sản phẩm cho "{query}"
            </p>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
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
                  <p className="text-rose-600 text-xl mb-3">
                    {product.price.toLocaleString()}₫
                  </p>
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
        ) : query ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-muted-foreground">
              Không tìm thấy sản phẩm nào phù hợp với "{query}"
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-muted-foreground">
              Nhập từ khóa để tìm kiếm sản phẩm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
