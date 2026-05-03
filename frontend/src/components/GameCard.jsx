import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ game, isReserva }) => {
  const safePrice = Number(game.price || 0).toFixed(2);
  
  // Simular un descuento si no lo tiene explícito, para que se vea como en la foto
  const discount = game.discount || Math.floor(Math.random() * 40) + 10; 

  const isDlc = game.title?.toLowerCase().includes('dlc') || game.title?.toLowerCase().includes('expansion');
  
  // Simular días restantes para la reserva
  const daysLeft = Math.floor(Math.random() * 20) + 2;

  return (
    <Link to={`/game/${game.id}`} className="game-card-ig">
      <div className="game-image-container-ig">
        <img src={game.image || 'https://via.placeholder.com/300x150'} alt={game.title} className="game-image-ig" />
        <div className="discount-badge-ig">-{discount}%</div>
      </div>
      <div className="game-info-ig">
        <div className="game-title-ig-card">
          {isDlc && <span className="dlc-badge-ig">DLC</span>}
          {game.title || 'Juego Desconocido'}
        </div>
        <div className="game-price-ig-card">{safePrice} €</div>
      </div>
      {isReserva && (
        <div className="reserva-row-ig">
          <span className="reserva-tag-ig">RESERVA</span>
          <span className="reserva-days-ig">En {daysLeft} dias</span>
        </div>
      )}
    </Link>
  );
};

export default GameCard;
