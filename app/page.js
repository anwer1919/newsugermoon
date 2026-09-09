'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // إخفاء شاشة التحميل
    setTimeout(() => setIsLoaded(true), 2000);
    
    // تحميل الوضع المحفوظ
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);

    // إنشاء الفتات المتطاير
    const container = document.getElementById('crumbsContainer');
    if (container) {
      const colors = ['#E8D5B7', '#D4A843', '#C4A882', '#F0D68A', '#F5E6D3'];
      for (let i = 0; i < 15; i++) {
        const crumb = document.createElement('div');
        crumb.className = 'crumb';
        crumb.style.left = Math.random() * 100 + '%';
        crumb.style.animationDuration = (Math.random() * 10 + 8) + 's';
        crumb.style.animationDelay = (Math.random() * 10) + 's';
        crumb.style.width = (Math.random() * 6 + 3) + 'px';
        crumb.style.height = crumb.style.width;
        crumb.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(crumb);
      }
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // Navbar Scroll
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.pageYOffset > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // قائمة المنتجات - استخدم صور Unsplash كـ fallback موثوق
  const products = [
    {
      id: 1,
      name: 'Ginger Cookies',
      nameAr: 'كوكيز الجنزبيل',
      category: ' COOKIES',
      price: '400 EGP',
      unit: '/ كيلو',
      badge: 'الأكثر مبيعاً 🔥',
      desc: 'كوكيز سوداني بالزنجبيل والقرفة، مقرمش من الخارج وطري من الداخل',
      localImage: '/images/ginger-cookies.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1499636136210-6f4391b9c433?w=600&h=400&fit=crop',
      whatsappMsg: 'أريد طلب كوكيز الجنزبيل'
    },
    {
      id: 2,
      name: 'Happiness Box',
      nameAr: 'بوكس السعادة',
      category: '🎁 BOX SET',
      price: '600 EGP',
      unit: '/ بوكس',
      badge: 'عرض خاص 💛',
      desc: 'تشكيلة فاخرة من الكوكيز والبسكويت السوداني في بوكس هدية أنيق',
      localImage: '/images/happiness-box.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop',
      whatsappMsg: 'أريد طلب بوكس السعادة'
    },
    {
      id: 3,
      name: 'Sudanese Biscuits',
      nameAr: 'بسكويت سوداني أصيل',
      category: '🍘 BISCUITS',
      price: '380 EGP',
      unit: '/ كيلو',
      badge: 'تقليدي 🇸🇩',
      desc: 'بسكويت سوداني تقليدي مقرمش بنكهة السمن البلدي الأصلي',
      localImage: '/images/a.png',
      fallbackImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop',
      whatsappMsg: 'أريد طلب بسكويت سوداني'
    },
    {
      id: 4,
      name: 'Premium Pastry',
      nameAr: 'معجنات فاخرة',
      category: '🥐 PASTRY',
      price: '450 EGP',
      unit: '/ كيلو',
      badge: 'جديد ✨',
      desc: 'معجنات سودانية تقليدية بنكهة لا تُنسى وجودة عالية',
      localImage: '/images/23666866-1B7F-48B6-942F-109F3E69B892.PNG',
      fallbackImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600&h=400&fit=crop',
      whatsappMsg: 'أريد طلب معجنات فاخرة'
    },
    {
      id: 5,
      name: 'Special Treat',
      nameAr: 'حلوى مميزة',
      category: '🍰 SPECIAL',
      price: '420 EGP',
      unit: '/ كيلو',
      badge: 'مميز 🌟',
      desc: 'حلوى سودانية فاخرة محضرة بأجود المكونات الطبيعية',
      localImage: '/images/742496D0-2EC1-425D-9A92-6D2AD36D13D8 (2).PNG',
      fallbackImage: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&h=400&fit=crop',
      whatsappMsg: 'أريد طلب حلوى مميزة'
    },
    {
      id: 6,
      name: 'Exclusive Cake',
      nameAr: 'كيك حصري',
      category: '🎂 CAKE',
      price: '500 EGP',
      unit: '/ كيلو',
      badge: 'حصري 👑',
      desc: 'كيك سوداني فاخر للمناسبات الخاصة، محضر بعناية فائقة',
      localImage: '/images/F44AAFC0-C3F0-49DC-B24C-5B29AA6C22AB.PNG',
      fallbackImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
      whatsappMsg: 'أريد طلب كيك حصري'
    }
  ];

  return (
    <main className="main-content">
      {/* شاشة التحميل - باللوجو */}
      <div className={`preloader ${isLoaded ? 'hidden' : ''}`}>
        <div className="preloader-logo-wrapper">
          <img 
            src="/images/logo.png" 
            alt="Sugar Moon" 
            className="preloader-logo-img"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          <div className="preloader-logo-text" style={{display: 'none'}}>🌙</div>
        </div>
        <div className="preloader-text">Sugar<span>moon</span></div>
        <div className="preloader-subtext">جاري التحميل...</div>
        <div className="preloader-dots">
          <span></span><span></span><span></span>
        </div>
      </div>

      {/* الفتات المتطاير */}
      <div className="crumbs-container" id="crumbsContainer"></div>

      {/* زر الوضع الليلي/النهاري */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {isDark ? '☀️' : ''}
      </button>

      {/* شريط التنقل */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            <img 
              src="/images/logo.png" 
              alt="Sugar Moon" 
              className="nav-logo-icon"
              onError={(e) => { e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🌙</text></svg>'; }}
            />
            <div className="nav-logo-text">Sugar<span>moon</span></div>
          </a>
          
          <ul className="nav-links">
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#products">المنتجات</a></li>
            <li><a href="#story">قصتنا</a></li>
          </ul>
          
          <div className="nav-actions">
            <a href="https://wa.me/2012883541" className="nav-whatsapp-btn" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> اطلب الآن
            </a>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* قائمة الجوال */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
            <ul className="mobile-menu-links">
              <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>🏠 الرئيسية</a></li>
              <li><a href="#products" onClick={() => setMobileMenuOpen(false)}>️ المنتجات</a></li>
              <li><a href="#story" onClick={() => setMobileMenuOpen(false)}>📖 قصتنا</a></li>
            </ul>
            <a href="https://wa.me/2012883541" className="mobile-whatsapp-btn" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> اطلب عبر واتساب
            </a>
          </div>
        </div>
      )}

      {/* القسم الرئيسي */}
      <section className="hero" id="home">
        <div className="hero-bg-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-floating-items">
          <div className="floating-item">🍞</div>
          <div className="floating-item">🥐</div>
          <div className="floating-item">🍰</div>
        </div>
        <div className="hero-content">
          <div className="hero-badge"><span className="dot"></span> متاح الآن للطلب</div>
          <h1 className="hero-title">
            <span className="moon-icon"></span> Sugar<span className="highlight">moon</span>
          </h1>
          <p className="hero-subtitle">
            Taste of Home — Where Every Bite Feels Like Sudan
            <span className="arabic">طعم البيت — كل لقمة تحكي قصة وطن 🇸🇩</span>
          </p>
          <div className="hero-cta-group">
            <a href="#products" className="btn-primary">🍞 استعرض المنتجات</a>
            <a href="https://wa.me/2012883541" className="btn-secondary" target="_blank" rel="noopener noreferrer">
              💬 اطلب عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* قسم المنتجات */}
      <section className="section products-section" id="products">
        <div className="section-header reveal">
          <div className="section-label">⭐ منتجاتنا المميزة</div>
          <h2 className="section-title">Our <span className="gold">Signature</span> Bakes</h2>
          <p className="section-desc">كل منتج مصنوع بحب وعناية، كأنك في بيتك بالسودان </p>
        </div>
        
        <div className="products-grid">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`product-card reveal reveal-delay-${(index % 3) + 1}`}
            >
              <div className="product-image-wrapper">
                <img 
                  src={product.localImage}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => { 
                    e.target.onerror = null;
                    e.target.src = product.fallbackImage;
                  }}
                />
                <div className="product-image-overlay"></div>
                <div className="product-badge">{product.badge}</div>
                <div className="product-price-tag">
                  <div className="price">{product.price}</div>
                  <div className="price-unit">{product.unit}</div>
                </div>
                <div className="product-qr">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://wa.me/2012883541?text=${encodeURIComponent(product.whatsappMsg)}`} 
                    alt="QR" 
                  />
                </div>
              </div>
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-name-ar">{product.nameAr}</div>
                <p className="product-desc">{product.desc}</p>
                <div className="product-footer">
                  <a 
                    href={`https://wa.me/2012883541?text=${encodeURIComponent(product.whatsappMsg)}`} 
                    className="product-order-btn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> اطلب الآن
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* الفوتر */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-bottom">
            <div className="footer-copyright">© 2026 <strong>AnwerAhmed</strong> — All Rights Reserved</div>
            <div className="footer-made-with">Made with <span className="heart">❤️</span> for Sudanese in Egypt 🇸🇪🇬</div>
          </div>
        </div>
      </footer>

      {/* زر الواتساب العائم */}
      <div className="sticky-whatsapp">
        <span className="sticky-whatsapp-label">اطلب عبر واتساب 💬</span>
        <a href="https://wa.me/2012883541?text=مرحباً%20Sugarmoon!" className="sticky-whatsapp-btn" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </main>
  );
}
