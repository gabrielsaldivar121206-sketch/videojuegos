import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Search, ShoppingCart, User, X as XIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { featuredGames as fallbackGames, PLATFORM_COLORS } from '../data/games';
import AuthModal from './AuthModal';
import './Navbar.css';

// Logo imports - these would need to be added to public/images/logos/
const PSLogo = () => <img src="/images/logos/playstation.png" alt="PlayStation" width="16" height="16" />;
const XboxLogo = () => <img src="/images/logos/xbox.png" alt="Xbox" width="16" height="16" />;
const NintendoLogo = () => <img src="/images/logos/nintendo.png" alt="Nintendo" width="16" height="16" />;
const PCLogo = () => <img src="/images/logos/pc.png" alt="PC" width="16" height="16" />;

const XboxSVG = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.102 5.445C2.8 6.9 2 8.857 2 11c0 4.411 3.589 8 8 8a7.97 7.97 0 0 0 5.054-1.808L4.102 5.445zM19.898 5.445l-10.952 11.747A7.97 7.97 0 0 0 14 19c4.411 0 8-3.589 8-8a7.97 7.97 0 0 0-2.102-5.555zM12 2C9.742 2 7.699 2.893 6.19 4.343L12 10.889l5.81-6.546A9.97 9.97 0 0 0 12 2z" />
  </svg>
);

const NintendoSVG = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.067.43l5.27 9.126L9.066 18.68H5.033A5.033 5.033 0 0 1 0 13.648V5.462A5.033 5.033 0 0 1 5.033.43zm3.6 0h6.3A5.033 5.033 0 0 1 24 5.462v8.186a5.033 5.033 0 0 1-5.033 5.032H12.15l5.27-9.125zM7.6 5.52A2.07 2.07 0 1 0 7.6 9.66 2.07 2.07 0 0 0 0-4.14z" />
  </svg>
);

const PLATFORMS = [
  { name: 'PC', icon: <PCLogo /> },
  { name: 'PlayStation', icon: <PSLogo /> },
  { name: 'Xbox', icon: <XboxLogo /> },
  { name: 'Nintendo', icon: <NintendoLogo /> },
];

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

  // Sliding pill refs
  const desktopBtnRefs = useRef({});
  const mobileBtnRefs  = useRef({});
  const [desktopSlider, setDesktopSlider] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileSlider,  setMobileSlider]  = useState({ left: 0, width: 0, opacity: 0 });

  const calcSlider = (refsMap, setter) => {
    if (activePlatform && refsMap.current[activePlatform]) {
      const btn = refsMap.current[activePlatform];
      const parent = btn.parentElement;
      const parentRect = parent.getBoundingClientRect();
      const btnRect    = btn.getBoundingClientRect();
      setter({ left: btnRect.left - parentRect.left, width: btnRect.width, opacity: 1 });
    } else {
      setter(prev => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => { calcSlider(desktopBtnRefs, setDesktopSlider); }, [activePlatform]);
  useEffect(() => { calcSlider(mobileBtnRefs,  setMobileSlider);  }, [activePlatform]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const snap = await getDocs(collection(db, 'games'));
        if (!snap.empty) {
          setGames(snap.docs.map(doc => ({ id: doc.id, ...docSnap.data() })));
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

  // Auto-focus + body class when search opens on mobile
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-search-open');
      }
    } else {
      document.body.classList.remove('mobile-search-open');
    }
    return () => document.body.classList.remove('mobile-search-open');
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
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">

          {/* LEFT - Logo */}
          <div className="navbar-left">
            <a href="/" className="logo">
              <Gamepad2 size={26} className="logo-icon" />
              <span className="logo-text">VENTO GAMING</span>
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
                {/* Sliding pill indicator */}
                <div
                  className="platform-slider"
                  style={{
                    left:    desktopSlider.left,
                    width:   desktopSlider.width,
                    opacity: desktopSlider.opacity,
                  }}
                />
                {PLATFORMS.map(p => {
                  const isActive = activePlatform === p.name;
                  return (
                    <button
                      key={p.name}
                      ref={el => desktopBtnRefs.current[p.name] = el}
                      className={`platform-item ${isActive ? 'platform-item-active' : ''}`}
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
                    const price = game.discount > 0 ? (game.price * (1 - game.discount / 100)).toFixed(2) : Number(game.price || 0).toFixed(2);
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
                        <div className="search-dropdown-price">S/ {price}</div>
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

        {/* MOBILE PLATFORMS BAR (Only visible on mobile) */}
        <div className="platforms-mobile-bar">
          {/* Sliding pill indicator - mobile */}
          <div
            className="platform-slider"
            style={{
              left:    mobileSlider.left,
              width:   mobileSlider.width,
              opacity: mobileSlider.opacity,
            }}
          />
          {PLATFORMS.map(p => {
            const isActive = activePlatform === p.name;
            return (
              <button
                key={p.name}
                ref={el => mobileBtnRefs.current[p.name] = el}
                className={`platform-item ${isActive ? 'platform-item-active' : ''}`}
                onClick={() => navigate(`/platform/${p.name}`)}
              >
                {p.icon} {p.name}
              </button>
            );
          })}
        </div>
      </nav>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Navbar;