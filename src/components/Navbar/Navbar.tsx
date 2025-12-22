// src/components/Navbar/Navbar.tsx
import React, { useRef, useState, useEffect } from "react";
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
  Collapse,
  ListItemButton,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  PersonOutline,
  ShoppingBagOutlined,
  Close,
  StorefrontOutlined,
  ExpandLess,
  ExpandMore,
  ReceiptLong,
  PhoneOutlined,
  AutoAwesomeOutlined,
  DiamondOutlined,
  FavoriteBorder,
  RadioButtonUnchecked,
  BlurCircular,
  FilterVintageOutlined,
  BrightnessLow,
  CircleOutlined,
} from "@mui/icons-material";
import MobileBottomNav from "./MobileBottomNav";
import { Link as RouterLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { navItems as staticNavItems, type NavItem } from "./navbarData";
import MegaMenu from "./MegaMenu";
import { useScrollDirection } from "./useScrollDirection";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getMaterials } from "../../firebase/categoryService";

/* -------------------- Mobile Nav Item -------------------- */
const MobileNavItem = ({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const hasSubmenu = item.hasMegaMenu && item.megaMenuData;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'StorefrontOutlined': return <StorefrontOutlined />;
      case 'AutoAwesomeOutlined': return <AutoAwesomeOutlined />;
      case 'DiamondOutlined': return <DiamondOutlined />;
      case 'FavoriteBorder': return <FavoriteBorder />;
      case 'RadioButtonUnchecked': return <RadioButtonUnchecked />;
      case 'BlurCircular': return <BlurCircular />;
      case 'FilterVintageOutlined': return <FilterVintageOutlined />;
      case 'BrightnessLow': return <BrightnessLow />;
      case 'CircleOutlined': return <CircleOutlined />;
      default: return <StorefrontOutlined />;
    }
  };

  const handleClick = () => {
    if (hasSubmenu) setOpen(!open);
    else onClose();
  };


  return (
    <>
      <ListItem disablePadding>
        <Button
          component={hasSubmenu ? "div" : RouterLink}
          to={hasSubmenu ? undefined : item.path}
          onClick={handleClick}
          fullWidth
          sx={{
            justifyContent: "space-between",
            textTransform: "none",
            color: "#333",
            py: 1.8,
            px: 2.5,
            borderBottom: "1px solid #f5f5f5",
            "&:active": { bgcolor: "#f9f9f9" },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ color: "#832729", display: 'flex' }}>
              {getIcon(item.icon)}
            </Box>
            <Typography fontWeight={500} sx={{ fontSize: '0.95rem' }}>{item.name}</Typography>
          </Stack>
          {hasSubmenu &&
            (open ? (
              <ExpandLess sx={{ color: "#ccc", fontSize: 20 }} />
            ) : (
              <ExpandMore sx={{ color: "#ccc", fontSize: 20 }} />
            ))}
        </Button>
      </ListItem>

      {hasSubmenu && (
        <Collapse in={open}>
          <List disablePadding sx={{ bgcolor: "#fafafa" }}>
            {Object.values(item.megaMenuData?.categories || {}).flat().map((sub) => (
              <ListItemButton
                key={sub.name}
                component={RouterLink}
                to={sub.path}
                onClick={onClose}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={sub.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

/* -------------------- Navbar -------------------- */
const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const { currentUser, userData, setLoginModalOpen } = useAuth();
  const scrollDir = useScrollDirection();
  const [isAtTop, setIsAtTop] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  // UI Mappings for "Old UI" aesthetics
  const categoryIcons: Record<string, string> = {
    'Earrings': 'FavoriteBorder',
    'Rings': 'RadioButtonUnchecked',
    'Pendants': 'BlurCircular',
    'Chains': 'FilterVintageOutlined',
    'Nose Pin': 'BrightnessLow',
    'Necklaces': 'CircleOutlined',
    'Bangles': 'FilterVintageOutlined',
    'Bracelets': 'BrightnessLow',
    'Gold': 'AutoAwesomeOutlined',
    'Diamond': 'DiamondOutlined',
  };

  // Fetch dynamic nav items
  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const materials = await getMaterials();

        // Transform materials into NavItems
        const dynamicItems: NavItem[] = materials.map(mat => ({
          name: mat.name,
          path: `/${mat.name.toLowerCase()}/all`,
          icon: categoryIcons[mat.name] || 'AutoAwesomeOutlined',
          hasMegaMenu: true,
          megaMenuData: {
            tabs: ['Category'],
            categories: {
              'Category': [
                { name: `All ${mat.name}`, path: `/${mat.name.toLowerCase()}/all` },
                ...(mat.categories || []).map(cat => ({
                  name: cat,
                  path: `/${mat.name.toLowerCase()}/${cat.toLowerCase().replace(/\s+/g, '-')}`
                }))
              ],
            },
            promoImage: mat.name.toLowerCase() === 'gold'
              ? 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw5c76c6f6/header-mega-menu/banner-images/kundan-stories-desktop.jpg'
              : 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dwf47a3eda/header-mega-menu/banner-images/elan-desktop.jpg',
            promoTitle: `Exquisite ${mat.name} Collection`,
            promoLinkText: 'Explore Now',
            bottomBanner: {
              image: 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw4723a799/header-mega-menu/thumbnail-images/all-jew-menu-bottom.png',
              text: `From Classic to Contemporary ${mat.name}.`,
              subText: 'Explore Stunning Designs.',
              buttonText: 'View All',
            }
          }
        }));

        // Get unique categories across all materials for top-level category items
        const allCategories = new Set<string>();
        materials.forEach(mat => {
          if (mat.categories) {
            mat.categories.forEach(cat => allCategories.add(cat));
          }
        });

        const categoryItems: NavItem[] = Array.from(allCategories).map(cat => ({
          name: cat,
          path: `/${cat.toLowerCase().replace(/\s+/g, '-')}`,
          icon: categoryIcons[cat] || 'FavoriteBorder',
          hasMegaMenu: true,
          megaMenuData: {
            tabs: ['Material'],
            categories: {
              'Material': materials
                .filter(mat => mat.categories?.includes(cat))
                .map(mat => ({
                  name: `${mat.name} ${cat}`,
                  path: `/${mat.name.toLowerCase()}/${cat.toLowerCase().replace(/\s+/g, '-')}`
                })),
            },
            promoImage: 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dwf47a3eda/header-mega-menu/banner-images/elan-desktop.jpg',
            promoTitle: `${cat} for Every Occasion`,
            promoLinkText: 'Explore All',
            bottomBanner: {
              image: 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw4723a799/header-mega-menu/thumbnail-images/all-jew-menu-bottom.png',
              text: `Discover the Perfect ${cat}.`,
              subText: 'Exquisite Craftsmanship.',
              buttonText: 'View All',
            }
          }
        }));

        // Combine dynamic materials and categories
        const combinedItems = [
          ...dynamicItems,
          ...categoryItems
        ];

        // Enrich "All Jewellery" mega menu with all materials and categories
        const allJewelleryItem = staticNavItems.find(item => item.name === 'All Jewellery');
        if (allJewelleryItem && allJewelleryItem.megaMenuData) {
          // Add Materials tab
          allJewelleryItem.megaMenuData.tabs = ['Category', 'Material'];
          allJewelleryItem.megaMenuData.categories['Material'] = materials.map(mat => ({
            name: mat.name,
            path: `/${mat.name.toLowerCase()}/all`
          }));
          // Re-import staticTabsData if needed or ensure it's in the categories
        }

        setNavItems(combinedItems);

      } catch (error) {
        console.error("Error fetching nav data:", error);
      }
    };

    fetchNavData();
  }, []);

  // Fetch cart count from Firestore
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!currentUser) {
        setCartCount(0);
        return;
      }

      try {
        const cartRef = doc(db, 'cart', currentUser.uid);
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
          const cartData = cartDoc.data();
          const items = cartData.items || [];
          // Count number of unique products, not total quantity
          setCartCount(items.length);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
        setCartCount(0);
      }
    };

    fetchCartCount();

    // Refresh cart count every 5 seconds when user is on the page
    const interval = setInterval(fetchCartCount, 5000);
    return () => clearInterval(interval);
  }, [currentUser]);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredItem(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setHoveredItem(null);
    }, 120);
  };

  const handleProfileClick = () => {
    if (currentUser) {
      // Navigate to account if logged in
      window.location.href = '/account';
    } else {
      // Open login modal if not logged in
      setLoginModalOpen(true);
    }
  };
  const text =
    "🚚 Free shipping above ₹2000 with secure payments, easy returns, fast delivery, premium quality products, and trusted customer support";

  return (
    <>
      {/* -------------------- APP BAR -------------------- */}
      <AppBar
        position="fixed"
        elevation={0}
        color="inherit"
        sx={{
          bgcolor: "#ffffff",
          zIndex: 1200,
          transition: "all 0.3s ease",
        }}
      >
        {/* ---------- Top Utility Bar ---------- */}
        <Collapse in={isAtTop} timeout={300}>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <Container maxWidth="xl" sx={{ overflow: "hidden" }}>
              <Box
                sx={{
                  display: "flex",
                  width: "max-content",
                  animation: "marquee 30s linear infinite",
                  "@keyframes marquee": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                  },
                }}
              >
                {/* First set */}
                <Box sx={{ display: "flex", whiteSpace: "nowrap" }}>
                  <Typography variant="body2" sx={{ fontWeight: 400, mx: 4 }}>
                    {text}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 400, mx: 4 }}>
                    {text}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 400, mx: 4 }}>
                    {text}
                  </Typography>
                </Box>

                {/* Duplicate set for seamless loop */}
                <Box sx={{ display: "flex", whiteSpace: "nowrap" }}>
                  <Typography variant="body2" sx={{ fontWeight: 400, mx: 4 }}>
                    {text}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 400, mx: 4 }}>
                    {text}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 400, mx: 4 }}>
                    {text}
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>
        </Collapse>

        {/* ---------- Main Header ---------- */}
        <Box sx={{ borderBottom: "1px solid #eee" }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ minHeight: { xs: 64, md: 90 }, justifyContent: "space-between" }} disableGutters>
              {/* Left */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  sx={{ display: { xs: "flex", md: "none" } }}
                  onClick={() => setMobileOpen(true)}
                >
                  <MenuIcon />
                </IconButton>

                <Button
                  component={RouterLink}
                  to="/contact"
                  startIcon={<PhoneOutlined />}
                  sx={{ display: { xs: "none", md: "flex" }, color: "#333", textTransform: "none" }}
                >
                  Contact Us
                </Button>
              </Box>

              {/* Logo */}
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  textAlign: "center",
                  textDecoration: "none",
                  color: "#832729",
                  position: { xs: "relative", md: "absolute" },
                  left: { md: "50%" },
                  transform: { md: "translateX(-50%)" },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    letterSpacing: 2,
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  JEWELRY
                </Typography>
                <Typography variant="caption" letterSpacing={3} sx={{ color: "#555", fontSize: "0.6rem" }}>
                  EST. 2024
                </Typography>
              </Box>

              {/* Right */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                {currentUser && userData?.role === "admin" ? (
                  <Button
                    component={RouterLink}
                    to="/admin"
                    startIcon={<PersonOutline />}
                    sx={{ display: { xs: "none", md: "flex" }, color: "#333", textTransform: "none" }}
                  >
                    Admin
                  </Button>
                ) : null}

                <Stack direction="row" spacing={1}>
                  <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Button
                      onClick={handleProfileClick}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      {currentUser && userData ? (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar
                            src={userData.avatar}
                            sx={{ width: 32, height: 32 }}
                          />
                          <Typography variant="body2" sx={{ display: { xs: 'none', lg: 'block' } }}>
                            {userData.name}
                          </Typography>
                        </Stack>
                      ) : (
                        <PersonOutline />
                      )}
                    </Button>
                  </Stack>
                  <IconButton component={RouterLink} to="/orders">
                    <ReceiptLong />
                  </IconButton>
                  <IconButton component={RouterLink} to="/cart">
                    <Badge
                      badgeContent={cartCount}
                      sx={{ "& .MuiBadge-badge": { bgcolor: "#832729", color: "white" } }}
                    >
                      <ShoppingBagOutlined />
                    </Badge>
                  </IconButton>
                </Stack>
              </Box>
            </Toolbar>
          </Container>
        </Box>

        {/* ---------- Desktop Navigation ---------- */}
        <Collapse in={isAtTop || scrollDir === "up"} timeout={300}>
          <Box sx={{ display: { xs: "none", md: "block" }, borderBottom: "1px solid #eee" }}>
            <Container maxWidth="xl">
              <Stack direction="row" justifyContent="center" spacing={5}>
                {/* Hardcoded All Jewellery */}
                {staticNavItems.find(item => item.name === 'All Jewellery') && (
                  <Box
                    onMouseEnter={() => handleMouseEnter('All Jewellery')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Button
                      component={RouterLink}
                      to="/all-jewellery"
                      sx={{
                        textTransform: "uppercase",
                        py: 2,
                        color: "#333",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        letterSpacing: "1px",
                        borderBottom:
                          hoveredItem === 'All Jewellery'
                            ? "2px solid #832729"
                            : "2px solid transparent",
                        "&:hover": {
                          color: "#832729",
                          bgcolor: "transparent",
                        },
                        borderRadius: 0,
                      }}
                    >
                      All Jewellery
                    </Button>

                    <AnimatePresence>
                      {hoveredItem === 'All Jewellery' && (
                        <MegaMenu
                          data={staticNavItems.find(item => item.name === 'All Jewellery')!.megaMenuData!}
                          onMouseEnter={() => handleMouseEnter('All Jewellery')}
                          onMouseLeave={handleMouseLeave}
                          onClose={handleMouseLeave}
                        />
                      )}
                    </AnimatePresence>
                  </Box>
                )}

                {navItems.slice(0, 8).map((item) => (
                  <Box
                    key={item.name}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Button
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        textTransform: "uppercase",
                        py: 2,
                        color: "#333",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        letterSpacing: "1px",
                        borderBottom:
                          hoveredItem === item.name
                            ? "2px solid #832729"
                            : "2px solid transparent",
                        "&:hover": {
                          color: "#832729",
                          bgcolor: "transparent",
                        },
                        borderRadius: 0,
                      }}
                    >
                      {item.name}
                    </Button>

                    <AnimatePresence>
                      {item.hasMegaMenu &&
                        hoveredItem === item.name &&
                        item.megaMenuData && (
                          <MegaMenu
                            data={item.megaMenuData}
                            onMouseEnter={() => handleMouseEnter(item.name)}
                            onMouseLeave={handleMouseLeave}
                            onClose={handleMouseLeave}
                          />
                        )}
                    </AnimatePresence>
                  </Box>
                ))}
              </Stack>
            </Container>
          </Box>
        </Collapse>
      </AppBar>

      {/* ---------- SPACER ---------- */}
      <Box sx={{ height: { xs: "90px", md: "176px" } }} />

      {/* -------------------- MOBILE DRAWER -------------------- */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "85%", sm: 350 },
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }
        }}
      >
        {/* Header */}
        <Box sx={{ p: 3, bgcolor: "#fff", borderBottom: "1px solid #eee" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#832729", fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
              JEWELRY
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#333", bgcolor: '#f5f5f5' }}>
              <Close fontSize="small" />
            </IconButton>
          </Stack>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              cursor: 'pointer',
              p: 2,
              bgcolor: '#fcf8f8',
              borderRadius: 2,
              border: '1px solid #f0e6e6'
            }}
            onClick={() => {
              setMobileOpen(false);
              handleProfileClick();
            }}
          >
            {currentUser && userData ? (
              <>
                <Avatar src={userData.avatar} sx={{ width: 45, height: 45, border: '2px solid #832729' }} />
                <Box>
                  <Typography fontWeight={600} color="#333">{userData.name}</Typography>
                  <Typography variant="caption" color="textSecondary">View Profile</Typography>
                </Box>
              </>
            ) : (
              <>
                <Avatar sx={{ bgcolor: '#832729', width: 45, height: 45 }}>
                  <PersonOutline />
                </Avatar>
                <Box>
                  <Typography fontWeight={600} color="#333">Welcome Guest</Typography>
                  <Typography variant="caption" color="textSecondary">Login / Signup to your account</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>

        {/* Menu */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', pb: 8 }}>
          <Typography variant="overline" sx={{ px: 3, color: '#999', fontWeight: 600 }}>
            Shop By Category
          </Typography>
          <List disablePadding>
            {/* Hardcoded All Jewellery */}
            {staticNavItems.find(item => item.name === 'All Jewellery') && (
              <MobileNavItem
                item={staticNavItems.find(item => item.name === 'All Jewellery')!}
                onClose={() => setMobileOpen(false)}
              />
            )}
            {navItems.slice(0, 9).map((item) => (
              <MobileNavItem
                key={item.name}
                item={item}
                onClose={() => setMobileOpen(false)}
              />
            ))}
          </List>
        </Box>
      </Drawer>

      {/* -------------------- MOBILE BOTTOM NAV -------------------- */}
      <MobileBottomNav
        cartCount={cartCount}
        onOpenDrawer={() => setMobileOpen(true)}
        onProfileClick={handleProfileClick}
      />

      {/* Login Modal removed as it is now global in App.tsx */}
    </>
  );
};

export default Navbar;
