import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, FileText, Mail } from 'lucide-react';
import './NotFound.css'; // Usamos los mismos estilos base centrados

const SuccessPage = () => {
  // Generamos una clave de Steam falsa para simular la compra de un producto digital
  const fakeKey = `NEXUS-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  return (
    <div className="notfound-page">
      <div className="notfound-content" style={{ maxWidth: '600px' }}>
        <CheckCircle size={80} color="#00e5ff" style={{ marginBottom: 20 }} />
        <h1>¡Pago completado con éxito!</h1>
        <p style={{ color: '#fff', fontSize: '1.1rem' }}>Gracias por tu compra. La factura y el recibo han sido enviados a tu correo electrónico asociado a tu cuenta de Stripe/Firebase.</p>
        
        <div style={{
          background: 'rgba(0, 229, 255, 0.05)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
          padding: '20px',
          borderRadius: '8px',
          margin: '30px 0',
          textAlign: 'left'
        }}>
          <h3 style={{ margin: '0 0 15px', color: '#00e5ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} /> Tus Claves de Producto (Steam)
          </h3>
          <p style={{ margin: '0 0 5px', color: '#888' }}>Juego adquirido:</p>
          <div style={{
            background: '#0b0c10',
            padding: '15px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            color: '#fff',
            letterSpacing: '2px',
            textAlign: 'center',
            border: '1px dashed #333'
          }}>
            {fakeKey}
          </div>
          <p style={{ margin: '15px 0 0', fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Mail size={14} /> Recibirás instrucciones de activación por email.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link to="/perfil" className="notfound-btn" style={{ background: 'transparent', border: '1px solid #00e5ff', color: '#00e5ff' }}>
            <FileText size={16} style={{ display: 'inline', marginRight: '5px' }}/> Ver Factura
          </Link>
          <Link to="/" className="notfound-btn">Seguir comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
