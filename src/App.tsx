// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import GlobalSnackbar from './components/Common/GlobalSnackbar';

// Layouts
import UserLayout from './layouts/UserLayout/UserLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

// User Pages
import Home from './Pages/User/Home/Home';
import Shop from './Pages/User/Shop/Shop';
import ProductDetails from './Pages/User/ProductDetails/ProductDetails';
import AddToCart from './Pages/User/AddToCart/AddToCart';
import Orders from './Pages/User/Orders/Orders';
import Account from './Pages/User/Account/Account';
import SelectedCategory from './Pages/User/SelectedCategory/SelectedCategory';
import ContactPage from './Pages/User/ContactPage/ContactPage';

// Admin Pages
import AdminProducts from './Pages/Admin/AdminProducts';
import AdminOrders from './Pages/Admin/AdminOrders';
import AdminCategories from './Pages/Admin/AdminCategories';
import AdminUsers from './Pages/Admin/AdminUsers';
import AdminBanner from './Pages/Admin/AdminBanner';
import AdminGoldMultiplier from './Pages/Admin/AdminGoldMultiplier';

// Auth Components
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminRoute from './components/Auth/AdminRoute';
import LoginModal from './components/Auth/LoginModal';
import ScrollToTop from './components/Common/ScrollToTop';
import theme from './theme/theme';

const AppContent = () => {
  const { loginModalOpen, setLoginModalOpen } = useAuth();

  const handleClose = React.useCallback(() => {
    setLoginModalOpen(false);
  }, [setLoginModalOpen]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="banner" element={<AdminBanner />} />
            <Route path="gold-rate" element={<AdminGoldMultiplier />} />
          </Route>
        </Route>

        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all-jewellery" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Dynamic Categories */}
          <Route path="/:material/:category" element={<SelectedCategory />} />
          <Route path="/:category" element={<SelectedCategory />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/orders" element={<Orders />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <LoginModal
        open={loginModalOpen}
        onClose={handleClose}
      />
      <GlobalSnackbar />
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SnackbarProvider>
          <CartProvider>
            <Router>
              <AppContent />
            </Router>
          </CartProvider>
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
