import { useState } from "react";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setOrder({
      id: "DH" + orderNumber,
      status: "shipping",
      date: "2026-06-02",
      estimatedDelivery: "2026-06-05",
      items: 3,
      total: 2450000,
      timeline: [
        { status: "Đã đặt hàng", completed: true, date: "2026-06-02 10:30" },
        { status: "Đã xác nhận", completed: true, date: "2026-06-02 11:15" },
        { status: "Đang giao hàng", completed: true, date: "2026-06-03 14:20" },
        { status: "Đã giao", completed: false, date: "" },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl mb-8">Theo Dõi Đơn Hàng</h1>

        <div className="bg-white rounded-lg p-8 mb-8">
          <form onSubmit={handleTrack} className="max-w-md mx-auto">
            <label className="block mb-4">Nhập mã đơn hàng của bạn</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Ví dụ: 123456"
                required
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                Tra Cứu
              </button>
            </div>
          </form>
        </div>

        {order && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl mb-2">Đơn Hàng #{order.id}</h2>
                  <p className="text-muted-foreground">Ngày đặt: {order.date}</p>
                </div>
                <div className="text-right">
                  <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-2">
                    Đang giao hàng
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dự kiến giao: {order.estimatedDelivery}
                  </p>
                </div>
              </div>

              <div className="relative">
                {order.timeline.map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-4 pb-8 last:pb-0">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                      {idx < order.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-full absolute top-10 ${
                            step.completed ? "bg-green-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={step.completed ? "text-foreground" : "text-muted-foreground"}>
                        {step.status}
                      </h3>
                      {step.date && (
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl mb-4">Chi Tiết Đơn Hàng</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số sản phẩm</span>
                  <span>{order.items} sản phẩm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tổng tiền</span>
                  <span className="text-rose-600 text-xl">{order.total.toLocaleString()}₫</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
