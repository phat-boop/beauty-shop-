import { Link, useNavigate } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useApp();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const discount = subtotal > 1000000 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - discount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl mb-4">Giỏ Hàng Trống</h2>
          <p className="text-muted-foreground mb-8">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Link
            to="/san-pham"
            className="inline-flex items-center space-x-2 bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors"
          >
            <span>Tiếp Tục Mua Sắm</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8">Giỏ Hàng ({cartItems.length} sản phẩm)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-6 border-b border-border last:border-0"
                >
                  <Link
                    to={`/san-pham/${item.id}`}
                    className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.nameVi}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1">
                    <Link to={`/san-pham/${item.id}`}>
                      <h3 className="mb-1 hover:text-rose-600">{item.nameVi}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3">{item.brand}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-rose-600 text-xl">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            {item.price.toLocaleString()}₫ / sản phẩm
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="text-xl mb-6">Tóm Tắt Đơn Hàng</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{subtotal.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí vận chuyển</span>
                  <span>{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}₫`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{discount.toLocaleString()}₫</span>
                  </div>
                )}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-xl">
                    <span>Tổng cộng</span>
                    <span className="text-rose-600">{total.toLocaleString()}₫</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-rose-50 text-rose-600 text-sm p-4 rounded-lg mb-6">
                  Mua thêm {(500000 - subtotal).toLocaleString()}₫ để được miễn phí vận chuyển
                </div>
              )}

              <button
                onClick={() => navigate("/thanh-toan")}
                className="w-full bg-rose-600 text-white py-4 rounded-lg hover:bg-rose-700 transition-colors mb-4"
              >
                Tiến Hành Thanh Toán
              </button>

              <Link
                to="/san-pham"
                className="block text-center text-rose-600 hover:underline"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
