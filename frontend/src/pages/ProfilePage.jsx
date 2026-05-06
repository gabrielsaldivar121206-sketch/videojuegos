import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Library, Heart, Star, ShoppingBag, ExternalLink,
  Gamepad2, Monitor, Camera, Play, Upload, Pencil
} from 'lucide-react';
import { PLATFORM_COLORS } from '../data/games';
import './ProfilePage.css';

const PSIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.054 4.278-.129 4.278-3.283 0-3.23-1.12-4.989-4.435-6.017-1.072-.33-3.05-.802-5.312-1.182zm9.77 13.5c-1.895.654-3.875.436-5.431-.34v2.453l5.018 1.595c.496.158.909.011.909-.553v-2.112c0-.521-.229-.939-.497-1.042zm-14.57 2.456c-1.659-.53-1.91-1.644-.974-2.275.882-.6 2.367-.918 2.367-.918v-2.49S3.204 13.95 1.08 15.465C-1.38 17.197.98 19.7 5.228 21.05c1.39.443 3.038.68 4.672.68V19.2c-1.76.038-3.74-.198-5.745-.648z"/>
  </svg>
);
const XboxIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.102 5.445C2.8 6.9 2 8.857 2 11c0 4.411 3.589 8 8 8a7.97 7.97 0 0 0 5.054-1.808L4.102 5.445zM19.898 5.445l-10.952 11.747A7.97 7.97 0 0 0 14 19c4.411 0 8-3.589 8-8a7.97 7.97 0 0 0-2.102-5.555zM12 2C9.742 2 7.699 2.893 6.19 4.343L12 10.889l5.81-6.546A9.97 9.97 0 0 0 12 2z"/>
  </svg>
);
const NintendoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.067.43l5.27 9.126L9.066 18.68H5.033A5.033 5.033 0 0 1 0 13.648V5.462A5.033 5.033 0 0 1 5.033.43zm3.6 0h6.3A5.033 5.033 0 0 1 24 5.462v8.186a5.033 5.033 0 0 1-5.033 5.032H12.15l5.27-9.125zM7.6 5.52A2.07 2.07 0 1 0 7.6 9.66 2.07 2.07 0 0 0 7.6 5.52zm8.8 3.93a2.07 2.07 0 1 0 0 4.14 2.07 2.07 0 0 0 0-4.14z"/>
  </svg>
);

const PLATFORM_ICONS = {
  PC: <Monitor size={14} />,
  PlayStation: <PSIcon />,
  Xbox: <XboxIcon />,
  Nintendo: <NintendoIcon />,
};

const PLATFORMS_LIST = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];

