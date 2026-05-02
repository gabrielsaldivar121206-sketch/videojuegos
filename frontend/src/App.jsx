import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import GameGrid from './components/GameGrid';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import TrustBar from './components/TrustBar';
import GameSlider from './components/GameSlider';
import BigReviewBanner from './components/BigReviewBanner';
import LatestReviews from './components/LatestReviews';
import TopIndieBanner from './components/TopIndieBanner';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import GameDetails from './pages/GameDetails';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import NotFound from './pages/NotFound';
import ExplorePage from './pages/ExplorePage';
import PlatformPage from './pages/PlatformPage';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  return (
    <>
      {!query && <Hero />}
      <GameGrid />
      {!query && <TrustBar />}
      {!query && <GameSlider title="Reservas" startIndex={8} endIndex={11} />}
      {!query && <GameSlider title="Te recomendamos" startIndex={11} endIndex={14} />}
      {!query && <BigReviewBanner />}
      {!query && <GameSlider title="Más vendidos" startIndex={4} endIndex={7} />}
      {!query && <LatestReviews />}
      {!query && <TopIndieBanner />}
    </>
  );
};

import { useLocation } from 'react-router-dom';

const AppContent = () => {
  const location = useLocation();
  const isLayoutHiddenRoute = location.pathname.startsWith('/admin') || location.pathname === '/success';

  return (
    <div className="app-layout">
      {!isLayoutHiddenRoute && <Navbar />}
      <CartDrawer />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/platform/:platform" element={<PlatformPage />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isLayoutHiddenRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
