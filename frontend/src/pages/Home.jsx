import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { cleanGameImage } from '../data/games';
import GameCard from '../components/GameCard';
import { ChevronLeft, ChevronRight, Zap, Flame } from 'lucide-react';
import Hero from '../components/Hero';

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
        const gamesList = querySnapshot.docs.map(doc => cleanGameImage({
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
       {!isSearching && (
         <Hero />
       )}
    </div>
  );
};

export default Home;
