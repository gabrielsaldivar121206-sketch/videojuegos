import React from 'react';
import { Star } from 'lucide-react';
import { testimonialsData } from '../data/games';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials-section container py-section" id="community">
      <div className="text-center mb-4">
        <h2 className="section-title text-gradient">Voces de la Comunidad</h2>
        <p className="section-subtitle">Lo que dicen nuestros jugadores más dedicados</p>
      </div>

      <div className="testimonials-grid">
        {testimonialsData.map(testimonial => (
          <div key={testimonial.id} className="testimonial-card glass-panel">
            <div className="stars flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author flex items-center gap-2 mt-4">
              <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
              <div>
                <h4 className="author-name">{testimonial.name}</h4>
                <p className="author-role">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
