import { useEffect, useState } from "react";
import { getFlashSaleTime } from "../../utils/flashSale";

export default function FlashSaleCountdown() {
  const [time, setTime] = useState(getFlashSaleTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFlashSaleTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (time.expired) {
    return null;
  }

  return (
    <div className="rounded-3xl bg-gradient-to-r from-rose-600 to-pink-500 p-5 text-white shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-[0.25em]">
        ⚡ Flash Sale
      </p>

      <div className="mt-3 flex gap-4 text-center">
        <div>
          <strong className="block text-3xl">{time.days}</strong>
          <span className="text-xs">Ngày</span>
        </div>

        <div>
          <strong className="block text-3xl">{time.hours}</strong>
          <span className="text-xs">Giờ</span>
        </div>

        <div>
          <strong className="block text-3xl">{time.minutes}</strong>
          <span className="text-xs">Phút</span>
        </div>

        <div>
          <strong className="block text-3xl">{time.seconds}</strong>
          <span className="text-xs">Giây</span>
        </div>
      </div>
    </div>
  );
}