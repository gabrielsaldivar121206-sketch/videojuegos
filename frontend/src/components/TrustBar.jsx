import React from 'react';
import { Download, Shield, MessageCircle, Star } from 'lucide-react';
import './TrustBar.css';

const TrustBar = () => {
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner">

        <div className="trust-item">
          <Download size={28} className="trust-icon" />
          <div className="trust-text">
            <span className="trust-title">Súper rápido</span>
            <span className="trust-sub">Descarga digital instantánea</span>
          </div>
        </div>

        <div className="trust-divider" />

        <div className="trust-item">
          <Shield size={28} className="trust-icon" />
          <div className="trust-text">
            <span className="trust-title">Fiable y seguro</span>
            <span className="trust-sub">Más de 20,000 juegos</span>
          </div>
        </div>

        <div className="trust-divider" />

        <div className="trust-item">
          <MessageCircle size={28} className="trust-icon" />
          <div className="trust-text">
            <span className="trust-title">Atención al cliente</span>
            <span className="trust-sub">Agente disponible 24/7</span>
          </div>
        </div>

        <div className="trust-divider" />

        {/* Trustpilot section */}
        <div className="trust-item trustpilot-item">
          <div className="trustpilot-logo">
            <span className="tp-star-icon">★</span>
            <span className="tp-name">Trustpilot</span>
          </div>
          <div className="tp-stars">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={18} fill={i <= 4 ? '#00b67a' : 'none'} color={i <= 4 ? '#00b67a' : '#888'} />
            ))}
          </div>
          <span className="tp-score">TrustScore <strong>4.7</strong> · <a href="#" className="tp-reviews">916,577 opiniones</a></span>
        </div>

      </div>
    </div>
  );
};

export default TrustBar;
