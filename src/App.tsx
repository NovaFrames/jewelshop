// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </CartProvider>
  );
};

export default App;