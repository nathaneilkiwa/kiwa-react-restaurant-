import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  // Smooth scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
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
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Parallax Effect */}
      <section 
        className="relative h-screen flex items-center bg-cover bg-center" 
        style={{
          backgroundImage: 'url("/images/hero.jpg")',
          backgroundAttachment: 'fixed',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        
        {/* Animated Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-7xl md:text-8xl font-serif text-white mb-6 leading-tight tracking-tight">
              Welcome
            </h1>
            
            <div className="w-24 h-1 bg-red-600 mb-8 animate-slide-right"></div>
            
            <p className="text-xl text-white/90 mb-12 leading-relaxed font-light">
              Experience culinary excellence where every dish tells a story. Indulge in flavors that dance on your palate and create memories that last forever.
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Link 
                to="/order" 
                className="group relative inline-block border-2 border-white text-white px-10 py-4 text-base font-medium overflow-hidden transition-all duration-500 hover:scale-105"
              >
                <span className="relative z-10">Order Online</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Order Online
                </span>
              </Link>
              
              <Link 
                to="/menu" 
                className="inline-block bg-red-600 text-white px-10 py-4 text-base font-medium hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {/*<section 
        className="bg-red-600 py-12"
        data-section="stats"
        ref={addToRefs}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-sm uppercase tracking-wider opacity-90">Years Experience</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-sm uppercase tracking-wider opacity-90">Menu Items</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-sm uppercase tracking-wider opacity-90">Happy Customers</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-sm uppercase tracking-wider opacity-90">Expert Chefs</div>
            </div>
          </div>
        </div>
      </section> End Stats Bar */}

      {/* About Section with Image Reveal */}
      <section 
        className="py-32 bg-white overflow-hidden"
        data-section="about"
        ref={addToRefs}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image with Reveal Effect */}
            <div className={`relative h-[600px] group transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="absolute inset-0 bg-red-600 transform transition-transform duration-1000 group-hover:scale-105"></div>
              <img 
                src="/images/about.jpg" 
                alt="Restaurant" 
                className="relative w-full h-full object-cover transform translate-x-6 translate-y-6 transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-8"
              />
            </div>
            
            {/* Content with Fade-in */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="inline-block text-red-600 text-sm uppercase tracking-widest mb-4 font-semibold">
                Our Story
              </div>
              <h2 className="text-6xl font-serif text-gray-900 mb-8 leading-tight">
                Crafting Culinary<br />Excellence
              </h2>
              <div className="w-20 h-1 bg-red-600 mb-8"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                For over 15 years, we've been passionate about creating unforgettable dining experiences. Our journey began with a simple belief: great food brings people together.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Every dish we serve is a testament to our commitment to quality, authenticity, and innovation. From farm-fresh ingredients to time-honored recipes, we pour our hearts into every plate.
              </p>
              <Link 
                to="/about" 
                className="group inline-flex items-center gap-3 border-2 border-black text-black px-10 py-4 text-base font-medium hover:bg-black hover:text-white transition-all duration-300"
              >
                Discover Our Story
                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section with Card Animations */}
      <section 
        className="py-32 bg-gray-50"
        data-section="menu"
        ref={addToRefs}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.menu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block text-red-600 text-sm uppercase tracking-widest mb-4 font-semibold">
              Signature Dishes
            </div>
            <h2 className="text-6xl font-serif text-gray-900 mb-6">Explore Our Menu</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Handcrafted dishes that showcase the perfect blend of tradition and innovation
            </p>
          </div>
          
          {/* Menu Grid with Stagger Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((item, index) => (
              <div 
                key={item}
                className={`group bg-white overflow-hidden cursor-pointer transform transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 ${isVisible.menu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative h-96 overflow-hidden">
                  <img 
                    src={`/images/dish-${item}.jpg`} 
                    alt={`Dish ${item}`} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button className="w-full bg-white text-black py-3 font-medium hover:bg-red-600 hover:text-white transition-colors duration-300">
                      Order Now
                    </button>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-3xl font-serif text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    Signature Dish {item}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Fresh ingredients, perfectly balanced flavors
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">${20 + item * 4}.99</span>
                    <span className="text-sm text-gray-500 line-through">${25 + item * 4}.99</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible.menu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link 
              to="/menu" 
              className="inline-flex items-center gap-3 border-2 border-black text-black px-12 py-4 text-base font-medium hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
            >
              View Full Menu
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation Section with Dramatic Effect */}
      <section 
        className="relative py-40 overflow-hidden"
        data-section="booking"
        ref={addToRefs}
      >
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url("/images/restaurant-interior.jpg")',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/75"></div>
        
        <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white transition-all duration-1000 ${isVisible.booking ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-block text-red-500 text-sm uppercase tracking-widest mb-6 font-semibold">
            Reserve Your Table
          </div>
          <h2 className="text-7xl font-serif mb-8 leading-tight">
            An Unforgettable<br />Experience Awaits
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join us for an evening of exquisite flavors, warm ambiance, and impeccable service. Your table is waiting.
          </p>
          <Link 
            to="/booking" 
            className="inline-block bg-red-600 text-white px-14 py-5 text-lg font-medium hover:bg-red-700 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          >
            Book a Table Now
          </Link>
        </div>
      </section>

      {/* Footer CTA with Modern Layout */}
      <section 
        className="py-32 bg-white"
        data-section="contact"
        ref={addToRefs}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Content */}
            <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="inline-block text-red-600 text-sm uppercase tracking-widest mb-4 font-semibold">
                Visit Us
              </div>
              <h2 className="text-6xl font-serif text-gray-900 mb-8 leading-tight">
                Come Say Hello
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Location</div>
                    <p className="text-gray-600">123 Restaurant Street<br />City, State 12345</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Hours</div>
                    <p className="text-gray-600">
                      Mon-Thu: 11am - 10pm<br />
                      Fri-Sat: 11am - 11pm<br />
                      Sunday: 12pm - 9pm
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Contact</div>
                    <p className="text-gray-600">(555) 123-4567<br />info@restaurant.com</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-4 text-base font-medium hover:bg-black hover:text-white transition-all duration-300"
              >
                Get Directions
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </Link>
            </div>
            
            {/* Image */}
            <div className={`relative h-[650px] group transition-all duration-1000 delay-300 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="absolute inset-0 bg-red-600 transform transition-transform duration-700 group-hover:scale-105"></div>
              <img 
                src="/images/location.jpg" 
                alt="Location" 
                className="relative w-full h-full object-cover transform -translate-x-6 -translate-y-6 transition-transform duration-700 group-hover:-translate-x-8 group-hover:-translate-y-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-right {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-slide-right {
          animation: slide-right 1s ease-out 0.5s both;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Home;