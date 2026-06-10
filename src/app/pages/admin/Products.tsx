import { useMemo, useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { products } from "../../data/products";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + "₫";

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    if (!keyword) return products;

    return products.filter(
      (product) =>
        product.nameVi.toLowerCase().includes(keyword) ||
        product.name.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );
  }, [searchQuery]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
            Catalog
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Quản lý sản phẩm
          </h1>
          <p className="mt-2 text-slate-500">Tổng {products.length} sản phẩm.</p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700">
          <Plus className="size-5" />
          Thêm sản phẩm
        </button>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full rounded-full border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-rose-300"
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500">
                <th className="py-3">Sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Đã bán</th>
                <th>Trạng thái</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-slate-100">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.nameVi}
                        className="size-14 rounded-2xl object-cover"
                      />
                      <div>
                        <h2 className="font-bold">{product.nameVi}</h2>
                        <p className="text-sm text-slate-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td className="font-semibold">{formatPrice(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>{product.sold}</td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        product.stock > 10
                          ? "bg-emerald-50 text-emerald-700"
                          : product.stock > 0
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.stock > 10
                        ? "Còn hàng"
                        : product.stock > 0
                          ? "Sắp hết"
                          : "Hết hàng"}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                        <Edit className="size-5" />
                      </button>
                      <button className="rounded-full p-2 text-red-500 hover:bg-red-50">
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              Không tìm thấy sản phẩm phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}