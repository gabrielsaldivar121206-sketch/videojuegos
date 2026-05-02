import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Lock, Trash2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { featuredGames } from '../data/games';
import './CheckoutPage.css';

// Inicializar Stripe fuera del componente para no recrearlo en cada render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {
  const { cartItems, removeFromCart, cartTotal, addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty container">
        <ShoppingCart size={60} className="empty-icon" />
        <h2>Tu carrito está vacío</h2>
        <p>Añade juegos a tu cesta antes de proceder al pago.</p>
        <Link to="/explore" className="btn-back-store">Ir a la tienda</Link>
      </div>
    );
  }

  const handleProceedToPayment = async () => {
    if (!user) {
      alert('Debes iniciar sesión para completar tu compra.');
      return;
    }
    
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:3001/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems })
      });
      
      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        alert('❌ Error de conexión: Asegúrate de tener el backend corriendo en el puerto 3001.');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Servidor de pagos no disponible. Ejecuta "npm run dev" en la carpeta backend.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page container">
      <div className="checkout-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Volver
        </button>
        <h1>Finalizar Compra</h1>
      </div>

      <div className="checkout-layout">
        {/* LEFT - Items */}
        <div className="checkout-items">
          <h2>Tu Pedido ({cartItems.length} {cartItems.length === 1 ? 'artículo' : 'artículos'})</h2>

          {cartItems.map(item => {
            const finalPrice = item.discount > 0
              ? (Number(item.price) * (1 - item.discount / 100)).toFixed(2)
              : Number(item.price).toFixed(2);

            return (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.title} className="checkout-item-img" />
                <div className="checkout-item-info">
                  <p className="checkout-item-title">{item.title}</p>
                  <p className="checkout-item-platform">PC (Steam) · Descarga digital</p>
                  {item.discount > 0 && (
                    <span className="checkout-discount-badge">-{item.discount}%</span>
                  )}
                </div>
                <div className="checkout-item-price">
                  {item.discount > 0 && (
                    <span className="checkout-original-price">{Number(item.price).toFixed(2)}€</span>
                  )}
                  <span className="checkout-final-price">{finalPrice}€</span>
                </div>
                <button className="checkout-remove-btn" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}

          <div className="checkout-recommendations" style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Recomendados</h2>
            {featuredGames.slice(0, 3).map(game => {
              const recPrice = game.discount > 0 
                ? (game.price * (1 - game.discount / 100)).toFixed(2) 
                : game.price.toFixed(2);
                
              return (
                <div key={`rec-${game.id}`} className="checkout-item rec-item" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'transparent' }}>
                  <img src={game.image} alt={game.title} className="checkout-item-img" style={{ width: '100px', height: '60px', objectFit: 'cover' }} />
                  <div className="checkout-item-info">
                    <p className="checkout-item-title" style={{ fontSize: '0.95rem' }}>{game.title}</p>
                    <p className="checkout-item-platform">Steam</p>
                    <p style={{ marginTop: '6px', color: '#fff', fontWeight: '500', fontSize: '0.9rem' }}>{recPrice} €</p>
                  </div>
                  <button className="rec-add-btn" onClick={() => addToCart(game)} style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#ccc',
                    width: '36px', height: '36px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}>
                    <ShoppingCart size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT - Summary */}
        <div className="checkout-summary">
          <h2>Resumen</h2>

          <div className="summary-rows">
            {cartItems.map(item => {
              const price = item.discount > 0
                ? (Number(item.price) * (1 - item.discount / 100)).toFixed(2)
                : Number(item.price).toFixed(2);
              return (
                <div key={item.id} className="summary-row">
                  <span>{item.title.length > 22 ? item.title.slice(0, 22) + '…' : item.title}</span>
                  <span>{price}€</span>
                </div>
              );
            })}
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>
            <span className="total-highlight">{cartTotal.toFixed(2)}€</span>
          </div>

          {!user && (
            <div className="checkout-login-warning">
              <Lock size={14} /> Inicia sesión para finalizar la compra
            </div>
          )}

          {clientSecret ? (
            <div className="stripe-elements-container" style={{ marginTop: '20px' }}>
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', labels: 'floating' } }}>
                <CheckoutForm totalAmount={cartTotal.toFixed(2)} />
              </Elements>
            </div>
          ) : (
            <button
              className="btn-pay"
              onClick={handleProceedToPayment}
              disabled={!user || isProcessing}
            >
              <Lock size={16} />
              {isProcessing ? 'Conectando con Stripe...' : (user ? 'Pagar de forma segura' : 'Inicia sesión primero')}
            </button>
          )}

          <div className="checkout-trust">
            <ShieldCheck size={14} /> Pago 100% seguro y cifrado
          </div>

          <div className="checkout-accepted-cards">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Google Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
