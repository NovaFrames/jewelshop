// src/components/Navbar.tsx
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
  ListItemText,
  Button,
  Badge,
  Container,
  useScrollTrigger,
  Slide,
  alpha,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  FavoriteBorder,
  PersonOutline,
  ShoppingBagOutlined,
  Close,
  Search as SearchIcon,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

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

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const categories = [
    { name: 'Necklaces', path: '/collections/necklaces' },
    { name: 'Earrings', path: '/collections/earrings' },
    { name: 'Rings', path: '/collections/rings' },
    { name: 'Bracelets', path: '/collections/bracelets' },
    { name: 'Watches', path: '/collections/watches' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchTerm = formData.get('search') as string;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setSearchOpen(false);
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
            backdropFilter: 'blur(10px)',
            backgroundColor: alpha('#ffffff', 0.95),
            transition: 'all 0.3s ease',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                justifyContent: 'space-between',
                py: { xs: 1, md: 2 },
                gap: 2,
              }}
            >
              {/* Mobile Menu Button */}
              <IconButton
                sx={{ display: { xs: 'flex', md: 'none' } }}
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                size="large"
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Typography
                component={RouterLink}
                to="/"
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  textDecoration: 'none',
                  letterSpacing: '2px',
                  mr: { xs: 'auto', md: 0 },
                  ml: { xs: 2, md: 0 },
                }}
              >
                JEWELRY
              </Typography>

              {/* Desktop Menu */}
              <Stack
                direction="row"
                spacing={3}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                }}
              >
                {menuItems.slice(0, 1).map((item) => (
                  <Button
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: isActive(item.path) ? 'primary.main' : 'text.primary',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      position: 'relative',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}

                {/* Collections Dropdown */}
                <Button
                  onClick={handleMenuOpen}
                  sx={{
                    color: location.pathname.includes('/collections')
                      ? 'primary.main'
                      : 'text.primary',
                    fontWeight: location.pathname.includes('/collections') ? 600 : 400,
                  }}
                  endIcon={<KeyboardArrowDown />}
                >
                  Collections
                </Button>

                {menuItems.slice(2).map((item) => (
                  <Button
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: isActive(item.path) ? 'primary.main' : 'text.primary',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      position: 'relative',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Stack>

              {/* Icons */}
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Search"
                  size="large"
                >
                  <SearchIcon />
                </IconButton>
                <IconButton aria-label="Wishlist" component={RouterLink} to="/wishlist" size="large">
                  <Badge badgeContent={2} color="primary">
                    <FavoriteBorder />
                  </Badge>
                </IconButton>
                <IconButton aria-label="Account" component={RouterLink} to="/account" size="large">
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                    <PersonOutline />
                  </Avatar>
                </IconButton>
                <IconButton aria-label="Cart" component={RouterLink} to="/cart" size="large">
                  <Badge badgeContent={cartCount} color="primary">
                    <ShoppingBagOutlined />
                  </Badge>
                </IconButton>
              </Stack>
            </Toolbar>

            {/* Search Bar */}
            {searchOpen && (
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  py: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  animation: 'slideDown 0.3s ease',
                  '@keyframes slideDown': {
                    from: { opacity: 0, transform: 'translateY(-20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                <InputBase
                  name="search"
                  placeholder="Search for jewelry, collections, or categories..."
                  autoFocus
                  fullWidth
                  sx={{
                    maxWidth: 600,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:focus-within': {
                      borderColor: 'primary.main',
                    },
                  }}
                  endAdornment={
                    <IconButton type="submit" sx={{ ml: 1 }}>
                      <SearchIcon />
                    </IconButton>
                  }
                />
              </Box>
            )}
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Collections Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category.name}
            component={RouterLink}
            to={category.path}
            onClick={handleMenuClose}
            sx={{
              py: 1.5,
              px: 3,
              '&:hover': {
                backgroundColor: 'primary.50',
              },
            }}
          >
            <ListItemText
              primary={category.name}
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 320 },
            bgcolor: 'background.default',
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              JEWELRY
            </Typography>
            <IconButton onClick={() => setOpen(false)} size="large">
              <Close />
            </IconButton>
          </Box>

          <List sx={{ flex: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                <Button
                  component={RouterLink}
                  to={item.path}
                  fullWidth
                  onClick={() => setOpen(false)}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    bgcolor: isActive(item.path) ? 'primary.50' : 'transparent',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    '&:hover': {
                      bgcolor: 'primary.50',
                    },
                  }}
                >
                  {item.name}
                </Button>
              </ListItem>
            ))}

            <Typography variant="subtitle2" sx={{ px: 2, py: 2, color: 'text.secondary' }}>
              Categories
            </Typography>
            {categories.map((category) => (
              <ListItem key={category.name} disablePadding sx={{ mb: 0.5 }}>
                <Button
                  component={RouterLink}
                  to={category.path}
                  fullWidth
                  onClick={() => setOpen(false)}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1,
                    px: 2,
                    pl: 4,
                    borderRadius: 1,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'primary.50',
                    },
                  }}
                >
                  {category.name}
                </Button>
              </ListItem>
            ))}
          </List>

          <Box sx={{ pt: 4, borderTop: 1, borderColor: 'divider' }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <IconButton component={RouterLink} to="/wishlist">
                <FavoriteBorder />
              </IconButton>
              <IconButton component={RouterLink} to="/account">
                <PersonOutline />
              </IconButton>
              <IconButton component={RouterLink} to="/cart">
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingBagOutlined />
                </Badge>
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;