import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AdminUsers: React.FC = () => {
    return (
        <Box>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>User Management</Typography>
                <Typography color="text.secondary">User management functionality coming soon.</Typography>
            </Paper>
        </Box>
    );
};

export default AdminUsers;
