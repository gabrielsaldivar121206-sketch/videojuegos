import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ShieldAlert, Trash2, Plus, Edit, Search, Filter, LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import GameFormModal from '../components/GameFormModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const snapshot = await getDocs(collection(db, "games"));
      const gamesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGames(gamesData);
    } catch (error) {
      console.error("Error al cargar juegos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el juego "${title}"?`)) {
      try {
        await deleteDoc(doc(db, "games", id));
        setGames(games.filter(g => g.id !== id));
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al eliminar el juego.");
      }
    }
  };

  const handleSaveGame = async (gameData) => {
    try {
      if (editingGame) {
        const gameRef = doc(db, 'games', editingGame.id);
        await updateDoc(gameRef, gameData);
        setGames(games.map(g => g.id === editingGame.id ? { ...gameData, id: editingGame.id } : g));
      } else {
        const docRef = await addDoc(collection(db, 'games'), gameData);
        setGames([{ ...gameData, id: docRef.id }, ...games]);
      }
      setShowModal(false);
      setEditingGame(null);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const openAddModal = () => {
    setEditingGame(null);
    setShowModal(true);
  };

  const openEditModal = (game) => {
    setEditingGame(game);
    setShowModal(true);
  };

  // Lógica de filtrado
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchSearch = game.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === "All" || game.genre?.toLowerCase().includes(categoryFilter.toLowerCase());
      return matchSearch && matchCategory;
    });
  }, [games, searchTerm, categoryFilter]);

  // Extraer categorías únicas para el selector
  const uniqueCategories = useMemo(() => {
    const categories = new Set();
    games.forEach(g => {
      if (g.genre) {
        g.genre.split(',').forEach(c => categories.add(c.trim()));
      }
    });
    return ["All", ...Array.from(categories)];
  }, [games]);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <ShieldAlert size={28} className="text-cyan" />
          <span>Nexus Admin</span>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active"><Package size={20} /> Catálogo</a>
          <a href="#" className="nav-item"><LayoutDashboard size={20} /> Ventas (Próximamente)</a>
          <a href="#" className="nav-item"><Settings size={20} /> Ajustes</a>
        </nav>
        
        <div className="sidebar-footer">
          <button className="btn-logout-admin" onClick={() => { logout(); navigate('/'); }}>
            <LogOut size={18} /> Salir al sitio
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-title">
            <h1>Gestión de Catálogo</h1>
            <p>{games.length} juegos en total</p>
          </div>
          <button className="btn-add-game" onClick={openAddModal}>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-box">
            <Filter size={18} className="filter-icon" />
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
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
                    <th width="80">Portada</th>
                    <th>Título</th>
                    <th>Categoría</th>
                    <th width="100">Precio</th>
                    <th width="100">Descuento</th>
                    <th width="120">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGames.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="admin-empty">No se encontraron juegos con esos filtros.</td>
                    </tr>
                  ) : (
                    filteredGames.map(game => (
                      <tr key={game.id}>
                        <td>
                          <img src={game.image} alt={game.title} className="table-img" />
                        </td>
                        <td className="table-title"><strong>{game.title}</strong></td>
                        <td className="table-category">{game.genre || '---'}</td>
                        <td className="table-price">{Number(game.price || 0).toFixed(2)} €</td>
                        <td>
                          {game.discount > 0 ? (
                            <span className="badge-discount">-{game.discount}%</span>
                          ) : (
                            <span className="badge-none">-</span>
                          )}
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-edit" onClick={() => openEditModal(game)} title="Editar"><Edit size={16} /></button>
                            <button className="btn-delete" onClick={() => handleDelete(game.id, game.title)} title="Eliminar"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
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
