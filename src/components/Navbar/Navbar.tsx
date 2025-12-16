// src/components/Navbar/Navbar.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Stack,
  Drawer,
  List,
  ListItem,
  Button,
  Badge,
  Container,
  useScrollTrigger,
  Slide,
  Collapse,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  PersonOutline,
  ShoppingBagOutlined,
  Close,
  StorefrontOutlined,
  DiamondOutlined,
  ExpandLess,
  ExpandMore,
  HelpOutline,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { navItems, type NavItem } from './navbarData';
import MegaMenu from './MegaMenu';
import { AnimatePresence } from 'framer-motion';

interface HideOnScrollProps {
  children: React.ReactElement;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const MobileNavItem = ({ item, onClose }: { item: NavItem; onClose: () => void }) => {
  const [open, setOpen] = useState(false);
  const hasSubmenu = item.hasMegaMenu && item.megaMenuData;

  const handleClick = () => {
    if (hasSubmenu) {
      setOpen(!open);
    } else {
      onClose();
    }
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <Button
          component={hasSubmenu ? 'div' : RouterLink}
          to={hasSubmenu ? undefined : item.path}
          onClick={handleClick}
          fullWidth
          sx={{
            justifyContent: 'space-between',
            color: '#333',
            textTransform: 'none',
            fontWeight: 500,
            py: 1.5,
            px: 2,
            borderBottom: '1px solid #f0f0f0',
            borderRadius: 0,
            '&:hover': {
              bgcolor: '#f5f5f5'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>{item.name}</Typography>
          </Box>
          {hasSubmenu && (open ? <ExpandLess sx={{ color: '#832729' }} /> : <ExpandMore sx={{ color: '#832729' }} />)}
        </Button>
      </ListItem>
      {hasSubmenu && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ bgcolor: '#f9f9f9' }}>
            {/* Show 'Category' tab items by default */}
            {item.megaMenuData?.categories['Category']?.map((subItem) => (
              <ListItemButton
                key={subItem.name}
                component={RouterLink}
                to={subItem.path}
                onClick={onClose}
                sx={{ pl: 4, py: 1 }}
              >
                <ListItemText
                  primary={subItem.name}
                  primaryTypographyProps={{ fontSize: '0.9rem', color: '#555', fontFamily: '"Inter", sans-serif' }}
                />
              </ListItemButton>
            ))}
            <ListItemButton component={RouterLink} to={item.path} onClick={onClose} sx={{ pl: 4, py: 1 }}>
              <ListItemText
                primary={`View All ${item.name}`}
                primaryTypographyProps={{ fontSize: '0.9rem', color: '#832729', fontWeight: 600, fontFamily: '"Inter", sans-serif' }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      )}
    </>
  );
};

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { cartCount } = useCart();
  const timeoutRef = React.useRef<number | null>(null);

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredItem(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setHoveredItem(null);
    }, 100); // 100ms delay to bridge the gap
  };


  return (
    <>
      <HideOnScroll>
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            backgroundColor: '#ffffff',
            zIndex: 1200,
          }}
        >
          {/* Top Row: Logo, Search, Icons */}
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                justifyContent: 'space-between',
                py: 1.5,
                gap: 2,
                minHeight: { xs: 64, md: 80 },
              }}
            >
              {/* Mobile Menu Button */}
              <IconButton
                sx={{ display: { xs: 'flex', md: 'none' } }}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                size="large"
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: '#832729',
                  mr: { xs: 'auto', md: 4 }
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontFamily: '"Playfair Display", serif',
                    lineHeight: 1,
                    letterSpacing: '1px',
                  }}
                >
                  JEWELRY
                </Typography>
                <Box sx={{ width: 40, height: 2, bgcolor: '#832729', mt: 0.5 }} />
              </Box>

              {/* Icons */}
              <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
                <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton size="medium" component={RouterLink} to="/account" sx={{ color: '#832729' }}>
                    <PersonOutline />
                  </IconButton>
                  <IconButton size="medium" component={RouterLink} to="/cart" sx={{ color: '#832729' }}>
                    <Badge badgeContent={cartCount} color="error">
                      <ShoppingBagOutlined />
                    </Badge>
                  </IconButton>
                </Stack>
                {/* Mobile Cart Icon */}
                <IconButton size="medium" component={RouterLink} to="/cart" sx={{ display: { xs: 'flex', md: 'none' }, color: '#832729' }}>
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingBagOutlined />
                  </Badge>
                </IconButton>
              </Stack>
            </Toolbar>

            {/* Bottom Row: Navigation Links (Desktop) */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="center"
                sx={{ py: 1.5 }}
              >
                {navItems.map((item) => (
                  <Box
                    key={item.name}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  // Removed position: relative to allow MegaMenu to span full width
                  >
                    <Button
                      component={RouterLink}
                      to={item.path}
                      startIcon={item.name === 'All Jewellery' ? <DiamondOutlined fontSize="small" /> : null}
                      sx={{
                        color: '#333',
                        fontWeight: 500,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        '&:hover': {
                          color: '#832729',
                          bgcolor: 'transparent',
                        },
                        borderBottom: hoveredItem === item.name ? '2px solid #832729' : '2px solid transparent',
                        borderRadius: 0,
                        pb: 0.5
                      }}
                    >
                      {item.name}
                    </Button>

                    {/* Mega Menu */}
                    <AnimatePresence>
                      {item.hasMegaMenu && hoveredItem === item.name && item.megaMenuData && (
                        <MegaMenu
                          key="mega-menu"
                          data={item.megaMenuData}
                          onClose={handleMouseLeave}
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}
                        />
                      )}
                    </AnimatePresence>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '85%', sm: 350 },
            bgcolor: 'background.default',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Drawer Header */}
          <Box sx={{ p: 2, bgcolor: '#832729', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonOutline />
              <Typography variant="subtitle1" fontWeight={600}>Login / Sign Up</Typography>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <List disablePadding>
              {navItems.map((item) => (
                <MobileNavItem key={item.name} item={item} onClose={() => setMobileOpen(false)} />
              ))}
            </List>
          </Box>

          {/* Drawer Footer */}
          <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderTop: '1px solid #e0e0e0' }}>
            <Stack spacing={2}>
              <Button
                startIcon={<StorefrontOutlined />}
                sx={{ justifyContent: 'flex-start', color: '#555', textTransform: 'none' }}
              >
                Store Locator
              </Button>
              <Button
                startIcon={<HelpOutline />}
                sx={{ justifyContent: 'flex-start', color: '#555', textTransform: 'none' }}
              >
                Help & Support
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;