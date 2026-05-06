import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { ShieldAlert, Trash2, Plus, Edit, Search, Filter, LayoutDashboard, Package, Settings, LogOut, Menu, X, SortAsc, SortDesc } from 'lucide-react';
import GameFormModal from '../components/GameFormModal';
import { featuredGames } from '../data/games';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [sortBy, setSortBy] = useState("title"); // title, price, platform
  const [sortOrder, setSortOrder] = useState("asc"); // asc, desc

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => { fetchGames(); }, []);

  const fetchGames = async () => {
    try {
      const snapshot = await getDocs(collection(db, "games"));
      setGames(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error al cargar juegos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`¿Eliminar "${title}"?`)) {
      try {
        await deleteDoc(doc(db, "games", id));
        setGames(prev => prev.filter(g => g.id !== id));
      } catch (error) {
        alert("Error al eliminar el juego.");
      }
    }
  };

  const handleSaveGame = async (gameData) => {
    try {
      if (editingGame) {
        await updateDoc(doc(db, 'games', editingGame.id), gameData);
        setGames(prev => prev.map(g => g.id === editingGame.id ? { ...gameData, id: editingGame.id } : g));
      } else {
        const docRef = await addDoc(collection(db, 'games'), gameData);
        setGames(prev => [{ ...gameData, id: docRef.id }, ...prev]);
      }
      setShowModal(false);
      setEditingGame(null);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm("¡ATENCIÓN! Esto borrará todos los juegos actuales y subirá los 81 juegos curados (PC, PlayStation, Xbox, Nintendo) con imágenes en alta calidad. ¿Estás seguro?")) return;
    
    try {
      setLoading(true);
      // Delete all existing games
      const snapshot = await getDocs(collection(db, "games"));
      for (const d of snapshot.docs) {
        await deleteDoc(doc(db, "games", d.id));
      }
      
      // Add all featured games
      for (const game of featuredGames) {
        // Remove the static ID so Firebase generates a new one, or keep it, doesn't matter since addDoc generates one.
        const { id, ...gameData } = game; 
        await addDoc(collection(db, 'games'), gameData);
      }
      
      alert("¡Base de datos actualizada con éxito con 40 juegos HD!");
      await fetchGames();
    } catch (error) {
      console.error("Error seeding:", error);
      alert("Hubo un error. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = useMemo(() => {
    let filtered = games.filter(game => {
      const matchSearch = game.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPlatform = platformFilter === "All" || game.platform === platformFilter;
      return matchSearch && matchPlatform;
    });

    // Apply sorting
    if (sortBy === "title") {
      filtered.sort((a, b) => 
        sortOrder === "asc" 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title)
      );
    } else if (sortBy === "price") {
      filtered.sort((a, b) => 
        sortOrder === "asc" 
          ? (a.price || 0) - (b.price || 0) 
          : (b.price || 0) - (a.price || 0)
      );
    } else if (sortBy === "platform") {
      filtered.sort((a, b) => 
        sortOrder === "asc" 
          ? (a.platform || "").localeCompare(b.platform || "") 
          : (b.platform || "").localeCompare(a.platform || "")
      );
    }

    return filtered;
  }, [games, searchTerm, platformFilter, sortBy, sortOrder]);

  const uniquePlatforms = useMemo(() => {
    const platforms = new Set();
    games.forEach(g => platforms.add(g.platform));
    return ["All", ...Array.from(platforms).sort()];
  }, [games]);

  return (
    <div className="admin-layout">
      {/* Overlay oscuro móvil */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay active" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`admin-sidebar${sidebarOpen ? ' mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <ShieldAlert size={20} />
          </div>
          <span>Nexus Admin</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active" onClick={() => setSidebarOpen(false)}>
            <Package size={20} /> <span>Catálogo</span>
          </a>
          <a href="#" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <LayoutDashboard size={20} /> <span>Ventas (Próx.)</span>
          </a>
          <a href="#" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <Settings size={20} /> <span>Ajustes</span>
          </a>
        </nav>
        <div className="sidebar-footer">
          <button className="btn-logout-admin" onClick={() => { logout(); navigate('/'); }}>
            <LogOut size={18} /> <span>Salir al sitio</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="admin-mobile-menu-btn"
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="admin-title">
              <h1>Gestión de Catálogo</h1>
              <p>{games.length} juegos en total</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-add-game" onClick={handleSeedDatabase} style={{ background: '#e11d48' }}>
              <ShieldAlert size={18} /> Recrear DB
            </button>
            <button className="btn-add-game" onClick={() => { setEditingGame(null); setShowModal(true); }}>
              <Plus size={18} /> Añadir Juego
            </button>
          </div>
        </header>

        <div className="admin-filters-bar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar juego por título..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-box">
            <Filter size={18} className="filter-icon" />
            <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)}>
              {uniquePlatforms.map(platform => (
                <option key={platform} value={platform}>{platform === "All" ? "Todas las plataformas" : platform}</option>
              ))}
            </select>
          </div>
          <div className="sort-box">
            <SortAsc size={18} className="sort-icon" />
            <select 
              value={`${sortBy}-${sortOrder}`} 
              onChange={e => {
                const [by, order] = e.target.value.split('-');
                setSortBy(by);
                setSortOrder(order);
              }}
            >
              <option value="title-asc">Título A-Z</option>
              <option value="title-desc">Título Z-A</option>
              <option value="price-asc">Precio: Bajo a Alto</option>
              <option value="price-desc">Precio: Alto a Bajo</option>
              <option value="platform-asc">Plataforma A-Z</option>
              <option value="platform-desc">Plataforma Z-A</option>
            </select>
          </div>
        </div>

        <div className="admin-content-area">
          {loading ? (
            <div className="admin-loading">Cargando inventario...</div>
          ) : (
            <div className="table-wrapper">
              <table className="admin-table-pro">
                <thead>
                  <tr>
                    <th width="70">Portada</th>
                    <th>Título</th>
                    <th className="hide-mobile">Plataforma</th>
                    <th width="100">Precio</th>
                    <th width="100" className="hide-mobile">Descuento</th>
                    <th width="100">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGames.length === 0 ? (
                    <tr><td colSpan="6" className="admin-empty">No se encontraron juegos.</td></tr>
                  ) : filteredGames.map(game => (
                    <tr key={game.id}>
                      <td><img src={game.image} alt={game.title} className="table-img" /></td>
                      <td className="table-title"><strong>{game.title}</strong></td>
                      <td className="table-platform hide-mobile">{game.platform || '---'}</td>
                      <td className="table-price">S/ {Number(game.price || 0).toFixed(2)}</td>
                      <td className="hide-mobile">
                        {game.discount > 0
                          ? <span className="badge-discount">-{game.discount}%</span>
                          : <span className="badge-none">-</span>}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-edit" onClick={() => { setEditingGame(game); setShowModal(true); }} title="Editar">
                            <Edit size={16} />
                          </button>
                          <button className="btn-delete" onClick={() => handleDelete(game.id, game.title)} title="Eliminar">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <GameFormModal
          game={editingGame}
          onClose={() => setShowModal(false)}
          onSave={handleSaveGame}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
