import { createBrowserRouter } from "react-router";

import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";

import OrderSuccessPage from "./pages/OrderSuccessPage";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";
import SearchPage from "./pages/SearchPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminCategories from "./pages/admin/Categories";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";
import AdminReports from "./pages/admin/Reports";
import AdminInventory from "./pages/admin/Inventory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "san-pham", Component: ProductListingPage },
      { path: "san-pham/:id", Component: ProductDetailPage },
      { path: "gio-hang", Component: CartPage },
      { path: "thanh-toan", Component: CheckoutPage },
      { path: "theo-doi-don-hang", Component: OrderTrackingPage },
      { path: "tai-khoan", Component: ProfilePage },
      { path: "yeu-thich", Component: WishlistPage },
      { path: "tim-kiem", Component: SearchPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:id", Component: BlogDetailPage },
    ],
  },
  {
    path: "/dang-nhap",
    Component: LoginPage,
  },
  {
    path: "/dang-ky",
    Component: RegisterPage,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "san-pham", Component: AdminProducts },
      { path: "danh-muc", Component: AdminCategories },
      { path: "don-hang", Component: AdminOrders },
      { path: "khach-hang", Component: AdminCustomers },
      { path: "bao-cao", Component: AdminReports },
      { path: "kho-hang", Component: AdminInventory },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
  path: "dat-hang-thanh-cong",
  Component: OrderSuccessPage,
}
]);