// src/components/Footer.tsx
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
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
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const shopLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Jewellery', href: '/all-jewellery' },
    { label: 'My Account', href: '/account' },
    { label: 'My Orders', href: '/orders' },
    { label: 'Cart', href: '/cart' },
  ];

  const categories = [
    { label: 'Earrings', href: '/earrings' },
    { label: 'Rings', href: '/rings' },
    { label: 'Necklaces', href: '/necklaces' },
    { label: 'Bangles', href: '/bangles' },
    { label: 'Bracelets', href: '/bracelets' },
  ];

  const companyLinks = [
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 6 },
        bgcolor: '#fdfbf7',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"DM Sans", serif',
                letterSpacing: 2,
                mb: 3,
                fontWeight: 700,
                color: 'primary.main',
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
            >
              JEWELRY
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary', maxWidth: 300 }}>
              Timeless elegance meets modern luxury. We craft jewelry pieces
              that tell your unique story with exceptional quality and design.
            </Typography>

            <Stack direction="row" spacing={1.5}>
              {[
                { icon: <Facebook fontSize="small" />, href: '#' },
                { icon: <Instagram fontSize="small" />, href: '#' },
                { icon: <Pinterest fontSize="small" />, href: '#' },
                { icon: <Twitter fontSize="small" />, href: '#' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'rgba(125, 60, 60, 0.05)',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Shop Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 700, color: 'text.primary' }}>
              Shop
            </Typography>
            <Stack spacing={1.5}>
              {shopLinks.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.href}
                  color="text.secondary"
                  underline="none"
                  sx={{
                    fontSize: '0.875rem',
                    '&:hover': { color: 'secondary.main' },
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Categories */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 700, color: 'text.primary' }}>
              Categories
            </Typography>
            <Stack spacing={1.5}>
              {categories.map((category) => (
                <Link
                  key={category.label}
                  component={RouterLink}
                  to={category.href}
                  color="text.secondary"
                  underline="none"
                  sx={{
                    fontSize: '0.875rem',
                    '&:hover': { color: 'secondary.main' },
                    transition: 'color 0.2s ease',
                  }}
                >
                  {category.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company & Contact */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 700, color: 'text.primary' }}>
              Contact Us
            </Typography>
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <LocationOn sx={{ color: 'secondary.main', fontSize: 20, mt: 0.3 }} />
                <Typography variant="body2" color="text.secondary">
                  123 Jewelry Avenue, Luxury District,<br />
                  New York, NY 10001
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Phone sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Email sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  support@jewelry.com
                </Typography>
              </Stack>
              <Box sx={{ pt: 1 }}>
                {companyLinks.map((link) => (
                  <Link
                    key={link.label}
                    component={RouterLink}
                    to={link.href}
                    color="text.secondary"
                    underline="none"
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      '&:hover': { color: 'secondary.main' },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, opacity: 0.5 }} />

        {/* Bottom Bar */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Jewelry Store. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" underline="none" color="text.secondary" sx={{ fontSize: '0.75rem' }}>Privacy Policy</Link>
            <Link href="#" underline="none" color="text.secondary" sx={{ fontSize: '0.75rem' }}>Terms of Service</Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;