import React from 'react';
import { heroGame } from '../data/games';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="store">
      <div className="hero-bg">
        <img src={heroGame.image} alt={heroGame.title} />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-text">
          <h1 className="hero-title">{heroGame.title}</h1>
          <div className="hero-price-row flex items-center gap-2">
            <span className="hero-discount">-{heroGame.discount}%</span>
            <span className="hero-price">{heroGame.price.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
