import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  featuredGames, giftCards, upcomingGames,
  gameCategories, PLATFORM_COLORS, cleanGameImage
} from '../data/games';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ShoppingCart, ChevronRight, Gift, Star, Zap, Clock, Tag } from 'lucide-react';
import './PlatformPage.css';

const PLATFORM_META = {
  PC: {
    subtitle: "Descubre los mejores juegos de PC, DLC's, reservas y superventas en oferta especial",
    subCategories: ['Steam', 'EA App', 'Rockstar', 'Epic Games', 'GOG', 'Battle.net', 'Ubisoft Connect'],
    giftCardTitle: 'Tarjetas regalo de PC',
    giftCardDesc: 'Nuestras tarjetas regalo de Steam, FC Points, Valorant Points, Roblox y muchas más',
    subscriptionTitle: 'Suscripciones PC',
    subscriptionDesc: 'Ofertas en suscripciones para PC. Xbox Game Pass, EA Pro y muchas más.',
    // Cyberpunk 2077 — icónico de PC gaming
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/library_hero.jpg',
    accentColor: '#00e5ff',
  },
  PlayStation: {
    subtitle: 'Los mejores juegos de PlayStation 4 y 5 al mejor precio garantizado',
    subCategories: ['PS5', 'PS4', 'PS Plus', 'PSN', 'Exclusivos'],
    giftCardTitle: 'Tarjetas regalo PlayStation',
    giftCardDesc: 'Tarjetas PSN, PS Plus Essential, Extra y Deluxe al mejor precio',
    subscriptionTitle: 'Suscripciones PlayStation',
    subscriptionDesc: 'PS Plus Essential, Extra y Deluxe con los mejores descuentos.',
    // God of War Ragnarök — buque insignia de PlayStation
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/2322010/library_hero.jpg',
    accentColor: '#006FCD',
  },
  Xbox: {
    subtitle: 'Juegos para Xbox Series X|S y Xbox One con los mejores descuentos',
    subCategories: ['Xbox Series X|S', 'Xbox One', 'Game Pass', 'Microsoft Store'],
    giftCardTitle: 'Tarjetas regalo Xbox',
    giftCardDesc: 'Xbox Gift Cards, Game Pass Ultimate y más al mejor precio',
    subscriptionTitle: 'Suscripciones Xbox',
    subscriptionDesc: 'Game Pass Ultimate, PC Game Pass y Xbox Live Gold.',
    // Halo Infinite — símbolo de Xbox
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/library_hero.jpg',
    accentColor: '#107C10',
  },
  Nintendo: {
    subtitle: "Los mejores juegos de Nintendo Switch, DLC's y tarjetas eShop",
    subCategories: ['Nintendo Switch', 'eShop', 'Nintendo Online', 'Exclusivos'],
    giftCardTitle: 'Tarjetas eShop Nintendo',
    giftCardDesc: 'Tarjetas Nintendo eShop y suscripciones Nintendo Online al mejor precio',
    subscriptionTitle: 'Suscripciones Nintendo',
    subscriptionDesc: 'Nintendo Switch Online Individual y Familiar al mejor precio.',
    // Mario Kart 8 Deluxe — bannner horizontal oficial de Nintendo
    banner: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/m/mario-kart-8-deluxe-switch/hero',
    accentColor: '#E4000F',
  },
};

/* ─ Small reusable card (horizontal, gift-card style) ─ */
const SmallCard = ({ game, onClick, addToCart }) => {
  const finalPrice = game.discount > 0
    ? (game.price * (1 - game.discount / 100)).toFixed(2)
    : Number(game.price).toFixed(2);
  return (
    <div className="pp-small-card" onClick={onClick}>
      <div className="pp-small-card-img-wrap">
        <img src={game.image} alt={game.title} />
        {game.discount > 0 && (
          <span className="pp-small-discount">-{game.discount}%</span>
        )}
      </div>
      <div className="pp-small-card-info">
        <p className="pp-small-card-title">{game.title}</p>
        <p className="pp-small-card-price">S/ {finalPrice}</p>
      </div>
      <button
        className="pp-small-cart-btn"
        onClick={e => { e.stopPropagation(); addToCart(game); }}
        title="Añadir al carrito"
      >
        <ShoppingCart size={14} />
      </button>
    </div>
  );
};

