import { Outlet } from "react-router";
import { AppProvider } from "../context/AppContext";
import Header from "../components/customer/Header";
import Footer from "../components/customer/Footer";

export default function Layout() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