const ProfilePage = () => {
  const { user, userProfile, logout, uploadProfilePicture, uploadProfileBanner } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('library');
  const [activePlatform, setActivePlatform] = useState('all');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  if (!user) { navigate('/'); return null; }

  const handleLogout = async () => { await logout(); navigate('/'); };

  const avatar = userProfile?.photoURL || user.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.displayName || 'U')}&background=00e5ff&color=0b0c10&bold=true&size=128`;

  const library = userProfile?.library || [];
  const wishlist = userProfile?.wishlist || [];

  // ── Upload handlers ─────────────────────────────────────────
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setUploadError('La imagen debe ser menor a 5 MB'); return; }
    try {
      setUploadingAvatar(true);
      setUploadError('');
      await uploadProfilePicture(file);
    } catch (err) {
      setUploadError('Error al subir la foto. Verifica Firebase Storage.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleBannerChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setUploadError('El banner debe ser menor a 10 MB'); return; }
    try {
      setUploadingBanner(true);
      setUploadError('');
      await uploadProfileBanner(file);
    } catch (err) {
      setUploadError('Error al subir el banner. Verifica Firebase Storage.');
    } finally {
      setUploadingBanner(false);
    }
  };

  // ── Platform filter ──────────────────────────────────────────
  const filterByPlatform = (games) =>
    activePlatform === 'all' ? games : games.filter(g => (g.platform || 'PC') === activePlatform);

  // ── Library Game Card ────────────────────────────────────────
  const LibraryCard = ({ game }) => (
    <div className="pg-game-card">
      <div className="pg-game-img-wrap">
        {game.image
          ? <img src={game.image} alt={game.title} className="pg-game-img" />
          : <div className="pg-game-img-placeholder"><Gamepad2 size={32} /></div>
        }
        {game.platform && (
          <span
            className="pg-game-platform-badge"
            style={{ background: PLATFORM_COLORS[game.platform]?.bg || '#444', color: PLATFORM_COLORS[game.platform]?.text || '#fff' }}
          >
            {PLATFORM_ICONS[game.platform]} {game.platform}
          </span>
        )}
        {game.purchasedAt && (
          <span className="pg-game-date">
            {new Date(game.purchasedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>
      <p className="pg-game-title">{game.title}</p>
      {/* ── JUGAR AHORA button ── */}
      <button
        className="pg-play-btn"
        onClick={() => game.id && navigate(`/game/${game.id}`)}
      >
        <Play size={13} fill="currentColor" />
        Jugar ahora
      </button>
    </div>
  );

  const EmptyState = ({ icon: Icon, text, cta, ctaLabel }) => (
    <div className="pg-empty">
      <div className="pg-empty-icon"><Icon size={36} /></div>
      <p>{text}</p>
      <button onClick={() => navigate(cta)} className="pg-btn-cta">{ctaLabel}</button>
    </div>
  );

  const PlatformTabs = ({ games }) => {
    const platforms = [...new Set(games.map(g => g.platform || 'PC'))].filter(Boolean);
    if (platforms.length === 0) return null;
    return (
      <div className="pg-platform-tabs">
        <button
          className={`pg-platform-tab ${activePlatform === 'all' ? 'active' : ''}`}
          onClick={() => setActivePlatform('all')}
        >
          Todos ({games.length})
        </button>
        {PLATFORMS_LIST.filter(p => platforms.includes(p)).map(p => {
          const c = PLATFORM_COLORS[p];
          const count = games.filter(g => (g.platform || 'PC') === p).length;
          return (
            <button
              key={p}
              className={`pg-platform-tab ${activePlatform === p ? 'active' : ''}`}
              style={activePlatform === p ? { background: c?.bg, color: c?.text, borderColor: c?.bg } : {}}
              onClick={() => setActivePlatform(p)}
            >
              {PLATFORM_ICONS[p]} {p} ({count})
            </button>
          );
        })}
      </div>
    );
  };

  const tabs = [
    { id: 'library',  label: 'Mi Biblioteca',  icon: Library,     count: library.length },
    { id: 'wishlist', label: 'Lista de deseos', icon: Heart,       count: wishlist.length },
    { id: 'reviews',  label: 'Reseñas',         icon: Star,        count: 0 },
  ];

  return (
    <div className="profile-page">

      {/* ── BANNER ── */}
      <div className="pg-banner-wrap">
        <div
          className="pg-banner"
          style={userProfile?.bannerURL ? { backgroundImage: `url(${userProfile.bannerURL})` } : {}}
        >
          {!userProfile?.bannerURL && (
            <div className="pg-banner-placeholder">
              <Upload size={20} />
              <span>Sube un banner de perfil</span>
            </div>
          )}
        </div>

        {/* Banner upload button */}
        <button
          className="pg-banner-edit-btn"
          onClick={() => bannerInputRef.current?.click()}
          disabled={uploadingBanner}
          title="Cambiar banner"
        >
          <Pencil size={14} />
          {uploadingBanner ? 'Subiendo...' : 'Editar banner'}
        </button>
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleBannerChange}
        />
      </div>

      {/* ── HERO ROW ── */}
      <div className="pg-hero-row container">

        {/* Avatar with upload overlay */}
        <div className="pg-avatar-wrap">
          <img src={avatar} alt="Avatar" className="pg-avatar" />
          <span className="pg-status-dot" title="En línea" />
          <button
            className="pg-avatar-edit-btn"
            onClick={() => avatarInputRef.current?.click()}
            disabled={uploadingAvatar}
            title="Cambiar foto"
          >
            <Camera size={14} />
          </button>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </div>

        <div className="pg-hero-info">
          <h1 className="pg-name">{userProfile?.displayName || user.displayName || 'Jugador'}</h1>
          <p className="pg-email">{user.email}</p>
          <div className="pg-badges">
            <span className="pg-badge pg-badge-member">Miembro</span>
            {library.length > 0 && <span className="pg-badge pg-badge-buyer">Comprador</span>}
            {library.length >= 5 && <span className="pg-badge pg-badge-collector">Coleccionista</span>}
          </div>
          {uploadError && <p className="pg-upload-error">{uploadError}</p>}
        </div>

        <div className="pg-hero-actions">
          <button className="pg-btn-logout" onClick={handleLogout}>
            <LogOut size={15} /> Cerrar sesión
          </button>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="pg-stats-bar container">
        {[
          { icon: Library,     num: library.length,  lbl: 'Juegos' },
          { icon: Heart,       num: wishlist.length,  lbl: 'Deseados' },
          { icon: ShoppingBag, num: library.length,   lbl: 'Compras' },
          { icon: Star,        num: 0,                lbl: 'Reseñas' },
        ].map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="pg-stat-divider" />}
            <div className="pg-stat">
              <s.icon size={18} className="pg-stat-icon" />
              <div>
                <span className="pg-stat-num">{s.num}</span>
                <span className="pg-stat-lbl">{s.lbl}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="pg-main container">

        <div className="pg-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`pg-tab ${activeTab === tab.id ? 'pg-tab-active' : ''}`}
              onClick={() => { setActiveTab(tab.id); setActivePlatform('all'); }}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.count > 0 && <span className="pg-tab-badge">{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* LIBRARY */}
        {activeTab === 'library' && (
          <div className="pg-section">
            {library.length === 0 ? (
              <EmptyState
                icon={Library}
                text="Aún no tienes juegos comprados. ¡Explora la tienda y encuentra tu próxima aventura!"
                cta="/explore"
                ctaLabel="Explorar tienda"
              />
            ) : (
              <>
                <PlatformTabs games={library} />
                <p className="pg-section-desc">
                  {filterByPlatform(library).length} juego{filterByPlatform(library).length !== 1 ? 's' : ''}
                  {activePlatform !== 'all' ? ` en ${activePlatform}` : ' en tu biblioteca'}
                </p>
                <div className="pg-game-grid">
                  {filterByPlatform(library).map((game, i) => <LibraryCard key={i} game={game} />)}
                </div>
              </>
            )}
          </div>
        )}

        {/* WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="pg-section">
            {wishlist.length === 0 ? (
              <EmptyState
                icon={Heart}
                text="Tu lista de deseos está vacía. Guarda los juegos que quieres comprar más adelante."
                cta="/explore"
                ctaLabel="Descubrir juegos"
              />
            ) : (
              <>
                <PlatformTabs games={wishlist} />
                <p className="pg-section-desc">
                  {filterByPlatform(wishlist).length} juego{filterByPlatform(wishlist).length !== 1 ? 's' : ''}
                  {activePlatform !== 'all' ? ` en ${activePlatform}` : ' en tu lista de deseos'}
                </p>
                <div className="pg-game-grid">
                  {filterByPlatform(wishlist).map((game, i) => (
                    <div key={i} className="pg-game-card" onClick={() => game.id && navigate(`/game/${game.id}`)}>
                      <div className="pg-game-img-wrap">
                        {game.image
                          ? <img src={game.image} alt={game.title} className="pg-game-img" />
                          : <div className="pg-game-img-placeholder"><Gamepad2 size={32} /></div>
                        }
                        <div className="pg-game-overlay"><ExternalLink size={16} /><span>Ver juego</span></div>
                        {game.platform && (
                          <span className="pg-game-platform-badge"
                            style={{ background: PLATFORM_COLORS[game.platform]?.bg || '#444', color: PLATFORM_COLORS[game.platform]?.text || '#fff' }}>
                            {PLATFORM_ICONS[game.platform]} {game.platform}
                          </span>
                        )}
                      </div>
                      <p className="pg-game-title">{game.title}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="pg-section">
            <EmptyState
              icon={Star}
              text="Aún no has escrito ninguna reseña. ¡Comparte tu opinión sobre los juegos que has jugado!"
              cta="/explore"
              ctaLabel="Ver juegos"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
