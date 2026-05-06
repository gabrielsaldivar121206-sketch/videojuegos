import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { cleanGameImage } from '../data/games';
import GameCard from './GameCard';
import { ChevronRight } from 'lucide-react';
import './TopIndieBanner.css';

const TopIndieBanner = ({ customGames }) => {
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
        const querySnapshot = await getDocs(collection(db, "games"));
        const gamesList = querySnapshot.docs.map(doc => cleanGameImage({
          id: doc.id,
          ...doc.data()
        }));
        
        // Filter for Nintendo games
        const indies = gamesList.filter(g => g.platform === 'Nintendo').slice(0, 4);
        setGames(indies.length > 0 ? indies : gamesList.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener juegos indie:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, [customGames]);

  if (loading || games.length === 0) return null;

  return (
    <section className="top-indie-section container">
      <div className="indie-layout">
        <div className="indie-left">
          <img 
            src="https://cdn.akamai.steamstatic.com/steam/apps/588650/library_600x900_2x.jpg" 
            alt="Dead Cells Hero" 
            className="indie-hero-img"
          />
        </div>
        <div className="indie-right">
          <div className="indie-header">
            <h2 className="indie-title flex items-center">
              Top juegos indie <ChevronRight size={20} className="indie-arrow-icon" />
            </h2>
          </div>
          <div className="indie-grid">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopIndieBanner;
