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

// Logo imports - these would need to be added to public/images/logos/
const PSLogo = () => <img src="/images/logos/playstation.png" alt="PlayStation" width="16" height="16" />;
const XboxLogo = () => <img src="/images/logos/xbox.png" alt="Xbox" width="16" height="16" />;
const NintendoLogo = () => <img src="/images/logos/nintendo.png" alt="Nintendo" width="16" height="16" />;
const PCLogo = () => <img src="/images/logos/pc.png" alt="PC" width="16" height="16" />;

const PLATFORMS = [
  { name: 'PC',          icon: <Monitor size={16} /> },
  { name: 'PlayStation', icon: <PSLogo /> },
  { name: 'Xbox',        icon: <XboxLogo /> },
  { name: 'Nintendo',    icon: <NintendoLogo /> },
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

  // ── Sliding pill state ──
  const desktopBtnRefs = useRef({});
  const mobileBtnRefs  = useRef({});
  const [desktopSlider, setDesktopSlider] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileSlider,  setMobileSlider]  = useState({ left: 0, width: 0, opacity: 0 });

  const calcSlider = (refsMap, setter) => {
    requestAnimationFrame(() => {
      if (activePlatform && refsMap.current[activePlatform]) {
        const btn = refsMap.current[activePlatform];
        setter({ left: btn.offsetLeft, width: btn.offsetWidth, opacity: 1 });
      } else {
        setter(prev => ({ ...prev, opacity: 0 }));
      }
    });
  };

  useEffect(() => { calcSlider(desktopBtnRefs, setDesktopSlider); }, [activePlatform]);
  useEffect(() => { calcSlider(mobileBtnRefs,  setMobileSlider);  }, [activePlatform]);


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

  // Bypass CSS scroll-behavior limitations caused by overflow:hidden on parent elements
  const smoothScrollTo = (targetY, duration = 900) => {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;
    let startTime = null;
    const ease = (t) => t < 0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
    const step = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + diff * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Auto-scroll when navigating to home with a hash (e.g. from another route)
  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const sectionId = location.hash.substring(1);
      const tryScroll = (retries = 0) => {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
          smoothScrollTo(top);
        } else if (retries < 10) {
          setTimeout(() => tryScroll(retries + 1), 100);
        }
      };
      setTimeout(() => tryScroll(), 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, location.pathname]);

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
      const st = searchTerm.toLowerCase().trim();
      const searchResults = games.filter(g => {
        if (!g.title) return false;
        const title = g.title.toLowerCase();
        return title.includes(st) || 
               (st === 'fornite' && title.includes('fortnite'));
      });
      if (searchResults.length > 0) {
        navigate(`/game/${searchResults[0].id}`);
        closeSearch();
      } else {
        alert("No se encontró ningún juego con ese nombre.");
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

  const handleNavScroll = (sectionId) => (e) => {
    e.preventDefault();

    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const targetTop = el.getBoundingClientRect().top + window.pageYOffset - 100;
      const currentTop = window.pageYOffset;

      // If user is already near the section (within 200px), scroll to top first
      // so the animation is always visible and satisfying
      if (Math.abs(currentTop - targetTop) < 300) {
        smoothScrollTo(0, 400); // scroll to top fast
        setTimeout(() => smoothScrollTo(targetTop, 900), 450); // then scroll to section
      } else {
        smoothScrollTo(targetTop, 900);
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      let retries = 0;
      const tryScroll = () => {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
          smoothScrollTo(top);
        } else if (retries++ < 15) {
          setTimeout(tryScroll, 100);
        }
      };
      setTimeout(tryScroll, 200);
    } else {
      doScroll();
    }
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
              <a href="/#tendencias" onClick={handleNavScroll('tendencias')}>Tendencias</a>
              <a href="/#reservas" onClick={handleNavScroll('reservas')}>Reservas</a>
              <a href="/#proximas-salidas" onClick={handleNavScroll('proximas-salidas')}>Próximas salidas</a>
              <a href="/#blog" onClick={handleNavScroll('blog')}>Blog</a>
              <a href="/#soporte" onClick={handleNavScroll('soporte')}>Soporte 24/7</a>
            </div>

            {/* Platform bar OR Search bar - animated switch */}
            <div className={`platform-search-container ${isSearchOpen ? 'search-active' : ''}`}>
              {/* Platforms list - hidden when search open */}
              <div className="platforms-list">
                {/* ── Sliding pill ── */}
                <div className="platform-slider" style={{
                  left:    desktopSlider.left,
                  width:   desktopSlider.width,
                  opacity: desktopSlider.opacity,
                }} />

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

              {isSearchOpen && searchTerm.trim() && (
                <div className="search-dropdown">
                  {games.filter(g => {
                    if (!g.title) return false;
                    const st = searchTerm.toLowerCase().trim();
                    const title = g.title.toLowerCase();
                    return title.includes(st) || (st === 'fornite' && title.includes('fortnite'));
                  }).slice(0, 5).map(game => {
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
                        <div className="search-dropdown-price">S/ {price}</div>
                      </div>
                    );
                  })}
                  {games.filter(g => {
                    if (!g.title) return false;
                    const st = searchTerm.toLowerCase().trim();
                    const title = g.title.toLowerCase();
                    return title.includes(st) || (st === 'fornite' && title.includes('fortnite'));
                  }).length === 0 && (
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
          {/* ── Sliding pill mobile ── */}
          <div className="platform-slider" style={{
            left:    mobileSlider.left,
            width:   mobileSlider.width,
            opacity: mobileSlider.opacity,
          }} />

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