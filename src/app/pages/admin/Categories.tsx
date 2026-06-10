import { Edit, Plus, Trash2 } from "lucide-react";
import { categories } from "../../data/products";

export default function AdminCategories() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-semibold uppercase tracking-[0.25em] text-rose-600">
            Catalog
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Quản lý danh mục
          </h1>
        </div>

        <button className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 font-semibold text-white">
          <Plus className="size-5" />
          Thêm danh mục
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {categories.slice(1).map((category) => (
          <article
            key={category.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold">{category.name}</h2>
            <p className="mt-2 text-slate-500">Mã: {category.id}</p>
            <p className="mt-4 text-3xl font-bold text-rose-700">
              {category.count}
            </p>
            <p className="text-sm text-slate-500">sản phẩm</p>

            <div className="mt-6 flex gap-2">
              <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                <Edit className="size-5" />
              </button>
              <button className="rounded-full p-2 text-red-500 hover:bg-red-50">
                <Trash2 className="size-5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}