import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaTwitch, FaTiktok, FaDiscord, FaAppStore, FaGooglePlay, FaChrome } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-ig">
      <div className="container footer-content-ig">
        {/* Left Column - Trustpilot */}
        <div className="footer-trustpilot-ig">
          <div className="trustpilot-logo">
            <span className="star-icon">★</span> Trustpilot
          </div>
          <div className="trustpilot-stars">
            <span className="star-box">★</span>
            <span className="star-box">★</span>
            <span className="star-box">★</span>
            <span className="star-box">★</span>
            <span className="star-box half">★</span>
          </div>
          <p className="trustpilot-score">TrustScore 4.7 <span className="underline">816,726 opiniones</span></p>
        </div>

        {/* Center Column - Links */}
        <div className="footer-links-ig">
          <a href="#">Términos y condiciones</a>
          <a href="#">Política de privacidad</a>
          <a href="#">Programa de afiliación</a>
          <a href="#">Contacto</a>
          <a href="#" className="flex items-center gap-2 mt-2"><span className="icon-discord"></span> Nuestro Servidor y Bot de Discord</a>
          <a href="#" className="flex items-center gap-2"><span className="icon-gift"></span> Canjear una tarjeta regalo</a>
          <a href="#" className="flex items-center gap-2"><span className="icon-blog"></span> Blog</a>
          <a href="#" className="flex items-center gap-2"><span className="icon-news"></span> Noticias de videojuegos, para PC y consolas</a>
        </div>

        {/* Right Column - Community & Apps */}
        <div className="footer-community-ig">
          <h4>Únete a nuestra comunidad</h4>
           <div className="social-icons-ig">
             <a href="#" className="social-btn discord"><FaDiscord size={24} /></a>
             <a href="#" className="social-btn twitter"><FaTwitter size={24} /></a>
             <a href="#" className="social-btn instagram"><FaInstagram size={24} /></a>
             <a href="#" className="social-btn facebook"><FaFacebookF size={24} /></a>
             <a href="#" className="social-btn youtube"><FaYoutube size={24} /></a>
             <a href="#" className="social-btn twitch"><FaTwitch size={24} /></a>
             <a href="#" className="social-btn tiktok"><FaTiktok size={24} /></a>
           </div>

           <div className="app-store-btns">
             <a href="#" className="store-btn">
               <FaAppStore size={24} />
               <div className="store-text">
                 <small>Available on the</small>
                 <strong>App Store</strong>
               </div>
             </a>
             <a href="#" className="store-btn">
               <FaGooglePlay size={24} />
               <div className="store-text">
                 <small>GET IT ON</small>
                 <strong>Google Play</strong>
               </div>
             </a>
             <a href="#" className="store-btn">
               <FaChrome size={24} />
               <div className="store-text">
                 <small>Chrome</small>
                 <strong>Extension</strong>
               </div>
             </a>
           </div>
        </div>
      </div>
      
      <div className="footer-bottom-ig">
        <div className="container bottom-content-ig">
          <p>Copyright © {new Date().getFullYear()} Vento Gaming - All rights reserved</p>
          <div className="footer-settings-ig">
            <button className="settings-btn"><span>◎</span> Perú</button>
            <button className="settings-btn"><span>A文</span> Español</button>
             <button className="settings-btn"><span>S/</span> PEN</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
