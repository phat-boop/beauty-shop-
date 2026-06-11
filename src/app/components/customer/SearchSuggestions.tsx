import { Link } from "react-router";
import { Search } from "lucide-react";
import { products } from "../../data/products";

interface Props {
  query: string;
  onSelect?: () => void;
}

export default function SearchSuggestions({
  query,
  onSelect,
}: Props) {
  if (!query.trim()) return null;

  const results = products
    .filter(
      (product) =>
        product.nameVi
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        product.brand
          .toLowerCase()
          .includes(query.toLowerCase())
    )
    .slice(0, 6);

  if (results.length === 0) {
    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-3xl border bg-white p-4 shadow-xl">
        Không tìm thấy sản phẩm.
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-3xl border bg-white shadow-xl">
      {results.map((product) => (
        <Link
          key={product.id}
          to={`/san-pham/${product.id}`}
          onClick={onSelect}
          className="flex items-center gap-3 border-b p-3 hover:bg-rose-50"
        >
          <img
            src={product.image}
            alt={product.nameVi}
            className="size-14 rounded-xl object-cover"
          />

          <div className="flex-1">
            <p className="font-semibold">
              {product.nameVi}
            </p>

            <p className="text-xs text-stone-500">
              {product.brand}
            </p>
          </div>

          <Search className="size-4 text-stone-400" />
        </Link>
      ))}
    </div>
  );
}