/* ─ Main game card (vertical, grid style) ─ */
const GameCard = ({ game, onClick, addToCart }) => {
  const finalPrice = game.discount > 0
    ? (game.price * (1 - game.discount / 100)).toFixed(2)
    : Number(game.price).toFixed(2);
  return (
    <div className="pp-game-card" onClick={onClick}>
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
        <p className="pp-game-title">{game.title}</p>
        <p className="pp-game-price">S/ {finalPrice}</p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════ PAGE ══════════════════════════════════ */
const PlatformPage = () => {
  const { platform } = useParams();
  const navigate     = useNavigate();
  const { addToCart } = useCart();
  const [activeSubCat, setActiveSubCat] = useState(null);
  const [sortBy, setSortBy]             = useState('relevance');
  const [allGames, setAllGames]         = useState([]);
  const [loadingGames, setLoadingGames] = useState(true);

  const meta   = PLATFORM_META[platform] || PLATFORM_META['PC'];
  const colors = PLATFORM_COLORS[platform] || PLATFORM_COLORS['PC'];

  // Fetch from Firebase, fallback to local data
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'games'));
        if (!querySnapshot.empty) {
          const all = querySnapshot.docs.map(doc => cleanGameImage({ id: doc.id, ...doc.data() }));
          setAllGames(all.filter(g => g.platform === platform));
        } else {
          setAllGames(featuredGames.filter(g => g.platform === platform));
        }
      } catch {
        setAllGames(featuredGames.filter(g => g.platform === platform));
      } finally {
        setLoadingGames(false);
      }
    };
    fetchGames();
  }, [platform]);

  const cards    = giftCards[platform]    || [];
  const upcoming = upcomingGames[platform] || [];

  const heroGame = allGames[0];

  const getFinalPrice = g => g.discount > 0 ? g.price * (1 - g.discount / 100) : g.price;

  let games = [...allGames];
  if (sortBy === 'price_asc')  games.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
  else if (sortBy === 'price_desc') games.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
  else if (sortBy === 'discount')   games.sort((a, b) => (b.discount || 0) - (a.discount || 0));

  // Show max 10 games (2 rows of 5) in the platform best sellers section
  const bestSellers = [...games].sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, 10);
  const recentGames = games.filter(g => g.isNew).length > 0 ? games.filter(g => g.isNew) : games.slice(0, 6);

  return (
    <div className="platform-page">

      {/* ══ HEADER BANNER ══ */}
      <div className="pp-header">
        <img src={meta.banner} alt={platform} className="pp-header-bg" />
        {/* Overlay degradado neutro — sin colores de plataforma */}
        <div
          className="pp-header-overlay"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(11,12,16,0.15) 0%,
              rgba(11,12,16,0.50) 50%,
              rgba(11,12,16,0.95) 85%,
              #0b0c10 100%
            )`,
          }}
        />

        <div className="container pp-header-content">
          <h1 className="pp-title">{platform}</h1>
          <p className="pp-subtitle">{meta.subtitle}</p>

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
        </div>
      </div>


      <div className="container pp-body">
        {/* Breadcrumb */}
        <div className="pp-breadcrumb">
          <Link to="/">Inicio</Link>
          <ChevronRight size={14} />
          <span>{platform}</span>
        </div>

        {/* ══ HERO BANNER ══ */}
        {heroGame && (
          <div
            className="pp-hero-banner"
            onClick={() => navigate(`/game/${heroGame.id}`)}
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
                    S/ {getFinalPrice(heroGame).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ SECTION 1: TARJETAS REGALO ══ */}
        <section className="pp-section">
          <div className="pp-section-header">
            <h2 className="pp-section-title">
              <Gift size={20} className="pp-section-icon" />
              {meta.giftCardTitle}
            </h2>
            <button className="pp-see-all-btn">
              Ver todas las tarjetas regalo <ChevronRight size={15} />
            </button>
          </div>
          <p className="pp-section-desc">{meta.giftCardDesc}</p>
          <div className="pp-small-grid">
            {cards.map(card => (
              <SmallCard
                key={card.id}
                game={card}
                onClick={() => {}}
                addToCart={() => addToCart(card)}
              />
            ))}
          </div>
        </section>

        {/* ══ SECTION 2: MÁS VENDIDOS ══ */}
        <section className="pp-section">
          <div className="pp-section-header">
            <h2 className="pp-section-title">
              <Star size={20} className="pp-section-icon" />
              Más vendidos <ChevronRight size={18} />
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
              {bestSellers.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() => navigate(`/game/${game.id}`)}
                  addToCart={addToCart}
                />
              ))}
            </div>
          )}
        </section>

        {/* ══ SECTION 3: SUSCRIPCIONES ══ */}
        <section className="pp-section">
          <div className="pp-section-header">
            <h2 className="pp-section-title">
              <Zap size={20} className="pp-section-icon" />
              {meta.subscriptionTitle}
            </h2>
            <button className="pp-see-all-btn">
              Ver todas las suscripciones <ChevronRight size={15} />
            </button>
          </div>
          <p className="pp-section-desc">{meta.subscriptionDesc}</p>
          <div className="pp-sub-grid">
            {cards.map(card => (
              <div
                key={`sub-${card.id}`}
                className="pp-sub-card"
                onClick={() => {}}
              >
                <img src={card.image} alt={card.title} className="pp-sub-img" />
                <div className="pp-sub-info">
                  <p className="pp-sub-title">{card.title}</p>
                  <div className="pp-sub-price-row">
                    {card.discount > 0 && (
                      <span className="pp-sub-discount">-{card.discount}%</span>
                    )}
                    <span className="pp-sub-price">
                      S/ {card.discount > 0
                        ? (card.price * (1 - card.discount / 100)).toFixed(2)
                        : Number(card.price).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  className="pp-sub-cart-btn"
                  onClick={e => { e.stopPropagation(); addToCart(card); }}
                >
                  <ShoppingCart size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SECTION 4: AÑADIDOS RECIENTEMENTE ══ */}
        <section className="pp-section">
          <div className="pp-section-header">
            <h2 className="pp-section-title">
              <Clock size={20} className="pp-section-icon" />
              Añadidos recientemente
            </h2>
          </div>
          <div className="pp-game-grid">
            {recentGames.map(game => (
              <GameCard
                key={`recent-${game.id}`}
                game={game}
                onClick={() => navigate(`/game/${game.id}`)}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>

        {/* ══ SECTION 5: PRÓXIMOS LANZAMIENTOS ══ */}
        <section className="pp-section">
          <div className="pp-section-header">
            <h2 className="pp-section-title">
              Los Próximos Lanzamientos <ChevronRight size={18} />
            </h2>
          </div>
          <div className="pp-upcoming-grid">
            {upcoming.map(game => (
              <div key={game.id} className="pp-upcoming-card">
                <img src={game.image} alt={game.title} className="pp-upcoming-img" />
                <div className="pp-upcoming-info">
                  <p className="pp-upcoming-title">{game.title}</p>
                  <span className="pp-upcoming-date">{game.releaseDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SECTION 6: CATEGORÍAS ══ */}
        <section className="pp-section">
          <div className="pp-section-header">
            <h2 className="pp-section-title">
              <Tag size={20} className="pp-section-icon" />
              ¿No encuentras lo que buscas?
            </h2>
          </div>
          <p className="pp-section-desc">Filtra por tu consola o por el tipo de productos que buscas.</p>
          <div className="pp-categories-grid">
            {gameCategories.map(cat => (
              <button
                key={cat}
                className="pp-category-chip"
                onClick={() => navigate(`/explore?category=${encodeURIComponent(cat)}`)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="pp-see-all-wrap">
            <button
              className="pp-btn-explore"
              onClick={() => navigate('/explore')}
            >
              Ver todo
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PlatformPage;
