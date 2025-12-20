// src/Pages/AddToCart/AddToCart.tsx
import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    IconButton,
    Button,
    Divider,
    Paper,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@mui/material';
import {
    Delete,
    ShoppingBagOutlined,
    Add,
    Remove,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { CheckoutModals } from './CheckoutModals';

interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
    material: string;
    addedAt: string;
}

const AddToCart: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser, userData } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);
    const [newAddress, setNewAddress] = useState({
        type: 'home',
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: ''
    });

    // Load cart from Firestore
    const loadCart = async () => {
        if (!currentUser) {
            setLoading(false);
            setCartItems([]);
            return;
        }

        try {
            const cartRef = doc(db, 'cart', currentUser.uid);
            const cartDoc = await getDoc(cartRef);

            if (cartDoc.exists()) {
                const cartData = cartDoc.data();
                setCartItems(cartData.items || []);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            showSnackbar('Failed to load cart', 'error');
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    // Update cart in Firestore
    const updateCart = async (newItems: CartItem[]) => {
        if (!currentUser) return;

        try {
            const cartRef = doc(db, 'cart', currentUser.uid);
            await updateDoc(cartRef, {
                items: newItems,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating cart:', error);
            showSnackbar('Failed to update cart', 'error');
        }
    };

    // Load cart on mount and set default address
    useEffect(() => {
        loadCart();

        // Set default address if available
        if (userData?.addresses && userData.addresses.length > 0) {
            const defaultAddr = userData.addresses.find((addr: any) => addr.isDefault);
            setSelectedAddress(defaultAddr || userData.addresses[0]);
        }
    }, [currentUser, userData]);

    // Handle remove item
    const handleRemoveItem = async (productId: string) => {
        setDeleteConfirmOpen(false);
        setItemToDelete(null);

        const newItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(newItems);
        await updateCart(newItems);

        showSnackbar('Item removed from cart', 'success');
    };

    // Handle delete click
    const handleDeleteClick = (productId: string) => {
        setItemToDelete(productId);
        setDeleteConfirmOpen(true);
    };

    // Handle cancel delete
    const handleCancelDelete = () => {
        setDeleteConfirmOpen(false);
        setItemToDelete(null);
    };

    // Handle increase quantity
    const handleIncreaseQuantity = async (productId: string) => {
        const newItems = cartItems.map(item =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCartItems(newItems);
        await updateCart(newItems);
    };

    // Handle decrease quantity
    const handleDecreaseQuantity = async (productId: string) => {
        const newItems = cartItems.map(item =>
            item.productId === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCartItems(newItems);
        await updateCart(newItems);
    };

    // Open checkout modal
    const handleOpenCheckoutModal = () => {
        if (!currentUser || cartItems.length === 0) {
            showSnackbar('Cart is empty', 'error');
            return;
        }
        setCheckoutModalOpen(true);
    };

    // Handle add new address
    const handleAddNewAddress = async () => {
        if (!currentUser || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.zipCode || !newAddress.phone) {
            showSnackbar('Please fill all required address fields', 'error');
            return;
        }

        try {
            const userRef = doc(db, 'users', currentUser.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const currentAddresses = userDoc.data().addresses || [];
                const addressToAdd = {
                    ...newAddress,
                    isDefault: currentAddresses.length === 0,
                    id: Date.now().toString()
                };

                await updateDoc(userRef, {
                    addresses: [...currentAddresses, addressToAdd]
                });

                setSelectedAddress(addressToAdd);
                setAddAddressModalOpen(false);
                setNewAddress({
                    type: 'home',
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: 'United States',
                    phone: ''
                });
                showSnackbar('Address added successfully', 'success');
            }
        } catch (error) {
            console.error('Error adding address:', error);
            showSnackbar('Failed to add address', 'error');
        }
    };

    // Place order with selected address
    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            showSnackbar('Please select a delivery address', 'error');
            return;
        }

        try {
            setLoading(true);

            // Calculate total
            const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Create order data
            const orderData = {
                uid: currentUser!.uid,
                userName: userData?.name || 'Guest',
                userEmail: userData?.email || '',
                userPhone: userData?.phone || '',
                deliveryAddress: selectedAddress,
                items: cartItems,
                totalAmount: total,
                status: 'processing',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Store order in 'orders' collection
            await addDoc(collection(db, 'orders'), orderData);

            // Send email notification to admin
            try {
                const response = await fetch('https://us-central1-jewelshop-603b2.cloudfunctions.net/sendOrderEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ orderData }),
                });

                if (response.ok) {
                    console.log('✅ Order confirmation email sent to admin');
                } else {
                    console.error('❌ Failed to send email notification');
                }
            } catch (emailError) {
                console.error('❌ Failed to send email notification:', emailError);
                // Don't fail the order if email fails
            }

            // Clear cart in Firestore
            const cartRef = doc(db, 'cart', currentUser!.uid);
            await updateDoc(cartRef, {
                items: [],
                updatedAt: new Date().toISOString()
            });

            // Clear local cart
            setCartItems([]);

            // Close checkout modal and show success modal
            setCheckoutModalOpen(false);
            setSuccessModalOpen(true);

        } catch (error) {
            console.error('Error creating order:', error);
            showSnackbar('Failed to place order', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    // Show loading state
    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress color="secondary" />
            </Container>
        );
    }

    // Empty cart state
    if (cartItems.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh' }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                    }}
                >
                    <ShoppingBagOutlined
                        sx={{
                            fontSize: 120,
                            color: 'text.secondary',
                            opacity: 0.2,
                            mb: 3,
                        }}
                    />
                    <Typography variant="h3" sx={{ mb: 2, fontFamily: 'Playfair Display, serif' }}>
                        Your Cart is Empty
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                        Looks like you haven't added any items to your cart yet.
                    </Typography>
                    <Button
                        variant="contained"
                        color='secondary'
                        size="large"
                        onClick={() => navigate('/all-jewellery')}
                        sx={{
                            px: 5,
                            py: 1.5,
                            bgcolor: '#832729',
                            '&:hover': { bgcolor: '#6b1f21' }
                        }}
                    >
                        Return to Shop
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Box sx={{ py: 6 }}>
            <Container maxWidth="xl">
                <Typography
                    variant="h3"
                    sx={{
                        mb: 6,
                        textAlign: 'center',
                        fontFamily: 'Playfair Display, serif',
                        color: '#333'
                    }}
                >
                    Shopping Cart
                </Typography>

                <Grid container spacing={4}>
                    {/* Cart Items Section */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper elevation={0} sx={{ border: '1px solid #eee', }}>
                            {/* Header */}
                            <Box sx={{ p: 2, borderBottom: '1px solid #eee', bgcolor: '#f9f9f9', display: { xs: 'none', md: 'block' } }}>
                                <Grid container spacing={2}>
                                    <Grid size={4}><Typography variant="subtitle2" fontWeight={600}>PRODUCT</Typography></Grid>
                                    <Grid size={2}><Typography variant="subtitle2" fontWeight={600} align="center">PRICE</Typography></Grid>
                                    <Grid size={2}><Typography variant="subtitle2" fontWeight={600} align="center">QUANTITY</Typography></Grid>
                                    <Grid size={2}><Typography variant="subtitle2" fontWeight={600} align="right">SUBTOTAL</Typography></Grid>
                                    <Grid size={2}><Typography variant="subtitle2" fontWeight={600} align="right">ACTION</Typography></Grid>
                                </Grid>
                            </Box>

                            {/* Items */}
                            <Box sx={{ pl: 2, pb: 2, pt: 2 }}>
                                {cartItems.map((item, index) => (
                                    <Box key={item.productId}>
                                        {index > 0 && <Divider sx={{ my: 2 }} />}
                                        <Grid container spacing={2} alignItems="center">
                                            {/* Product */}
                                            <Grid size={{ xs: 12, md: 4 }}>
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                    <Box
                                                        component="img"
                                                        src={item.image}
                                                        alt={item.name}
                                                        sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                                                    />
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: 'Playfair Display, serif' }}>
                                                            {item.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.material}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            {/* Price */}
                                            <Grid size={{ xs: 6, md: 2 }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'center' } }}>
                                                    <Typography variant="body2" sx={{ display: { xs: 'block', md: 'none' } }} color="text.secondary">Price:</Typography>
                                                    <Typography variant="body1">
                                                        ₹{item.price}
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            {/* Quantity */}
                                            <Grid size={{ xs: 6, md: 2 }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <Typography variant="body2" sx={{ display: { xs: 'block', md: 'none' } }} color="text.secondary">Quantity:</Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, width: 'fit-content' }}>
                                                        <IconButton size="small" onClick={() => handleDecreaseQuantity(item.productId)} disabled={item.quantity <= 1}>
                                                            <Remove fontSize="small" />
                                                        </IconButton>
                                                        <Typography sx={{ px: 1, minWidth: 25, textAlign: 'center' }}>{item.quantity}</Typography>
                                                        <IconButton size="small" onClick={() => handleIncreaseQuantity(item.productId)}>
                                                            <Add fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            {/* Subtotal */}
                                            <Grid size={{ xs: 6, md: 2 }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
                                                    <Typography variant="body2" sx={{ display: { xs: 'block', md: 'none' } }} color="text.secondary">Subtotal:</Typography>
                                                    <Typography variant="subtitle1" fontWeight={600} color="#832729">
                                                        ₹{item.price * item.quantity}
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            {/* Delete Button */}
                                            <Grid size={{ xs: 6, md: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button
                                                        size="medium"
                                                        onClick={() => handleDeleteClick(item.productId)}
                                                        sx={{ color: 'red', '&:hover': { color: '#d32f2f' } }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Cart Totals */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ position: 'sticky', top: 180 }}>
                            <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', bgcolor: '#fcfcfc' }}>
                                <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Playfair Display, serif' }}>Cart Totals</Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography>Subtotal</Typography>
                                    <Typography fontWeight={600}>₹{totalAmount}</Typography>
                                </Box>

                                <Divider sx={{ mb: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6">Total</Typography>
                                    <Typography variant="h6" color="#832729">₹{totalAmount}</Typography>
                                </Box>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color='secondary'
                                    size="large"
                                    onClick={handleOpenCheckoutModal}
                                    sx={{
                                        py: 1.5,
                                        textTransform: 'none',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteConfirmOpen}
                onClose={handleCancelDelete}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                    Remove Item from Cart?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove this item from your cart? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={handleCancelDelete}
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => itemToDelete && handleRemoveItem(itemToDelete)}
                        variant="contained"
                        color="error"
                        sx={{ textTransform: 'none' }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Checkout Modals */}
            <CheckoutModals
                checkoutModalOpen={checkoutModalOpen}
                onCloseCheckout={() => setCheckoutModalOpen(false)}
                addresses={(userData?.addresses || []) as any}
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
                onOpenAddAddress={() => setAddAddressModalOpen(true)}
                onPlaceOrder={handlePlaceOrder}
                addAddressModalOpen={addAddressModalOpen}
                onCloseAddAddress={() => setAddAddressModalOpen(false)}
                newAddress={newAddress}
                onAddressChange={(field, value) => setNewAddress({ ...newAddress, [field]: value })}
                onSaveAddress={handleAddNewAddress}
                successModalOpen={successModalOpen}
                onCloseSuccess={() => setSuccessModalOpen(false)}
                onViewOrders={() => navigate('/orders')}
            />
        </Box>
    );
};

export default AddToCart;