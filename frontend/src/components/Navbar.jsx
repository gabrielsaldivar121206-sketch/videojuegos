import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Search, ShoppingCart, User, Monitor, X as XIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { featuredGames as fallbackGames, PLATFORM_COLORS } from '../data/games';
import AuthModal from './AuthModal';
import './Navbar.css';

const PSIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.054 4.278-.129 4.278-3.283 0-3.23-1.12-4.989-4.435-6.017-1.072-.33-3.05-.802-5.312-1.182zm9.77 13.5c-1.895.654-3.875.436-5.431-.34v2.453l5.018 1.595c.496.158.909.011.909-.553v-2.112c0-.521-.229-.939-.497-1.042zm-14.57 2.456c-1.659-.53-1.91-1.644-.974-2.275.882-.6 2.367-.918 2.367-.918v-2.49S3.204 13.95 1.08 15.465C-1.38 17.197.98 19.7 5.228 21.05c1.39.443 3.038.68 4.672.68V19.2c-1.76.038-3.74-.198-5.745-.648z"/>
  </svg>
);
const XboxSVG = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.102 5.445C2.8 6.9 2 8.857 2 11c0 4.411 3.589 8 8 8a7.97 7.97 0 0 0 5.054-1.808L4.102 5.445zM19.898 5.445l-10.952 11.747A7.97 7.97 0 0 0 14 19c4.411 0 8-3.589 8-8a7.97 7.97 0 0 0-2.102-5.555zM12 2C9.742 2 7.699 2.893 6.19 4.343L12 10.889l5.81-6.546A9.97 9.97 0 0 0 12 2z"/>
  </svg>
);
const NintendoSVG = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.067.43l5.27 9.126L9.066 18.68H5.033A5.033 5.033 0 0 1 0 13.648V5.462A5.033 5.033 0 0 1 5.033.43zm3.6 0h6.3A5.033 5.033 0 0 1 24 5.462v8.186a5.033 5.033 0 0 1-5.033 5.032H12.15l5.27-9.125zM7.6 5.52A2.07 2.07 0 1 0 7.6 9.66 2.07 2.07 0 0 0 7.6 5.52zm8.8 3.93a2.07 2.07 0 1 0 0 4.14 2.07 2.07 0 0 0 0-4.14z"/>
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { cartItems, toggleCart } = useCart();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const searchInputRef = useRef(null);
  const [games, setGames] = useState([]);
  const location = useLocation();
  const platformMatch = location.pathname.match(/^\/platform\/(.+)$/);
  const activePlatform = platformMatch ? decodeURIComponent(platformMatch[1]) : null;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const snap = await getDocs(collection(db, 'games'));
        if (!snap.empty) {
          setGames(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setGames(fallbackGames);
        }
      } catch (err) {
        setGames(fallbackGames);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-focus when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchResults = games.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
      if (searchResults.length > 0) {
        navigate(`/game/${searchResults[0].id}`);
        closeSearch();
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    // Optionally navigate away or stay, usually closing search doesn't change route.
  };

  return (
    <>
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">

        {/* LEFT - Logo */}
        <div className="navbar-left">
          <a href="/" className="logo">
            <Gamepad2 size={26} className="logo-icon" />
            <span className="logo-text">NEXUS GAMING</span>
          </a>
        </div>

        {/* CENTER */}
        <div className="navbar-center">
          <div className="top-mini-links">
            <a href="/#store">Tendencias</a>
            <a href="/#featured">Reservas</a>
            <a href="/#community">Próximas salidas</a>
            <a href="/#support">Blog</a>
            <a href="/#support">Soporte 24/7</a>
          </div>

          {/* Platform bar OR Search bar - animated switch */}
          <div className={`platform-search-container ${isSearchOpen ? 'search-active' : ''}`}>
            {/* Platforms list - hidden when search open */}
            <div className="platforms-list">
              {[
                { name: 'PC',          icon: <Monitor size={16} /> },
                { name: 'PlayStation', icon: <PSIcon /> },
                { name: 'Xbox',        icon: <XboxSVG /> },
                { name: 'Nintendo',    icon: <NintendoSVG /> },
              ].map(p => {
                const isActive = activePlatform === p.name;
                const colors = PLATFORM_COLORS[p.name];
                return (
                  <button
                    key={p.name}
                    className={`platform-item ${isActive ? 'platform-item-active' : ''}`}
                    style={isActive ? { background: colors.bg, color: colors.text, borderRadius: '30px', padding: '4px 14px' } : {}}
                    onClick={() => navigate(`/platform/${p.name}`)}
                  >
                    {p.icon} {p.name}
                  </button>
                );
              })}
            </div>

            {/* Search form - shown when search open */}
            <form
              className="search-inline-form"
              onSubmit={handleSearchSubmit}
            >
              <input
                ref={searchInputRef}
                type="text"
                className="search-inline-input"
                placeholder="Minecraft, RPG, multijugador..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="submit" className="search-advanced-btn">
                Búsqueda avanzada
              </button>
              <button type="button" className="search-close-btn" onClick={closeSearch}>
                <XIcon size={16} />
              </button>
            </form>

            {/* Dropdown Results */}
            {isSearchOpen && searchTerm.trim() && (
              <div className="search-dropdown">
                {games.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5).map(game => {
                  const price = game.discount > 0 ? (game.price * (1 - game.discount/100)).toFixed(2) : Number(game.price || 0).toFixed(2);
                  return (
                    <div key={game.id} className="search-dropdown-item" onClick={() => {
                      navigate(`/game/${game.id}`);
                      closeSearch();
                    }}>
                      <img src={game.image} alt={game.title} />
                      <div className="search-dropdown-info">
                        <span className="search-dropdown-title">{game.title}</span>
                        <span className="search-dropdown-platform">{game.categories?.[0] || 'Steam'}</span>
                      </div>
                      <div className="search-dropdown-price">{price} €</div>
                    </div>
                  );
                })}
                {games.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                  <div className="search-dropdown-empty">No se encontraron resultados</div>
                )}
              </div>
            )}

            {/* The magnifying glass button - morphs position */}
            {!isSearchOpen && (
              <button
                type="button"
                className="search-submit-btn"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={19} />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT - Cart + User */}
        <div className="navbar-right">
          <button className="nav-icon-btn cart-btn" onClick={toggleCart}>
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="cart-badge-ig">{cartItems.length}</span>
            )}
          </button>

          {user ? (
            <button
              className="nav-user-avatar-btn"
              onClick={() => navigate('/perfil')}
              title={user.displayName || 'Mi perfil'}
            >
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=00e5ff&color=0b0c10&bold=true&size=64`}
                alt="Avatar"
                className="nav-avatar-img"
              />
            </button>
          ) : (
            <button
              className="nav-icon-btn user-btn"
              onClick={() => setShowAuthModal(true)}
              title="Iniciar sesión"
            >
              <User size={22} />
            </button>
          )}
        </div>

      </div>
    </nav>

    {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Navbar;
