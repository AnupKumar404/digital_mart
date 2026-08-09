import { useState } from "react";
import { 
  MdAccountCircle, 
  MdOutlineShoppingCart, 
  MdSearch, 
  MdMenu, 
  MdClose 
} from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { cartApi } from "../services/cartApi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const items = useSelector((state) => state.cart);
  // const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  const handleCartClick = () => {
    // Prevent clicking if cart is empty
    if (items?.length > 0) {
      dispatch(cartApi.util.prefetch('getCartItems', undefined, { force: true }));
      navigate('/cart');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Logo, Search (Desktop), Links (Desktop), Cart */}
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Hamburger Icon (Mobile Only) */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-black transition focus:outline-none"
            >
              {isMenuOpen ? <MdClose size={32} /> : <MdMenu size={32} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex text-2xl md:text-3xl font-bold font-serif shrink-0">
            <span className="text-black">Daily</span>
            <span className="text-green-700">Veggies</span>
          </Link>

          {/* Search Bar (Desktop Only) */}
          <div className="hidden md:flex flex-1 max-w-xl bg-gray-100 px-4 py-2.5 rounded-xl items-center gap-2 transition-shadow focus-within:ring-2 focus-within:ring-green-500">
            <MdSearch className="text-gray-500" size={24} />
            <input
              className="w-full bg-transparent border-none outline-none text-lg text-gray-700 placeholder-gray-500"
              type="text"
              placeholder="Search 'Aalu'"
            />
          </div>

          {/* Navigation Links (Desktop Only) */}
          <nav className="hidden md:flex items-center gap-6 text-xl font-medium text-gray-700">
            <Link to="/" className="hover:text-green-700 transition">Home</Link>
            <Link to="/about" className="hover:text-green-700 transition">About</Link>
            <Link to="/login" className="hover:text-green-700 transition">Login</Link>
            <Link to="/profile" title="User Profile" className="hover:text-green-700 transition">
              <MdAccountCircle size={32} />
            </Link>
          </nav>

          {/* Cart Button (Always Visible) */}
          <button
            onClick={handleCartClick}
            disabled={items?.length === 0}
            className={`flex items-center gap-2 rounded-xl py-2 px-4 transition-all shrink-0 ${
              items?.length === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700 text-white cursor-pointer shadow-md"
            }`}
            title="Cart"
          >
            <MdOutlineShoppingCart size={24} />
            <span className="text-lg md:text-xl font-medium">
              {items?.length || 0} <span className="hidden sm:inline">item</span>
            </span>
          </button>
          
        </div>

        {/* Search Bar (Mobile Only - drops to new row) */}
        <div className="md:hidden pb-4">
          <div className="flex w-full bg-gray-100 px-4 py-2.5 rounded-xl items-center gap-2 focus-within:ring-2 focus-within:ring-green-500">
            <MdSearch className="text-gray-500" size={24} />
            <input
              className="w-full bg-transparent border-none outline-none text-lg text-gray-700 placeholder-gray-500"
              type="text"
              placeholder="Search 'Aalu'"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 shadow-inner">
          <nav className="flex flex-col px-6 py-4 gap-4 text-lg font-medium text-gray-700">
            <Link to="/" onClick={toggleMenu} className="hover:text-green-700 block">Home</Link>
            <Link to="/about" onClick={toggleMenu} className="hover:text-green-700 block">About</Link>
            <Link to="/login" onClick={toggleMenu} className="hover:text-green-700 block">Login</Link>
            <Link to="/profile" onClick={toggleMenu} className="flex items-center gap-2 hover:text-green-700">
              <MdAccountCircle size={28} />
              Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;