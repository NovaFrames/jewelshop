import React, { createContext, useContext, useState, useCallback } from 'react';

type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

interface SnackbarContextType {
    showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
    hideSnackbar: () => void;
    snackbarState: {
        open: boolean;
        message: string;
        severity: SnackbarSeverity;
    };
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [snackbarState, setSnackbarState] = useState<{
        open: boolean;
        message: string;
        severity: SnackbarSeverity;
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = useCallback((message: string, severity: SnackbarSeverity = 'success') => {
        setSnackbarState({
            open: true,
            message,
            severity,
        });
    }, []);

    const hideSnackbar = useCallback(() => {
        setSnackbarState((prev) => ({ ...prev, open: false }));
    }, []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar, snackbarState }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
