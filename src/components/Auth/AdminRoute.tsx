// src/components/Auth/AdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

interface AdminRouteProps {
    children?: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { currentUser, userData, loading, setLoginModalOpen } = useAuth();

    React.useEffect(() => {
        if (!loading && !currentUser) {
            setLoginModalOpen(true);
        }
    }, [loading, currentUser, setLoginModalOpen]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    if (userData?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default AdminRoute;
