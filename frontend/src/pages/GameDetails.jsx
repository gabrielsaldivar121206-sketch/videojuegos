import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import {
  ShoppingCart, Heart, Check, MoreHorizontal, AlertTriangle, ArrowLeft,
  Flame, Monitor, Users, Trophy, Cloud, Gamepad2, Wifi, Cpu
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { featuredGames, giftCards, upcomingGames, heroGame, cleanGameImage } from '../data/games';
import './GameDetails.css';

/* ──────────────────────────────────────────────
   SVG Platform Icons
   ────────────────────────────────────────────── */
const SteamIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.979 0C5.353 0 0 5.373 0 12c0 4.148 2.08 7.828 5.253 10.027l3.528-5.074c-.066-.23-.105-.472-.105-.722 0-1.637 1.328-2.964 2.965-2.964 1.366 0 2.508.924 2.848 2.186l4.908-2.035V13.3c0-3.308-2.684-5.992-5.992-5.992-3.308 0-5.992 2.684-5.992 5.992 0 .542.074 1.066.21 1.564l-3.352 4.821A11.942 11.942 0 0 1 0 12C0 5.373 5.353 0 11.979 0zm5.414 13.195l-4.706 1.95a2.95 2.95 0 0 0-1.042-.191c-1.637 0-2.964 1.328-2.964 2.965 0 1.637 1.327 2.965 2.964 2.965 1.638 0 2.965-1.328 2.965-2.965 0-.25-.039-.492-.105-.722l4.898-2.03a11.983 11.983 0 0 0 .56-3.414v-.558z"/>
  </svg>
);

const getPlatformIcon = (platform) => {
  const p = (platform || '').toLowerCase();
  if (p.includes('pc')) return <SteamIcon />;
  return <Gamepad2 size={16} />;
};

const getPlatformLabel = (platform) => {
  const p = (platform || '').toLowerCase();
  if (p.includes('pc')) return 'Steam';
  if (p.includes('playstation') || p.includes('ps4') || p.includes('ps5')) return 'PSN';
  if (p.includes('xbox')) return 'Xbox Live';
  if (p.includes('nintendo') || p.includes('switch')) return 'Nintendo eShop';
  return platform || 'Steam';
};

/* ──────────────────────────────────────────────
   Feature icons list
   ────────────────────────────────────────────── */
const FEATURES = [
  { icon: <Users size={22} />, label: 'Un jugador' },
  { icon: <Wifi size={22} />, label: 'JcJ en línea' },
  { icon: <Monitor size={22} />, label: 'JcJ a pantalla compartida' },
  { icon: <Users size={22} />, label: 'Multijugador multiplataforma' },
  { icon: <Trophy size={22} />, label: 'Logros' },
  { icon: <Gamepad2 size={22} />, label: 'Cromos / Coleccionables' },
  { icon: <Cloud size={22} />, label: 'Guardado en la nube' },
  { icon: <Gamepad2 size={22} />, label: 'Préstamo familiar' },
  { icon: <Cpu size={22} />, label: 'Compatible con mando' },
];

/* ──────────────────────────────────────────────
   Screenshot placeholder grid (uses game.image)
   ────────────────────────────────────────────── */
