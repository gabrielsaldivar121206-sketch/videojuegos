import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './GameFormModal.css';

const GameFormModal = ({ game, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    discount: '',
    rating: '5.0',
    genre: '',
    categories: '',
    image: '',
    isNew: false,
    systemReq: ''
  });

  useEffect(() => {
    if (game) {
      setFormData({
        ...game,
        categories: game.categories ? game.categories.join(', ') : ''
      });
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const dataToSave = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      discount: parseInt(formData.discount) || 0,
      rating: parseFloat(formData.rating) || 5.0,
      categories: formData.categories.split(',').map(c => c.trim()).filter(c => c !== '')
    };
    await onSave(dataToSave);
    setIsSaving(false);
  };

  return (
    <div className="gf-overlay" onClick={onClose}>
      <div className="gf-modal" onClick={e => e.stopPropagation()}>
        <button className="gf-close" onClick={onClose}><X size={20} /></button>
        <h2>{game ? 'Editar Juego' : 'Añadir Nuevo Juego'}</h2>
        
        <form onSubmit={handleSubmit} className="gf-form">
          <div className="gf-group">
            <label>Título del Juego</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          
          <div className="gf-row">
            <div className="gf-group">
              <label>Precio (€)</label>
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="gf-group">
              <label>Descuento (%)</label>
              <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
            </div>
            <div className="gf-group">
              <label>Rating (ej. 4.8)</label>
              <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} />
            </div>
          </div>

          <div className="gf-row">
            <div className="gf-group">
              <label>Género Principal</label>
              <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Ej. Acción / RPG" required />
            </div>
            <div className="gf-group">
              <label>Etiquetas (separadas por coma)</label>
              <input name="categories" value={formData.categories} onChange={handleChange} placeholder="Ej. Mundo Abierto, Terror" />
            </div>
          </div>

          <div className="gf-group">
            <label>URL de la Imagen (Portada/Banner)</label>
            <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." required />
          </div>

          <div className="gf-group">
            <label>Requisitos del Sistema (Usa \n para saltos de línea)</label>
            <textarea name="systemReq" value={formData.systemReq} onChange={handleChange} rows="3" placeholder="OS: Windows 10\nMemory: 8 GB RAM..." />
          </div>

          <div className="gf-checkbox">
            <input type="checkbox" id="isNew" name="isNew" checked={formData.isNew} onChange={handleChange} />
            <label htmlFor="isNew">Marcar como Novedad / Lanzamiento reciente</label>
          </div>

          <div className="gf-actions">
            <button type="button" className="gf-btn-cancel" onClick={onClose} disabled={isSaving}>Cancelar</button>
            <button type="submit" className="gf-btn-save" disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Juego'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameFormModal;
