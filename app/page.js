'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // زيادة وقت التحميل قليلاً لضمان ظهور اللوجو
    setTimeout(() => setIsLoaded(true), 2000);
    
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

  // المسارات هنا مباشرة بدون /images/ لتطابق ملفاتك الحالية في GitHub
  const products = [
    { name: 'كوكيز الجنزبيل', nameEn: 'Ginger Cookies', price: '400 EGP', img: '/ginger-cookies.jpg', msg: 'أريد طلب كوكيز الجنزبيل' },
    { name: 'بوكس السعادة', nameEn: 'Happiness Box', price: '600 EGP', img: '/happiness-box.jpg', msg: 'أريد طلب بوكس السعادة' },
    { name: 'بسكويت سوداني', nameEn: 'Sudanese Biscuits', price: '380 EGP', img: '/product-4.png', msg: 'أريد طلب بسكويت سوداني' },
    { name: 'معجنات فاخرة', nameEn: 'Premium Pastry', price: '450 EGP', img: '/product-5.png', msg: 'أريد طلب معجنات فاخرة' },
    { name: 'حلوى مميزة', nameEn: 'Special Treat', price: '420 EGP', img: '/product-6.png', msg: 'أريد طلب حلوى مميزة' },
  ];

  return (
    <main className="main-content">
      {/* شاشة التحميل باللوجو */}
      <div className={`preloader ${isLoaded ? 'hidden' : ''}`}>
        <img 
          src="/logo.png" 
          alt="Sugar Moon Logo" 
          className="preloader-logo" 
        />
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
            <img src="/logo.png" alt="Logo" className="nav-logo-icon" />
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
