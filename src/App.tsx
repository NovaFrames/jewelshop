// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar/Navbar';
import CollectionsPage from './Pages/Home/Collections';
import ContactPage from './Pages/Home/ContactPage';
import Footer from './components/Footer/Footer';
import { CartProvider } from './contexts/CartContext';
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import AddToCart from './Pages/AddToCart/AddToCart';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Account from './Pages/Account/Account';
import AdminProducts from './Pages/Admin/AdminProducts';
import AdminLayout from './Pages/Admin/AdminLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminCategories from './Pages/Admin/AdminCategories';

// Placeholder About Page
const AboutPage: React.FC = () => (
  <Box sx={{ minHeight: '100vh', pt: 4 }}>
    <Typography variant="h1">About Page</Typography>
  </Box>
);

const App: React.FC = () => {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Routes>
              {/* Admin Routes - Separate Layout */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="orders" element={<Box sx={{ p: 3 }}><Typography variant="h4">Orders Management (Coming Soon)</Typography></Box>} />
                <Route path="users" element={<Box sx={{ p: 3 }}><Typography variant="h4">User Management (Coming Soon)</Typography></Box>} />
              </Route>

              {/* Public Routes - Main Layout */}
              <Route path="*" element={
                <>
                  <Navbar />
                  <Box component="main" sx={{ flexGrow: 1 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:productId" element={<ProductDetails />} />
                      <Route path="/collections" element={<CollectionsPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/cart" element={<AddToCart />} />
                      <Route path="/account" element={<Account />} />
                    </Routes>
                  </Box>
                  <Footer />
                </>
              } />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </CartProvider>
  );
};

export default App;