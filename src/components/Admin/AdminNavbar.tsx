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
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', mb: 4 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                        <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }}>
                            JEWELRY SHOP
                        </Box>
                        <Box component="span" sx={{ bgcolor: 'primary.main', color: 'white', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 600 }}>
                            ADMIN
                        </Box>
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/"
                            startIcon={<Home />}
                            sx={{ color: 'text.primary' }}
                        >
                            View Site
                        </Button>
                        <Button
                            onClick={handleLogout}
                            startIcon={<ExitToApp />}
                            color="primary"
                            variant="outlined"
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
