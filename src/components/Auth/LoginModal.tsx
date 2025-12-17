// src/components/Auth/LoginModal.tsx
import React, { useState } from 'react';
import type { ConfirmationResult } from 'firebase/auth';
import {
    Dialog,
    DialogContent,
    Typography,
    TextField,
    Button,
    Stack,
    Divider,
    Link,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
    Tab,
    Tabs,
    Box,
} from '@mui/material';
import {
    Phone,
    Person,
    Email,
    Close,
    Sms,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <div hidden={value !== index}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
};

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { sendOTP, verifyOTP } = useAuth();

    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    // Login form state
    const [loginForm, setLoginForm] = useState({
        phone: '',
        otp: '',
    });

    // Signup form state
    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        phone: '',
        otp: '',
    });

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setError('');
        setOtpSent(false);
        setConfirmationResult(null);
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSendLoginOTP = async () => {
        setError('');
        setLoading(true);

        try {
            if (!loginForm.phone || loginForm.phone.length < 10) {
                throw new Error('Please enter a valid 10-digit phone number');
            }

            const result = await sendOTP(loginForm.phone, 'recaptcha-container-login');
            setConfirmationResult(result);
            setOtpSent(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyLoginOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!confirmationResult) {
                throw new Error('Please request OTP first');
            }

            if (!loginForm.otp || loginForm.otp.length !== 6) {
                throw new Error('Please enter a valid 6-digit OTP');
            }

            await verifyOTP(confirmationResult, loginForm.otp);
            onClose();
            navigate('/account');
        } catch (err: any) {
            setError(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSendSignupOTP = async () => {
        setError('');
        setLoading(true);

        try {
            if (!signupForm.name) {
                throw new Error('Please enter your name');
            }

            if (!signupForm.phone || signupForm.phone.length < 10) {
                throw new Error('Please enter a valid 10-digit phone number');
            }

            const result = await sendOTP(signupForm.phone, 'recaptcha-container-signup');
            setConfirmationResult(result);
            setOtpSent(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySignupOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!confirmationResult) {
                throw new Error('Please request OTP first');
            }

            if (!signupForm.otp || signupForm.otp.length !== 6) {
                throw new Error('Please enter a valid 6-digit OTP');
            }

            await verifyOTP(confirmationResult, signupForm.otp, signupForm.name, signupForm.email);
            onClose();
            navigate('/account');
        } catch (err: any) {
            setError(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError('');
        setTabValue(0);
        setOtpSent(false);
        setConfirmationResult(null);
        setLoginForm({ phone: '', otp: '' });
        setSignupForm({ name: '', email: '', phone: '', otp: '' });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'grey.500',
                }}
            >
                <Close />
            </IconButton>

            {/* Recaptcha containers */}
            <div id="recaptcha-container-login" />
            <div id="recaptcha-container-signup" />

            <DialogContent sx={{ pt: 4 }}>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            fontFamily: 'Playfair Display, serif',
                            color: '#832729',
                            mb: 1,
                        }}
                    >
                        Welcome to JEWELRY
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {tabValue === 0 ? 'Login with your phone number' : 'Create a new account'}
                    </Typography>
                </Box>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                {/* Tabs */}
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{
                        mb: 2,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                        },
                    }}
                >
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>

                {/* Login Form */}
                <TabPanel value={tabValue} index={0}>
                    <form onSubmit={handleVerifyLoginOTP}>
                        <Stack spacing={3}>
                            <TextField
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                value={loginForm.phone}
                                onChange={handleLoginChange}
                                required
                                fullWidth
                                disabled={otpSent}
                                placeholder="10-digit mobile number"
                                inputProps={{ maxLength: 10 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {!otpSent ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    fullWidth
                                    disabled={loading}
                                    onClick={handleSendLoginOTP}
                                    sx={{ py: 1.5 }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
                                </Button>
                            ) : (
                                <>
                                    <TextField
                                        label="Enter OTP"
                                        name="otp"
                                        type="text"
                                        value={loginForm.otp}
                                        onChange={handleLoginChange}
                                        required
                                        fullWidth
                                        placeholder="6-digit OTP"
                                        inputProps={{ maxLength: 6 }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Sms color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        fullWidth
                                        disabled={loading}
                                        sx={{ py: 1.5 }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Login'}
                                    </Button>

                                    <Box sx={{ textAlign: 'center' }}>
                                        <Link
                                            component="button"
                                            variant="body2"
                                            sx={{ color: '#832729' }}
                                            onClick={() => {
                                                setOtpSent(false);
                                                setConfirmationResult(null);
                                                setLoginForm({ ...loginForm, otp: '' });
                                            }}
                                        >
                                            Change Phone Number
                                        </Link>
                                    </Box>
                                </>
                            )}
                        </Stack>
                    </form>
                </TabPanel>

                {/* Signup Form */}
                <TabPanel value={tabValue} index={1}>
                    <form onSubmit={handleVerifySignupOTP}>
                        <Stack spacing={3}>
                            <TextField
                                label="Full Name"
                                name="name"
                                value={signupForm.name}
                                onChange={handleSignupChange}
                                required
                                fullWidth
                                disabled={otpSent}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="Email Address (Optional)"
                                name="email"
                                type="email"
                                value={signupForm.email}
                                onChange={handleSignupChange}
                                fullWidth
                                disabled={otpSent}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                value={signupForm.phone}
                                onChange={handleSignupChange}
                                required
                                fullWidth
                                disabled={otpSent}
                                placeholder="10-digit mobile number"
                                inputProps={{ maxLength: 10 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {!otpSent ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    fullWidth
                                    disabled={loading}
                                    onClick={handleSendSignupOTP}
                                    sx={{ py: 1.5 }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
                                </Button>
                            ) : (
                                <>
                                    <TextField
                                        label="Enter OTP"
                                        name="otp"
                                        type="text"
                                        value={signupForm.otp}
                                        onChange={handleSignupChange}
                                        required
                                        fullWidth
                                        placeholder="6-digit OTP"
                                        inputProps={{ maxLength: 6 }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Sms color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        fullWidth
                                        disabled={loading}
                                        sx={{ py: 1.5 }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Create Account'}
                                    </Button>

                                    <Box sx={{ textAlign: 'center' }}>
                                        <Link
                                            component="button"
                                            variant="body2"
                                            sx={{ color: '#832729' }}
                                            onClick={() => {
                                                setOtpSent(false);
                                                setConfirmationResult(null);
                                                setSignupForm({ ...signupForm, otp: '' });
                                            }}
                                        >
                                            Change Phone Number
                                        </Link>
                                    </Box>
                                </>
                            )}
                        </Stack>
                    </form>
                </TabPanel>

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
