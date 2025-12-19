// src/components/Auth/LoginModal.tsx
import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    Divider,
    Link,
    IconButton,
    Box,
} from '@mui/material';
import {
    Close,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthForm from './AuthForm';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    disableNavigation?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, disableNavigation = false }) => {
    const navigate = useNavigate();
    const { currentUser, userData } = useAuth();

    useEffect(() => {
        if (open && currentUser && userData) {
            onClose();
            if (!disableNavigation) {
                if (userData.role === 'admin') {
                    navigate('/admin/products', { replace: true });
                } else {
                    navigate('/account', { replace: true });
                }
            }
        }
    }, [open, currentUser, userData, navigate, onClose, disableNavigation]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 2,
                }
            }}
        >
            {/* Close Button */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'grey.500',
                }}
            >
                <Close />
            </IconButton>

            <DialogContent sx={{ pt: 4 }}>
                <AuthForm onSuccess={onClose} />

                <Divider sx={{ my: 3 }} />

                {/* Footer */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        By continuing, you agree to our{' '}
                        <Link href="#" sx={{ color: '#832729' }}>
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" sx={{ color: '#832729' }}>
                            Privacy Policy
                        </Link>
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
