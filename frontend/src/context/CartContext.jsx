import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('nexus_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Guardar en localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (game) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === game.id);
      if (existing) {
        return prev; // Already in cart
      }
      return [...prev, game];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cartItems.reduce((total, game) => {
    const finalPrice = game.discount > 0 
      ? Number(game.price || 0) * (1 - game.discount / 100) 
      : Number(game.price || 0);
    return total + finalPrice;
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart,
      isCartOpen, 
      toggleCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
