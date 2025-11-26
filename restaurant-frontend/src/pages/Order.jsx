import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { orderAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(AppContext);
  const [orderType, setOrderType] = useState('delivery');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? 3.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setOrderError('');

  try {
    // Prepare order data for backend - FIXED STRUCTURE
    const orderData = {
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      items: cart.map(item => ({
        menuItem: item.id || item._id || item.name, // Use name as fallback
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: total,
      orderType: orderType,
      deliveryAddress: orderType === 'delivery' ? 
        `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.zipCode}` : 
        'Pickup at restaurant'
    };

    console.log('Submitting order:', orderData);

    // Send order to backend
    const response = await orderAPI.createOrder(orderData);
    console.log('✅ Order created successfully:', response.data);

    // Clear cart and move to success step
    clearCart();
    setStep(3);
    
  } catch (error) {
    console.error('❌ Order submission error:', error);
    setOrderError(
      error.response?.data?.message || 
      'Failed to place order. Please check if the backend server is running on port 5000.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  const handleContinueShopping = () => {
    navigate('/menu');
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items from our menu first!</p>
          <button 
            onClick={handleBackToMenu}
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-24 h-1 ${step > stepNumber ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Steps */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Order Type</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${
                      orderType === 'delivery' 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">🚚</div>
                    <h3 className="font-semibold text-lg mb-2">Delivery</h3>
                    <p className="text-gray-600">Get your food delivered to your door</p>
                    <p className="text-red-600 font-semibold mt-2">Delivery fee: $3.99</p>
                  </button>

                  <button
                    onClick={() => setOrderType('pickup')}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${
                      orderType === 'pickup' 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">🏪</div>
                    <h3 className="font-semibold text-lg mb-2">Pickup</h3>
                    <p className="text-gray-600">Pick up your order at our restaurant</p>
                    <p className="text-green-600 font-semibold mt-2">No delivery fee</p>
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleBackToMenu}
                    className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back to Menu
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
                  >
                    Continue to Checkout
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Customer Information</h2>
                
                {orderError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {orderError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Street address"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            required
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            required
                            value={customerInfo.zipCode}
                            onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="ZIP Code"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        `Place Order - $${total.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl text-green-500 mb-4">✅</div>
                <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your order! We've sent a confirmation to {customerInfo.email}
                </p>
                <p className="font-semibold mb-6">
                  Order #: <span className="text-red-600">ORD-{Date.now().toString().slice(-6)}</span>
                </p>
                <div className="space-y-4">
                  <button 
                    onClick={handleContinueShopping}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <span className="font-medium text-gray-800">{item.name}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-500 ml-9 mt-1">{item.description}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-red-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Special Offers */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h4 className="font-semibold text-red-800 mb-2">Special Offer</h4>
              <p className="text-red-700 text-sm">
                Get 15% off your first order! Use code: <strong>WELCOME15</strong>
              </p>
            </div>

            {/* Restaurant Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-2">Restaurant Info</h4>
              <p className="text-gray-600 text-sm">
                <strong>Address:</strong> 123 Pizza Street, Food City, FC 12345<br/>
                <strong>Phone:</strong> (555) 123-4567<br/>
                <strong>Hours:</strong> Mon-Sun 11AM-10PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;