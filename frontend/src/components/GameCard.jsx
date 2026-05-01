import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ game }) => {
  const safePrice = Number(game.price || 0).toFixed(2);
  
  // Simular un descuento si no lo tiene explícito, para que se vea como en la foto
  const discount = game.discount || Math.floor(Math.random() * 40) + 10; 

  const isDlc = game.title?.toLowerCase().includes('dlc') || game.title?.toLowerCase().includes('expansion');

  return (
    <Link to={`/game/${game.id}`} className="game-card-ig">
      <div className="game-image-container-ig">
        <img src={game.image || 'https://via.placeholder.com/300x150'} alt={game.title} className="game-image-ig" />
        <div className="discount-badge-ig">-{discount}%</div>
      </div>
      <div className="game-info-ig">
        <div className="game-title-ig-card">
          {isDlc && <span className="dlc-badge-ig">DLC</span>}
          {game.title || 'Juego Desconocido'} - PC (Steam)
        </div>
        <div className="game-price-ig-card">{safePrice} €</div>
      </div>
    </Link>
  );
};

export default GameCard;
