import React from 'react';
import './BigReviewBanner.css';

const BigReviewBanner = () => {
  return (
    <section className="big-review-banner">
      <div className="review-banner-top">
        <div className="container banner-flex">
          <div className="banner-guy-img">
            {/* Using a generic gamer image placeholder to simulate the layout */}
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Jugador Profesional" 
            />
          </div>
          <div className="banner-content">
            <div className="banner-stars">
              <span className="star-icon">★</span>
              <span className="star-icon">★</span>
              <span className="star-icon">★</span>
              <span className="star-icon">★</span>
              <span className="star-icon">★</span>
            </div>
            <p className="banner-text">
              Vento Gaming es una plataforma increíble para comprar tus juegos de PC, PlayStation, Xbox y Switch más baratos.<br/>
              ¡Con entrega inmediata 24/7, juega al instante al precio más bajo!
            </p>
            <button className="btn-review-cyan">1,576,479 reseñas de usuarios</button>
          </div>
        </div>
      </div>
      
      <div className="container review-cards-container">
        <div className="review-card-ig">
          <div className="rc-header">
            <div className="rc-avatar"><img src="https://i.pravatar.cc/100?img=11" alt="Avatar"/></div>
            <div className="rc-info">
              <div className="rc-stars">★★★★★</div>
              <div className="rc-game">Cyberpunk 2077</div>
            </div>
          </div>
          <p className="rc-text">¡Perfecto como siempre!</p>
          <span className="rc-time">hace 8 horas</span>
        </div>

        <div className="review-card-ig">
          <div className="rc-header">
            <div className="rc-avatar"><img src="https://i.pravatar.cc/100?img=12" alt="Avatar"/></div>
            <div className="rc-info">
              <div className="rc-stars">★★★★★</div>
              <div className="rc-game">Tarjeta de regalo Xbox</div>
            </div>
          </div>
          <p className="rc-text">Rápido y fácil como siempre, muy confiable.</p>
          <span className="rc-time">hace 11 horas</span>
        </div>

        <div className="review-card-ig">
          <div className="rc-header">
            <div className="rc-avatar"><img src="https://i.pravatar.cc/100?img=33" alt="Avatar"/></div>
            <div className="rc-info">
              <div className="rc-stars">★★★★★</div>
              <div className="rc-game">The Witcher 3: Wild Hunt</div>
            </div>
          </div>
          <p className="rc-text">Perfecto.</p>
          <span className="rc-time">ayer</span>
        </div>

        <div className="review-card-ig">
          <div className="rc-header">
            <div className="rc-avatar"><img src="https://i.pravatar.cc/100?img=44" alt="Avatar"/></div>
            <div className="rc-info">
              <div className="rc-stars">★★★★★</div>
              <div className="rc-game">Valorant 50 EUR</div>
            </div>
          </div>
          <p className="rc-text">Todo perfecto, código al instante.</p>
          <span className="rc-time">ayer</span>
        </div>
      </div>
    </section>
  );
};

export default BigReviewBanner;
