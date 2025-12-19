import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSnackbar } from '../../contexts/SnackbarContext';

const GlobalSnackbar: React.FC = () => {
    const { snackbarState, hideSnackbar } = useSnackbar();

    return (
        <Snackbar
            open={snackbarState.open}
            autoHideDuration={4000}
            onClose={hideSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={hideSnackbar}
                severity={snackbarState.severity}
                variant="filled"
                sx={{ width: '100%', boxShadow: 3 }}
            >
                {snackbarState.message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalSnackbar;
