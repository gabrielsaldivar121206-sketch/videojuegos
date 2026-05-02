import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { featuredGames, PLATFORM_COLORS } from '../data/games';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import './PlatformPage.css';

const PLATFORM_META = {
  PC: {
    subtitle: 'Descubre los mejores juegos de PC, DLC\'s, reservas y superventas en oferta especial',
    subCategories: ['Steam', 'EA App', 'Rockstar', 'Epic Games', 'GOG', 'Battle.net', 'Microsoft Store', 'Ubisoft Connect'],
    filters: ['Tendencias', 'Más vendidos', 'Reservas', 'Tarjetas regalo', 'Suscripciones'],
  },
  PlayStation: {
    subtitle: 'Los mejores juegos de PlayStation 4 y 5 al mejor precio garantizado',
    subCategories: ['PS5', 'PS4', 'PS Plus', 'PSN'],
    filters: ['Tendencias', 'Más vendidos', 'Novedades', 'Exclusivos'],
  },
  Xbox: {
    subtitle: 'Juegos para Xbox Series X|S y Xbox One con los mejores descuentos',
    subCategories: ['Xbox Series X|S', 'Xbox One', 'Game Pass', 'Microsoft Store'],
    filters: ['Tendencias', 'Más vendidos', 'Game Pass', 'Exclusivos'],
  },
  Nintendo: {
    subtitle: 'Los mejores juegos de Nintendo Switch, DLC\'s y tarjetas eShop',
    subCategories: ['Nintendo Switch', 'eShop', 'Nintendo Online'],
    filters: ['Tendencias', 'Más vendidos', 'Novedades', 'Exclusivos'],
  },
};

const PlatformPage = () => {
  const { platform } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeSubCat, setActiveSubCat] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');

  const meta = PLATFORM_META[platform] || PLATFORM_META['PC'];
  const colors = PLATFORM_COLORS[platform] || PLATFORM_COLORS['PC'];

  // Always use local data (Firestore games don't have platform field)
  const allGames = featuredGames.filter(g => g.platform === platform);

  const heroGame = allGames[0];

  const getFinalPrice = (g) =>
    g.discount > 0 ? (g.price * (1 - g.discount / 100)) : g.price;

  let games = [...allGames];
  if (sortBy === 'price_asc') games.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
  else if (sortBy === 'price_desc') games.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
  else if (sortBy === 'discount') games.sort((a, b) => (b.discount || 0) - (a.discount || 0));

  return (
    <div className="platform-page">

      {/* HERO HEADER */}
      <div className="pp-header">
        <div className="container">
          <h1 className="pp-title" style={{ color: colors.bg }}>{platform}</h1>
          <p className="pp-subtitle">{meta.subtitle}</p>

          {/* Sub-category tabs */}
          <div className="pp-subcats">
            {meta.subCategories.map(cat => (
              <button
                key={cat}
                className={`pp-subcat-btn ${activeSubCat === cat ? 'active' : ''}`}
                onClick={() => setActiveSubCat(activeSubCat === cat ? null : cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary filters */}
          <div className="pp-filters">
            {meta.filters.map(f => (
              <button
                key={f}
                className={`pp-filter-btn ${activeFilter === f ? 'active' : ''}`}
                style={activeFilter === f ? { color: colors.bg } : {}}
                onClick={() => setActiveFilter(activeFilter === f ? null : f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container pp-body">
        {/* BREADCRUMB */}
        <div className="pp-breadcrumb">
          <Link to="/">Inicio</Link>
          <ChevronRight size={14} />
          <span style={{ color: colors.bg }}>{platform}</span>
        </div>

        {/* HERO BANNER - Featured game */}
        {heroGame && (
          <div
            className="pp-hero-banner"
            onClick={() => navigate(`/game/${heroGame.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={heroGame.image} alt={heroGame.title} className="pp-hero-img" />
            <div className="pp-hero-overlay">
              <div className="pp-hero-info">
                <h2 className="pp-hero-title">{heroGame.title}</h2>
                <div className="pp-hero-price-row">
                  {heroGame.discount > 0 && (
                    <span className="pp-hero-discount">-{heroGame.discount}%</span>
                  )}
                  <span className="pp-hero-price">
                    {getFinalPrice(heroGame).toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GAME GRID SECTION */}
        <div className="pp-section">
          <div className="pp-section-header">
            <h2 className="pp-section-title">
              Tendencias <ChevronRight size={18} />
            </h2>
            <div className="pp-sort">
              <span>Ordenar:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="relevance">Relevancia</option>
                <option value="price_asc">Precio: menor</option>
                <option value="price_desc">Precio: mayor</option>
                <option value="discount">Mayor descuento</option>
              </select>
            </div>
          </div>

          {games.length === 0 ? (
            <div className="pp-empty">
              <p>No hay juegos disponibles para <strong>{platform}</strong> aún.</p>
              <button onClick={() => navigate('/explore')} className="pp-btn-explore">
                Ver todos los juegos
              </button>
            </div>
          ) : (
            <div className="pp-game-grid">
              {games.map(game => {
                const finalPrice = getFinalPrice(game).toFixed(2);
                return (
                  <div
                    key={game.id}
                    className="pp-game-card"
                    onClick={() => navigate(`/game/${game.id}`)}
                  >
                    <div className="pp-game-img-wrap">
                      <img src={game.image} alt={game.title} className="pp-game-img" />
                      {game.discount > 0 && (
                        <span className="pp-discount-badge">-{game.discount}%</span>
                      )}
                      <button
                        className="pp-add-cart-btn"
                        onClick={e => { e.stopPropagation(); addToCart(game); }}
                        title="Añadir al carrito"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                    <div className="pp-game-info">
                      <p className="pp-game-title">
                        {game.title} · {platform}
                      </p>
                      <p className="pp-game-price">{finalPrice} €</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformPage;
