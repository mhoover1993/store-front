import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, ArrowRight, Leaf, Heart, Wheat, Clock } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: "Country Sourdough",
    price: 14.00,
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bfcdd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Olive & Herb Loaf",
    price: 16.00,
    image: "https://images.unsplash.com/photo-1601050690597-df0568a70950?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "French Baguette",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Toasted Walnut Rye",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  }
];

const ARTICLES = [
  {
    id: 1,
    category: "Process",
    date: "October 12, 2026",
    title: "The Alchemy of Wild Yeast",
    excerpt: "Understanding the intricate balance of temperature, time, and flour that gives our sourdough its signature tang and open crumb.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    category: "Ingredients",
    date: "September 28, 2026",
    title: "Sourcing Heritage Grains",
    excerpt: "A journey to the local mills that provide our organic stoneground flours, and why grain diversity matters for flavor.",
    image: "https://images.unsplash.com/photo-1596706911674-897db9ed3fc4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    category: "Community",
    date: "September 15, 2026",
    title: "Morning Rituals at the Bakery",
    excerpt: "Before the sun rises and the doors open, our bakers are already deep into the meditative rhythm of shaping and scoring.",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    category: "baking process",
    date: "August 30, 2026",
    title: "Reviving Stale Bread",
    excerpt: "Don't let a good loaf go to waste. Simple and rustic ways to turn day-old sourdough into croutons, panzanella, and bread pudding.",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f6f598?auto=format&fit=crop&q=80&w=800"
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('Shop');
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

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen relative font-sans text-stone-900 bg-stone-50 selection:bg-stone-200">

      {/* Global Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b ${isScrolled ? 'bg-stone-50/80 backdrop-blur-md border-stone-200 py-4 shadow-sm' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          <div className="flex-1 md:hidden flex items-center">
            <button className="p-2 -ml-2 text-stone-600 hover:text-stone-900 transition-colors">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="hidden md:flex flex-1 gap-8 text-sm tracking-wide text-stone-600">
            {['Shop', 'About', 'Journal'].map(page => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className={`hover:text-stone-900 transition-colors duration-300 pb-1 relative ${currentPage === page ? 'text-stone-900' : ''}`}
              >
                {page}
                {currentPage === page && (
                  <span className="absolute left-0 right-0 bottom-0 h-px bg-stone-900"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 flex justify-center">
            <button onClick={() => navigateTo('Shop')} className="text-3xl font-serif tracking-wide text-stone-900">
              Hearth & Crumb
            </button>
          </div>

          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 -mr-2 text-stone-600 hover:text-stone-900 transition-colors group flex items-center gap-2"
            >
              <span className="hidden md:block text-sm tracking-wide group-hover:text-stone-900 transition-colors duration-300">Bag</span>
              <div className="relative">
                <ShoppingBag size={24} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-[1.25rem] h-5 rounded-full bg-[#a3b18a] text-stone-50 text-[10px] font-medium px-1 border-2 border-stone-50 transform transition-transform duration-300 scale-100">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer Overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setIsCartOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-full max-w-[400px] bg-stone-50 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-xl font-serif tracking-wide">Your Bag ({cartCount})</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 -mr-2 text-stone-500 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-200/50"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-stone-500 space-y-4">
                <ShoppingBag size={48} strokeWidth={1} className="text-stone-300" />
                <p className="tracking-wide">Your bag is empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2 text-sm tracking-wide border border-stone-300 hover:border-stone-900 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-24 bg-stone-200 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center mix-blend-multiply" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-serif text-stone-900 pr-4">{item.name}</h3>
                        <p className="text-sm text-stone-500">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-stone-400 hover:text-[#c44536] text-left transition-colors w-fit underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/90 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4 text-sm tracking-wide">
                <span className="font-serif text-lg">Subtotal</span>
                <span className="font-serif text-lg">${cartSubtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-stone-500 mb-6 text-center tracking-wide">Shipping & taxes calculated at checkout</p>
              <button className="w-full py-4 bg-stone-900 text-stone-50 tracking-widest uppercase text-sm font-medium hover:bg-[#8f6a48] transition-colors flex items-center justify-center gap-2 group">
                Checkout
                <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>

      <main className="pt-24 min-h-screen">
        {/* VIEW: SHOP */}
        {currentPage === 'Shop' && (
          <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 md:mb-32">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-stretch min-h-[60vh] bg-stone-200/50">
                <div className="flex-1 flex flex-col justify-center p-12 lg:p-20 text-center lg:text-left z-10 order-2 lg:order-1">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-stone-900 leading-tight mb-8">
                    Bread, baked by hand and ruled by time.
                  </h1>
                  <div>
                    <button
                      onClick={() => document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center justify-center px-10 py-4 bg-stone-900 text-stone-50 text-sm font-medium tracking-wide hover:bg-[#8f6a48] transition-colors duration-300"
                    >
                      Shop the Oven
                    </button>
                  </div>
                </div>
                <div className="flex-1 w-full relative order-1 lg:order-2 min-h-[300px]">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200"
                    alt="Fresh artisan bread"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </section>

            {/* Product Grid */}
            <section id="product-grid" className="py-12 px-6 md:px-12 max-w-7xl mx-auto mb-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                {PRODUCTS.map(product => (
                  <div key={product.id} className="group cursor-pointer flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 mb-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                          className="px-6 py-3 bg-stone-50 text-stone-900 text-sm font-medium tracking-wide hover:bg-stone-900 hover:text-stone-50 transition-colors duration-300 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 ease-out shadow-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <h3 className="text-xl font-serif text-stone-900 mb-2">{product.name}</h3>
                      <span className="text-stone-500 font-sans text-sm">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW: JOURNAL */}
        {currentPage === 'Journal' && (
          <div className="animate-in fade-in duration-700 px-6 md:px-12 max-w-7xl mx-auto mb-24">
            <header className="text-center max-w-2xl mx-auto py-16 md:py-24 border-b border-stone-200 mb-16">
              <h1 className="text-5xl md:text-6xl font-serif text-stone-900 mb-6">The Journal</h1>
              <p className="text-stone-500 font-sans text-lg tracking-wide">Notes, recipes, and dispatches from our ovens to your home.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {ARTICLES.map(article => (
                <article key={article.id} className="group cursor-pointer flex flex-col h-full">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 mb-6">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-multiply"
                    />
                    <div className="absolute top-4 left-4 bg-stone-50/90 backdrop-blur-sm px-3 py-1 text-[10px] font-sans font-medium uppercase tracking-widest text-stone-900 shadow-sm">
                      {article.category}
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 text-center items-center">
                    <div className="text-[10px] font-sans font-medium tracking-widest text-stone-400 uppercase mb-4">
                      {article.date}
                    </div>
                    <h3 className="text-2xl font-serif text-stone-900 mb-4 group-hover:text-[#8f6a48] transition-colors">{article.title}</h3>
                    <p className="text-stone-600 font-sans text-sm leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pb-2 border-b border-stone-900 text-xs font-sans font-medium tracking-widest uppercase text-stone-900 group-hover:border-[#8f6a48] group-hover:text-[#8f6a48] transition-colors">
                      Read Story
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: ABOUT */}
        {currentPage === 'About' && (
          <div className="animate-in fade-in duration-700">
            {/* Hero / Introduction */}
            <section className="px-6 md:px-12 max-w-4xl mx-auto py-16 md:py-24 text-center">
              <h1 className="text-5xl md:text-6xl font-serif text-stone-900 mb-12">Rooted in Tradition.</h1>
              <div className="font-serif text-xl md:text-2xl text-stone-800 leading-relaxed space-y-8">
                <p>
                  Hearth & Crumb began with a simple belief: the best things take time. In an era of instant gratification and commercial shortcuts, we choose the slow path.
                </p>
                <p>
                  Every loaf we bake is the result of a multi-day process involving only three elemental ingredients: flour, water, and salt. It is through patience, careful observation, and a reverence for the craft that these humble ingredients transform into something extraordinary.
                </p>
              </div>
              <div className="mt-16 text-2xl md:text-3xl font-serif italic text-stone-600">
                Baked with love,<br />
                <span className="text-stone-900 mt-4 block not-italic font-normal text-xl">The Hearth & Crumb Team</span>
              </div>
            </section>

            {/* Slice of Life Gallery (Masonry style layout) */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
                <div className="bg-stone-200 md:col-span-2 md:row-span-2 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1596706911674-897db9ed3fc4?auto=format&fit=crop&q=80&w=1200" alt="Flour on table" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="bg-[#e3d5ca] md:col-span-1 md:row-span-1 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=800" alt="Baker scoring bread" className="w-full h-full object-cover opacity-90" />
                </div>
                <div className="bg-[#d5bdaf] md:col-span-1 md:row-span-1 overflow-hidden p-8 flex items-center justify-center text-center">
                  <p className="font-serif text-2xl text-stone-900 italic">"Patience is our primary ingredient."</p>
                </div>
                <div className="bg-stone-300 md:col-span-1 md:row-span-2 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1589367920969-ab8e050bfcdd?auto=format&fit=crop&q=80&w=800" alt="Fresh baked bread" className="w-full h-full object-cover" />
                </div>
                <div className="bg-stone-200 md:col-span-2 md:row-span-1 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200" alt="Bread texture" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              </div>
            </section>

            {/* Our Philosophy / Values */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center mb-6 text-[#8f6a48]">
                    <Wheat size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-4">Ingredients</h3>
                  <p className="text-stone-600 font-sans leading-relaxed">
                    We partner with independent, regional mills to source organic, heritage grains. Better soil means better wheat, and better wheat means a profoundly flavorful loaf.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center mb-6 text-[#8f6a48]">
                    <Clock size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-4">Time</h3>
                  <p className="text-stone-600 font-sans leading-relaxed">
                    Time builds character. Our natural leaven and 48-hour cold fermentation process unlock deep nutritional benefits and complex flavor profiles impossible to rush.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center mb-6 text-[#8f6a48]">
                    <Heart size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-4">Community</h3>
                  <p className="text-stone-600 font-sans leading-relaxed">
                    Bread is meant to be broken and shared. We view our bakery not just as a shop, but as an anchor for gathering, nourishing, and sustaining our neighborhood.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Global Minimalist Footer */}
      <footer className="bg-stone-900 text-stone-50 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif tracking-wide">Hearth & Crumb</h3>
              <p className="text-stone-400 font-sans max-w-sm leading-relaxed">
                Artisan sourdough and provisions, baked slowly and intentionally in the heart of the city.
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <h4 className="text-sm tracking-widest uppercase text-stone-400 mb-6">Join our newsletter</h4>
              <form className="flex gap-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-transparent border-b border-stone-700 pb-2 px-0 w-full focus:outline-none focus:border-stone-300 transition-colors text-stone-50 placeholder:text-stone-600 font-sans"
                />
                <button type="submit" className="text-sm font-medium tracking-widest uppercase hover:text-[#a3b18a] transition-colors pb-2 border-b border-stone-700 hover:border-[#a3b18a]">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans tracking-wide text-stone-500">
            <p>&copy; {new Date().getFullYear()} Hearth & Crumb Bakery. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-stone-50 transition-colors">Instagram</a>
              <a href="#" className="hover:text-stone-50 transition-colors">Facebook</a>
              <a href="#" className="hover:text-stone-50 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
