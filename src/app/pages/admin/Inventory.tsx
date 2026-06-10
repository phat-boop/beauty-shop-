import { AlertTriangle, Package } from "lucide-react";
import { products } from "../../data/products";

export default function AdminInventory() {
  const lowStockProducts = products.filter((p) => p.stock < 50);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Quản Lý Kho Hàng</h1>
        <p className="text-muted-foreground">Theo dõi tồn kho sản phẩm</p>
      </div>

      {/* Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-lg text-red-600 mb-1">Cảnh Báo Tồn Kho Thấp</h3>
              <p className="text-red-600 text-sm">
                {lowStockProducts.length} sản phẩm sắp hết hàng cần nhập thêm
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Tổng Sản Phẩm</p>
          <p className="text-3xl">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Tổng Tồn Kho</p>
          <p className="text-3xl">
            {products.reduce((sum, p) => sum + p.stock, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Sắp Hết Hàng</p>
          <p className="text-3xl text-red-600">{lowStockProducts.length}</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm">Sản Phẩm</th>
                <th className="px-6 py-4 text-left text-sm">Danh Mục</th>
                <th className="px-6 py-4 text-left text-sm">Tồn Kho</th>
                <th className="px-6 py-4 text-left text-sm">Đã Bán</th>
                <th className="px-6 py-4 text-left text-sm">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
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
                  <td className="px-6 py-4">
                    <span className={product.stock < 50 ? "text-red-600" : ""}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.sold}</td>
                  <td className="px-6 py-4">
                    {product.stock < 50 ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 flex items-center w-fit space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Sắp hết</span>
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 flex items-center w-fit space-x-1">
                        <Package className="w-3 h-3" />
                        <span>Đủ hàng</span>
                      </span>
                    )}
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
