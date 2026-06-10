import { Link, useNavigate } from "react-router";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register:", data);
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
            Tạo tài khoản làm đẹp của bạn
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Lưu wishlist, nhận ưu đãi thành viên và theo dõi đơn hàng dễ dàng.
          </p>
        </div>

        <div className="p-6 md:p-12">
          <Link to="/" className="text-2xl font-bold text-rose-700 lg:hidden">
            BeautyShop
          </Link>

          <h2 className="mt-8 text-3xl font-bold text-stone-950 lg:mt-0">
            Đăng ký
          </h2>
          <p className="mt-2 text-stone-600">Tạo tài khoản mới.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <label className="block">
              <span className="font-semibold">Họ và tên</span>
              <div className="relative mt-2">
                <User className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
                <input
                  className="w-full rounded-2xl border border-rose-100 py-4 pl-12 pr-4 outline-none focus:border-rose-300"
                  placeholder="Nguyễn Văn A"
                  {...register("name", {
                    required: "Vui lòng nhập họ tên",
                  })}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-rose-600">{errors.name.message}</p>
              )}
            </label>

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
                  placeholder="Tối thiểu 6 ký tự"
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

            <label className="block">
              <span className="font-semibold">Xác nhận mật khẩu</span>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  className="w-full rounded-2xl border border-rose-100 py-4 pl-12 pr-4 outline-none focus:border-rose-300"
                  placeholder="Nhập lại mật khẩu"
                  {...register("confirmPassword", {
                    required: "Vui lòng xác nhận mật khẩu",
                    validate: (value) =>
                      value === watch("password") || "Mật khẩu không khớp",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-rose-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </label>

            <label className="flex items-start gap-3 text-sm text-stone-600">
              <input
                type="checkbox"
                className="mt-1"
                {...register("acceptedTerms", {
                  required: "Bạn cần đồng ý với điều khoản",
                })}
              />
              <span>
                Tôi đồng ý với{" "}
                <button type="button" className="font-semibold text-rose-700">
                  Điều khoản dịch vụ
                </button>{" "}
                và{" "}
                <button type="button" className="font-semibold text-rose-700">
                  Chính sách bảo mật
                </button>
              </span>
            </label>
            {errors.acceptedTerms && (
              <p className="text-sm text-rose-600">{errors.acceptedTerms.message}</p>
            )}

            <button className="w-full rounded-full bg-rose-600 py-4 font-semibold text-white hover:bg-rose-700">
              Đăng ký
            </button>
          </form>

          <p className="mt-6 text-center text-stone-600">
            Đã có tài khoản?{" "}
            <Link to="/dang-nhap" className="font-semibold text-rose-700">
              Đăng nhập
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