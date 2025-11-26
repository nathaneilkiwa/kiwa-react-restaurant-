import { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('pizza');
  const [quantities, setQuantities] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const sectionRefs = useRef([]);
  
  // Use cart context
  const { cart, addToCart, getCartItemCount, getCartTotal } = useContext(AppContext);
  
  const menuItems = {
    pizza: [
      { id: 1, name: 'Margherita', description: 'Tomato sauce, mozzarella, fresh basil', price: 12.99, image: '/images/margherita.jpg', badge: 'Popular' },
      { id: 2, name: 'Pepperoni', description: 'Tomato sauce, mozzarella, pepperoni', price: 14.99, image: '/images/pepperoni.jpg', badge: 'Best Seller' },
      { id: 3, name: 'Quattro Stagioni', description: 'Tomato sauce, mozzarella, ham, mushrooms, artichokes, olives', price: 16.99, image: '/images/quattro.jpg' },
      { id: 4, name: 'Diavola', description: 'Spicy salami, mozzarella, chili flakes', price: 15.99, image: '/images/diavola.jpg', badge: 'Spicy' },
    ],
    pasta: [
      { id: 5, name: 'Spaghetti Carbonara', description: 'Spaghetti, eggs, cheese, pancetta', price: 13.99, image: '/images/carbonara.jpg', badge: 'Chef\'s Pick' },
      { id: 6, name: 'Fettuccine Alfredo', description: 'Fettuccine, parmesan, butter, cream', price: 12.99, image: '/images/alfredo.jpg' },
      { id: 7, name: 'Penne Arrabbiata', description: 'Penne, tomato sauce, garlic, chili', price: 11.99, image: '/images/arrabbiata.jpg' },
    ],
    salads: [
      { id: 8, name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan, caesar dressing', price: 9.99, image: '/images/caesar.jpg' },
      { id: 9, name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, basil, balsamic', price: 10.99, image: '/images/caprese.jpg', badge: 'Fresh' },
    ],
    drinks: [
      { id: 10, name: 'Italian Soda', description: 'Refreshing sparkling drink with natural flavors', price: 3.99, image: '/images/soda.jpg' },
      { id: 11, name: 'House Wine', description: 'Glass of our finest house red or white wine', price: 6.99, image: '/images/wine.jpg' },
      { id: 12, name: 'Fresh Lemonade', description: 'Homemade lemonade with fresh lemons', price: 4.99, image: '/images/lemonade.jpg' },
    ],
    desserts: [
      { id: 13, name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: 7.99, image: '/images/tiramisu.jpg', badge: 'Signature' },
      { id: 14, name: 'Panna Cotta', description: 'Creamy vanilla dessert with berry compote', price: 6.99, image: '/images/pannacotta.jpg' },
      { id: 15, name: 'Cannoli', description: 'Crispy pastry filled with sweet ricotta cream', price: 5.99, image: '/images/cannoli.jpg' },
    ]
  };

  const categories = [
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'pasta', name: 'Pasta', icon: '🍝' },
    { id: 'salads', name: 'Salads', icon: '🥗' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeCategory]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change)
    }));
  };

  // Add to cart using context
  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);

    // Reset quantity
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));

    // Show notification
    setLastAddedItem(item);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const cartItemCount = getCartItemCount();
  const cartTotal = getCartTotal();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      {/* Floating Cart Notification */}
      <div className={`fixed top-24 right-4 z-50 transition-all duration-500 ${showCartNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-semibold">{lastAddedItem?.name} added to cart!</p>
            <p className="text-sm opacity-90">Quantity: {quantities[lastAddedItem?.id] || 1}</p>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-8 right-8 z-40 animate-bounce-subtle">
          <button className="relative bg-red-600 text-white p-5 rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 hover:scale-110 group">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center animate-pulse">
              {cartItemCount}
            </span>
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              View Cart: ${cartTotal.toFixed(2)}
            </div>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Animation */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block text-red-600 text-sm uppercase tracking-widest mb-4 font-semibold">
            Explore Our Selection
          </div>
          <h1 className="text-6xl md:text-7xl font-serif text-gray-900 mb-6 leading-tight">
            Our Menu
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our authentic Italian dishes made with the finest ingredients and traditional recipes passed down through generations
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-red-600 text-white shadow-2xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-lg">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {menuItems[activeCategory]?.map((item, index) => (
            <div
              key={item.id}
              ref={addToRefs}
              data-index={index}
              className={`group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl ${
                isVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image Section */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {item.badge && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {item.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-serif text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-red-600">${item.price}</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                
                {/* Quantity and Add to Cart */}
                <div className="flex justify-between items-center gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors font-bold shadow"
                    >
                      −
                    </button>
                    <span className="font-bold text-lg min-w-[2rem] text-center">
                      {quantities[item.id] || 1}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors font-bold shadow"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offers Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-3xl p-12 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-500">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="inline-block bg-yellow-400 text-red-900 px-6 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              LIMITED TIME OFFER
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Family Deal - 25% Off
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Get any 2 large pizzas, garlic bread, and 1.5L soda for only $29.99
            </p>
            <button className="bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 hover:text-red-900 transition-all duration-300 transform hover:scale-110 shadow-2xl">
              Order This Deal Now
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Menu;