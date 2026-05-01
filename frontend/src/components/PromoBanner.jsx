import React from 'react';
import { Tag } from 'lucide-react';
import './PromoBanner.css';

const PromoBanner = () => {
  return (
    <section className="promo-banner my-6">
      <div className="promo-bg">
        <img 
          src="https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg" 
          alt="Promoción Especial Starfield" 
        />
        <div className="promo-overlay"></div>
      </div>
      
      <div className="container promo-content text-center">
        <div className="promo-badge inline-flex items-center gap-1 mb-2">
          <Tag size={16} />
          <span>Oferta de Lanzamiento</span>
        </div>
        <h2 className="promo-title">STARFIELD</h2>
        <p className="promo-desc">
          El primer universo nuevo de Bethesda Game Studios en más de 25 años. Explora el espacio con un 20% de descuento esta semana.
        </p>
        <div className="countdown flex justify-center gap-4 mt-4">
          <div className="time-box">
            <span className="time-num">03</span>
            <span className="time-label">Días</span>
          </div>
          <div className="time-box">
            <span className="time-num">14</span>
            <span className="time-label">Horas</span>
          </div>
          <div className="time-box">
            <span className="time-num">45</span>
            <span className="time-label">Min</span>
          </div>
        </div>
        <button className="add-cart-btn-ig-exact mt-6" style={{ padding: '14px 40px', fontSize: '1rem', width: 'fit-content', margin: '1.5rem auto 0' }}>VER TODAS LAS OFERTAS</button>
      </div>
    </section>
  );
};

export default PromoBanner;
