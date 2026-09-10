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
      {/* خلفية 3D سينمائية */}
      <div className="cinematic-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* شاشة التحميل الفاخرة */}
      <div className={`preloader ${isLoaded ? 'hidden' : ''}`}>
        <img src="/logo.png" alt="Sugar Moon" className="preloader-logo" />
        <div className="preloader-text">Sugar<span>moon</span></div>
        <div className="preloader-line"><span></span></div>
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
            <li><a href="#products">المجموعة الفاخرة</a></li>
            <li><a href="#footer">تواصل معنا</a></li>
          </ul>
          <div className="nav-actions">
            <a href="https://wa.me/249912883541" className="nav-whatsapp-btn" target="_blank">💬 اطلب الآن</a>
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
              <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>الرئيسية</a></li>
              <li><a href="#products" onClick={() => setMobileMenuOpen(false)}>المجموعة الفاخرة</a></li>
            </ul>
            <a href="https://wa.me/249912883541" className="mobile-whatsapp-btn" target="_blank">💬 اطلب عبر واتساب</a>
          </div>
        </div>
      )}

      {/* الهيرو */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">✨ تجربة طعم لا تُنسى</div>
          <h1 className="hero-title">Sugar<span className="highlight">moon</span></h1>
          <p className="hero-subtitle">
            حيث يلتقي الأصالة بالفخامة
            <span className="arabic">طعم البيت السوداني بلمسة عصرية فاخرة 🇸🇩</span>
          </p>
          <div className="hero-cta-group">
            <a href="#products" className="btn-luxury">استعرض المجموعة</a>
            <a href="https://wa.me/249912883541" className="btn-outline" target="_blank">تواصل للطلب</a>
          </div>
        </div>
      </section>

      {/* المنتجات */}
      <section className="section products-section" id="products">
        <div className="section-header reveal">
          <div className="section-label">إبداعنا</div>
          <h2 className="section-title">المجموعة <span className="gold">الحصرية</span></h2>
        </div>
        
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={product.id} className={`product-card reveal reveal-delay-${(index % 3) + 1}`}>
              <div className="product-image-wrapper" onClick={() => setSelectedProduct(product)}>
                <img src={product.img} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <button className="btn-luxury-sm" onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://wa.me/249912883541?text=${encodeURIComponent(product.msg)}`, '_blank');
                  }}>
                    💬 اطلب الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* النافذة المنبثقة الفاخرة */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <img src={selectedProduct.img} alt={selectedProduct.name} className="modal-image" />
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <a href={`https://wa.me/249912883541?text=${encodeURIComponent(selectedProduct.msg)}`} className="btn-luxury modal-btn" target="_blank">
              💬 اطلب الآن عبر واتساب
            </a>
          </div>
        </div>
      )}

      {/* الفوتر الفاخر */}
      <footer className="footer" id="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/logo.png" alt="Logo" className="footer-logo" />
              <h3>Sugar<span>moon</span></h3>
              <p>نقدم لكم أرقى المخبوزات والحلويات السودانية الأصيلة، محضرة بحب وعناية فائقة لننقل لكم طعم البيت في كل لقمة.</p>
            </div>
            <div className="footer-contact">
              <h4>تواصل للطلبات</h4>
              <a href="https://wa.me/249912883541" target="_blank" className="contact-link">
                <span>📱</span> 00249912883541
              </a>
              <div className="social-links">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">📸</a>
                <a href="#" className="social-icon">🎵</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="copyright">
              © 2026 <strong>AnwerAhmed</strong>. جميع الحقوق محفوظة.
            </div>
            <div className="developer-info">
              تطوير وتصميم بواسطة <strong>AnwerAhmed</strong> | 
              <a href="https://wa.me/249998989999" target="_blank" className="dev-link">
                تواصل مع المطور: 0024998989999 💬
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* واتساب العائم */}
      <a href="https://wa.me/249912883541" className="sticky-whatsapp" target="_blank" title="اطلب الآن">
        💬
      </a>
    </main>
  );
}
