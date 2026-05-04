import React from 'react';
import { useNavigate } from 'react-router-dom';
import { heroGame } from '../data/games';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleHeroClick = () => {
    if (heroGame.id) navigate(`/game/${heroGame.id}`);
  };

  return (
    <section className="hero hero-clickable" id="store" onClick={handleHeroClick}>
      <div className="hero-bg">
        <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3357650/341da3fa5338fad44ae87b2d14edfe6be80ff4c3/capsule_616x353.jpg?t=1777351016" alt={heroGame.title} />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-text">
          <h1 className="hero-title">{heroGame.title}</h1>
          <div className="hero-price-row flex items-center gap-2">
            <span className="hero-discount">-{heroGame.discount}%</span>
            <span className="hero-price">S/ {heroGame.price.toFixed(2)}</span>
          </div>
          <span className="hero-cta-hint">Haz clic para ver el juego →</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
