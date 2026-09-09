'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // للنافذة المنبثقة

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

  // 📝 لإضافة منتج جديد مستقبلاً: انسخ أحد الأسطر التالية وأضفه هنا مع تغيير البيانات
  const products = [
    { id: 1, name: 'كوكيز الجنزبيل', nameEn: 'Ginger Cookies', price: '400 EGP', img: '/ginger-cookies.jpg', desc: 'كوكيز سوداني أصيل بالزنجبيل والقرفة، مقرمش من الخارج وطري من الداخل، مثالي مع الشاي.', msg: 'مرحباً، أريد طلب كوكيز الجنزبيل' },
    { id: 2, name: 'بوكس السعادة', nameEn: 'Happiness Box', price: '600 EGP', img: '/happiness-box.jpg', desc: 'تشكيلة فاخرة ومتنوعة من ألذ الكوكيز والبسكويت السوداني في بوكس هدية أنيق ومميز.', msg: 'مرحباً، أريد طلب بوكس السعادة' },
    { id: 3, name: 'بسكويت سوداني', nameEn: 'Sudanese Biscuits', price: '380 EGP', img: '/product-4.png', desc: 'بسكويت سوداني تقليدي مقرمش بنكهة السمن البلدي الأصلي، يذكرنا بأيام الزمن الجميل.', msg: 'مرحباً، أريد طلب بسكويت سوداني' },
    { id: 4, name: 'معجنات فاخرة', nameEn: 'Premium Pastry', price: '450 EGP', img: '/product-5.png', desc: 'معجنات سودانية محضرة بعناية فائقة وأجود المكونات، بنكهة لا تُنسى.', msg: 'مرحباً، أريد طلب معجنات فاخرة' },
    { id: 5, name: 'حلوى مميزة', nameEn: 'Special Treat', price: '420 EGP', img: '/product-6.png', desc: 'حلوى سودانية فاخرة، خيار مثالي للمناسبات أو كهدية للأحباب.', msg: 'مرحباً، أريد طلب حلوى مميزة' },
  ];

  return (
    <main className="main-content">
      {/* شاشة التحميل */}
      <div className={`preloader ${isLoaded ? 'hidden' : ''}`}>
        <img src="/logo.png" alt="Logo" className="preloader-logo" />
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
            <div key={product.id} className={`product-card reveal reveal-delay-${(index % 3) + 1}`}>
              {/* الضغط على الصورة يفتح النافذة المنبثقة */}
              <div className="product-image-wrapper" onClick={() => setSelectedProduct(product)}>
                <img src={product.img} alt={product.name} className="product-image" />
                <div className="image-overlay-text">🔍 اضغط للتفاصيل</div>
                <div className="product-price-tag">
                  <div className="price">{product.price}</div>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-name-en">{product.nameEn}</div>
                <div className="product-footer">
                  <button className="product-order-btn" onClick={() => setSelectedProduct(product)}>
                    💬 اطلب الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* النافذة المنبثقة (Modal) للتفاصيل */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <img src={selectedProduct.img} alt={selectedProduct.name} className="modal-image" />
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <p className="modal-subtitle">{selectedProduct.nameEn}</p>
            <div className="modal-price">{selectedProduct.price}</div>
            <p className="modal-desc">{selectedProduct.desc}</p>
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
            <div>Made with ❤️ for Sudanese in Egypt 🇸🇩🇪🇬</div>
          </div>
        </div>
      </footer>

      {/* واتساب العائم */}
      <a href="https://wa.me/2012883541" className="sticky-whatsapp" target="_blank">💬</a>
    </main>
  );
}
