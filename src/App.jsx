import React, { useState } from "react";
import "./App.css";
import { translations } from "./translations";
function App() {
  const [language, setLanguage] = useState("ar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // استخدام خدمة Web3Forms لإرسال الإيميل مباشرة
      const formData = new FormData();
      formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // استبدل هذا بمفتاحك من Web3Forms
      formData.append("name", contactForm.name);
      formData.append("phone", contactForm.phone);
      formData.append(
        "subject",
        contactForm.subject || "استفسار من موقع الفيصلي"
      );
      formData.append("message", contactForm.message);
      formData.append("to", "investment@alfaisalyfc.net");
      formData.append("from_name", contactForm.name);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // إعادة تعيين النموذج
        setContactForm({
          name: "",
          phone: "",
          subject: "",
          message: "",
        });

        alert("تم إرسال رسالتك بنجاح! سيتم الرد عليك قريباً.");
      } else {
        throw new Error("فشل في إرسال الرسالة");
      }
    } catch (error) {
      console.error("Error sending email:", error);

      // في حالة فشل الإرسال المباشر، استخدم mailto كبديل
      const subject = encodeURIComponent(
        `استفسار من ${contactForm.name} - ${
          contactForm.subject || "استفسار عام"
        }`
      );
      const body = encodeURIComponent(`
الاسم: ${contactForm.name}
رقم الهاتف: ${contactForm.phone}
الموضوع: ${contactForm.subject || "استفسار عام"}

الرسالة:
${contactForm.message}
      `);

      const mailtoLink = `mailto:investment@alfaisalyfc.net?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;

      alert("سيتم فتح تطبيق الإيميل لإرسال الرسالة");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Package data with images
  const packages = [
    { key: "official", image: "/aldrees_logo.jpg" },
    { key: "goldenFront", image: "/ROCO.jpg" },
    { key: "partner01", image: "/شعار-الرميح.jpg" },
    { key: "partner02", image: "/04.jpg" },
    { key: "partner03", image: "/05.jpg" },
    { key: "goldenBack", image: "/001.jpg" },
  ];

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} lang={language}>
      {/* Header */}
      <header className="site-header">
        <div className="top-bar">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
                  <a
                    className="nav-link"
                    href="http://alfaisalyfc.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    {t.navChannel}
                  </a>
                  <a
                    className="nav-link"
                    href="https://store.alfaisalyfc.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    {t.navStore}
                  </a>
                  <a className="nav-link" href="#tickets" onClick={closeMenu}>
                    {t.navTickets}
                  </a>
                  <a
                    className="nav-link"
                    href="https://alfaisalyfc.net/strategy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    {t.navStrategy}
                  </a>
                  <a
                    className="nav-link"
                    href="https://alfaisalyfc.net/complaint_and_suggestion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    {t.navReports}
                  </a>
                </nav>
              </div>
              <div className="col-md-2 text-center">{/* Logo removed */}</div>
              <div className="col-md-2 text-end">
                <div className="d-flex align-items-center justify-content-end">
                  <button
                    className={`hamburger-menu ${isMenuOpen ? "active" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                  <button onClick={toggleLanguage} className="btn lang">
                    {t.langButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="inner-banner">
        <div className="container">
          <div className="banner-content">
            <div className="page-title">{t.bannerTitle}</div>
            <div className="banner-logo">
              <img src="/شعار-ابيض.png" alt="Al-Faisaly Logo" loading="eager" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="page-main">
        <div className="container">
          <div className="b-title mb-4">
            <h2 className="text-center">{t.mainTitle}</h2>
          </div>

          {/* Packages Grid */}
          <div className="row">
            {packages.map((pkg, index) => {
              const packageData = t.packages[pkg.key];
              return (
                <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                  <div className="package-card">
                    {/* Package Image */}
                    <div className="package-image">
                      <img
                        src={pkg.image}
                        alt={`Package ${index + 1}`}
                        loading="lazy"
                      />
                    </div>

                    {/* Package Content */}
                    <div className="package-content">
                      <h3 className="package-title">{packageData.title}</h3>

                      <div className="package-features">
                        <h4 className="features-title">{t.featuresTitle}</h4>
                        <ul className="features-list">
                          {packageData.features.map((feature, featureIndex) => (
                            <li key={featureIndex}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="package-competitions">
                        <h4 className="competitions-title">
                          {t.competitionsTitle}
                        </h4>
                        <p className="competitions-text">
                          {packageData.competitions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="container">
            <div className="title text-center mb-4"></div>

            {/* نموذج التواصل وصورة الرعاة جنباً إلى جنب */}
            <div className="row mb-4 align-items-center">
              {/* نموذج التواصل */}
              <div className="col-lg-6 col-md-12 mb-4">
                <div className="contact-form-container">
                  <h3 className="contact-form-title">نسعد باستفساراتكم</h3>
                  <div className="contact-form-line"></div>

                  <form
                    className="contact-form"
                    onSubmit={handleContactSubmit}
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="form-fields">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          اسمك الكريم (مطلوب)
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-input"
                          value={contactForm.name}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                          رقم الهاتف (مطلوب)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-input"
                          value={contactForm.phone}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="subject" className="form-label">
                          الموضوع
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-input"
                          value={contactForm.subject}
                          onChange={handleContactFormChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="message" className="form-label">
                          رسالتك
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          className="form-textarea"
                          rows="3"
                          value={contactForm.message}
                          onChange={handleContactFormChange}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                    </button>
                  </form>
                </div>
              </div>

              {/* صورة الرعاة */}
              <div className="col-lg-6 col-md-12">
                <div className="sponsors-image-container">
                  <h3 className="sponsors-title">الرعاة الحاليين والسابقين</h3>
                  <div className="sponsors-line"></div>
                  <img
                    src="/99.jpg"
                    alt="الرعاة الحاليين والسابق"
                    loading="lazy"
                    className="sponsors-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="f-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-4">
                <div className="logo text-center mb-3">
                  <img
                    src="/شعار-ابيض.png"
                    alt="Al-Faisaly"
                    loading="lazy"
                    style={{ height: "50px" }}
                  />
                </div>
                <p className="text-center">{t.aboutText}</p>
              </div>

              <div className="col-xl-2 col-6 text-center">
                <div className="wr">
                  <div className="f-list">
                    <a href="#about" className="item">
                      {t.aboutUs}
                    </a>
                    <a href="#news" className="item">
                      {t.news}
                    </a>
                    <a href="#trophies" className="item">
                      {t.trophies}
                    </a>
                    <a href="#tickets" className="item">
                      {t.tickets}
                    </a>
                    <a href="#club" className="item">
                      {t.aboutClub}
                    </a>
                    <a href="#strategy" className="item">
                      {t.officialStrategy}
                    </a>
                    <a href="#audience" className="item">
                      {t.audience}
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-xl-2 col-6 text-center">
                <div className="wr">
                  <div className="f-list">
                    <a href="#store" className="item">
                      {t.clubStore}
                    </a>
                    <a href="#players" className="item">
                      {t.players}
                    </a>
                    <a href="#partner" className="item">
                      {t.partners}
                    </a>
                    <a href="#gallery" className="item">
                      {t.studio}
                    </a>
                    <a href="#blog" className="item">
                      {t.prohibitedList}
                    </a>
                    <a href="#reports" className="item">
                      {t.reports}
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 text-center">
                <div className="wr">
                  <div className="f-title mb-3">
                    <h5>{t.followUs}</h5>
                  </div>
                  <div className="icons-wr">
                    <a
                      href={t.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      href={t.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href={t.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a
                      href={t.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href={t.socialLinks.snapchat}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-snapchat"></i>
                    </a>
                    <a
                      href={t.socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-tiktok"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="f-bottom">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="copy">
                {t.copyright}
                <span>{t.officialSite}</span>
              </div>
              <div className="list">
                <a href="#privacy" className="item">
                  {t.privacyPolicy}
                </a>
                <a href="#reports" className="item">
                  {t.reports}
                </a>
              </div>
            </div>
          </div>
          <div className="orange-line"></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
