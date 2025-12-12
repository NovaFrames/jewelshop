// src/components/Footer.tsx
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Pinterest,
  Twitter,
  Email,
  Phone,
  LocationOn,
  ArrowForward,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Best Sellers', href: '/best-sellers' },
    { label: 'Sale', href: '/sale' },
  ];

  const categories = [
    { label: 'Necklaces', href: '/collections/necklaces' },
    { label: 'Earrings', href: '/collections/earrings' },
    { label: 'Rings', href: '/collections/rings' },
    { label: 'Bracelets', href: '/collections/bracelets' },
    { label: 'Watches', href: '/collections/watches' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Return Policy', href: '/returns' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Brand Column */}
          <Grid size={{xs:12,md:4}}>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 700,
                letterSpacing: '2px',
              }}
            >
              JEWELRY
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, opacity: 0.8 }}>
              Timeless elegance meets modern luxury. We craft jewelry pieces
              that tell your unique story with exceptional quality and design.
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
              {[
                { icon: <Facebook />, href: '#' },
                { icon: <Instagram />, href: '#' },
                { icon: <Pinterest />, href: '#' },
                { icon: <Twitter />, href: '#' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid size={{xs:12,md:2}}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Shop
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.href}
                  color="inherit"
                  underline="hover"
                  sx={{
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Categories */}
          <Grid size={{xs:12,md:2}}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Categories
            </Typography>
            <Stack spacing={1.5}>
              {categories.map((category) => (
                <Link
                  key={category.label}
                  component={RouterLink}
                  to={category.href}
                  color="inherit"
                  underline="hover"
                  sx={{
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  {category.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company */}
          <Grid size={{xs:12,md:2}}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Company
            </Typography>
            <Stack spacing={1.5}>
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.href}
                  color="inherit"
                  underline="hover"
                  sx={{
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Newsletter */}
          <Grid size={{xs:12,md:2}}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Stay Updated
            </Typography>
            <Box component="form">
              <TextField
                fullWidth
                placeholder="Your email"
                variant="outlined"
                size="small"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                endIcon={<ArrowForward />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Bar */}
        <Grid container spacing={2} alignItems="center">
          <Grid size={{xs:12,md:6}}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              &copy; {new Date().getFullYear()} Jewelry Store. All rights reserved.
            </Typography>
          </Grid>
          <Grid size={{xs:12,md:6}}>
            <Stack
              direction="row"
              spacing={3}
              justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
              sx={{ flexWrap: 'wrap', gap: 2 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone sx={{ fontSize: 16, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  +1 (555) 123-4567
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Email sx={{ fontSize: 16, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  support@jewelry.com
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOn sx={{ fontSize: 16, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  New York, NY
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;