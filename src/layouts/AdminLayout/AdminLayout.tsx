import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
    useTheme,
    useMediaQuery,
    Avatar,
    Stack
} from '@mui/material';
import {
    Menu as MenuIcon,
    Inventory,
    ShoppingCart,
    People,
    Category,
    ViewCarousel,
    ExitToApp,
    Home,
} from '@mui/icons-material';

const drawerWidth = 280;

const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const { logout, userData } = useAuth();

    const menuItems = [
        { text: 'Products', icon: <Inventory />, path: '/admin/products' },
        { text: 'Categories', icon: <Category />, path: '/admin/categories' },
        { text: 'Orders', icon: <ShoppingCart />, path: '/admin/orders' },
        { text: 'Users', icon: <People />, path: '/admin/users' },
        { text: 'Banner', icon: <ViewCarousel />, path: '/admin/banner' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    width: 40,
                    height: 40,
                    bgcolor: 'primary.main',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: "white"
                }}>
                    JS
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, fontFamily: 'Playfair Display, serif' }}>
                    JEWELRY SHOP
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.2)' }} />

            <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname.includes(item.path);
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path);
                                    if (isMobile) setMobileOpen(false);
                                }}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? 'secondary.main' : 'transparent',
                                    '&:hover': {
                                        bgcolor: isActive ? 'secondary.light' : 'rgba(255,255,255,0.05)',
                                    },
                                    transition: 'all 0.2s'
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? 'white' : 'rgba(12, 12, 12, 0.7)', minWidth: 45 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        color: isActive ? 'white' : 'rgba(0, 0, 0, 0.7)',
                                    }}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 700 : 500,
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    startIcon={<Home />}
                    component={RouterLink}
                    to="/"
                    sx={{
                        mb: 1
                    }}
                >
                    View Site
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color='secondary'
                    startIcon={<ExitToApp />}
                    onClick={handleLogout}
                    sx={{
                        bgcolor: '#ef4444',
                        '&:hover': { bgcolor: '#dc2626' },
                        textTransform: 'none',
                        borderRadius: 2
                    }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {/* AppBar for Mobile */}
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    bgcolor: 'white',
                    color: 'text.primary',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    borderBottom: '1px solid #e2e8f0'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: '#1e293b' }}>
                        {menuItems.find(item => location.pathname.includes(item.path))?.text || 'Dashboard'}
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                {userData?.name || 'Admin User'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {userData?.role === 'admin' ? 'Administrator' : 'User'}
                            </Typography>
                        </Box>
                        <Avatar
                            src={userData?.avatar}
                            sx={{ bgcolor: 'primary.main', fontWeight: 'bold' }}
                        >
                            {userData?.name?.charAt(0) || 'A'}
                        </Avatar>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, md: 4 },
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: '64px' // Height of AppBar
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;
