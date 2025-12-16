import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Tab, Tabs, Paper } from '@mui/material';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { Inventory, Dashboard, ShoppingCart, People, Category } from '@mui/icons-material';

const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    // Map routes to tab indices
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/admin/products')) {
            setValue(1);
        } else if (path.includes('/admin/categories')) {
            setValue(2);
        } else if (path.includes('/admin/orders')) {
            setValue(3);
        } else if (path.includes('/admin/users')) {
            setValue(4);
        } else {
            setValue(0); // Dashboard
        }
    }, [location]);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/admin/dashboard');
                break;
            case 1:
                navigate('/admin/products');
                break;
            case 2:
                navigate('/admin/categories');
                break;
            case 3:
                navigate('/admin/orders');
                break;
            case 4:
                navigate('/admin/users');
                break;
            default:
                break;
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <AdminNavbar />
            <Container maxWidth="xl">
                <Paper sx={{ mb: 3 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: 64,
                                textTransform: 'none',
                                fontSize: '1rem',
                            },
                            '& .Mui-selected': {
                                color: '#832729 !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#832729',
                            }
                        }}
                    >
                        <Tab icon={<Dashboard />} iconPosition="start" label="Dashboard" />
                        <Tab icon={<Inventory />} iconPosition="start" label="Products" />
                        <Tab icon={<Category />} iconPosition="start" label="Categories" />
                        <Tab icon={<ShoppingCart />} iconPosition="start" label="Orders" />
                        <Tab icon={<People />} iconPosition="start" label="Users" />
                    </Tabs>
                </Paper>

                <Box sx={{ py: 2 }}>
                    <Outlet />
                </Box>
            </Container>
        </Box>
    );
};

export default AdminLayout;
