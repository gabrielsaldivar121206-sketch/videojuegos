import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import './NotFound.css';

const NotFound = () => (
  <div className="notfound-page">
    <div className="notfound-content">
      <div className="notfound-code">404</div>
      <Gamepad2 size={60} className="notfound-icon" />
      <h1>Página no encontrada</h1>
      <p>El enlace que buscas no existe o fue eliminado. Pero hay miles de juegos esperándote.</p>
      <Link to="/" className="notfound-btn">Volver a la tienda</Link>
    </div>
  </div>
);

export default NotFound;
