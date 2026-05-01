import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Library, Heart, Settings } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const avatar = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.displayName || 'U')}&background=00e5ff&color=0b0c10&bold=true&size=128`;

  return (
    <div className="profile-page container">
      <div className="profile-hero">
        <div className="profile-avatar-wrap">
          <img src={avatar} alt="Avatar" className="profile-avatar" />
          <div className="profile-status-dot" />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{userProfile?.displayName || user.displayName || 'Jugador'}</h1>
          <p className="profile-email">{user.email}</p>
          <div className="profile-badges">
            <span className="badge badge-member">Miembro</span>
            {(userProfile?.library?.length > 0) && (
              <span className="badge badge-buyer">Comprador</span>
            )}
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={16} /> Cerrar sesión
        </button>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <Library size={24} className="stat-icon" />
          <span className="stat-number">{userProfile?.library?.length || 0}</span>
          <span className="stat-label">Juegos comprados</span>
        </div>
        <div className="stat-card">
          <Heart size={24} className="stat-icon" />
          <span className="stat-number">{userProfile?.wishlist?.length || 0}</span>
          <span className="stat-label">Lista de deseos</span>
        </div>
        <div className="stat-card">
          <Settings size={24} className="stat-icon" />
          <span className="stat-number">0</span>
          <span className="stat-label">Reseñas escritas</span>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <h2>🎮 Mi Biblioteca</h2>
          {(!userProfile?.library || userProfile.library.length === 0) ? (
            <div className="empty-state">
              <p>Aún no tienes juegos comprados.</p>
              <button onClick={() => navigate('/')} className="btn-explore">Explorar tienda</button>
            </div>
          ) : (
            <div className="library-grid">
              {userProfile.library.map((game, i) => (
                <div key={i} className="library-card">{game.title}</div>
              ))}
            </div>
          )}
        </div>

        <div className="profile-section">
          <h2>❤️ Lista de Deseos</h2>
          {(!userProfile?.wishlist || userProfile.wishlist.length === 0) ? (
            <div className="empty-state">
              <p>Tu lista de deseos está vacía.</p>
              <button onClick={() => navigate('/')} className="btn-explore">Descubrir juegos</button>
            </div>
          ) : (
            <div className="library-grid">
              {userProfile.wishlist.map((game, i) => (
                <div key={i} className="library-card">{game.title}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
