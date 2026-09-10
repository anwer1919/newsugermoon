'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 2500);
    
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

  //  جميع المنتجات التسعة
  const products = [
    { id: 1, name: 'المنتج الأول', img: '/product-1.png', msg: 'مرحباً، أريد الاستفسار عن المنتج الأول' },
    { id: 2, name: 'المنتج الثاني', img: '/product-2.png', msg: 'مرحباً، أريد الاستفسار عن المنتج الثاني' },
    { id: 3, name: 'المنتج الثالث', img: '/product-3.png', msg: 'مرحباً، أريد الاستفسار عن المنتج الثالث' },
    { id: 4, name: 'المنتج الرابع', img: '/product-4.png', msg: 'مرحباً، أريد الاستفسار عن المنتج الرابع' },
    { id: 5, name: 'المنتج الخامس', img: '/product-5.png', msg: 'مرحباً، أريد الاستفسار عن المنتج الخامس' },
    { id: 6, name: 'المنتج السادس', img: '/product-6.png', msg: 'مرحباً، أريد الاستفسار عن المنتج السادس' },
    { id: 7, name: 'المنتج السابع', img: '/product-7.png', msg: 'مرحباً، أريد الاستفسار عن المنتج السابع' },
    { id: 8, name: 'المنتج الثامن', img: '/product-8.png', msg: 'مرحباً، أريد الاستفسار عن المنتج الثامن' },
    { id: 9, name: 'المنتج التاسع', img: '/product-9.png', msg: 'مرحباً، أريد الاستفسار عن المنتج التاسع' },
  ];

  return (
    <main className="main-content">
      {/* خلفية 3D متحركة */}
      <div className="bg-3d-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
        <div className="floating-shape shape-6"></div>
      </div>

      {/* شاشة التحميل - لوجو كبير */}
      <div className={`preloader ${isLoaded ? 'hidden' : ''}`}>
        <img src="/logo.png" alt="Sugar Moon Logo" className="preloader-logo-large" />
        <div className="preloader-text">Sugar<span>moon</span></div>
        <div className="preloader-dots">
          <span></span><span></span><span></span>
        </div>
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
        <div className="hero-content">
          <div className="hero-badge">🟢 متاح الآن للطلب</div>
          <h1 className="hero-title">Sugar<span className="highlight">moon</span></h1>
          <p className="hero-subtitle">
            Taste of Home — Where Every Bite Feels Like Sudan
            <span className="arabic">طعم البيت — كل لقمة تحكي قصة وطن 🇩</span>
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
            <div key={product.id} className={`product-card reveal reveal-delay-${(index % 3) + 1}`}>
              <div className="product-image-wrapper" onClick={() => setSelectedProduct(product)}>
                <img src={product.img} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <button className="product-order-btn-overlay" onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://wa.me/2012883541?text=${encodeURIComponent(product.msg)}`, '_blank');
                  }}>
                    💬 اطلب الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* النافذة المنبثقة */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <img src={selectedProduct.img} alt={selectedProduct.name} className="modal-image" />
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <a 
              href={`https://wa.me/2012883541?text=${encodeURIComponent(selectedProduct.msg)}`} 
              className="modal-order-btn" 
              target="_blank"
            >
              💬 اطلب الآن عبر واتساب
            </a>
          </div>
        </div>
      )}

      {/* الفوتر */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-bottom">
            <div>© 2026 <strong>AnwerAhmed</strong></div>
            <div>Made with ❤️ for Sudanese in Egypt 🇸🇩🇪</div>
          </div>
        </div>
      </footer>

      {/* واتساب العائم */}
      <a href="https://wa.me/2012883541" className="sticky-whatsapp" target="_blank">💬</a>
    </main>
  );
}
