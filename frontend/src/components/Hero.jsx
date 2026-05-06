import React from 'react';
import { useNavigate } from 'react-router-dom';
import { heroGame } from '../data/games';
import './Hero.css';

const PLATFORM_LABELS = {
  PlayStation: 'PlayStation Exclusive',
  Xbox: 'Xbox & PC',
  Nintendo: 'Nintendo Switch',
  PC: 'PC / Steam',
};

const Hero = () => {
  const navigate = useNavigate();

  const finalPrice = heroGame.discount > 0
    ? (heroGame.price * (1 - heroGame.discount / 100)).toFixed(2)
    : heroGame.price.toFixed(2);

  const handleHeroClick = () => {
    if (heroGame.id) navigate(`/game/${heroGame.id}`);
  };

  return (
    <section className="hero hero-clickable" id="store" onClick={handleHeroClick}>
      <div className="hero-bg">
        <img src={heroGame.image} alt={heroGame.title} />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-platform-tag">
            {PLATFORM_LABELS[heroGame.platform] || heroGame.platform}
          </span>
          <h1 className="hero-title">{heroGame.title}</h1>
          <p className="hero-desc">
            {heroGame.categories?.join(' · ')}
          </p>
          <div className="hero-price-row flex items-center gap-2">
            {heroGame.discount > 0 && (
              <>
                <span className="hero-original-price">S/ {heroGame.price.toFixed(2)}</span>
                <span className="hero-discount">-{heroGame.discount}%</span>
              </>
            )}
            <span className="hero-price">S/ {finalPrice}</span>
          </div>
          <span className="hero-cta-hint">Ver juego →</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
