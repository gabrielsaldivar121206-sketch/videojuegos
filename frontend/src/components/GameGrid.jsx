import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import GameCard from './GameCard';
import { featuredGames as fallbackGames } from '../data/games';
import './GameGrid.css';

const CATEGORIES = ["Todos", "Action", "RPG", "Sci-Fi", "Strategy", "Racing", "Horror"];

const GameGrid = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        if (!querySnapshot.empty) {
          const gamesList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setGames(gamesList);
        } else {
          setGames(fallbackGames);
        }
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
        setGames(fallbackGames);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const filteredGames = games.filter(game => {
    const matchesCategory = activeFilter === "Todos" || (game.categories && game.categories.includes(activeFilter)) || (game.genre && game.genre === activeFilter);
    const matchesSearch = searchQuery === '' || 
      game.title?.toLowerCase().includes(searchQuery) || 
      game.genre?.toLowerCase().includes(searchQuery) ||
      (game.categories && game.categories.some(c => c.toLowerCase().includes(searchQuery)));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="game-grid-section container py-section" id="featured" style={{ paddingTop: '80px' }}>
      <div className="section-header" style={{ marginBottom: '20px' }}>
        <h2 className="section-title flex items-center" style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '1.35rem', fontWeight: '400', letterSpacing: '0.2px', textTransform: 'none' }}>
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Tendencias'} 
          <span style={{ color: '#555', marginLeft: '8px', fontSize: '1.2rem', fontWeight: '300' }}>&gt;</span>
        </h2>
      </div>
      
      {!searchQuery && (
        <div className="filters-container flex gap-2 mb-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-section" style={{ gridColumn: '1 / -1' }}>
          <p>Cargando juegos...</p>
        </div>
      ) : (
        <div className="grid-container">
          {(searchQuery ? filteredGames : filteredGames.slice(0, 8)).map(game => (
            <GameCard key={game.id} game={game} />
          ))}
          {filteredGames.length === 0 && (
            <div className="no-results text-center py-section" style={{ gridColumn: '1 / -1' }}>
              <p>No se encontraron juegos que coincidan con la búsqueda o categoría.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default GameGrid;
