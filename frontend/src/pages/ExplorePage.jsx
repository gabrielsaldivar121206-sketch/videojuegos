import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import GameCard from '../components/GameCard';
import { featuredGames as fallbackGames } from '../data/games';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import './ExplorePage.css';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price_asc', label: 'Precio: más bajo' },
  { value: 'price_desc', label: 'Precio: más alto' },
  { value: 'discount', label: 'Mayor descuento' },
];

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';
  const platformFilter = searchParams.get('platform') || '';

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Filters
  const [priceMax, setPriceMax] = useState(100);
  const [hideFree, setHideFree] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'games'));
        if (!querySnapshot.empty) {
          setGames(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setGames(fallbackGames);
        }
      } catch {
        setGames(fallbackGames);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const getFinalPrice = (game) =>
    game.discount > 0 ? game.price * (1 - game.discount / 100) : Number(game.price || 0);

  let filteredGames = games.filter(game => {
    const titleMatch = !searchQuery || game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const priceMatch = getFinalPrice(game) <= Number(priceMax);
    const freeMatch = !hideFree || getFinalPrice(game) > 0;
    const platformMatch = !platformFilter || (game.platform && game.platform === platformFilter);
    return titleMatch && priceMatch && freeMatch && platformMatch;
  });

  if (sortBy === 'price_asc') filteredGames = [...filteredGames].sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
  else if (sortBy === 'price_desc') filteredGames = [...filteredGames].sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
  else if (sortBy === 'discount') filteredGames = [...filteredGames].sort((a, b) => (b.discount || 0) - (a.discount || 0));

  const Sidebar = () => (
    <aside className={`explore-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <h2>Filtros</h2>
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => setSearchParams({})}>
            <X size={12} /> Limpiar
          </button>
        )}
      </div>

      {/* Price */}
      <div className="filter-group">
        <div className="filter-group-header open">
          <h3>Precio</h3>
        </div>
        <div className="price-range-display">
            <span>S/ 0</span>
            <span>S/ {priceMax}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={priceMax}
          onChange={e => setPriceMax(e.target.value)}
          className="price-slider"
        />
      </div>

      {/* Date */}
      <div className="filter-group">
        <div className="filter-group-header open">
          <h3>Fecha de lanzamiento</h3>
        </div>
        <div className="date-inputs">
          <div className="date-input-wrap">
            <label>Desde</label>
            <input type="text" placeholder="2020" />
          </div>
          <div className="date-input-wrap">
            <label>Hasta</label>
            <input type="text" placeholder="2025" />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="filter-group">
        <div className="filter-group-header open">
          <h3>Preferencias</h3>
        </div>
        <label className="checkbox-label">
          <input type="checkbox" checked={hideFree} onChange={e => setHideFree(e.target.checked)} />
          <span className="checkmark"></span>
          Esconder free to play
        </label>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkmark"></span>
          Esconder agotados
        </label>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkmark"></span>
          Ocultar rumores
        </label>
      </div>

      {/* Platforms */}
      <div className="filter-group">
        <div className="filter-group-header open">
          <h3>Dispositivos</h3>
        </div>
        {['PC', 'Mac', 'Linux', 'PlayStation', 'Xbox'].map(p => (
          <label key={p} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(p)}
              onChange={() => handlePlatformToggle(p)}
            />
            <span className="checkmark"></span>
            {p}
          </label>
        ))}
      </div>
    </aside>
  );

  return (
    <div className="explore-page">
      <Sidebar />

      <main className="explore-content">
        <div className="explore-topbar">
          <span className="results-count">
            <span>{filteredGames.length}</span> resultados
            {platformFilter && <> en <em style={{ color: '#00e5ff' }}>{platformFilter}</em></>}
            {searchQuery && <> para "<em style={{ color: '#ccc' }}>{searchQuery}</em>"</>}
          </span>
          <div className="topbar-actions">
            <button className="btn-mobile-filters" onClick={() => setMobileSidebarOpen(o => !o)}>
              <SlidersHorizontal size={14} style={{ marginRight: 6 }} />
              Filtros
            </button>
            <div className="sort-dropdown">
              <span>Ordenar por:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="explore-loading">
            <p>Cargando juegos...</p>
          </div>
        ) : (
          <div className="explore-grid">
            {filteredGames.length > 0
              ? filteredGames.map(game => <GameCard key={game.id} game={game} />)
              : (
                <div className="explore-no-results">
                  <h3>No se encontraron resultados</h3>
                  <p>Prueba con otros filtros o un término de búsqueda diferente.</p>
                </div>
              )
            }
          </div>
        )}
      </main>
    </div>
  );
};

export default ExplorePage;
