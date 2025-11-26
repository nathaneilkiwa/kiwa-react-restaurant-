import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cart from './Cart'; // Import your Cart component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Add cart state
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurantCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      const savedCart = localStorage.getItem('restaurantCart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="bg-black fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Kiwa</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/"
                className={`font-medium transition-colors hover:text-amber-400 ${
                  location.pathname === '/' ? 'text-amber-400' : 'text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className={`font-medium transition-colors hover:text-amber-400 ${
                  location.pathname === '/menu' ? 'text-amber-400' : 'text-white'
                }`}
              >
                Menu
              </Link>
              <Link
                to="/order"
                className={`font-medium transition-colors hover:text-amber-400 ${
                  location.pathname === '/order' ? 'text-amber-400' : 'text-white'
                }`}
              >
                Order Online
              </Link>
              <Link
                to="/booking"
                className={`font-medium transition-colors hover:text-amber-400 ${
                  location.pathname === '/booking' ? 'text-amber-400' : 'text-white'
                }`}
              >
                Book a Table
              </Link>
              <Link
                to="/contact"
                className={`font-medium transition-colors hover:text-amber-400 ${
                  location.pathname === '/contact' ? 'text-amber-400' : 'text-white'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/login"
                className="text-white font-medium hover:text-amber-400 transition-colors flex items-center space-x-2 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Log In</span>
              </Link>
              
              {/* Cart Button - Now opens modal instead of navigating */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-white hover:text-amber-400 transition-colors relative group"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                
                {cartItemCount > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg ${
                    cartItemCount > 0 ? 'animate-pulse' : ''
                  }`}>
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col space-y-1 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="font-medium text-white hover:text-amber-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/menu"
                  className="font-medium text-white hover:text-amber-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  to="/order"
                  className="font-medium text-white hover:text-amber-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order Online
                </Link>
                <Link
                  to="/booking"
                  className="font-medium text-white hover:text-amber-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book a Table
                </Link>
                <Link
                  to="/contact"
                  className="font-medium text-white hover:text-amber-400 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="pt-4 border-t border-gray-800 space-y-3">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 font-medium text-white hover:text-amber-400 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Log In</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-between bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors group w-full"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Cart</span>
                    </div>
                    {cartItemCount > 0 && (
                      <span className="bg-gradient-to-r from-amber-500 to-pink-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Modal */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;