import { Search, ShoppingBag, Heart, User } from "lucide-react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onAuthClick: () => void;
}

export default function Header({ cartItemCount, onCartClick, onAuthClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl tracking-tight">
              LUXE<span className="text-pink-500">BEAUTY</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-foreground hover:text-pink-500 transition-colors">
              Shop
            </a>
            <a href="#" className="text-foreground hover:text-pink-500 transition-colors">
              Collections
            </a>
            <a href="#" className="text-foreground hover:text-pink-500 transition-colors">
              About
            </a>
            <a href="#" className="text-foreground hover:text-pink-500 transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={onAuthClick}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-accent rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
