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

import theme from './theme/theme';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import UserLayout from './layouts/UserLayout/UserLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

// Pages
import Home from './Pages/User/Home/Home';
import Shop from './Pages/User/Shop/Shop';
import AddToCart from './Pages/User/AddToCart/AddToCart';
import ProductDetails from './Pages/User/ProductDetails/ProductDetails';
import Account from './Pages/User/Account/Account';
import SelectedCategory from './Pages/User/SelectedCategory/SelectedCategory';
import LoginPage from './Pages/LoginPage/LoginPage';

// Admin Pages
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminProducts from './Pages/Admin/AdminProducts';
import AdminCategories from './Pages/Admin/AdminCategories';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Router>
            <Routes>

              {/* ---------------- USER ROUTES ---------------- */}
              <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/all-jewellery" element={<Shop />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<AddToCart />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Categories */}
                <Route path="/earrings" element={<SelectedCategory />} />
                <Route path="/pendants" element={<SelectedCategory />} />
                <Route path="/rings" element={<SelectedCategory />} />
                <Route path="/chains" element={<SelectedCategory />} />
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

              </Route>

              {/* ---------------- ADMIN ROUTES ---------------- */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
              </Route>

            </Routes>
          </Router>

        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
