import { AlertTriangle, PackageCheck, Search, Warehouse } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "../../data/products";

export default function AdminInventory() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const keyword = query.toLowerCase().trim();

    if (!keyword) return products;

    return products.filter(
      (product) =>
        product.nameVi.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword)
    );
  }, [query]);

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 100
  );

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  return (
    <div>
      <div>
        <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
          Operations
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Quản lý kho hàng
        </h1>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Warehouse className="size-8 text-blue-600" />
          <p className="mt-4 text-slate-500">Tổng tồn kho</p>
          <strong className="mt-2 block text-3xl">{totalStock}</strong>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <AlertTriangle className="size-8 text-amber-600" />
          <p className="mt-4 text-slate-500">Sản phẩm sắp hết</p>
          <strong className="mt-2 block text-3xl">
            {lowStockProducts.length}
          </strong>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <PackageCheck className="size-8 text-emerald-600" />
          <p className="mt-4 text-slate-500">Đang hoạt động</p>
          <strong className="mt-2 block text-3xl">{products.length}</strong>
        </article>
      </div>

      {lowStockProducts.length > 0 && (
        <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-amber-800">
            <AlertTriangle className="size-6" />
            Cảnh báo tồn kho thấp
          </h2>

          <div className="mt-5 grid gap-3">
            {lowStockProducts.map((product) => (
              <article
                key={product.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4"
              >
                <div>
                  <h3 className="font-bold">{product.nameVi}</h3>
                  <p className="text-sm text-slate-500">{product.brand}</p>
                </div>
                <strong className="text-amber-700">
                  Còn {product.stock} sản phẩm
                </strong>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm kiếm tồn kho..."
            className="w-full rounded-full border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-rose-300"
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500">
                <th className="py-3">Sản phẩm</th>
                <th>Thương hiệu</th>
                <th>Danh mục</th>
                <th>Tồn kho</th>
                <th>Đã bán</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-slate-100">
                  <td className="py-4 font-bold">{product.nameVi}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.sold}</td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        product.stock > 100
                          ? "bg-emerald-50 text-emerald-700"
                          : product.stock > 0
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.stock > 100
                        ? "An toàn"
                        : product.stock > 0
                          ? "Sắp hết"
                          : "Hết hàng"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}