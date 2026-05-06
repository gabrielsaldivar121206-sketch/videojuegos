import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { cleanGameImage } from '../data/games';
import GameCard from './GameCard';
import { ChevronRight } from 'lucide-react';
import './GameSlider.css';

const GameSlider = ({ title, startIndex = 0, endIndex = 10, customGames }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customGames) {
      setGames(customGames);
      setLoading(false);
      return;
    }

    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'games'));
        let gamesList = querySnapshot.docs.map(doc => cleanGameImage({
          id: doc.id,
          ...doc.data()
        }));

        const t = title.toLowerCase();
        if (t === 'reservas') {
          // Mix of platforms — pick upcoming / new
          gamesList = gamesList.filter(g => g.isNew).slice(0, 10);
          if (gamesList.length < 3) {
            gamesList = querySnapshot.docs.map(doc => cleanGameImage({ id: doc.id, ...doc.data() })).slice(0, 10);
          }
        } else if (t === 'te recomendamos') {
          gamesList = gamesList.filter(g => g.platform === 'PlayStation' || g.platform === 'Xbox').slice(0, 10);
        } else if (t === 'más vendidos') {
          // Show across all platforms — sorted by discount
          gamesList = gamesList.sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, 10);
        } else {
          gamesList = gamesList.slice(startIndex, endIndex);
        }

        setGames(gamesList);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los juegos:', error);
        setLoading(false);
      }
    };

    fetchGames();
  }, [startIndex, endIndex, customGames, title]);

  if (loading || games.length === 0) return null;

  return (
    <section className="game-slider-section container">
      <div className="slider-header">
        <h2 className="slider-title flex items-center">
          {title} <ChevronRight size={20} className="slider-arrow-icon" />
        </h2>
      </div>

      <div className="slider-scroll-row">
        {games.map(game => (
          <div className="slider-card-wrapper" key={game.id}>
            <GameCard game={game} isReserva={title.toLowerCase() === 'reservas'} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameSlider;
