import { Link, useNavigate } from "react-router";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-stone-100 px-4 py-10">
      <section className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:grid-cols-2">
        <div className="hidden bg-[#2b1813] p-12 text-white lg:block">
          <Link to="/" className="text-3xl font-bold text-rose-200">
            BeautyShop
          </Link>
          <h1 className="mt-20 text-5xl font-bold leading-tight">
            Chào mừng bạn quay lại
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Đăng nhập để theo dõi đơn hàng, lưu sản phẩm yêu thích và nhận ưu đãi làm đẹp riêng cho bạn.
          </p>
        </div>

        <div className="p-6 md:p-12">
          <Link to="/" className="text-2xl font-bold text-rose-700 lg:hidden">
            BeautyShop
          </Link>

          <h2 className="mt-8 text-3xl font-bold text-stone-950 lg:mt-0">
            Đăng nhập
          </h2>
          <p className="mt-2 text-stone-600">Đăng nhập vào tài khoản của bạn.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <label className="block">
              <span className="font-semibold">Email</span>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  className="w-full rounded-2xl border border-rose-100 py-4 pl-12 pr-4 outline-none focus:border-rose-300"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email không hợp lệ",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p>
              )}
            </label>

            <label className="block">
              <span className="font-semibold">Mật khẩu</span>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  className="w-full rounded-2xl border border-rose-100 py-4 pl-12 pr-4 outline-none focus:border-rose-300"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu tối thiểu 6 ký tự",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-rose-600">{errors.password.message}</p>
              )}
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Ghi nhớ đăng nhập
              </label>
              <button type="button" className="font-semibold text-rose-700">
                Quên mật khẩu?
              </button>
            </div>

            <button className="w-full rounded-full bg-rose-600 py-4 font-semibold text-white hover:bg-rose-700">
              Đăng nhập
            </button>
          </form>

          <p className="mt-6 text-center text-stone-600">
            Chưa có tài khoản?{" "}
            <Link to="/dang-ky" className="font-semibold text-rose-700">
              Đăng ký ngay
            </Link>
          </p>

          <Link to="/" className="mt-8 block text-center text-sm text-stone-500">
            ← Quay lại trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
}