'use client';

import { useState, useEffect } from 'react';

// مكون ذكي لتحميل الصور يتغلب على مشاكل حالة الأحرف في Vercel
function SmartImage({ src, alt, className, id }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [attempt, setAttempt] = useState(1);

  const handleError = () => {
    if (attempt === 1) {
      // المحاولة 2: تغيير الامتداد إلى أحرف كبيرة
      setImgSrc(src.replace('.png', '.PNG').replace('.jpg', '.JPG'));
      setAttempt(2);
    } else if (attempt === 2) {
      // المحاولة 3: تغيير الامتداد إلى أحرف صغيرة (عكس السابق)
      setImgSrc(src.replace('.PNG', '.png').replace('.JPG', '.jpg'));
      setAttempt(3);
    } else {
      // المحاولة 4: خطة أخيرة (صورة احترافية لضمان عدم كسر التصميم)
      // ملاحظة: إذا سميت ملفاتك بشكل صحيح، لن يصل الكود إلى هنا أبداً
      const fallbacks = [
        'https://images.unsplash.com/photo-1499636136210-6f4391b9c433?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=800&h=1000&fit=crop'
      ];
      setImgSrc(fallbacks[id % fallbacks.length]);
    }
  };

  return <img src={imgSrc} alt={alt} className={className} onError={handleError} />;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 2000);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
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
    { id: 1, name: 'كوكيز الجنزبيل', nameEn: 'Ginger Cookies', msg: 'مرحباً، أريد طلب كوكيز الجنزبيل' },
    { id: 2, name: 'بوكس السعادة', nameEn: 'Happiness Box', msg: 'مرحباً، أريد طلب بوكس السعادة' },
    { id: 3, name: 'بسكويت سوداني', nameEn: 'Sudanese Biscuits', msg: 'مرحباً، أريد طلب بسكويت سوداني' },
    { id: 4, name: 'معجنات فاخرة', nameEn: 'Premium Pastry', msg: 'مرحباً، أريد طلب معجنات فاخرة' },
    { id: 5, name: 'حلوى مميزة', nameEn: 'Special Treat', msg: 'مرحباً، أريد طلب حلوى مميزة' },
    { id: 6, name: 'كيك فاخر', nameEn: 'Luxury Cake', msg: 'مرحباً، أريد طلب كيك فاخر' },
    { id: 7, name: 'خبز طازج', nameEn: 'Fresh Bread', msg: 'مرحباً، أريد طلب خبز طازج' },
    { id: 8, name: 'كرواسون ذهبي', nameEn: 'Golden Croissant', msg: 'مرحباً، أريد طلب كرواسون ذهبي' },
    { id: 9, name: 'تشكيلة راقية', nameEn: 'Luxury Collection', msg: 'مرحباً، أريد طلب التشكيلة الراقية' },
  ];

  return (
    <main className="main-content">
      <div className="cinematic-bg">
        <div className="grain-overlay"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      <div className={`preloader ${isLoaded ? 'hidden' : ''}`}>
        <div className="preloader-content">
          <SmartImage src="/logo.png" alt="Sugar Moon" className="preloader-logo" id={0} />
          <div className="preloader-text">Sugar<span>moon</span></div>
          <div className="preloader-subtitle">Luxury Sudanese Bakery</div>
          <div className="preloader-line"><span></span></div>
        </div>
      </div>

      <button className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle theme">
        {isDark ? '☀️' : '🌙'}
      </button>

      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            <SmartImage src="/logo.png" alt="Logo" className="nav-logo-icon" id={0} />
            <span className="nav-logo-text">Sugar<span>moon</span></span>
          </a>
          <ul className="nav-links">
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#products">المجموعة</a></li>
            <li><a href="#about">قصتنا</a></li>
            <li><a href="#footer">تواصل</a></li>
          </ul>
          <div className="nav-actions">
            <a href="https://wa.me/249912883541" className="nav-cta" target="_blank">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              اطلب الآن
            </a>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <ul className="mobile-menu-links">
              <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>الرئيسية</a></li>
              <li><a href="#products" onClick={() => setMobileMenuOpen(false)}>المجموعة</a></li>
              <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>قصتنا</a></li>
              <li><a href="#footer" onClick={() => setMobileMenuOpen(false)}>تواصل</a></li>
            </ul>
            <a href="https://wa.me/249912883541" className="mobile-cta" target="_blank">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              اطلب عبر واتساب
            </a>
          </div>
        </div>
      )}

      <section className="hero" id="home">
        <div className="hero-parallax" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="eyebrow-line"></span>
              <span>Since 2023 • Luxury Bakery</span>
              <span className="eyebrow-line"></span>
            </div>
            <h1 className="hero-title">
              <span className="title-line">Sugar</span>
              <span className="title-line highlight">moon</span>
            </h1>
            <p className="hero-subtitle">حيث تلتقي الأصالة السودانية بالفخامة العصرية</p>
            <p className="hero-subtitle-en">Where Sudanese Heritage Meets Modern Luxury</p>
            <div className="hero-cta-group">
              <a href="#products" className="btn-primary">
                استكشف المجموعة
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </a>
              <a href="https://wa.me/249912883541" className="btn-secondary" target="_blank">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                تواصل للطلب
              </a>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      <section className="section products-section" id="products">
        <div className="section-header reveal">
          <div className="section-eyebrow">Our Collection</div>
          <h2 className="section-title">المجموعة <span className="gold">الحصرية</span></h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={product.id} className={`product-card reveal reveal-delay-${(index % 3) + 1}`}>
              <div className="product-image-wrapper" onClick={() => setSelectedProduct(product)}>
                <SmartImage 
                  src={`/product-${product.id}.png`} 
                  alt={product.name} 
                  className="product-image"
                  id={product.id}
                />
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h3 className="overlay-title">{product.name}</h3>
                    <p className="overlay-subtitle">{product.nameEn}</p>
                    <button className="btn-overlay" onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://wa.me/249912883541?text=${encodeURIComponent(product.msg)}`, '_blank');
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      اطلب الآن
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <SmartImage 
              src={`/product-${selectedProduct.id}.png`} 
              alt={selectedProduct.name} 
              className="modal-image"
              id={selectedProduct.id}
            />
            <div className="modal-divider"></div>
            <h2 className="modal-title">{selectedProduct.name}</h2>
            <p className="modal-subtitle">{selectedProduct.nameEn}</p>
            <a href={`https://wa.me/249912883541?text=${encodeURIComponent(selectedProduct.msg)}`} className="btn-primary modal-btn" target="_blank">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              اطلب الآن عبر واتساب
            </a>
          </div>
        </div>
      )}

      <footer className="footer" id="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <SmartImage src="/logo.png" alt="Logo" className="footer-logo" id={0} />
              <h3>Sugar<span>moon</span></h3>
              <p>نقدم لكم أرقى المخبوزات والحلويات السودانية الأصيلة، محضرة بحب وعناية فائقة لننقل لكم طعم البيت في كل لقمة.</p>
            </div>
            <div className="footer-contact">
              <h4>تواصل معنا</h4>
              <a href="https://wa.me/249912883541" target="_blank" className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                واتساب للطلبات
              </a>
            </div>
            <div className="footer-social">
              <h4>تابعنا</h4>
              <div className="social-icons">
                <a href="#" className="social-icon facebook" aria-label="Facebook">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="social-icon instagram" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://wa.me/249912883541" className="social-icon whatsapp" aria-label="WhatsApp" target="_blank">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                تواصل مع المطور
              </a>
            </div>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/249912883541" className="sticky-whatsapp" target="_blank" title="اطلب الآن">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </main>
  );
}
