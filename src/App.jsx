import React, { useState } from "react";
import "./App.css";
import { translations } from "./translations";
function App() {
  const [language, setLanguage] = useState("ar");
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
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
                <nav className="nav">
                  <a
                    className="nav-link"
                    href="http://alfaisalyfc.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.navChannel}
                  </a>
                  <a
                    className="nav-link"
                    href="https://store.alfaisalyfc.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.navStore}
                  </a>
                  <a className="nav-link" href="#tickets">
                    {t.navTickets}
                  </a>
                  <a
                    className="nav-link"
                    href="https://alfaisalyfc.net/strategy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.navStrategy}
                  </a>
                  <a
                    className="nav-link"
                    href="https://alfaisalyfc.net/complaint_and_suggestion/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.navReports}
                  </a>
                </nav>
              </div>
              <div className="col-md-2 text-center">{/* Logo removed */}</div>
              <div className="col-md-2 text-end">
                <div className="d-flex align-items-center justify-content-end">
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
              <img src="/شعار-ابيض.png" alt="Al-Faisaly Logo" />
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
                <div key={index} className="col-lg-6 col-xl-4 mb-5">
                  <div className="package-card">
                    {/* Package Image */}
                    <div className="package-image">
                      <img src={pkg.image} alt={`Package ${index + 1}`} />
                    </div>

                    {/* Package Content */}
                    <div className="package-content">
                      <h3 className="package-title">{packageData.title}</h3>

                      <div className="package-features">
                        <h4 className="features-title">المميـــزات</h4>
                        <ul className="features-list">
                          {packageData.features.map((feature, featureIndex) => (
                            <li key={featureIndex}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="package-competitions">
                        <h4 className="competitions-title">
                          المسابقــات التي يشـارك فيها الفريق والتي سيظهــر
                          شعـــار الشركــــة فيها
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

            <div className="row mb-4">
              <div className="col-12 text-center">
                <img
                  src="/99.jpg"
                  alt="الرعاة الحاليين والسابق"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "auto",
                    display: "block",
                    margin: "10px auto",
                    borderRadius: "16px",
                  }}
                />
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
                    <a href="#facebook" target="_blank">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#instagram" target="_blank">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#youtube" target="_blank">
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a href="#twitter" target="_blank">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#snapchat" target="_blank">
                      <i className="fab fa-snapchat"></i>
                    </a>
                    <a href="#tiktok" target="_blank">
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
