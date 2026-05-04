import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ShieldAlert, Trash2, Plus, Edit, Search, Filter, LayoutDashboard, Package, Settings, LogOut, Menu, X } from 'lucide-react';
import GameFormModal from '../components/GameFormModal';
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
  const [categoryFilter, setCategoryFilter] = useState("All");

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

  const filteredGames = useMemo(() => games.filter(game => {
    const matchSearch = game.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === "All" || game.genre?.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchSearch && matchCategory;
  }), [games, searchTerm, categoryFilter]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set();
    games.forEach(g => g.genre?.split(',').forEach(c => cats.add(c.trim())));
    return ["All", ...Array.from(cats)];
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
          <button className="btn-add-game" onClick={() => { setEditingGame(null); setShowModal(true); }}>
            <Plus size={18} /> Añadir Juego
          </button>
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
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat === "All" ? "Todas las categorías" : cat}</option>
              ))}
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
                    <th className="hide-mobile">Categoría</th>
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
                      <td className="table-category hide-mobile">{game.genre || '---'}</td>
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
