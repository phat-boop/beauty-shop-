import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { products } from "../../data/products";

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Quản Lý Sản Phẩm</h1>
          <p className="text-muted-foreground">Tổng {products.length} sản phẩm</p>
        </div>
        <button className="flex items-center space-x-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Thêm Sản Phẩm</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg p-6 border border-border mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm">Sản Phẩm</th>
                <th className="px-6 py-4 text-left text-sm">Danh Mục</th>
                <th className="px-6 py-4 text-left text-sm">Giá</th>
                <th className="px-6 py-4 text-left text-sm">Tồn Kho</th>
                <th className="px-6 py-4 text-left text-sm">Đã Bán</th>
                <th className="px-6 py-4 text-left text-sm">Trạng Thái</th>
                <th className="px-6 py-4 text-right text-sm">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.nameVi}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.nameVi}</p>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-rose-600">{product.price.toLocaleString()}₫</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={product.stock < 50 ? "text-red-600" : ""}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.sold}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 0
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 hover:bg-blue-50 rounded text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
