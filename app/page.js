'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1500);
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.pageYOffset > 50) navbar?.classList.add('scrolled');
      else navbar?.classList.remove('scrolled');
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

  const products = [
    { name: 'كوكيز الجنزبيل', nameEn: 'Ginger Cookies', price: '400 EGP', img: '/images/ginger-cookies.jpg', fallback: 'https://images.unsplash.com/photo-1499636136210-6f4391b9c433?w=600&h=400&fit=crop', msg: 'أريد طلب كوكيز الجنزبيل' },
    { name: 'بوكس السعادة', nameEn: 'Happiness Box', price: '600 EGP', img: '/images/happiness-box.jpg', fallback: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop', msg: 'أريد طلب بوكس السعادة' },
    { name: 'بسكويت سوداني', nameEn: 'Sudanese Biscuits', price: '380 EGP', img: '/images/a.png', fallback: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop', msg: 'أريد طلب بسكويت سوداني' },
    { name: 'معجنات فاخرة', nameEn: 'Premium Pastry', price: '450 EGP', img: '/images/23666866-1B7F-48B6-942F-109F3E69B892.PNG', fallback: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600&h=400&fit=crop', msg: 'أريد طلب معجنات فاخرة' },
    { name: 'حلوى مميزة', nameEn: 'Special Treat', price: '420 EGP', img: '/images/742496D0-2EC1-425D-9A92-6D2AD36D13D8 (2).PNG', fallback: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&h=400&fit=crop', msg: 'أريد طلب حلوى مميزة' },
    { name: 'كيك حصري', nameEn: 'Exclusive Cake', price: '500 EGP', img: '/images/F44AAFC0-C3F0-49DC-B24C-5B29AA6C22AB.PNG', fallback: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop', msg: 'أريد طلب كيك حصري' }
  ];

  return (
    <main className="main-content">
      {/* شاشة التحميل */}
      <div className={`preloader ${isLoaded ? 'hidden' : ''}`}>
        <img src="/images/logo.png" alt="Logo" className="preloader-logo" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
        <div className="preloader-emoji" style={{display: 'none', fontSize: '4rem'}}>🌙</div>
        <div className="preloader-text">Sugar<span>moon</span></div>
      </div>

      {/* زر الوضع الليلي */}
      <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
        {isDark ? '☀️' : '🌙'}
      </button>

      {/* الناف بار */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            <img src="/images/logo.png" alt="Logo" className="nav-logo-icon" onError={(e) => { e.target.style.display='none'; }} />
            <span className="nav-logo-text">Sugar<span>moon</span></span>
          </a>
          <ul className="nav-links">
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#products">المنتجات</a></li>
          </ul>
          <div className="nav-actions">
            <a href="https://wa.me/2012883541" className="nav-whatsapp-btn" target="_blank">💬 اطلب الآن</a>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>☰</button>
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
              <li><a href="#products" onClick={() => setMobileMenuOpen(false)}>🍞 المنتجات</a></li>
            </ul>
            <a href="https://wa.me/2012883541" className="mobile-whatsapp-btn" target="_blank">💬 اطلب عبر واتساب</a>
          </div>
        </div>
      )}

      {/* الهيرو */}
      <section className="hero" id="home">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-badge">🟢 متاح الآن للطلب</div>
          <h1 className="hero-title">Sugar<span className="highlight">moon</span></h1>
          <p className="hero-subtitle">
            Taste of Home — Where Every Bite Feels Like Sudan
            <span className="arabic">طعم البيت — كل لقمة تحكي قصة وطن 🇸🇩</span>
          </p>
          <div className="hero-cta-group">
            <a href="#products" className="btn-primary">🍞 استعرض المنتجات</a>
            <a href="https://wa.me/2012883541" className="btn-secondary" target="_blank">💬 اطلب عبر واتساب</a>
          </div>
        </div>
      </section>

      {/* المنتجات */}
      <section className="section products-section" id="products">
        <div className="section-header reveal">
          <div className="section-label">⭐ منتجاتنا المميزة</div>
          <h2 className="section-title">Our <span className="gold">Signature</span> Bakes</h2>
        </div>
        
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className={`product-card reveal reveal-delay-${(index % 3) + 1}`}>
              <div className="product-image-wrapper">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="product-image"
                  onError={(e) => { e.target.src = product.fallback; }}
                />
                <div className="product-price-tag">
                  <div className="price">{product.price}</div>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-name-en">{product.nameEn}</div>
                <div className="product-footer">
                  <a href={`https://wa.me/2012883541?text=${encodeURIComponent(product.msg)}`} className="product-order-btn" target="_blank">
                    💬 اطلب الآن
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
            <div>© 2026 <strong>AnwerAhmed</strong></div>
            <div>Made with ❤️ for Sudanese in Egypt 🇸🇩🇪🇬</div>
          </div>
        </div>
      </footer>

      {/* واتساب العائم */}
      <a href="https://wa.me/2012883541" className="sticky-whatsapp" target="_blank">
        💬
      </a>
    </main>
  );
}
