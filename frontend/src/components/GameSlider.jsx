import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import GameCard from './GameCard';
import { ChevronRight } from 'lucide-react';
import './GameSlider.css';

const GameSlider = ({ title, startIndex = 0, endIndex = 3 }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        const gamesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Solo tomar un slice para simular diferentes categorías
        setGames(gamesList.slice(startIndex, endIndex));
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, [startIndex, endIndex]);

  if (loading || games.length === 0) return null;

  return (
    <section className="game-slider-section container">
      <div className="slider-header">
        <h2 className="slider-title flex items-center">
          {title} <ChevronRight size={20} className="slider-arrow-icon" />
        </h2>
      </div>
      
      <div className="slider-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} isReserva={title.toLowerCase() === 'reservas'} />
        ))}
      </div>
    </section>
  );
};

export default GameSlider;
