import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ExitToApp, Home } from '@mui/icons-material';

const AdminNavbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // TODO: Implement actual logout logic
        navigate('/');
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#1a1a1a', mb: 4 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                        <Box component="span" sx={{ fontWeight: 'bold', color: '#fff' }}>
                            JEWELRY SHOP
                        </Box>
                        <Box component="span" sx={{ bgcolor: '#832729', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem' }}>
                            ADMIN
                        </Box>
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/"
                            startIcon={<Home />}
                            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                        >
                            View Site
                        </Button>
                        <Button
                            onClick={handleLogout}
                            startIcon={<ExitToApp />}
                            color="error"
                            variant="contained"
                            color='secondary'
                            sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AdminNavbar;
