import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck } from 'lucide-react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import '../pages/CheckoutPage.css'; // Compartimos estilos

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user, refreshProfile } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Evitamos la redirección automática para controlar el flujo nosotros
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      // Pago exitoso!
      try {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const gamesToAdd = cartItems.map(item => ({
            id: item.id,
            title: item.title,
            image: item.image,
            purchasedAt: new Date().toISOString()
          }));
          await updateDoc(userRef, {
            library: arrayUnion(...gamesToAdd)
          });
          await refreshProfile();
        }
      } catch (err) {
        console.error("Error al guardar en biblioteca:", err);
      }
      
      clearCart();
      navigate('/success');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-checkout-form">
      <PaymentElement />
      
      {errorMessage && <div className="stripe-error-message">{errorMessage}</div>}
      
      <button 
        disabled={isProcessing || !stripe || !elements} 
        className="btn-pay" 
        id="submit"
        style={{ marginTop: '20px' }}
      >
          <span id="button-text">
            {isProcessing ? "Procesando el pago..." : `Pagar S/ ${totalAmount} con Stripe`}
          </span>
      </button>
      
      <div className="checkout-trust" style={{ marginTop: '15px' }}>
        <ShieldCheck size={14} /> Pago 100% seguro y cifrado por Stripe
      </div>
    </form>
  );
};

export default CheckoutForm;
