// src/layouts/UserLayout.tsx
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const UserLayout = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );
};

export default UserLayout;
