import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import GameCard from '../components/GameCard';
import { ChevronLeft, ChevronRight, Zap, Flame } from 'lucide-react';

const Home = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  
  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cargar juegos desde Firestore
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        const gamesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGames(gamesList);
        setFilteredGames(gamesList);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Escuchar si hay búsqueda en la URL (?q=termino)
  useEffect(() => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    if (query) {
      const results = games.filter(g => 
        g.title.toLowerCase().includes(query) || 
        (g.genre && g.genre.toLowerCase().includes(query))
      );
      setFilteredGames(results);
    } else {
      setFilteredGames(games);
    }
  }, [searchParams, games]);

  // Lógica del Slider
  const featuredGames = games.slice(0, 3); // Usar los 3 primeros como destacados

  useEffect(() => {
    if (featuredGames.length === 0 || searchParams.get('q')) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredGames.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredGames.length, searchParams]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === featuredGames.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? featuredGames.length - 1 : prev - 1));

  const isSearching = !!searchParams.get('q');

  return (
    <div className="page-container fade-in">
      {/* Ocultar el Hero Slider si se está buscando algo */}
      {!isSearching && featuredGames.length > 0 && (
        <header className="hero-slider">
          {featuredGames.map((game, index) => (
            <div 
              key={game.id} 
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(to right, rgba(10, 10, 14, 0.95) 10%, rgba(10, 10, 14, 0.3)), url(${game.image})` }}
            >
              <div className="hero-content slider-content">
                <div className="featured-badge"><Flame size={16}/> Destacado</div>
                <h2 className="glitch" data-text={game.title}>{game.title}</h2>
                <p>{game.description}</p>
                <div className="slider-actions">
                   <button className="btn-primary pulse-btn" onClick={() => window.location.href=`/game/${game.id}`}>
                     Ver Detalles
                   </button>
                   <span className="slider-price">${game.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
          
          <button className="slider-arrow left" onClick={prevSlide}><ChevronLeft size={40}/></button>
          <button className="slider-arrow right" onClick={nextSlide}><ChevronRight size={40}/></button>
          
          <div className="slider-dots">
            {featuredGames.map((_, idx) => (
              <span key={idx} className={`dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)}></span>
            ))}
          </div>
        </header>
      )}

      {/* Banner de Promociones (Solo si no busca) */}
      {!isSearching && (
        <div className="promo-banner-container">
          <div className="promo-banner">
            <div className="promo-info">
              <h3><Zap size={28} className="text-neon" /> OFERTAS CYBER WEEK</h3>
              <p>Consigue hasta un <strong>60% de descuento</strong> en títulos seleccionados usando el código: <span>CYBER60</span></p>
            </div>
            <button className="btn-secondary glow-hover">Reclamar Ahora</button>
          </div>
        </div>
      )}

      {/* Catálogo de Juegos */}
      <section className="catalog">
        <div className="section-header">
          <h3 className="section-title">
            {isSearching ? `Resultados para "${searchParams.get('q')}"` : 'Tendencias Actuales'}
          </h3>
        </div>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="loader-ring"></div>
            <p>Sincronizando con la bóveda...</p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron juegos en la bóveda que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="game-grid">
            {(isSearching ? filteredGames : filteredGames.slice(0, 8)).map((game, index) => (
              <div key={game.id} style={{animationDelay: `${index * 0.1}s`}} className="fade-up">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
