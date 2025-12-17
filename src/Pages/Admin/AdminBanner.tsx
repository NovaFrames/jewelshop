import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AdminBanner: React.FC = () => {
    return (
        <Box>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Banner Management</Typography>
                <Typography color="text.secondary">Banner management functionality coming soon.</Typography>
            </Paper>
        </Box>
    );
};

export default AdminBanner;
