import React from 'react';
import { categoriesData } from '../data/games';
import { ArrowRight } from 'lucide-react';
import './Categories.css';

const Categories = () => {
  return (
    <section className="categories-section container py-section">
      <div className="section-header flex justify-between items-center mb-4">
        <div>
          <h2 className="section-title text-gradient">Explorar Categorías</h2>
          <p className="section-subtitle">Encuentra tu próximo mundo favorito</p>
        </div>
      </div>

      <div className="categories-grid">
        {categoriesData.map(category => (
          <div key={category.id} className="category-card">
            <div className="category-bg">
              <img src={category.image} alt={category.name} />
              <div className="category-overlay"></div>
            </div>
            <div className="category-content">
              <h3>{category.name}</h3>
              <p>{category.count}</p>
              <button className="icon-btn mt-2">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
