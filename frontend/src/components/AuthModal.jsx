import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const AuthModal = ({ onClose }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, displayName);
      }
      onClose();
    } catch (err) {
      const messages = {
        'auth/user-not-found': 'No existe una cuenta con ese correo.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/email-already-in-use': 'Ese correo ya está registrado.',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
        'auth/invalid-email': 'Correo electrónico inválido.',
      };
      setError(messages[err.code] || 'Ocurrió un error. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setError('Error al iniciar sesión con Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}><X size={20} /></button>

        <div className="auth-header">
          <div className="auth-logo">🎮</div>
          <h2>{mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <p>{mode === 'login' ? 'Accede a tu biblioteca de juegos' : 'Únete a Vento Gaming'}</p>
        </div>

        <button className="btn-google" onClick={handleGoogle} disabled={loading}>
          <GoogleIcon />
          Continuar con Google
        </button>

        <div className="auth-divider"><span>o</span></div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="input-group">
              <User size={16} className="input-icon" />
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <Mail size={16} className="input-icon" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock size={16} className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? 'Cargando...' : mode === 'login' ? 'Entrar' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login'
            ? <>¿No tienes cuenta? <button onClick={() => { setMode('register'); setError(''); }}>Regístrate gratis</button></>
            : <>¿Ya tienes cuenta? <button onClick={() => { setMode('login'); setError(''); }}>Inicia sesión</button></>
          }
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