const ScreenshotGrid = ({ image, title }) => (
  <div className="screenshots-grid">
    <div className="screenshot-item screenshot-big">
      <img src={image} alt={`${title} screenshot 1`} style={{ height: '100%', minHeight: 180 }} />
    </div>
    <div className="screenshot-item">
      <img src={image} alt={`${title} screenshot 2`} style={{ height: 100, width: '100%' }} />
    </div>
    <div className="screenshot-item">
      <img src={image} alt={`${title} screenshot 3`} style={{ height: 100, width: '100%' }} />
    </div>
    <div className="screenshot-item">
      <img src={image} alt={`${title} screenshot 4`} style={{ height: 100, width: '100%' }} />
    </div>
    <div className="screenshot-item">
      <img src={image} alt={`${title} screenshot 5`} style={{ height: 100, width: '100%' }} />
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleCart } = useCart();
  const { user, userProfile } = useAuth();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGame = async () => {
      try {
        setLoading(true);
        setError(false);

        const docRef = doc(db, 'games', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGame(cleanGameImage({ id: docSnap.id, ...docSnap.data() }));
          return;
        }

        const qs = await getDocs(query(collection(db, 'games')));
        const found = qs.docs.find(d =>
          d.id === id ||
          String(d.data().id) === String(id) ||
          d.data().title?.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
        );

        if (found) {
          setGame(cleanGameImage({ id: found.id, ...found.data() }));
        } else {
          const allLocalGames = [
            ...featuredGames,
            ...(Object.values(giftCards).flat()),
            ...(Object.values(upcomingGames).flat()),
            heroGame
          ];
          const localFound = allLocalGames.find(g => 
            String(g.id) === String(id) || 
            g.title?.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
          );
          
          if (localFound) setGame(localFound);
          else setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  // Check wishlist
  useEffect(() => {
    if (userProfile?.wishlist && game) {
      setInWishlist(userProfile.wishlist.some(w => w.id === game.id));
    }
  }, [userProfile, game]);

  const handleWishlist = async () => {
    if (!user) {
      alert('Inicia sesión para guardar en tu lista de deseos');
      return;
    }
    setWishlistLoading(true);
    const userRef = doc(db, 'users', user.uid);
    const gameRef = { id: game.id, title: game.title, image: game.image, price: game.price };
    try {
      if (inWishlist) {
        await updateDoc(userRef, { wishlist: arrayRemove(gameRef) });
        setInWishlist(false);
      } else {
        await updateDoc(userRef, { wishlist: arrayUnion(gameRef) });
        setInWishlist(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleBuyNow = () => {
    addToCart(game);
    navigate('/checkout');
  };

  /* ── States ── */
  if (loading) return (
    <div className="page-container not-found">
      <div className="loading-spinner">Cargando datos del juego...</div>
    </div>
  );

  if (error || !game) return (
    <div className="page-container not-found" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <AlertTriangle size={80} color="#00f3ff" style={{ marginBottom: 20 }} />
      <h2 style={{ color: 'white', fontFamily: 'Outfit, sans-serif' }}>JUEGO NO ENCONTRADO</h2>
      <p style={{ color: '#999', marginBottom: 30 }}>El enlace es incorrecto o el juego ya no existe.</p>
      <Link to="/" className="add-cart-btn-ig-exact" style={{ width: 'fit-content', padding: '14px 40px', textDecoration: 'none', borderRadius: '30px' }}>
        Volver al catálogo
      </Link>
    </div>
  );

  const finalPrice = game.discount
    ? (game.price - (game.price * game.discount) / 100).toFixed(2)
    : Number(game.price).toFixed(2);

  const tags = game.genre
    ? game.genre.split(',').map(t => t.trim())
    : ['Acción', 'Aventura', 'Ciencia Ficción'];

  const description = game.description ||
    `${game.title} es una experiencia única que desafía los límites del gaming moderno. Sumérgete en un mundo lleno de detalle, acción y narrativa que te mantendrá enganchado desde el primer minuto. Descubre secretos, supera retos épicos y vive la aventura de tu vida.\n\nDiseñado para los jugadores más exigentes, con gráficos de última generación y una jugabilidad que lo cambia todo.`;

  return (
    <div className="game-details-page">

      {/* ══════════════════════════════════════
          HERO BANNER (Background Only)
          ══════════════════════════════════════ */}
      <div className="details-hero-banner" style={{ backgroundImage: `url(${game.image})` }}>
        <div className="details-hero-overlay"></div>
        {/* Floating Back Button */}
        <Link to="/" className="back-link-ig">
          <ArrowLeft size={14} /> Retroceder
        </Link>
      </div>

      {/* ══════════════════════════════════════
          OVERLAPPING CONTENT (Cover + Card)
          ══════════════════════════════════════ */}
      <div className="details-hero-content-overlap">
        {/* Left Column - cover only */}
        <div className="left-column-ig">
          <img src={game.image} alt={game.title} className="game-cover-ig-exact" />
        </div>

        {/* Purchase Card */}
        <div className="purchase-card-glass-exact">
          <div className="card-top-section">
            <h1 className="game-title-ig-exact">{game.title} - {game.platform ? game.platform : 'PC'}</h1>
            <div className="platform-pills-exact">
              <span>{getPlatformIcon(game.platform)} {getPlatformLabel(game.platform)}</span>
              <span><Check size={12} className="icon-green" /> En stock</span>
              <span><Check size={12} className="icon-green" /> Descarga digital</span>
            </div>
          </div>
          
          <div style={{ flex: 1 }}></div>

          <div className="price-and-actions-wrapper">
            <div className="price-row-ig-exact">
              {game.discount > 0 && (
                <>
                   <span className="original-price-exact">{Number(game.price).toFixed(2)} S/</span>
                  <span className="discount-badge-exact">-{game.discount}%</span>
                </>
              )}
               <span className="final-price-exact">{finalPrice} S/</span>
            </div>

            <div className="actions-row-ig-exact">
              <button
                className={`heart-btn-exact ${inWishlist ? 'active' : ''}`}
                aria-label="Lista de deseos"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                title={inWishlist ? 'Quitar de lista de deseos' : 'Añadir a lista de deseos'}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
              <button className="add-cart-btn-ig-exact" onClick={handleBuyNow}>
                <ShoppingCart size={18} /> Comprar ahora
              </button>
              <button className="add-cart-btn-secondary" onClick={() => { addToCart(game); toggleCart(); }}>
                Añadir a la cesta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          ACERCA DE + TABLA DE INFO
          ══════════════════════════════════════ */}
      <div className="details-info-section">
        <div className="info-left">
          <h2>Acerca de</h2>
          <p className="game-desc-ig">
            {description.substring(0, 320)}
            {description.length > 320 ? '...' : ''}
          </p>
          {description.length > 320 && (
            <span className="read-more-link">Leer más</span>
          )}

          <div className="tags-row">
            <span className="tags-label">Tags de usuario*:</span>
            {tags.map((tag, i) => (
              <span key={i} className="ig-tag">{tag}</span>
            ))}
            <span className="ig-tag"><MoreHorizontal size={12} /></span>
          </div>
        </div>

        <div className="info-right">
          <div className="rating-box-ig">
            <div className="rating-circle">{game.rating || 10}</div>
            <div className="rating-text">Basada en<br />115 reseñas</div>
          </div>

          <table className="info-table-ig">
            <tbody>
              <tr><td>Compatibilidad de países:</td><td className="cyan-link">Ver la lista</td></tr>
              <tr><td>Idiomas:</td><td className="cyan-link">Ver los idiomas disponibles</td></tr>
              <tr><td>Instalación:</td><td className="cyan-link">Cómo activar tu producto</td></tr>
              <tr><td>Desarrollador:</td><td>Nexus Studios</td></tr>
              <tr><td>Distribuidor:</td><td>Nexus Games Publishing</td></tr>
              <tr><td>Fecha de lanzamiento:</td><td>16 abril 2026</td></tr>
              <tr><td>Género:</td><td>{game.genre || 'Acción, Aventura'}</td></tr>
              <tr><td>Reseñas recientes en Steam:</td><td style={{ color: '#777' }}>No hay reseñas de usuarios</td></tr>
              <tr><td>Todas las reseñas en Steam:</td><td style={{ color: '#00f3ff' }}>Extremadamente positivas (9019)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════
          VISUALES / SCREENSHOTS
          ══════════════════════════════════════ */}
      <div className="visuales-section">
        <h2 className="section-heading">Visuales</h2>
        <ScreenshotGrid image={game.image} title={game.title} />
      </div>

      {/* ══════════════════════════════════════
          GAME FEATURES
          ══════════════════════════════════════ */}
      <div className="features-section">
        <h2 className="section-heading">Game features</h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-item">
              {f.icon}
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESCRIPCIÓN + REQUISITOS
          ══════════════════════════════════════ */}
      <div className="description-section">
        <h2>Descripción</h2>
        <p className="desc-subtitle">☐ {game.title}</p>
        <p className="desc-body">{description}</p>

        <img
          src={game.image}
          alt={`${game.title}`}
          className="desc-image"
        />

        <h2 style={{ marginTop: 40 }}>Configuración</h2>
        <div className="system-req-columns">
          <div className="req-column">
            <h3>Mínima*</h3>
            <table className="req-table">
              <tbody>
                <tr><td>OS:</td><td>Windows 10 / 11</td></tr>
                <tr><td>Procesador:</td><td>Core i5-8600K / Ryzen 5 2600X</td></tr>
                <tr><td>Memoria:</td><td>12 GB RAM</td></tr>
                <tr><td>Gráficos:</td><td>GeForce GTX 1060 / Radeon RX 570</td></tr>
                <tr><td>DirectX:</td><td>Versión 12</td></tr>
                <tr><td>Almacenamiento:</td><td>30 GB disponibles</td></tr>
              </tbody>
            </table>
          </div>
          <div className="req-column">
            <h3>Recomendada*</h3>
            <table className="req-table">
              <tbody>
                <tr><td>OS:</td><td>Windows 10 / 11</td></tr>
                <tr><td>Procesador:</td><td>Core i5-14600K / Ryzen 5 8600X</td></tr>
                <tr><td>Memoria:</td><td>16 GB RAM</td></tr>
                <tr><td>Gráficos:</td><td>GeForce RTX 4060 / Radeon RX 7600XT</td></tr>
                <tr><td>DirectX:</td><td>Versión 12</td></tr>
                <tr><td>Almacenamiento:</td><td>30 GB disponibles</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GameDetails;
