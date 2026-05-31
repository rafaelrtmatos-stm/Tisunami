import React, { useState, useEffect, useRef } from 'react';
import { 
  Beer, 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin, 
  CreditCard, 
  ChevronRight, 
  ArrowLeft, 
  User, 
  Phone, 
  Check, 
  Clock, 
  Sparkles, 
  X, 
  ChevronLeft, 
  TrendingUp, 
  CheckCircle, 
  Truck, 
  AlertTriangle,
  LogOut,
  Info,
  Wine,
  Flame,
  Snowflake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES, PROMOTIONS } from './data';
import { Product, CartItem, CheckoutDetails, Order } from './types';
import { TsunamiLogo } from './components/TsunamiLogo';

export default function App() {
  // Screens state
  const [screen, setScreen] = useState<'splash' | 'login' | 'home' | 'tracking'>('splash');
  
  // Filling Beer Glass animation level
  const [fillLevel, setFillLevel] = useState(0);

  // Trigger glass fill animation when opening the app / changing entry screen
  useEffect(() => {
    if (screen === 'splash' || screen === 'login') {
      setFillLevel(0);
      const timer = setTimeout(() => {
        setFillLevel(85);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [screen]);
  
  // Age Verification
  const [ageCheck, setAgeCheck] = useState<'none' | 'verified' | 'underage'>('none');
  const [loginStep, setLoginStep] = useState<'input' | 'verify'>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userName, setUserName] = useState('');
  
  // Catalog State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [activePromoIndex, setActivePromoIndex] = useState(0);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState<CheckoutDetails>({
    name: 'Rafael Matos',
    phone: '',
    address: 'Rua Resistência, 120',
    neighborhood: 'Amparo',
    paymentMethod: 'pix',
    changeFor: ''
  });
  
  // Orders Tracking State
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [trackingStep, setTrackingStep] = useState<1 | 2 | 3>(1);
  const [menuOpen, setMenuOpen] = useState(false);

  // In-app non-blocking premium Toast Notifications 
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(p => p === msg ? null : p);
    }, 4500);
  };

  // Freezing Carbonation Bubble Background Generator and Sweating Condensation Drops (Responsive)
  const [bubbles, setBubbles] = useState<{ left: string; size: string; delay: string; speed: string }[]>([]);
  const [sweatDrops, setSweatDrops] = useState<{ left: string; top: string; size: string; opacity: number; delay: string; isSliding?: boolean }[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 28 }).map(() => ({
      left: `${Math.floor(Math.random() * 95)}%`,
      size: `${Math.floor(Math.random() * 5) + 2}px`,
      delay: `${(Math.random() * 8).toFixed(1)}s`,
      speed: Math.random() > 0.6 ? 'bubble-rise-slow' : Math.random() > 0.3 ? 'bubble-rise-mid' : 'bubble-rise-fast'
    }));
    setBubbles(newBubbles);

    const dots = Array.from({ length: 45 }).map((_, i) => ({
      left: `${2 + Math.random() * 96}%`,
      top: `${5 + Math.random() * 90}%`,
      size: `${(1.2 + Math.random() * 3.5).toFixed(1)}px`,
      opacity: 0.35 + Math.random() * 0.55,
      delay: `${(Math.random() * 6).toFixed(1)}s`,
      isSliding: i % 6 === 0
    }));
    setSweatDrops(dots);
  }, []);

  // Auto scroll/play carousel
  useEffect(() => {
    if (screen === 'home') {
      const interval = setInterval(() => {
        setActivePromoIndex((prev) => (prev + 1) % PROMOTIONS.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  // Load state from localStorage on startup
  useEffect(() => {
    const cachedCart = localStorage.getItem('tsunami_cart');
    const cachedUser = localStorage.getItem('tsunami_user');
    const cachedAge = localStorage.getItem('tsunami_age');
    
    if (cachedCart) {
      try { setCart(JSON.parse(cachedCart)); } catch(e){}
    }
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      setUserName(user.name);
      setPhoneNumber(user.phone);
      setCheckoutForm(prev => ({ ...prev, name: user.name, phone: user.phone }));
      setScreen('home');
    }
    if (cachedAge === 'verified') {
      setAgeCheck('verified');
    } else if (cachedAge === 'underage') {
      setAgeCheck('underage');
    }
  }, []);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem('tsunami_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle active order delivery step stimulation of status
  useEffect(() => {
    if (activeOrder) {
      const timer1 = setTimeout(() => setTrackingStep(2), 8000); // Prepare -> Dispatch
      const timer2 = setTimeout(() => setTrackingStep(3), 18000); // Dispatch -> Arrived
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [activeOrder]);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = cartSubtotal > 60 ? 0 : 5.90; // Free delivery over R$60
  const cartTotal = cartSubtotal + deliveryFee;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Authentication Flow Handlers
  const handleVerifyAge = (isOver18: boolean) => {
    if (isOver18) {
      setAgeCheck('verified');
      localStorage.setItem('tsunami_age', 'verified');
      setScreen('login');
    } else {
      setAgeCheck('underage');
      localStorage.setItem('tsunami_age', 'underage');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    // Simulate SMS verification step
    setLoginStep('verify');
    setVerificationCode('1994'); // default preview verification mock code
  };

  const handleVerificationConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode !== '1994' && verificationCode.length < 4) return;

    // Login successful
    const defaultName = userName || phoneNumber.split(' ')[0] || 'Cliente';
    setUserName(defaultName);
    
    // Save user detail
    localStorage.setItem('tsunami_user', JSON.stringify({ name: defaultName, phone: phoneNumber }));
    setCheckoutForm(prev => ({ ...prev, name: defaultName, phone: phoneNumber }));
    setScreen('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('tsunami_user');
    setUserName('');
    setPhoneNumber('');
    setScreen('login');
    setMenuOpen(false);
  };

  // Promotion buying directly from Carousel
  const handleBuyPromotion = (promo: typeof PROMOTIONS[0]) => {
    // Check if we already have matching products or if we just want to mock insert a custom product
    const promoProduct: Product = {
      id: promo.id,
      name: promo.title,
      description: promo.description,
      price: promo.price,
      originalPrice: promo.originalPrice,
      category: 'destilados', // fallback to highlight destilados style
      imageEmoji: promo.imageEmoji,
      imageUrl: promo.imageUrl,
      imagePlaceholderColor: 'from-amber-500 to-rose-700',
      volume: 'Combo Completo',
      badge: 'Desconto'
    };
    addToCart(promoProduct);
    setIsCartOpen(true);
  };

  // Submit Order / Checkout finalization
  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!checkoutForm.name || !checkoutForm.address || !checkoutForm.neighborhood) return;

    const newOrder: Order = {
      id: 'TSU-' + Math.floor(1000 + Math.random() * 9000),
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      total: cartTotal,
      details: { ...checkoutForm },
      status: 'preparando',
      createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setActiveOrder(newOrder);
    setTrackingStep(1);
    clearCart();
    setIsCartOpen(false);
    setScreen('tracking');
  };

  // Filter products by category and input query search
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'todas' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="app-container" className="min-h-screen bg-radial from-[#4a3400] via-[#0d0a02] to-[#030200] flex items-center justify-center py-4 px-2 select-none relative overflow-hidden">
      {/* Outer deep golden/amber glowing ambient light points */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#FFC107]/12 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF8F00]/08 rounded-full filter blur-[150px] pointer-events-none"></div>

      {/* 
        This is a high-fidelity container built centered on desktop to give an aesthetic mobile simulator feel, 
        but fluidly scaling to absolute full-screen on mobile devices so the preview looks like a real smartphone application.
      */}
      <div id="phone-frame" className="w-full max-w-md h-[880px] bg-[#070501] text-slate-100 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_40px_rgba(255,193,7,0.20)] border-4 border-[#FFC107]/45 overflow-hidden relative flex flex-col transition-all duration-300">
        
        {/* Real-time rising cold beer bubble particles behind all screens */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
          <div className="absolute inset-0 bg-condensation opacity-35"></div>
          {bubbles.map((b, i) => (
            <div
              key={i}
              className={`bubble-unit ${b.speed}`}
              style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay }}
            />
          ))}
        </div>

        {/* Status bar emulation for immersive mobile feel */}
        <div id="status-bar" className="bg-[#070501]/95 text-[10px] font-mono text-slate-400 px-6 py-2.5 flex justify-between items-center z-50 shrink-0 border-b border-[#FFC107]/15 backdrop-blur-md">
          <div className="flex items-center gap-1.5 font-bold text-[#FFC107] tracking-wider">
            <span>TSUNAMI DISTRIBUIDORA</span>
            <span className="w-1.5 h-1.5 bg-[#FFC107] rounded-full animate-ping"></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex items-center gap-1"><Snowflake className="w-3 h-3 text-[#FFC107]" /> GELO EXTREMO</span>
            <span>2026-05-30</span>
          </div>
        </div>

        {/* Floating age restriction warning */}
        {ageCheck === 'underage' && (
          <div id="underage-modal" className="absolute inset-0 bg-gradient-to-br from-[#0c1a30] to-[#040914] z-[100] flex flex-col items-center justify-center p-8 text-center bg-condensation">
            <div className="w-20 h-20 bg-[#FFC107]/15 rounded-full flex items-center justify-center mb-6 border border-[#FFC107]/30 shadow-[0_0_15px_rgba(255,193,7,0.3)]">
              <AlertTriangle className="w-10 h-10 text-[#FFC107]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white mb-2 uppercase">Acesso Bloqueado</h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              A venda de bebidas alcoólicas é proibida para menores de 18 anos no Brasil (Lei nº 8.069/1990 e Lei nº 13.106/2015). Retorne quando completar a maioridade.
            </p>
            <button 
              id="back-age-btn"
              onClick={() => {
                setAgeCheck('none');
                localStorage.removeItem('tsunami_age');
              }}
              className="px-6 py-3 bg-[#FFC107] text-slate-950 font-black rounded-xl hover:bg-yellow-400 transition uppercase text-xs tracking-wider shadow-md"
            >
              Confirmar Entendimento
            </button>
          </div>
        )}

        {/* SCREEN 1: SPLASH SCREEN / AGE GATE */}
        {screen === 'splash' && (
          <div id="splash-screen" className="flex-1 bg-[#050300] text-white p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Interactive Filling Beer Glass Background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[#050300] overflow-hidden">
              <div className="absolute inset-0 bg-[#040301]/72 z-10"></div>
              
              {/* Premium Tall Pint Glass outline structure with frost accents */}
              <div className="absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-[36px] border-4 border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent z-20 shadow-[inset_0_4px_30px_rgba(255,255,255,0.06),_0_12px_45px_rgba(0,0,0,0.92)] overflow-hidden">
                {/* 3D Glass shine reflections */}
                <div className="absolute left-2.5 top-0 bottom-0 w-3.5 bg-gradient-to-r from-white/18 via-white/4 to-transparent"></div>
                <div className="absolute right-2.5 top-0 bottom-0 w-2 bg-gradient-to-l from-white/12 via-white/3 to-transparent"></div>
                <div className="absolute left-8 top-10 h-48 w-0.5 bg-white/20 blur-[0.5px]"></div>
                <div className="absolute right-9 bottom-12 h-64 w-[1px] bg-white/10 blur-[1px]"></div>
                
                {/* Active frosty sweating condensation droplets on glass body */}
                {sweatDrops.map((drop, idx) => (
                  <div
                    key={`splash-sweat-${idx}`}
                    className={`absolute bg-gradient-to-br from-white/95 to-transparent rounded-full shadow-[inset_1px_1px_1.5px_rgba(255,255,255,0.9),_1px_2px_2.5px_rgba(0,0,0,0.7)] border-[0.3px] border-white/20 ${
                      drop.isSliding ? 'animate-drip' : ''
                    }`}
                    style={{
                      left: drop.left,
                      top: drop.top,
                      width: drop.size,
                      height: `${parseFloat(drop.size) * (drop.isSliding ? 2.8 : 1.15)}px`,
                      opacity: drop.opacity,
                      animationDelay: drop.delay,
                      zIndex: 25
                    }}
                  />
                ))}
              </div>
              
              {/* Golden Liquid with responsive rising level and bubble carbonation inside */}
              <div 
                className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#9B4500] via-[#FF8F00] to-[#FFC107] transition-all duration-[4000ms] ease-out shadow-[inset_0_12px_40px_rgba(255,255,255,0.25)] z-1"
                style={{ height: `${fillLevel}%` }}
              >
                {/* Sparkle carbonation bubbles rising inside liquid container bounds */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-2 opacity-55">
                  {bubbles.map((b, i) => (
                    <div
                      key={`glass-b-${i}`}
                      className={`bubble-unit ${b.speed}`}
                      style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay, backgroundColor: '#FFF' }}
                    />
                  ))}
                </div>

                {/* Sub-foam gold sparkle glow */}
                <div className="absolute top-1 left-0 right-0 h-6 bg-gradient-to-b from-white/35 to-transparent blur-md"></div>

                {/* Overlapping wavy horizontal textures for liquid fluid feel */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-[length:35px_35px] opacity-15"></div>

                {/* Creamy rich white froth foam layer (Colarinho) */}
                <div className="absolute top-0 left-0 right-0 h-11 -translate-y-1/2 bg-gradient-to-b from-white via-[#FFFEEB] to-[#F1EAC7] rounded-t-2xl shadow-[0_-8px_25px_rgba(255,255,255,0.7),_0_8px_15px_rgba(229,152,0,0.35)] flex items-center justify-around overflow-hidden border-t-2 border-white/80">
                  <div className="w-14 h-14 rounded-full bg-white/95 opacity-50 -mt-2 shrink-0 blur-[1px]"></div>
                  <div className="w-9 h-9 rounded-full bg-[#FFFBE2] opacity-75 -mt-1 shrink-0 blur-[0.5px]"></div>
                  <div className="w-16 h-16 rounded-full bg-white opacity-80 -mt-5 shrink-0"></div>
                  <div className="w-11 h-11 rounded-full bg-[#FFFDF0] opacity-60 -mt-2 shrink-0 animate-bounce"></div>
                  <div className="w-12 h-12 rounded-full bg-[#EBE6CE]/40 -mt-3 shrink-0 animate-pulse"></div>
                  <div className="w-10 h-10 rounded-full bg-white opacity-40 -mt-2 shrink-0"></div>
                </div>
              </div>
            </div>

            {/* Empty block for spacing */}
            <div></div>

            {/* Brand Logo Group representing Tsunami Distribuidora */}
            <div id="brand-identity-splash" className="flex flex-col items-center text-center justify-center py-4 relative z-30 w-full px-2">
              <div className="bg-black/85 p-6 rounded-[32px] border-2 border-[#FFC107]/35 backdrop-blur-xl shadow-[0_12px_45px_rgba(0,0,0,0.95)] flex flex-col items-center w-full">
                <TsunamiLogo size={235} showText={true} className="scale-105" />
                <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-[#FFC107]/50 to-transparent my-4"></div>
                
                {/* Bolder, More Highlighted Brand Text (Letras Maciças) */}
                <p className="text-white text-xs font-black tracking-widest uppercase text-center flex flex-col items-center justify-center gap-2 leading-tight select-none">
                  <span className="flex items-center gap-1.5">
                    <span className="animate-bounce">🌊</span> 
                    <span className="text-[#FFC107] text-sm tracking-wider font-extrabold ice-glow-text">TSUNAMI DISTRIBUIDORA</span>
                  </span>
                  <span className="text-[10px] text-slate-300 font-extrabold italic tracking-wide">
                    "Ondas de gelo e calor direto na sua porta"
                  </span>
                </p>
              </div>
            </div>

            {/* Bottom Actions and Compulsory 18+ Verification (Highlighted Menus) */}
            <div id="splash-actions" className="flex flex-col gap-4 relative z-30">
              <div className="bg-slate-950/95 rounded-3xl p-5 border border-[#FFC107]/45 shadow-[0_15px_50px_rgba(0,0,0,0.92)] text-center relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#FFC107] via-amber-500 to-[#E53935]"></div>
                <p className="text-xs text-[#FFC107] font-mono tracking-widest uppercase mb-3.5 flex items-center justify-center gap-2.5 font-black bg-black/80 py-2 px-4 rounded-full border border-[#FFC107]/35 w-fit mx-auto shadow-md">
                  <Info className="w-4 h-4 text-[#FFC107] animate-pulse" />
                  Validação Compulsória
                </p>
                <p className="text-base font-black text-white mb-4.5 px-2 tracking-tight leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Você declara ter mais de 18 anos de idade para navegar na distribuidora?
                </p>

                {/* Highlighted Bolder Decision Buttons */}
                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    id="underage-no-btn"
                    onClick={() => handleVerifyAge(false)}
                    className="py-3.5 bg-slate-950/90 border-2 border-[#FFC107]/20 text-slate-300 hover:text-rose-500 hover:border-rose-500 rounded-xl font-black uppercase text-xs tracking-wider transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                  >
                    <X className="w-4 h-4 stroke-[3]" /> Não tenho
                  </button>
                  <button
                    id="adult-yes-btn"
                    onClick={() => handleVerifyAge(true)}
                    className="py-3.5 bg-gradient-to-r from-[#FFEA79] to-[#FFC107] hover:from-[#FFF1BE] hover:to-[#FFD54F] text-slate-950 rounded-xl font-black uppercase text-xs tracking-widest transition duration-300 flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(255,193,7,0.55)] cursor-pointer active:scale-95"
                  >
                    <Check className="w-4 h-4 text-slate-950 stroke-[3]" /> Sim, tenho
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/95 rounded-xl border-2 border-[#FFC107]/25 py-2.5 px-3 backdrop-blur-xl shadow-lg">
                <p className="text-[10px] text-slate-100 font-extrabold text-center tracking-wider leading-tight drop-shadow flex items-center justify-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#FFC107]" /> BEBA COM MODERAÇÃO • SE BEBER, NÃO DIRIJA
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 1B: TELEPHONE LOGIN VIEW */}
        {screen === 'login' && (
          <div id="login-screen" className="flex-1 bg-[#050300] text-white p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Interactive Filling Beer Glass Background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[#050300] overflow-hidden">
              <div className="absolute inset-0 bg-[#040301]/72 z-10"></div>
              
              {/* Premium Tall Pint Glass outline structure with frost accents */}
              <div className="absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-[36px] border-4 border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent z-20 shadow-[inset_0_4px_30px_rgba(255,255,255,0.06),_0_12px_45px_rgba(0,0,0,0.92)] overflow-hidden">
                {/* 3D Glass shine reflections */}
                <div className="absolute left-2.5 top-0 bottom-0 w-3.5 bg-gradient-to-r from-white/18 via-white/4 to-transparent"></div>
                <div className="absolute right-2.5 top-0 bottom-0 w-2 bg-gradient-to-l from-white/12 via-white/3 to-transparent"></div>
                <div className="absolute left-8 top-10 h-48 w-0.5 bg-white/20 blur-[0.5px]"></div>
                <div className="absolute right-9 bottom-12 h-64 w-[1px] bg-white/10 blur-[1px]"></div>
                
                {/* Active frosty sweating condensation droplets on glass body */}
                {sweatDrops.map((drop, idx) => (
                  <div
                    key={`login-sweat-${idx}`}
                    className={`absolute bg-gradient-to-br from-white/95 to-transparent rounded-full shadow-[inset_1px_1px_1.5px_rgba(255,255,255,0.9),_1px_2px_2.5px_rgba(0,0,0,0.7)] border-[0.3px] border-white/20 ${
                      drop.isSliding ? 'animate-drip' : ''
                    }`}
                    style={{
                      left: drop.left,
                      top: drop.top,
                      width: drop.size,
                      height: `${parseFloat(drop.size) * (drop.isSliding ? 2.8 : 1.15)}px`,
                      opacity: drop.opacity,
                      animationDelay: drop.delay,
                      zIndex: 25
                    }}
                  />
                ))}
              </div>

              {/* Golden Liquid simulating an actual cold beer filling the glass */}
              <div 
                className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#9B4500] via-[#FF8F00] to-[#FFC107] transition-all duration-[4000ms] ease-out shadow-[inset_0_12px_40px_rgba(255,255,255,0.25)] z-1"
                style={{ height: `${fillLevel}%` }}
              >
                {/* Sparkle carbonation bubbles rising inside liquid container bounds */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-2 opacity-55">
                  {bubbles.map((b, i) => (
                    <div
                      key={`login-liquid-b-${i}`}
                      className={`bubble-unit ${b.speed}`}
                      style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay, backgroundColor: '#FFF' }}
                    />
                  ))}
                </div>

                {/* Sub-foam gold sparkle glow */}
                <div className="absolute top-1 left-0 right-0 h-6 bg-gradient-to-b from-white/35 to-transparent blur-md"></div>

                {/* Overlapping wavy horizontal textures */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-[length:35px_35px] opacity-15"></div>

                {/* Creamy rich white froth foam layer (Colarinho) */}
                <div className="absolute top-0 left-0 right-0 h-11 -translate-y-1/2 bg-gradient-to-b from-white via-[#FFFEEB] to-[#F1EAC7] rounded-t-2xl shadow-[0_-8px_25px_rgba(255,255,255,0.7),_0_8px_15px_rgba(229,152,0,0.35)] flex items-center justify-around overflow-hidden border-t-2 border-white/80">
                  <div className="w-14 h-14 rounded-full bg-white/95 opacity-50 -mt-2 shrink-0 blur-[1px]"></div>
                  <div className="w-9 h-9 rounded-full bg-[#FFFBE2] opacity-75 -mt-1 shrink-0 blur-[0.5px]"></div>
                  <div className="w-16 h-16 rounded-full bg-white opacity-80 -mt-4 shrink-0"></div>
                  <div className="w-11 h-11 rounded-full bg-[#FFFDF0] opacity-60 -mt-2 shrink-0 animate-bounce"></div>
                  <div className="w-12 h-12 rounded-full bg-[#EBE6CE]/40 -mt-3 shrink-0 animate-pulse"></div>
                  <div className="w-10 h-10 rounded-full bg-white opacity-40 -mt-2 shrink-0"></div>
                </div>
              </div>
            </div>

            <button
              id="back-splash-btn"
              onClick={() => setScreen('splash')}
              className="absolute top-4 left-4 p-2.5 bg-slate-950/90 border border-white/10 hover:bg-slate-900 text-[#FFC107] rounded-full transition z-30 shadow-md cursor-pointer active:scale-95 animate-pulse"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div></div>

            <div id="login-container" className="py-2.5 relative z-30 w-full animate-fade-in">
              <div className="bg-slate-950/95 border-2 border-[#FFC107]/35 rounded-[32px] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                <div className="flex justify-center mb-4">
                  <div className="bg-black/40 p-3 rounded-full border border-white/10 shadow-lg">
                    <TsunamiLogo size={135} showText={true} className="scale-105" />
                  </div>
                </div>

                <h2 className="text-xl font-black text-white text-center uppercase tracking-normalNormal mb-1.5 ice-glow-text">
                  {loginStep === 'input' ? 'Entrar com seu Celular' : 'Verificando Celular'}
                </h2>
                <p className="text-[11px] text-slate-200 text-center max-w-xs mx-auto mb-6 leading-tight font-extrabold drop-shadow">
                  {loginStep === 'input' 
                    ? 'Informe seu número para salvar seu carrinho e rastrear entregas pelo motoboy.' 
                    : 'Digite o código SMS que enviamos para o seu número simulado.'
                  }
                </p>

                {loginStep === 'input' ? (
                  <form id="phone-login-form" onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-1.5 drop-shadow">
                        👤 Nome Comercial / Comprador
                      </label>
                      <input
                        id="buyer-name-input"
                        type="text"
                        className="w-full bg-slate-950 border-2 border-[#FFC107]/25 focus:border-[#FFC107] text-white rounded-xl px-4 py-3 focus:outline-none text-xs font-black tracking-wide placeholder-slate-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:shadow-[0_0_10px_rgba(255,193,7,0.15)] transition-all"
                        placeholder="Ex: Rafael Matos"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-1.5 drop-shadow">
                        📞 Seu Número de WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 stroke-[2.5]" />
                        <input
                          id="phone-num-input"
                          type="tel"
                          className="w-full bg-slate-950 border-2 border-[#FFC107]/25 focus:border-[#FFC107] text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none text-xs font-black font-mono placeholder-slate-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:shadow-[0_0_10px_rgba(255,193,7,0.15)] transition-all"
                          placeholder="(11) 99999-9999"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Redesigned super highlighted access button */}
                    <button
                      id="submit-phone-btn"
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-[#FFEA79] to-[#FFC107] hover:from-[#FFF1BE] hover:to-[#FFD54F] text-slate-950 font-black rounded-xl uppercase tracking-widest shadow-[0_4px_18px_rgba(255,193,7,0.35)] transition-all duration-300 text-xs flex items-center justify-center gap-2 mt-2 cursor-pointer border border-[#FFC107]/50 active:scale-95"
                    >
                      <span>Receber Código de Acesso</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </form>
                ) : (
                  <form id="verify-sms-form" onSubmit={handleVerificationConfirm} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-[#FFC107] block text-center drop-shadow">
                        🔑 Código de Verificação SMS
                      </label>
                      <p className="text-[10px] text-slate-350 text-center font-mono bg-black/60 py-1 px-2 rounded-lg border border-white/5 w-fit mx-auto">
                        (Utilize o código rápido: <span className="font-black text-[#FFC107]">1994</span>)
                      </p>
                      <input
                        id="sms-code-input"
                        type="text"
                        className="w-full bg-slate-950 border-2 border-[#FFC107]/25 focus:border-[#FFC107] text-white rounded-xl px-4 py-3 focus:outline-none text-center font-black font-mono text-xl tracking-widest placeholder-slate-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.65)]"
                        maxLength={4}
                        placeholder="0000"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <button
                        id="resend-sms-btn"
                        type="button"
                        onClick={() => setLoginStep('input')}
                        className="py-3 bg-slate-900 text-slate-200 border-2 border-zinc-700 rounded-xl font-black uppercase text-[10px] tracking-wider hover:bg-slate-850 transition duration-300 cursor-pointer active:scale-95"
                      >
                        Alterar Número
                      </button>
                      <button
                        id="confirm-verification-btn"
                        type="submit"
                        className="py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black rounded-xl transition duration-300 text-[10px] tracking-wider uppercase shadow-md cursor-pointer active:scale-95"
                      >
                        Confirmar
                      </button>
                    </div>
                  </form>
                )}

                {/* Redesigned bypass option with a sleek visual profile */}
                {loginStep === 'input' && (
                  <div className="mt-5 text-center border-t border-white/10 pt-4">
                    <button
                      id="bypass-login-btn"
                      onClick={() => {
                        setUserName('Rafael Matos (Visitante)');
                        setPhoneNumber('(11) 98765-4321');
                        setCheckoutForm(prev => ({ ...prev, name: 'Rafael Matos', phone: '(11) 98765-4321' }));
                        setScreen('home');
                      }}
                      className="w-full py-3 bg-slate-950 border-2 border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 font-black rounded-xl uppercase tracking-widest shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-300 text-[10px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <User className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                      <span>Efetuar Entrada Rápida de Visitante</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-[10px] text-[#FFC107]/65 text-center font-medium z-10 relative py-2">
              Tsunami Distribuidora de Bebidas Ltda. Todos os direitos reservados.
            </p>
          </div>
        )}

        {/* MAIN BODY AREA FOR LOGGED-IN SCREENS (HOME & TRACKING) */}
        {(screen === 'home' || screen === 'tracking') && (
          <div id="catalog-tracking-view" className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-[#1F1401] via-[#0D0800] to-[#040300]">
            
            {/* SCREEN HEADER: Beer yellow-to-dark gradient styling matching User Theme */}
            <header id="app-header" className="bg-gradient-to-r from-[#FFEA79] via-[#FFC107] to-[#D97706] px-4 py-3 flex items-center justify-between border-b border-[#FFC107]/20 shadow-md relative z-30 shrink-0 text-slate-950">
              <div className="flex items-center gap-2">
                {/* Menu Sanduíche Toggle */}
                <button
                  id="menu-toggle-btn"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 -ml-1 text-slate-950 hover:bg-black/5 active:bg-black/10 rounded-xl transition relative cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                  </svg>
                </button>

                {/* Left Mini-Status Info */}
                <div className="flex flex-col text-slate-950">
                  <span className="text-[9px] font-black text-amber-900/80 tracking-wider uppercase">Tsunami</span>
                  <span className="text-[11px] font-black tracking-tight flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-slate-950" /> Amparo • Rua Resistência
                  </span>
                </div>
              </div>

              {/* Reduced Center Brand Logo */}
              <div id="header-logo-center" className="absolute left-1/2 transform -translate-x-1/2 flex items-center focus:outline-none select-none cursor-pointer" onClick={() => setScreen('home')}>
                <TsunamiLogo size={58} showText={false} className="-mt-1 scale-[1.1]" imgStyle={{ width: '51px', paddingTop: '0px', marginLeft: '250px' }} />
              </div>

              {/* Shopping Cart Trigger on Right */}
              <div className="flex items-center gap-1">
                {activeOrder && (
                  <button
                    id="order-tracking-scout-btn"
                    onClick={() => setScreen('tracking')}
                    className="p-2 bg-slate-950/10 text-slate-950 hover:bg-black/10 rounded-xl transition relative cursor-pointer"
                    title="Acompanhar Pedido Ativo"
                  >
                    <Truck className="w-5 h-5 animate-bounce" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E53935] rounded-full"></span>
                  </button>
                )}

                <button
                  id="header-cart-btn"
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-slate-950 hover:bg-black/5 active:bg-black/10 rounded-xl transition relative flex items-center justify-center cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItemsCount > 0 && (
                    <span id="cart-indicator-badge" className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#E53935] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-[#FFC107]">
                      {totalItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </header>

            {/* SIDE NAVIGATION DRAWER DRAWER */}
            <AnimatePresence>
              {menuOpen && (
                <div id="side-drawer-backdrop" className="absolute inset-0 bg-slate-950/70 z-50 flex" onClick={() => setMenuOpen(false)}>
                  <motion.div
                    id="side-drawer"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', damping: 24, stiffness: 220 }}
                    className="w-4/5 max-w-[300px] h-full bg-[#120D02] border-r border-[#FFC107]/20 flex flex-col justify-between"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Drawer Header */}
                    <div>
                      <div className="p-5 bg-gradient-to-br from-[#FFEA79] via-[#FFC107] to-[#D97706] text-[#070501] flex flex-col gap-2 relative shadow-md">
                        <div className="flex justify-between items-start">
                          <div className="w-14 h-14 bg-slate-950 rounded-xl flex items-center justify-center border border-white/20 overflow-hidden shadow-inner font-black">
                            <TsunamiLogo size={58} showText={false} className="scale-105" />
                          </div>
                          <button
                            id="close-drawer-btn"
                            onClick={() => setMenuOpen(false)}
                            className="p-1.5 hover:bg-black/10 rounded-lg transition"
                          >
                            <X className="w-5 h-5 text-slate-950 font-black" />
                          </button>
                        </div>
                        <div className="mt-2 text-slate-950 font-black">
                          <h3 className="font-extrabold text-sm uppercase tracking-wide">Tsunami Distribuidora</h3>
                          <p className="text-xs font-medium flex items-center gap-1 mt-0.5">
                            <User className="w-3.5 h-3.5 text-slate-900" />
                            {userName || 'Seja bem-vindo!'}
                          </p>
                        </div>
                      </div>

                      {/* Drawer Menu Items */}
                      <div className="p-4 space-y-1">
                        <p className="text-[9px] font-bold text-amber-500/80 uppercase tracking-wider px-2.5 mb-2">Painel de Acesso</p>
                        <button
                          id="nav-catalogo-btn"
                          onClick={() => { setScreen('home'); setMenuOpen(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs uppercase flex items-center gap-3 transition cursor-pointer ${screen === 'home' ? 'bg-gradient-to-r from-[#FFEA79] to-[#FFC107] text-slate-950 font-black shadow-md shadow-[#FFC107]/20' : 'hover:bg-[#FFC107]/10 text-[#FFE082]'}`}
                        >
                          <Beer className="w-4 h-4 text-[#FFEA79] stroke-[2.5]" />
                          Vitrine de Bebidas / Home
                        </button>
                        
                        {activeOrder && (
                          <button
                            id="nav-rastrear-btn"
                            onClick={() => { setScreen('tracking'); setMenuOpen(false); }}
                            className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs uppercase flex items-center gap-3 transition cursor-pointer ${screen === 'tracking' ? 'bg-gradient-to-r from-[#FFEA79] to-[#FFC107] text-slate-950 font-black shadow-md shadow-[#FFC107]/20' : 'hover:bg-[#FFC107]/10 text-[#FFE082]'}`}
                          >
                            <Truck className="w-4 h-4 text-[#FFEA79] stroke-[2.5]" />
                            Acompanhar Entrega Ativa
                          </button>
                        )}

                        <button
                          id="nav-historico-shortcut-btn"
                          onClick={() => { 
                            showToast("📜 Histórico de Pedidos síncrono ativado no rastreador!");
                            setMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2.5 hover:bg-[#FFC107]/10 text-[#FFE082] rounded-xl font-bold text-xs uppercase flex items-center gap-3 transition cursor-pointer"
                        >
                          <Clock className="w-4 h-4 text-[#FFEA79] stroke-[2.5]" />
                          Histórico de Pedidos
                        </button>
                        
                        <div className="border-t border-[#FFC107]/15 my-4 pt-3">
                          <p className="text-[9px] font-bold text-amber-500/80 uppercase tracking-wider px-2.5 mb-2">Configurações de Teste</p>
                          <div className="bg-[#1C1300] p-2.5 rounded-xl border border-[#FFC107]/20 text-[11px] text-slate-300">
                            <strong className="text-[#FFC107]">Local:</strong> Bairro Amparo, Rua Resistência<br/>
                            <strong className="text-[#FFC107]">Regra de Frete:</strong> Grátis para compras acima de R$ 60,00 reais.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Drawer Footer */}
                    <div className="p-4 border-t border-[#FFC107]/15">
                      <button
                        id="drawer-logout-btn"
                        onClick={handleLogout}
                        className="w-full py-2.5 bg-[#1C1300] text-rose-400 border border-rose-500/15 hover:bg-rose-500/10 font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair / Trocar de Conta
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* SCREEN 2: CATALOG HOME */}
            {screen === 'home' && (
              <div id="catalog-page" className="flex-1 overflow-y-auto no-scrollbar pb-6 relative z-10 bg-transparent">
                
                {/* Search Bar Block */}
                <div className="p-4 bg-[#FFC107]/05 border-b border-[#FFC107]/10 backdrop-blur-md">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="beverage-search-input"
                      type="text"
                      className="w-full bg-[#120D02]/85 text-white placeholder-slate-400 rounded-xl pl-10 pr-8 py-2.5 text-xs focus:ring-1 focus:ring-[#FFC107] focus:outline-none border border-[#FFC107]/25 transition duration-300"
                      placeholder="Pesquisar Heineken, Gin, Coca-Cola ou Carvão..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        id="clear-search-btn"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-3 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Real-time Delivery Info Banner */}
                <div className="px-4 pt-4 pb-1">
                  <div className="bg-gradient-to-r from-[#211500]/95 via-[#140C00]/95 to-[#070501]/95 p-3 rounded-2xl border border-[#FFC107]/20 flex items-center justify-between shadow-lg relative overflow-hidden backdrop-blur-md">
                    {/* Glowing background details */}
                    <div className="absolute right-0 top-0 w-24 h-24 bg-[#FFC107]/10 rounded-full filter blur-xl pointer-events-none"></div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-[#FFC107]/10 rounded-xl flex items-center justify-center border border-[#FFC107]/30 relative shadow-sm">
                        <Truck className="w-5 h-5 text-[#FFC107]" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E53935] rounded-full animate-ping"></span>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-white flex items-center gap-1">
                          ENTREGA FLASH TRINCANDO <Snowflake className="w-3 h-3 text-[#FFC107] inline animate-pulse" />
                        </h4>
                        <p className="text-[10px] text-slate-300 font-medium">Geladas no ponto em <strong className="text-[#FFC107] font-black font-mono text-[11px]">15-30 min</strong></p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[8px] font-black uppercase bg-[#E53935] text-white px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(229,57,53,0.5)]">
                        TAXA GRÁTIS &gt; R$60
                      </span>
                    </div>
                  </div>
                </div>

                {/* Banner Rotativo (Carrossel 16:9) */}
                <div className="p-4">
                  <div className="relative w-full aspect-[16/9] bg-[#070501] rounded-3xl overflow-hidden shadow-xl border border-[#FFC107]/20">
                    <AnimatePresence mode="popLayout">
                      {PROMOTIONS.map((promo, idx) => {
                        if (idx !== activePromoIndex) return null;
                        return (
                          <motion.div
                            key={promo.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className={`absolute inset-0 bg-gradient-to-br ${promo.gradient} p-4 flex flex-col justify-between`}
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="bg-[#E53935] text-white text-[8px] tracking-[0.15em] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                                  {promo.badge}
                                </span>
                                {promo.imageUrl ? (
                                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 shadow-lg relative">
                                    <img 
                                      src={promo.imageUrl} 
                                      alt={promo.title} 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                ) : (
                                  <span className="text-3xl filter drop-shadow">{promo.imageEmoji}</span>
                                )}
                              </div>
                              <h3 className="text-white text-lg font-black tracking-tight mt-2 drop-shadow-md leading-tight">
                                {promo.title}
                              </h3>
                              <p className="text-slate-300 text-[10px] leading-snug mt-1 max-w-[260px] line-clamp-2">
                                {promo.description}
                              </p>
                            </div>

                            <div className="flex justify-between items-end">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-slate-350 line-through">
                                  De R$ {promo.originalPrice.toFixed(2)}
                                </span>
                                <span className="text-white text-lg font-black font-mono">
                                  Por R$ {promo.price.toFixed(2)}
                                </span>
                              </div>

                              <button
                                id={`buy-${promo.id}`}
                                onClick={() => handleBuyPromotion(promo)}
                                className="px-4 py-2 bg-[#FFC107] text-slate-950 hover:bg-yellow-400 font-extrabold text-xs rounded-xl flex items-center gap-1 transition shadow-lg shrink-0 cursor-pointer"
                              >
                                <span>Adicionar Combo</span>
                                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {/* Caravan slide indicator dots */}
                    <div className="absolute top-4 right-4 flex gap-1 bg-black/30 px-2 py-1 rounded-full z-10 backdrop-blur-xs">
                      {PROMOTIONS.map((_, idx) => (
                        <button
                          key={idx}
                          id={`promo-dot-${idx}`}
                          onClick={() => setActivePromoIndex(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition ${activePromoIndex === idx ? 'bg-[#FFC107] w-3' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Categories Horizontal drag line slider */}
                <div className="px-4 py-1">
                  <h4 className="text-[10px] font-black text-[#FFC107] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FFC107] animate-pulse" />
                    Categorias Clave
                  </h4>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 pt-1 select-none">
                    {CATEGORIES.map(cat => {
                      const isActive = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          id={`cat-${cat.id}`}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 shadow-md border cursor-pointer ${
                            isActive 
                              ? 'bg-gradient-to-r from-[#FFEA79] to-[#FFC107] text-slate-950 border-[#FFC107] scale-105 shadow-[0_0_18px_rgba(255,193,7,0.5)]' 
                              : 'bg-slate-950/90 text-white border-white/10 hover:border-[#FFC107]/55 hover:bg-[#FFC107]/10'
                          }`}
                        >
                          <span className="shrink-0">
                            {cat.id === 'todas' && <Sparkles className="w-3.5 h-3.5" />}
                            {cat.id === 'cervejas' && <Beer className="w-3.5 h-3.5" />}
                            {cat.id === 'destilados' && <Wine className="w-3.5 h-3.5" />}
                            {cat.id === 'sem-alcool' && <Wine className="w-3.5 h-3.5 rotate-180" />}
                            {cat.id === 'petiscos' && <Flame className="w-3.5 h-3.5" />}
                            {cat.id === 'gelo-carvao' && <Snowflake className="w-3.5 h-3.5" />}
                          </span>
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grade de Produtos: Dispostos em duas colunas, cards azul escuro com contornos destacados */}
                <div className="px-4 py-2 flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {selectedCategory.toUpperCase()} ({filteredProducts.length})
                    </h4>
                    {selectedCategory !== 'todas' && (
                      <button 
                        id="reset-filter-btn"
                        onClick={() => setSelectedCategory('todas')} 
                        className="text-[10px] uppercase font-bold text-rose-400 hover:underline"
                      >
                        Limpar Filtro
                      </button>
                    )}
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                      <Beer className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                      <p className="text-sm text-slate-400 font-semibold mb-1">Nenhum produto encontrado</p>
                      <p className="text-xs text-slate-500">Tente buscar por outro termo ou limpe a categoria selecionada.</p>
                      <button
                        id="clear-all-filter-btn"
                        onClick={() => { setSearchQuery(''); setSelectedCategory('todas'); }}
                        className="mt-4 px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl hover:bg-slate-700"
                      >
                        Ver Todo o Catálogo
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3.5">
                      {filteredProducts.map(product => {
                        const inCartCount = cart.find(item => item.product.id === product.id)?.quantity || 0;
                        return (
                          <div
                            key={product.id}
                            id={`prod-card-${product.id}`}
                            className="bg-gradient-to-b from-[#1E1402] to-[#080500] rounded-2xl border border-[#FFC107]/15 hover:border-[#FFC107]/45 overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-md hover:shadow-[0_0_12px_rgba(255,193,7,0.15)]"
                          >
                            <div className="p-3">
                              {/* Product Image / Gradient background card with emoji bottle */}
                              <div className={`aspect-square w-full rounded-xl bg-gradient-to-tr ${product.imagePlaceholderColor} flex items-center justify-center relative mb-2.5 overflow-hidden shadow-inner`}>
                               {product.imageUrl ? (
                                  <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-110 transition duration-500 ease-out"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <span className="text-4xl filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition duration-300">
                                    {product.imageEmoji}
                                  </span>
                                )}
                                {product.imageUrl && (
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 pointer-events-none" />
                                )}
                                
                                {product.badge && (
                                  <span className="absolute top-1.5 left-1.5 bg-[#E53935] text-[8px] font-black uppercase text-white px-2 py-0.5 rounded-full z-10 shadow-sm animate-pulse">
                                    {product.badge}
                                  </span>
                                )}

                                {product.volume && (
                                  <span className="absolute bottom-1.5 right-1.5 bg-black/50 text-[9px] font-mono text-slate-300 px-1.5 py-0.5 rounded z-10 font-bold">
                                    {product.volume}
                                  </span>
                                )}
                              </div>

                              <h5 className="text-white text-xs font-black leading-tight line-clamp-1">
                                {product.name}
                              </h5>
                              <p className="text-slate-400 text-[9px] leading-tight mt-0.5 min-h-[30px] line-clamp-2">
                                {product.description}
                              </p>
                            </div>

                            {/* Outer Action and pricing within Golden Card */}
                            <div className="bg-[#090601]/85 p-3 pt-2 mt-auto border-t border-[#FFC107]/12 flex flex-col gap-2">
                              <div className="flex items-baseline gap-1">
                                <span className="text-[10px] text-[#FFC107] font-bold">R$</span>
                                <span className="text-base font-black text-white font-mono leading-none">
                                  {product.price.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-[9px] text-slate-500 line-through ml-1 font-mono">
                                    {product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              {/* Quantity selectors or pure adding bottom */}
                              {inCartCount > 0 ? (
                                <div className="grid grid-cols-3 items-center bg-[#E53935] rounded-xl h-8 text-white overflow-hidden text-center text-xs font-black shadow-inner">
                                  <button
                                    id={`dec-${product.id}`}
                                    onClick={() => {
                                      updateQuantity(product.id, -1);
                                      showToast(`🛒 Carrinho atualizado!`);
                                    }}
                                    className="h-full flex items-center justify-center hover:bg-black/10 active:bg-black/20"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="font-mono">{inCartCount}</span>
                                  <button
                                    id={`inc-${product.id}`}
                                    onClick={() => {
                                      updateQuantity(product.id, 1);
                                      showToast(`Mais um item adicionado!`);
                                    }}
                                    className="h-full flex items-center justify-center hover:bg-black/10 active:bg-black/20"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  id={`add-btn-${product.id}`}
                                  onClick={() => {
                                    addToCart(product);
                                    showToast(`${product.name} adicionado ao carrinho!`);
                                  }}
                                  className="w-full bg-[#E53935] hover:bg-[#C62828] text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition shadow-sm cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                                  <span>Adicionar</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SCREEN 3: ACTIVE ORDER RADAR TRACKING SCREEN */}
            {screen === 'tracking' && activeOrder && (
              <div id="tracking-page" className="flex-1 overflow-y-auto no-scrollbar p-5 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      id="back-tracking-to-catalog-btn"
                      onClick={() => {
                        setScreen('home');
                        showToast('Voltamos para o Catálogo!');
                      }}
                      className="p-1.5 bg-[#120D02] border border-[#FFC107]/20 rounded-xl text-slate-300 hover:text-white hover:border-[#FFC107]/40 transition duration-300 cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className="text-xs font-black text-white uppercase tracking-wider">Acompanhar Entrega</h3>
                      <p className="text-[9px] font-mono text-slate-400">PEDIDO ID: {activeOrder.id} • Feito às {activeOrder.createdAt}</p>
                    </div>
                  </div>

                  {/* Active Simulated Delivery Progress Panel */}
                  <div className="bg-gradient-to-b from-[#1C1300]/95 to-[#050400]/95 rounded-3xl p-5 border border-[#FFC107]/20 shadow-2xl relative overflow-hidden mb-5 backdrop-blur-md">
                    {/* Glowing active wave simulation background icon */}
                    <div className="absolute right-[-10px] bottom-[-10px] text-[#FFC107]/5 rotate-12 pointer-events-none">
                      <Truck className="w-36 h-36" />
                    </div>

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[9px] font-black text-[#FFC150] uppercase tracking-wider block mb-0.5">Previsão de Entrega</span>
                        <h2 className="text-xl font-black text-white tracking-tight">20 a 35 Minutos</h2>
                      </div>
                      <div className="bg-[#FFC107] text-[#030914] font-black px-2.5 py-1 rounded text-[9px] animate-pulse uppercase tracking-wider flex items-center gap-1">
                        GELADA EM TRÂNSITO <Snowflake className="w-2.5 h-2.5 text-[#030914]" />
                      </div>
                    </div>

                    {/* Step Visualizer */}
                    <div className="space-y-6 relative border-l-2 border-[#FFC107]/25 pl-5 before:content-[#FFC107]">
                      
                      {/* Step 1 */}
                      <div className="relative">
                        <div className={`absolute left-[-29px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${trackingStep >= 1 ? 'bg-[#E53935] ring-4 ring-[#E53935]/20' : 'bg-slate-700'}`}>
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                        <h4 className={`text-xs font-black ${trackingStep >= 1 ? 'text-[#FFC107]' : 'text-slate-500'}`}>
                          Pedido recebido e confirmado!
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Estamos reunindo e trincando suas cervejas.</p>
                      </div>

                      {/* Step 2 */}
                      <div className="relative">
                        <div className={`absolute left-[-29px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${trackingStep >= 2 ? 'bg-[#FFC107] ring-4 ring-[#FFC107]/20' : 'bg-slate-850 border border-slate-755'}`}>
                          {trackingStep >= 2 ? <Check className="w-2.5 h-2.5 text-slate-950" /> : <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />}
                        </div>
                        <h4 className={`text-xs font-black ${trackingStep >= 2 ? 'text-white' : 'text-slate-500'}`}>
                          Saiu para entrega com o Motoboy
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Seu Tsunami de bebidas geladas está voando pela cidade.</p>
                      </div>

                      {/* Step 3 */}
                      <div className="relative">
                        <div className={`absolute left-[-29px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${trackingStep >= 3 ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : 'bg-slate-800 border border-slate-700'}`}>
                          {trackingStep >= 3 ? <Check className="w-2.5 h-2.5 text-slate-900" /> : <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />}
                        </div>
                        <h4 className={`text-xs font-black ${trackingStep >= 3 ? 'text-white' : 'text-slate-500'}`}>
                          Chegou ao local de destino!
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Beba com moderação e aproveite seu fim de semana!</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Contents Details */}
                  <div className="bg-gradient-to-b from-[#1C1300]/40 to-[#050400]/40 rounded-2xl p-4 border border-[#FFC107]/15 text-xs backdrop-blur-md">
                    <h4 className="font-extrabold text-[#FFC107] uppercase tracking-wider mb-2 border-b border-[#FFC107]/15 pb-1.5 flex justify-between">
                      <span>Resumo dos Produtos</span>
                      <span className="font-mono text-slate-400">{activeOrder.items.length} itens</span>
                    </h4>
                    <div className="space-y-1.5 text-slate-300 max-h-40 overflow-y-auto no-scrollbar pr-1">
                      {activeOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between font-medium">
                          <span className="line-clamp-1">{item.quantity}x {item.product.name}</span>
                          <span className="font-mono text-slate-350">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-[#FFC107]/15 my-2.5 pt-2 space-y-1 text-slate-400">
                      <div className="flex justify-between text-[11px]">
                        <span>Endereço de Entrega:</span>
                        <span className="text-white font-bold line-clamp-1">{activeOrder.details.address} ({activeOrder.details.neighborhood})</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span>Forma de Pagamento:</span>
                        <span className="text-[#FFC107] font-black uppercase text-[10px]">{activeOrder.details.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between text-white font-black text-sm border-t border-[#FFC107]/15 mt-2 pt-2">
                        <span>Total Pago:</span>
                        <span className="text-[#FFC107] font-mono">R$ {activeOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    id="new-order-from-scratch-btn"
                    onClick={() => {
                      setScreen('home');
                      showToast('🛒 Catálogo de bebidas aberto para novo pedido!');
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-[#0D47A1] to-[#0A3D91] hover:from-[#0c3980] hover:to-[#09357d] text-white font-black rounded-xl text-xs uppercase transition tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_12px_rgba(13,71,161,0.35)]"
                  >
                    Fazer Outro Pedido
                  </button>
                  <p className="text-[9px] text-center text-slate-400 font-medium leading-snug">
                    Obrigado por comprar na Tsunami Distribuidora! Qualquer dúvida sobre a sua rota, chame o motoboy.
                  </p>
                </div>
              </div>
            )}

            {/* SCREEN 3: BOTTOM SLIDING OVERLAY - THE INTERACTIVE CART & CHECKOUT (FINALIZAÇÃO) */}
            <AnimatePresence>
              {isCartOpen && (
                <div id="cart-backdrop" className="absolute inset-0 bg-slate-950/80 z-[60] flex items-end justify-center" onClick={() => setIsCartOpen(false)}>
                  <motion.div
                    id="cart-sheet"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    className="w-full max-h-[92%] bg-[#120E02] rounded-t-[32px] border-t-2 border-[#FFC107]/60 flex flex-col justify-between overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    
                    {/* Header */}
                    <div className="p-4 bg-black/40 border-b border-[#FFC107]/15 flex justify-between items-center shrink-0">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-[#FFEA79]" />
                        <div>
                          <h3 className="font-extrabold text-sm text-white uppercase">Seu Carrinho</h3>
                          <p className="text-[10px] text-amber-500 font-mono">Sacola de Bebidas</p>
                        </div>
                      </div>
                      <button
                        id="close-cart-sheet-btn"
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-white/5 rounded-xl transition text-slate-300 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
                      {cart.length === 0 ? (
                        <div className="text-center py-16 px-4">
                          <ShoppingCart className="w-14 h-14 text-slate-600 mx-auto mb-4" />
                          <p className="text-base text-slate-300 font-bold mb-1">Seu carrinho está vazio</p>
                          <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">Explore nossa vitrine trincando de gelada e monte seu pedido do dia.</p>
                          <button
                            id="empty-cart-return-btn"
                            onClick={() => setIsCartOpen(false)}
                            className="px-6 py-3 bg-[#DF1C24] text-white font-bold text-xs rounded-xl uppercase hover:bg-[#c2141a]"
                          >
                            Voltar para Vitrine
                          </button>
                        </div>
                      ) : (
                        <>
                          {/* List of checkout items */}
                          <div className="space-y-3">
                            <p className="text-[9px] font-bold text-slate-450 uppercase tracking-widest">Bebidas & Petiscos na Sacola</p>
                            {cart.map(item => (
                              <div
                                key={item.product.id}
                                id={`cart-item-${item.product.id}`}
                                className="bg-[#1C1300]/40 p-3 rounded-2xl border border-[#FFC107]/15 flex justify-between items-center"
                              >
                                <div className="flex items-center gap-3">
                                  {/* Thumbnail miniature of drink */}
                                  <div className={`w-11 h-11 rounded-lg bg-gradient-to-tr ${item.product.imagePlaceholderColor} flex items-center justify-center font-bold text-lg text-white shadow-inner overflow-hidden relative`}>
                                    {item.product.imageUrl ? (
                                      <img 
                                        src={item.product.imageUrl} 
                                        alt={item.product.name} 
                                        className="w-full h-full object-cover absolute inset-0"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      item.product.imageEmoji
                                    )}
                                  </div>

                                  <div>
                                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                                    <p className="text-[10px] text-yellow-400 font-bold font-mono">R$ {item.product.price.toFixed(2)}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  {/* Qty controller adjustments */}
                                  <div className="flex items-center bg-[#070501]/85 rounded-lg h-7 border border-[#FFC107]/20 text-xs font-bold text-white">
                                    <button
                                      id={`cart-dec-${item.product.id}`}
                                      onClick={() => updateQuantity(item.product.id, -1)}
                                      className="px-2 h-full hover:bg-slate-750 transition"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-2 font-mono">{item.quantity}</span>
                                    <button
                                      id={`cart-inc-${item.product.id}`}
                                      onClick={() => updateQuantity(item.product.id, 1)}
                                      className="px-2 h-full hover:bg-slate-750 transition"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>

                                  {/* Delete shortcut row */}
                                  <button
                                    id={`cart-del-${item.product.id}`}
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="p-1.5 text-[#FFC107] hover:text-white hover:bg-[#FFC107]/10 rounded-lg transition"
                                    title="Remover Item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Free delivery tracker badge */}
                          <div className={`p-3 rounded-2xl border text-xs font-medium ${cartSubtotal >= 60 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-[#FFC107]/10 border-[#FFC107]/20 text-[#FFE082]'}`}>
                            {cartSubtotal >= 60 ? (
                              <p className="flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-[#FFC107] shrink-0" />
                                <strong>Ótima escolha!</strong> Você atingiu mais de R$ 60,00 e ganhou <strong>Frete Grátis</strong>.
                              </p>
                            ) : (
                              <p>
                                Faltam apenas <strong>R$ {(60 - cartSubtotal).toFixed(2)}</strong> para você obter <strong>Frete Grátis</strong>!
                              </p>
                            )}
                          </div>

                          {/* Shipping details and values */}
                          <div className="bg-[#130E02]/60 p-4 rounded-3xl border border-[#FFC107]/15 space-y-2.5">
                            <p className="text-[9px] font-bold text-amber-500/90 uppercase tracking-widest">Resumo de Valores</p>
                            <div className="flex justify-between text-xs text-slate-400">
                              <span>Subtotal do Pedido</span>
                              <span className="font-mono text-slate-200 font-bold">R$ {cartSubtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-400">
                              <span>Taxa de Entrega</span>
                              <span className="font-mono text-slate-200">
                                {deliveryFee === 0 ? <span className="text-emerald-400 uppercase font-bold text-[10px]">Grátis</span> : `R$ ${deliveryFee.toFixed(2)}`}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-white font-extrabold border-t border-[#FFC107]/15 pt-2.5">
                              <span>Total Estimado</span>
                              <span className="font-mono text-[#FFC107] font-black text-base">R$ {cartTotal.toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Formulário de Entrega (Screen 3 requirements) */}
                          <form id="checkout-form-details" className="bg-[#130E02]/60 p-4 rounded-3xl border border-[#FFC107]/15 space-y-4">
                            <p className="text-[9px] font-bold text-slate-450 uppercase tracking-widest">Endereço de Entrega & Pagamento</p>
                            
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Nome do Comprador</label>
                              <input
                                id="chk-name-input"
                                type="text"
                                className="w-full bg-slate-950 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500 font-semibold"
                                placeholder="Seu nome"
                                value={checkoutForm.name}
                                onChange={(e) => setCheckoutForm(prev => ({ ...prev, name: e.target.value }))}
                                required
                              />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div className="col-span-2 space-y-1">
                                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Endereço completo</label>
                                <input
                                  id="chk-address-input"
                                  type="text"
                                  className="w-full bg-slate-950 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500 font-semibold"
                                  placeholder="Rua, número e apto"
                                  value={checkoutForm.address}
                                  onChange={(e) => setCheckoutForm(prev => ({ ...prev, address: e.target.value }))}
                                  required
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Bairro de SP</label>
                                <input
                                  id="chk-district-input"
                                  type="text"
                                  className="w-full bg-slate-950 text-slate-200 text-xs px-2 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500 font-semibold"
                                  placeholder="Bairro"
                                  value={checkoutForm.neighborhood}
                                  onChange={(e) => setCheckoutForm(prev => ({ ...prev, neighborhood: e.target.value }))}
                                  required
                                />
                              </div>
                            </div>

                            {/* Forma de Pagamento Selector (Pix, Cartão, Dinheiro) */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Forma de Pagamento</label>
                              <div className="grid grid-cols-3 gap-2">
                                {(['pix', 'cartao', 'dinheiro'] as const).map(method => {
                                  let label = 'PIX';
                                  if (method === 'cartao') label = 'Cartão';
                                  if (method === 'dinheiro') label = 'Dinheiro';
                                  const isActive = checkoutForm.paymentMethod === method;
                                  return (
                                    <button
                                      key={method}
                                      id={`pay-method-${method}`}
                                      type="button"
                                      onClick={() => setCheckoutForm(prev => ({ ...prev, paymentMethod: method }))}
                                      className={`py-2 px-3 rounded-xl text-[11px] font-bold border transition flex flex-col items-center justify-center gap-1 shadow-xs ${
                                        isActive 
                                          ? 'bg-gradient-to-r from-[#FFEA79] to-[#FFC107] border-[#FFC107] text-slate-950 font-black' 
                                          : 'bg-[#070501] border-[#FFC107]/15 text-[#FFE082] hover:bg-[#1C1300]'
                                      }`}
                                    >
                                      {method === 'pix' && <Sparkles className="w-4.5 h-4.5 text-slate-200" />}
                                      {method === 'cartao' && <CreditCard className="w-4.5 h-4.5 text-slate-200" />}
                                      {method === 'dinheiro' && <span className="font-mono text-xs text-slate-200">💰</span>}
                                      <span>{label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Dynamic Troco input if Dinheiro selected */}
                            {checkoutForm.paymentMethod === 'dinheiro' && (
                              <div className="space-y-1 border-t border-slate-800 pt-2.5">
                                <label className="text-[10px] text-slate-400 font-bold uppercase block">Precisa de troco para quanto?</label>
                                <input
                                  id="change-for-input"
                                  type="text"
                                  className="w-full bg-[#070501] text-white text-xs px-3 py-2 rounded-xl border border-[#FFC107]/20 focus:outline-none focus:border-[#FFC107]"
                                  placeholder="Digite Ex: R$ 50,00 ou R$ 100,00"
                                  value={checkoutForm.changeFor}
                                  onChange={(e) => setCheckoutForm(prev => ({ ...prev, changeFor: e.target.value }))}
                                />
                              </div>
                            )}
                          </form>
                        </>
                      )}
                    </div>

                    {/* Bottom main static action button */}
                    {cart.length > 0 && (
                      <div className="p-4 bg-[#120E02] border-t border-[#FFC107]/15 shadow-lg shrink-0">
                        <button
                          id="finish-order-btn"
                          onClick={handleFinishOrder}
                          className="w-full py-4 bg-[#DF1C24] hover:bg-[#c2141a] text-white font-black rounded-2xl uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg active:scale-98"
                        >
                          <span className="flex items-center gap-1.5"><Check className="w-5 h-5 text-white" /> FINALIZAR PEDIDO • R$ {cartTotal.toFixed(2)}</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* Global Floating Non-blocking Toast notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-6 inset-x-6 z-[120] bg-[#120E02]/95 border border-[#FFC107]/45 text-white font-black px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 backdrop-blur-xl text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
