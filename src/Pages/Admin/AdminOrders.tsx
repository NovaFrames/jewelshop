import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AdminOrders: React.FC = () => {
    return (
        <Box>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Orders Management</Typography>
                <Typography color="text.secondary">Order management functionality coming soon.</Typography>
            </Paper>
        </Box>
    );
};

export default AdminOrders;
