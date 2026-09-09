'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // إخفاء شاشة التحميل بعد تحميل الصفحة
    setTimeout(() => setIsLoaded(true), 1500);
    
    // إنشاء تأثير الفتات المتطاير (Floating Crumbs)
    const container = document.getElementById('crumbsContainer');
    if (container) {
      const colors = ['#E8D5B7', '#D4A843', '#C4A882', '#F0D68A', '#F5E6D3'];
      for (let i = 0; i < 20; i++) {
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

    // تأثير ظهور العناصر عند التمرير (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // تأثير شريط التنقل عند التمرير (Navbar Scroll)
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

  return (
    <main className="main-content">
      {/* شاشة التحميل */}
      <div className={`preloader ${isLoaded ? 'hidden' : ''}`}>
        <div className="preloader-logo">Sugar<span>moon</span></div>
        <div className="preloader-bread">🍞</div>
      </div>

      {/* حاوية الفتات المتطاير */}
      <div className="crumbs-container" id="crumbsContainer"></div>

      {/* شريط التنقل (Navbar) */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            {/* 👇 غير اسم الصورة هنا إذا كان اللوجو الخاص بك له اسم مختلف */}
            <img src="/images/logo.png" alt="Sugar Moon Logo" className="nav-logo-icon" style={{objectFit: 'contain'}} />
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
          </div>
        </div>
      </nav>

      {/* القسم الرئيسي (Hero Section) */}
      <section className="hero" id="home">
        <div className="hero-bg-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-floating-items">
          <div className="floating-item"></div>
          <div className="floating-item">🥐</div>
          <div className="floating-item">🍰</div>
        </div>
        <div className="hero-content">
          <div className="hero-badge"><span className="dot"></span> متاح الآن للطلب</div>
          <h1 className="hero-title">
            <span className="moon-icon">🌙</span> Sugar<span className="highlight">moon</span>
          </h1>
          <p className="hero-subtitle">
            Taste of Home — Where Every Bite Feels Like Sudan
            <span className="arabic">طعم البيت — كل لقمة تحكي قصة وطن 🇸🇩</span>
          </p>
          <div className="hero-cta-group">
            <a href="#products" className="btn-primary"><i className="fas fa-bread-slice"></i> استعرض المنتجات</a>
            <a href="https://wa.me/2012883541" className="btn-secondary" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> اطلب عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* قسم المنتجات */}
      <section className="section products-section" id="products">
        <div className="section-header reveal">
          <div className="section-label"><i className="fas fa-star"></i> منتجاتنا المميزة</div>
          <h2 className="section-title">Our <span className="gold">Signature</span> Bakes</h2>
          <p className="section-desc">كل منتج مصنوع بحب وعناية، كأنك في بيتك بالسودان 🏡</p>
        </div>
        
        <div className="products-grid">
          
          {/* المنتج الأول: كوكيز الجنزبيل */}
          <div className="product-card reveal reveal-delay-1">
            <div className="product-image-wrapper">
              {/* 👇 غير اسم الصورة هنا (مثلاً: ginger-cookies.png أو ginger-cookies.jpeg) */}
              <img src="/images/ginger-cookies.jpg" alt="Ginger Cookies" className="product-image" />
              <div className="product-image-overlay"></div>
              <div className="product-badge">الأكثر مبيعاً </div>
              <div className="product-price-tag">
                <div className="price">400 EGP</div>
                <div className="price-unit">/ كيلو واحد</div>
              </div>
              <div className="product-qr">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://wa.me/2012883541?text=أريد%20طلب%20كوكيز%20الجنزبيل" alt="QR" />
              </div>
            </div>
            <div className="product-info">
              <div className="product-category">🍪 COOKIES</div>
              <h3 className="product-name">Ginger Cookies</h3>
              <div className="product-name-ar">كوكيز الجنزبيل</div>
              <p className="product-desc">كوكيز سوداني بالزنجبيل والقرفة، مقرمش من الخارج وطري من الداخل</p>
              <div className="product-footer">
                <a href="https://wa.me/2012883541?text=أريد%20طلب%20كوكيز%20الجنزبيل" className="product-order-btn" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> اطلب الآن
                </a>
              </div>
            </div>
          </div>

          {/* المنتج الثاني: بوكس السعادة */}
          <div className="product-card reveal reveal-delay-2">
            <div className="product-image-wrapper">
              {/* 👇 غير اسم الصورة هنا */}
              <img src="/images/happiness-box.jpg" alt="Happiness Box" className="product-image" />
              <div className="product-image-overlay"></div>
              <div className="product-badge">عرض خاص 💛</div>
              <div className="product-price-tag">
                <div className="price">600 EGP</div>
                <div className="price-unit">/ بوكس 1 كيلو</div>
              </div>
              <div className="product-qr">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://wa.me/2012883541?text=أريد%20طلب%20بوكس%20السعاده" alt="QR" />
              </div>
            </div>
            <div className="product-info">
              <div className="product-category">🎁 BOX SET</div>
              <h3 className="product-name">Happiness Box</h3>
              <div className="product-name-ar">بوكس السعادة</div>
              <p className="product-desc">تشكيلة فاخرة من الكوكيز والبسكويت السوداني في بوكس هدية أنيق</p>
              <div className="product-footer">
                <a href="https://wa.me/2012883541?text=أريد%20طلب%20بوكس%20السعاده" className="product-order-btn" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> اطلب الآن
                </a>
              </div>
            </div>
          </div>

          {/* المنتج الثالث: بسكويت سوداني */}
          <div className="product-card reveal reveal-delay-3">
            <div className="product-image-wrapper">
              {/* 👇 غير اسم الصورة هنا */}
              <img src="/images/sudanese-biscuits.jpg" alt="Sudanese Biscuits" className="product-image" />
              <div className="product-image-overlay"></div>
              <div className="product-badge">تقليدي 🇸🇩</div>
              <div className="product-price-tag">
                <div className="price">380 EGP</div>
                <div className="price-unit">/ كيلو واحد</div>
              </div>
              <div className="product-qr">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://wa.me/2012883541?text=أريد%20طلب%20بسكويت%20سوداني" alt="QR" />
              </div>
            </div>
            <div className="product-info">
              <div className="product-category"> BISCUITS</div>
              <h3 className="product-name">Sudanese Biscuits</h3>
              <div className="product-name-ar">بسكويت سوداني أصيل</div>
              <p className="product-desc">بسكويت سوداني تقليدي مقرمش بنكهة السمن البلدي الأصلي</p>
              <div className="product-footer">
                <a href="https://wa.me/2012883541?text=أريد%20طلب%20بسكويت%20سوداني" className="product-order-btn" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> اطلب الآن
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* الفوتر (Footer) */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-bottom">
            <div className="footer-copyright">© 2026 <strong>AnwerAhmed</strong> — All Rights Reserved</div>
            <div className="footer-made-with">Made with <span className="heart">❤️</span> for Sudanese in Egypt 🇸🇩🇪🇬</div>
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
