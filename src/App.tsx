// src/App.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography } from '@mui/material';

import theme from './theme/theme';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import AddToCart from './Pages/AddToCart/AddToCart';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Account from './Pages/Account/Account';
import SelectedCategory from './Pages/SelectedCategory/SelectedCategory';
import LoginPage from './Pages/LoginPage/LoginPage';

// Admin
import AdminLayout from './Pages/Admin/AdminLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminProducts from './Pages/Admin/AdminProducts';
import AdminCategories from './Pages/Admin/AdminCategories';

// Placeholder About Page
const AboutPage: React.FC = () => (
  <Box sx={{ minHeight: '100vh', pt: 4 }}>
    <Typography variant="h1">About Page</Typography>
  </Box>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Router>
            {/* ROOT WRAPPER — NO overflow / NO transform */}
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

              {/* 🔥 NAVBAR — OUTSIDE ROUTES (IMPORTANT) */}
              <Navbar />

              {/* MAIN CONTENT — PAGE SCROLLS HERE */}
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route
                      path="orders"
                      element={
                        <Box sx={{ p: 3 }}>
                          <Typography variant="h4">
                            Orders Management (Coming Soon)
                          </Typography>
                        </Box>
                      }
                    />
                    <Route
                      path="users"
                      element={
                        <Box sx={{ p: 3 }}>
                          <Typography variant="h4">
                            User Management (Coming Soon)
                          </Typography>
                        </Box>
                      }
                    />
                  </Route>

                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/all-jewellery" element={<Shop />} />
                  <Route path="/product/:productId" element={<ProductDetails />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/cart" element={<AddToCart />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/login" element={<LoginPage />} />

                  {/* Category Routes */}
                  <Route path="/earrings" element={<SelectedCategory />} />
                  <Route path="/pendants" element={<SelectedCategory />} />
                  <Route path="/rings" element={<SelectedCategory />} />
                  <Route path="/chains" element={<SelectedCategory />} />
                  <Route path="/nose-pin" element={<SelectedCategory />} />
                  <Route path="/necklaces" element={<SelectedCategory />} />
                  <Route path="/bangles" element={<SelectedCategory />} />
                  <Route path="/bracelets" element={<SelectedCategory />} />

                  {/* Gold */}
                  <Route path="/gold/all" element={<SelectedCategory />} />
                  <Route path="/gold/bangles" element={<SelectedCategory />} />
                  <Route path="/gold/bracelets" element={<SelectedCategory />} />
                  <Route path="/gold/earrings" element={<SelectedCategory />} />
                  <Route path="/gold/chains" element={<SelectedCategory />} />
                  <Route path="/gold/rings" element={<SelectedCategory />} />
                  <Route path="/gold/necklaces" element={<SelectedCategory />} />
                  <Route path="/gold/nose-pins" element={<SelectedCategory />} />

                  {/* Diamond */}
                  <Route path="/diamond/all" element={<SelectedCategory />} />
                  <Route path="/diamond/bangles" element={<SelectedCategory />} />
                  <Route path="/diamond/bracelets" element={<SelectedCategory />} />
                  <Route path="/diamond/earrings" element={<SelectedCategory />} />
                  <Route path="/diamond/chains" element={<SelectedCategory />} />
                  <Route path="/diamond/rings" element={<SelectedCategory />} />
                  <Route path="/diamond/necklaces" element={<SelectedCategory />} />
                  <Route path="/diamond/nose-pins" element={<SelectedCategory />} />

                </Routes>
              </Box>

              {/* FOOTER */}
              <Footer />

            </Box>
          </Router>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
