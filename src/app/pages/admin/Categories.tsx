import { Plus, Edit, Trash2 } from "lucide-react";
import { categories } from "../../data/products";

export default function AdminCategories() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Quản Lý Danh Mục</h1>
          <p className="text-muted-foreground">Tổng {categories.length} danh mục</p>
        </div>
        <button className="flex items-center space-x-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Thêm Danh Mục</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">{category.name}</h3>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-blue-50 rounded text-blue-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-muted-foreground">{category.count} sản phẩm</p>
          </div>
        ))}
      </div>
    </div>
  );
}
