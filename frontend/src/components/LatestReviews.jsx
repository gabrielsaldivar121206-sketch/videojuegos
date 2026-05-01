import React from 'react';
import { ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import './LatestReviews.css';

const LatestReviews = () => {
  const reviews = [
    {
      id: 1,
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1084160/header.jpg',
      avatar: 'https://i.pravatar.cc/150?img=11',
      positive: true,
      text: 'Muy mejor que el primero, las runs ya no se limitan a ser siempre los mismos pisos con distribución diferente y le han dado unas ligeras pinceladas extra de...'
    },
    {
      id: 2,
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2338770/header.jpg',
      avatar: 'https://i.pravatar.cc/150?img=12',
      positive: false,
      text: 'Una copia del año anterior, el mismo juego de todos los años solo que con mejores gráficos y las mismas cosas de siempre, también te digo de tanto...'
    },
    {
      id: 3,
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
      avatar: 'https://i.pravatar.cc/150?img=33',
      positive: false,
      text: 'Vigilad con el precio, os aparece más barato porque no aplican los impuestos, te los suman después... Cuidado. El juego nada que decir, es de los...'
    },
    {
      id: 4,
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/header.jpg',
      avatar: 'https://i.pravatar.cc/150?img=44',
      positive: true,
      text: 'Muy buen juego. Estética preciosa, historia bonita y dificultad moderada, sin ser un juego fácil tampoco es una locura de dificultad, de modo que te...'
    }
  ];

  return (
    <section className="latest-reviews-section container">
      <div className="lr-header">
        <h2 className="lr-title flex items-center">
          Últimas reseñas <ChevronRight size={20} className="lr-arrow-icon" />
        </h2>
      </div>
      
      <div className="lr-grid">
        {reviews.map(review => (
          <div key={review.id} className="lr-card">
            <div className="lr-image">
              <img src={review.image} alt="Game Banner" />
            </div>
            <div className="lr-content">
              <div className="lr-user-info">
                <div className="lr-avatar">
                  <img src={review.avatar} alt="User Avatar" />
                </div>
                {review.positive ? (
                  <ThumbsUp size={20} className="lr-thumb positive" />
                ) : (
                  <ThumbsDown size={20} className="lr-thumb negative" />
                )}
              </div>
              <p className="lr-text">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;
