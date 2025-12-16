import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const AdminDashboard: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                        <Typography variant="h6" color="textSecondary">Total Sales</Typography>
                        <Typography variant="h3" sx={{ my: 2, color: '#832729' }}>₹1,24,500</Typography>
                        <Typography variant="body2" color="success.main">+12% from last month</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                        <Typography variant="h6" color="textSecondary">Total Orders</Typography>
                        <Typography variant="h3" sx={{ my: 2, color: '#832729' }}>45</Typography>
                        <Typography variant="body2" color="success.main">+5 new today</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                        <Typography variant="h6" color="textSecondary">Total Products</Typography>
                        <Typography variant="h3" sx={{ my: 2, color: '#832729' }}>124</Typography>
                        <Typography variant="body2" color="textSecondary">In Inventory</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
