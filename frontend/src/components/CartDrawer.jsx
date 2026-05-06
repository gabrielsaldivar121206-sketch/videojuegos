import React from 'react';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartItems, isCartOpen, toggleCart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <>
      {isCartOpen && <div className="cart-overlay" onClick={toggleCart}></div>}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingCart size={20} className="text-cyan" />
            <h2>Tu Carrito ({cartItems.length})</h2>
          </div>
          <button className="cart-close-btn" onClick={toggleCart}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon-wrapper">
                <ShoppingCart size={40} className="empty-cart-icon" />
              </div>
              <p>Tu carrito está vacío.</p>
              <button className="btn-continue-shopping" onClick={() => { toggleCart(); navigate('/explore'); }}>
                Explorar Juegos
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const finalPrice = item.discount > 0 
                  ? (Number(item.price) * (1 - item.discount / 100)).toFixed(2) 
                  : Number(item.price || 0).toFixed(2);
                
                return (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4>{item.title}</h4>
                      <p className="cart-item-platform">{item.platform || 'PC'}</p>
                      <p className="cart-item-price">S/ {finalPrice}</p>
                    </div>
                    <button className="cart-delete-btn" onClick={() => removeFromCart(item.id)} title="Eliminar del carrito">
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="total-label">Total estimado</span>
              <span className="total-price">S/ {cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn-checkout-drawer" onClick={handleCheckout}>
              FINALIZAR COMPRA <ArrowRight size={18} />
            </button>
            <p className="cart-secure-text">🔒 Pago seguro garantizado</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
