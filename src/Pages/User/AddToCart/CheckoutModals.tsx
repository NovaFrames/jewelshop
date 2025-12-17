// Checkout Modals Component
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Paper,
    Chip,
    Grid,
    FormControl,
    FormLabel,
} from '@mui/material';
import { CheckCircle, Add, Home, Business, LocationOn } from '@mui/icons-material';

interface Address {
    id: string;
    type: string;
    name: string;
    address: string; // street address
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
}

interface NewAddressState {
    type: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

interface CheckoutModalsProps {
    // Checkout Modal
    checkoutModalOpen: boolean;
    onCloseCheckout: () => void;
    addresses: Address[];
    selectedAddress: Address | null;
    onSelectAddress: (address: Address) => void;
    onOpenAddAddress: () => void;
    onPlaceOrder: () => void;

    // Add Address Modal
    addAddressModalOpen: boolean;
    onCloseAddAddress: () => void;
    newAddress: NewAddressState;
    onAddressChange: (field: string, value: string) => void;
    onSaveAddress: () => void;

    // Success Modal
    successModalOpen: boolean;
    onCloseSuccess: () => void;
    onViewOrders: () => void;
}

export const CheckoutModals: React.FC<CheckoutModalsProps> = ({
    checkoutModalOpen,
    onCloseCheckout,
    addresses,
    selectedAddress,
    onSelectAddress,
    onOpenAddAddress,
    onPlaceOrder,
    addAddressModalOpen,
    onCloseAddAddress,
    newAddress,
    onAddressChange,
    onSaveAddress,
    successModalOpen,
    onCloseSuccess,
    onViewOrders,
}) => {

    const getAddressTypeIcon = (type: string) => {
        switch (type) {
            case 'home': return <Home fontSize="small" />;
            case 'office': return <Business fontSize="small" />;
            default: return <LocationOn fontSize="small" />;
        }
    };

    return (
        <>
            {/* Checkout Modal - Address Selection */}
            <Dialog
                open={checkoutModalOpen}
                onClose={onCloseCheckout}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                    Select Delivery Address
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Choose a delivery address for your order
                    </Typography>

                    <Grid container spacing={2}>
                        {addresses && addresses.length > 0 ? (
                            addresses.map((address) => (
                                <Grid size={{ xs: 12, md: 6 }} key={address.id}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            height: '100%',
                                            border: selectedAddress?.id === address.id ? '2px solid #832729' : '1px solid #eee',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            backgroundColor: selectedAddress?.id === address.id ? '#fff9f9' : '#fff',
                                            '&:hover': { borderColor: '#832729' }
                                        }}
                                        onClick={() => onSelectAddress(address)}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                            <Radio
                                                checked={selectedAddress?.id === address.id}
                                                size="small"
                                                sx={{ mt: -0.5, ml: -1 }}
                                            />
                                            <Box sx={{ width: '100%' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        {getAddressTypeIcon(address.type)}
                                                        <Typography variant="subtitle2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                                                            {address.name || address.type}
                                                        </Typography>
                                                    </Box>
                                                    {address.isDefault && (
                                                        <Chip label="Default" size="small" color="primary" sx={{ height: 20, fontSize: '0.7rem' }} />
                                                    )}
                                                </Box>

                                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                    {address.address}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                    {address.city}, {address.state} {address.zipCode}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 1 }}>
                                                    {address.country}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    Phone: {address.phone}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))
                        ) : (
                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ textAlign: 'center', py: 4, border: '1px dashed #ddd', borderRadius: 2 }}>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                        No addresses found. Please add a new address.
                                    </Typography>
                                    <Button
                                        startIcon={<Add />}
                                        onClick={onOpenAddAddress}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Add New Address
                                    </Button>
                                </Box>
                            </Grid>
                        )}

                        {addresses.length > 0 && (
                            <Grid size={{ xs: 12 }}>
                                <Button
                                    startIcon={<Add />}
                                    onClick={onOpenAddAddress}
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ mt: 1 }}
                                >
                                    Add New Address
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button onClick={onCloseCheckout} variant="outlined" sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onPlaceOrder}
                        variant="contained"
                        color="secondary"
                        disabled={!selectedAddress}
                        sx={{ textTransform: 'none', px: 4 }}
                    >
                        Place Order
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Address Modal */}
            <Dialog
                open={addAddressModalOpen}
                onClose={onCloseAddAddress}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                    Add New Address
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Address Type</FormLabel>
                            <RadioGroup
                                row
                                value={newAddress.type}
                                onChange={(e) => onAddressChange('type', e.target.value)}
                            >
                                <FormControlLabel value="home" control={<Radio />} label="Home" />
                                <FormControlLabel value="office" control={<Radio />} label="Office" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            label="Address Name (Optional)"
                            fullWidth
                            value={newAddress.name}
                            onChange={(e) => onAddressChange('name', e.target.value)}
                            placeholder="e.g. My Home, Work"
                        />

                        <TextField
                            label="Street Address"
                            fullWidth
                            multiline
                            rows={2}
                            value={newAddress.address}
                            onChange={(e) => onAddressChange('address', e.target.value)}
                            placeholder="House No., Building Name, Street"
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="City"
                                fullWidth
                                value={newAddress.city}
                                onChange={(e) => onAddressChange('city', e.target.value)}
                            />
                            <TextField
                                label="State"
                                fullWidth
                                value={newAddress.state}
                                onChange={(e) => onAddressChange('state', e.target.value)}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Zip/Postal Code"
                                fullWidth
                                value={newAddress.zipCode}
                                onChange={(e) => onAddressChange('zipCode', e.target.value)}
                            />
                            <TextField
                                label="Country"
                                fullWidth
                                value={newAddress.country}
                                onChange={(e) => onAddressChange('country', e.target.value)}
                            />
                        </Box>

                        <TextField
                            label="Phone Number"
                            fullWidth
                            value={newAddress.phone}
                            onChange={(e) => onAddressChange('phone', e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button onClick={onCloseAddAddress} variant="outlined" sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onSaveAddress}
                        variant="contained"
                        color="secondary"
                        sx={{ textTransform: 'none' }}
                        disabled={!newAddress.address || !newAddress.city || !newAddress.state || !newAddress.zipCode || !newAddress.phone}
                    >
                        Save Address
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Modal */}
            <Dialog
                open={successModalOpen}
                onClose={onCloseSuccess}
                maxWidth="xs"
                fullWidth
            >
                <DialogContent sx={{ textAlign: 'center', py: 4 }}>
                    <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
                    <Typography variant="h5" sx={{ mb: 2, fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                        Order Placed Successfully!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Thank you for your order. We will contact you soon to confirm your purchase.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1, justifyContent: 'center' }}>
                    <Button
                        onClick={onViewOrders}
                        variant="contained"
                        color="secondary"
                        sx={{ textTransform: 'none', px: 4 }}
                    >
                        View My Orders
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
