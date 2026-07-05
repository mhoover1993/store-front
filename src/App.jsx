import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: "Country Sourdough",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bfcdd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Almond Croissant Box",
    price: 24.00,
    image: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "House Espresso Blend",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Organic Stoneground Flour",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1601050690597-df0568a70950?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Cultured Butter",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f6f598?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "Pain au Chocolat",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=800",
  },
];

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen relative font-sans text-neutral-900 bg-[#F9F8F6] selection:bg-stone-200">
      
      {/* Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-[#F9F8F6]/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          <div className="flex-1 md:hidden">
            <button className="p-2 -ml-2 text-neutral-600 hover:text-neutral-900 transition-colors">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="hidden md:flex flex-1 gap-8 text-sm tracking-wide text-neutral-500">
            <a href="#shop" className="hover:text-neutral-900 transition-colors duration-300">Shop</a>
            <a href="#about" className="hover:text-neutral-900 transition-colors duration-300">About</a>
            <a href="#journal" className="hover:text-neutral-900 transition-colors duration-300">Journal</a>
          </div>

          <div className="flex-1 flex justify-center">
            <a href="#" className="text-2xl font-light tracking-[0.2em] uppercase text-neutral-900">
              Lumina
            </a>
          </div>

          <div className="flex-1 flex justify-end">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 -mr-2 text-neutral-600 hover:text-neutral-900 transition-colors group flex items-center gap-2"
            >
              <span className="hidden md:block text-sm tracking-wide group-hover:text-neutral-900 transition-colors duration-300">Cart</span>
              <div className="relative">
                <ShoppingBag size={24} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 rounded-full bg-[#8BA88E] text-white text-[10px] font-medium px-1 border-2 border-[#F9F8F6] transform transition-transform duration-300 scale-100">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-500" 
          onClick={() => setIsCartOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-full max-w-[400px] bg-[#F9F8F6] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-lg font-light tracking-wide uppercase">Your Bag ({cartCount})</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-200/50"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500 space-y-4">
                <ShoppingBag size={48} strokeWidth={1} className="text-neutral-300" />
                <p className="tracking-wide">Your bag is currently empty.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2 text-sm tracking-wide uppercase border border-neutral-300 hover:border-neutral-900 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-24 bg-neutral-200 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium tracking-wide text-neutral-900 pr-4">{item.name}</h3>
                        <p className="text-sm text-neutral-500">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-neutral-400 hover:text-red-500 text-left transition-colors w-fit underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-white/50 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4 text-sm font-medium tracking-wide">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-neutral-500 mb-6 text-center tracking-wide">Shipping & taxes calculated at checkout</p>
              <button className="w-full py-4 bg-neutral-900 text-white tracking-widest uppercase text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group">
                Checkout
                <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          <div className="flex-1 space-y-8 md:pr-12 text-center md:text-left z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900 leading-[1.1]">
              Crafted slowly. <br className="hidden md:block"/>Enjoyed instantly.
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 font-light max-w-md mx-auto md:mx-0 leading-relaxed">
              Artisan sourdough, pastries, and pantry staples baked fresh every morning in small batches.
            </p>
            <div className="pt-4">
              <a href="#shop" className="inline-flex items-center justify-center px-8 py-4 bg-[#8BA88E] text-white rounded-full text-sm font-medium tracking-wide hover:bg-[#7a947d] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Shop the Collection
              </a>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200" 
                alt="Fresh artisan bread" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-neutral-900/5 mix-blend-multiply pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Shop Grid Section */}
      <section id="shop" className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b border-neutral-200 pb-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">Daily Offerings</h2>
            <a href="#" className="hidden md:inline-flex items-center text-sm font-medium tracking-wide uppercase text-neutral-500 hover:text-neutral-900 transition-colors group">
              View All <ArrowRight size={16} strokeWidth={1.5} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {PRODUCTS.map(product => (
              <div key={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                  />
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 pointer-events-none">
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="pointer-events-auto px-6 py-3 bg-white text-neutral-900 rounded-full text-sm font-medium tracking-wide shadow-lg hover:bg-neutral-900 hover:text-white transition-colors duration-300 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 ease-out"
                    >
                      Quick Add 
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-neutral-900 tracking-wide group-hover:text-[#8BA88E] transition-colors">{product.name}</h3>
                  <span className="text-neutral-500 font-light">${product.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Story / Bento Box */}
      <section id="about" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          <div className="md:col-span-5 flex flex-col justify-center space-y-8 pr-0 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide leading-tight">
              A devotion to the <br/> art of baking.
            </h2>
            <p className="text-neutral-600 font-light leading-relaxed">
              We believe in the power of time. 100% organic flour, naturally leavened, and given a 48-hour cold fermentation. The result is bread that is deeply flavorful, highly digestible, and unmistakably ours.
            </p>
            <a href="#" className="inline-flex items-center text-sm font-medium tracking-wide uppercase text-neutral-900 hover:text-[#8BA88E] transition-colors group w-fit">
              Read our story <ArrowRight size={16} strokeWidth={1.5} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
            <div className="aspect-square bg-neutral-200 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1596706911674-897db9ed3fc4?auto=format&fit=crop&q=80&w=800" alt="Flour dusting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[3/4] bg-neutral-200 overflow-hidden -mt-8 md:-mt-16">
               <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=800" alt="Scoring bread" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-neutral-900 text-white pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
            
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-light tracking-[0.2em] uppercase">Lumina</h3>
              <p className="text-neutral-400 font-light max-w-sm">
                Join the Bread Club for 10% off your first order, plus updates on seasonal pastries and workshops.
              </p>
              <form className="flex gap-2 max-w-md mt-4">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-transparent border-b border-neutral-700 pb-2 px-0 w-full focus:outline-none focus:border-white transition-colors text-white placeholder:text-neutral-600 font-light"
                />
                <button type="submit" className="text-sm font-medium tracking-wide uppercase hover:text-[#8BA88E] transition-colors pb-2">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs tracking-widest uppercase text-neutral-500 mb-6">Explore</h4>
              <ul className="space-y-3 font-light text-neutral-300">
                <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stockists</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs tracking-widest uppercase text-neutral-500 mb-6">Assistance</h4>
              <ul className="space-y-3 font-light text-neutral-300">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refunds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-neutral-500">
            <p>&copy; {new Date().getFullYear()} Lumina Bakery & Goods. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
