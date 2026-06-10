import { Outlet } from "react-router";
import Header from "../components/customer/Header";
import Footer from "../components/customer/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#fffaf7] text-[#221715]">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}