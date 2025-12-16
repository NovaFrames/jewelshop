// src/Pages/Account/Account.tsx
import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Avatar,
    Divider,
    Button,
    IconButton,
    TextField,
    Stack,
    Breadcrumbs,
    Link,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    InputAdornment,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
} from '@mui/material';
import {
    Home as HomeIcon,
    Edit,
    Save,
    Cancel,
    Add,
    Delete,
    LocationOn,
    Phone,
    Email,
    Person,
    CheckCircle,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Mock user data - in real app, this would come from auth context/API
const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    createdAt: '2024-01-15',
};

// Mock addresses - in real app, this would come from API
const mockAddresses = [
    {
        id: '1',
        type: 'home',
        name: 'Home',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true,
        phone: '+1 (555) 123-4567',
    },
    {
        id: '2',
        type: 'office',
        name: 'Office',
        address: '456 Business Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        country: 'United States',
        isDefault: false,
        phone: '+1 (555) 987-6543',
    },
];

type Address = typeof mockAddresses[0];

const Account: React.FC = () => {
    // States
    const [user, setUser] = useState(mockUser);
    const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Form states
    const [profileForm, setProfileForm] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
    });

    const [addressForm, setAddressForm] = useState({
        type: 'home',
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: '',
        isDefault: false,
    });

    // Profile handlers
    const handleEditProfile = () => {
        setProfileForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
        setIsEditingProfile(true);
    };

    const handleSaveProfile = () => {
        setUser(prev => ({
            ...prev,
            ...profileForm,
        }));
        setIsEditingProfile(false);
        setSuccessMessage('Profile updated successfully');
        setShowSuccess(true);
    };

    const handleCancelProfileEdit = () => {
        setIsEditingProfile(false);
    };

    const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Address handlers
    const handleAddAddress = () => {
        setAddressForm({
            type: 'home',
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States',
            phone: '',
            isDefault: addresses.length === 0, // Default to true if no addresses
        });
        setIsAddingAddress(true);
    };

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address);
        setAddressForm(address);
        setIsEditingAddress(true);
    };

    const handleDeleteAddress = (addressId: string) => {
        if (addresses.find(addr => addr.id === addressId)?.isDefault && addresses.length > 1) {
            // If deleting default address, make another one default
            const otherAddress = addresses.find(addr => addr.id !== addressId);
            if (otherAddress) {
                setAddresses(prev =>
                    prev
                        .filter(addr => addr.id !== addressId)
                        .map((addr, index) => ({
                            ...addr,
                            isDefault: index === 0,
                        }))
                );
            }
        } else {
            setAddresses(prev => prev.filter(addr => addr.id !== addressId));
        }
        setSuccessMessage('Address deleted successfully');
        setShowSuccess(true);
    };

    const handleSaveAddress = () => {
        if (isAddingAddress) {
            const newAddress: Address = {
                id: Date.now().toString(),
                ...addressForm,
                isDefault: addressForm.isDefault || addresses.length === 0,
            };

            // If setting as default, unset other defaults
            const updatedAddresses = addressForm.isDefault
                ? addresses.map(addr => ({ ...addr, isDefault: false }))
                : addresses;

            setAddresses([...updatedAddresses, newAddress]);
            setIsAddingAddress(false);
        } else if (editingAddress) {
            const updatedAddresses = addresses.map(addr => {
                if (addr.id === editingAddress.id) {
                    // If setting as default, unset other defaults
                    if (addressForm.isDefault && !addr.isDefault) {
                        return { ...addresses.map(a => ({ ...a, isDefault: false })).find(a => a.id === editingAddress.id), ...addressForm } as Address;
                    }
                    return { ...addr, ...addressForm };
                }
                // Unset other defaults if this is becoming default
                if (addressForm.isDefault && addr.isDefault) {
                    return { ...addr, isDefault: false };
                }
                return addr;
            });

            setAddresses(updatedAddresses);
            setIsEditingAddress(false);
            setEditingAddress(null);
        }

        setAddressForm({
            type: 'home',
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States',
            phone: '',
            isDefault: false,
        });

        setSuccessMessage(isAddingAddress ? 'Address added successfully' : 'Address updated successfully');
        setShowSuccess(true);
    };

    const handleCancelAddress = () => {
        if (isAddingAddress) {
            setIsAddingAddress(false);
        } else {
            setIsEditingAddress(false);
            setEditingAddress(null);
        }
        setAddressForm({
            type: 'home',
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States',
            phone: '',
            isDefault: false,
        });
    };

    const handleAddressFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setAddressForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSetDefaultAddress = (addressId: string) => {
        setAddresses(prev =>
            prev.map(addr => ({
                ...addr,
                isDefault: addr.id === addressId,
            }))
        );
        setSuccessMessage('Default address updated');
        setShowSuccess(true);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
    };

    // Get address type icon
    const getAddressTypeIcon = (type: string) => {
        switch (type) {
            case 'home':
                return '🏠';
            case 'office':
                return '🏢';
            default:
                return '📍';
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ mb: 4 }} separator="›" aria-label="breadcrumb">
                    <Link
                        component={RouterLink}
                        to="/"
                        underline="hover"
                        color="inherit"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        <HomeIcon sx={{ fontSize: 20 }} />
                        Home
                    </Link>
                    <Typography color="primary.main" fontWeight={600}>
                        My Profile
                    </Typography>
                </Breadcrumbs>

                {/* Page Title */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        mb: 6,
                        fontFamily: 'Playfair Display, serif',
                    }}
                >
                    My Profile
                </Typography>

                <Grid container spacing={4}>
                    {/* Left Column - Profile Information */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                height: '100%',
                            }}
                        >
                            {/* Profile Header */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                                <Avatar
                                    src={user.avatar}
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        mb: 3,
                                        border: '3px solid',
                                        borderColor: 'primary.main',
                                    }}
                                />
                                {!isEditingProfile && (
                                    <IconButton
                                        onClick={handleEditProfile}
                                        sx={{
                                            position: 'absolute',
                                            mt: 8,
                                            ml: 8,
                                            bgcolor: 'background.paper',
                                            '&:hover': { bgcolor: 'background.paper' },
                                        }}
                                    >
                                        <Edit color="primary" />
                                    </IconButton>
                                )}
                                <Typography variant="h5" fontWeight={600}>
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Profile Details */}
                            {isEditingProfile ? (
                                <Stack spacing={3}>
                                    <TextField
                                        label="Full Name"
                                        name="name"
                                        value={profileForm.name}
                                        onChange={handleProfileFormChange}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={profileForm.email}
                                        onChange={handleProfileFormChange}
                                        fullWidth
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
                                        value={profileForm.phone}
                                        onChange={handleProfileFormChange}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Phone color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            color='secondary'
                                            onClick={handleSaveProfile}
                                            startIcon={<Save />}
                                            fullWidth
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color='secondary'
                                            onClick={handleCancelProfileEdit}
                                            startIcon={<Cancel />}
                                            fullWidth
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Stack>
                            ) : (
                                <Stack spacing={2.5}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Email color="primary" sx={{ opacity: 0.8 }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Email Address
                                            </Typography>
                                            <Typography variant="body1">{user.email}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Phone color="primary" sx={{ opacity: 0.8 }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Phone Number
                                            </Typography>
                                            <Typography variant="body1">{user.phone}</Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            )}
                        </Paper>
                    </Grid>

                    {/* Right Column - Addresses */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                            }}
                        >
                            {/* Address Header */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                <Box>
                                    <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
                                        My Addresses
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Manage your delivery addresses
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color='secondary'
                                    startIcon={<Add />}
                                    onClick={handleAddAddress}
                                    sx={{ minWidth: 160 }}
                                >
                                    Add New Address
                                </Button>
                            </Box>

                            {/* Addresses Grid */}
                            <Grid container spacing={3}>
                                {addresses.map((address) => (
                                    <Grid size={{ xs: 12, md: 6 }} key={address.id}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                height: '100%',
                                                position: 'relative',
                                                borderColor: address.isDefault ? 'primary.main' : 'divider',
                                                borderWidth: address.isDefault ? 2 : 1,
                                            }}
                                        >
                                            {address.isDefault && (
                                                <Chip
                                                    label="Default"
                                                    color="primary"
                                                    size="small"
                                                    icon={<CheckCircle fontSize="small" />}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 12,
                                                        right: 12,
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            )}
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                                    <Typography variant="h4" sx={{ fontSize: 28 }}>
                                                        {getAddressTypeIcon(address.type)}
                                                    </Typography>
                                                    <Box>
                                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                            {address.name}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                                            {address.type} Address
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Stack spacing={1.5}>
                                                    <Typography variant="body1">{address.address}</Typography>
                                                    <Typography variant="body1">
                                                        {address.city}, {address.state} {address.zipCode}
                                                    </Typography>
                                                    <Typography variant="body1">{address.country}</Typography>
                                                    <Divider sx={{ my: 1 }} />
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Phone sx={{ fontSize: 16, opacity: 0.7 }} />
                                                        <Typography variant="body2">{address.phone}</Typography>
                                                    </Box>
                                                </Stack>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
                                                <Button
                                                    size="small"
                                                    startIcon={<Edit />}
                                                    onClick={() => handleEditAddress(address)}
                                                >
                                                    Edit
                                                </Button>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    {!address.isDefault && (
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            color='secondary'
                                                            onClick={() => handleSetDefaultAddress(address.id)}
                                                        >
                                                            Set as Default
                                                        </Button>
                                                    )}
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDeleteAddress(address.id)}
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            {addresses.length === 0 && (
                                <Box sx={{ textAlign: 'center', py: 8 }}>
                                    <LocationOn
                                        sx={{
                                            fontSize: 80,
                                            color: 'primary.light',
                                            opacity: 0.3,
                                            mb: 3,
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                        No Addresses Added
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                        Add your first delivery address to get started
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color='secondary'
                                        startIcon={<Add />}
                                        onClick={handleAddAddress}
                                    >
                                        Add New Address
                                    </Button>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Add/Edit Address Dialog */}
            <Dialog
                open={isAddingAddress || isEditingAddress}
                onClose={handleCancelAddress}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {isAddingAddress ? 'Add New Address' : 'Edit Address'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Address Type</FormLabel>
                            <RadioGroup
                                row
                                name="type"
                                value={addressForm.type}
                                onChange={handleAddressFormChange}
                            >
                                <FormControlLabel value="home" control={<Radio />} label="Home" />
                                <FormControlLabel value="office" control={<Radio />} label="Office" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            label="Address Name"
                            name="name"
                            value={addressForm.name}
                            onChange={handleAddressFormChange}
                            fullWidth
                            placeholder="e.g., Home, Office"
                        />

                        <TextField
                            label="Street Address"
                            name="address"
                            value={addressForm.address}
                            onChange={handleAddressFormChange}
                            fullWidth
                            multiline
                            rows={2}
                            required
                        />

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="City"
                                    name="city"
                                    value={addressForm.city}
                                    onChange={handleAddressFormChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="State/Province"
                                    name="state"
                                    value={addressForm.state}
                                    onChange={handleAddressFormChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="ZIP/Postal Code"
                                    name="zipCode"
                                    value={addressForm.zipCode}
                                    onChange={handleAddressFormChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Country"
                                    name="country"
                                    value={addressForm.country}
                                    onChange={handleAddressFormChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            label="Phone Number"
                            name="phone"
                            value={addressForm.phone}
                            onChange={handleAddressFormChange}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControlLabel
                            control={
                                <Radio
                                    checked={addressForm.isDefault}
                                    onChange={(e) => setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                                    name="isDefault"
                                />
                            }
                            label="Set as default delivery address"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button onClick={handleCancelAddress} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color='secondary'
                        onClick={handleSaveAddress}
                        disabled={!addressForm.address || !addressForm.city || !addressForm.state || !addressForm.zipCode}
                    >
                        {isAddingAddress ? 'Add Address' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={4000}
                onClose={handleCloseSuccess}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSuccess}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Account;