import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BeautyBlog } from './components/BeautyBlog';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col justify-between bg-[#FFF8FA]">
        <div>
          <Navbar />
          <Hero />
          <Categories />
          <FeaturedProducts />
          <BeautyBlog />
          <Testimonials />
        </div>
        <div>
          <Newsletter />
          <Footer />
        </div>

        <CartDrawer />
        <WishlistDrawer />
      </div>
    </AppProvider>
  );
};

export default App;