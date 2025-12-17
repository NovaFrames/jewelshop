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
    Snackbar,
    Alert,
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
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

const AddToCart: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useCart();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    // Load cart from Firestore on mount
    useEffect(() => {
        const loadCartFromFirestore = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            try {
                const cartRef = doc(db, 'cart', currentUser.uid);
                const cartDoc = await getDoc(cartRef);

                if (cartDoc.exists()) {
                    const cartData = cartDoc.data();
                    const firestoreItems = cartData.items || [];

                    // Clear local cart and load from Firestore
                    dispatch({ type: 'CLEAR_CART' });

                    // Add each item to local cart
                    firestoreItems.forEach((item: any) => {
                        dispatch({
                            type: 'ADD_ITEM',
                            payload: {
                                product: {
                                    id: item.productId,
                                    name: item.name,
                                    price: item.price,
                                    image: item.image,
                                    category: item.category,
                                    material: item.material,
                                } as any,
                                quantity: item.quantity
                            }
                        });
                    });
                }
            } catch (error) {
                console.error('Error loading cart from Firestore:', error);
                setSnackbar({ open: true, message: 'Failed to load cart', severity: 'error' });
            } finally {
                setLoading(false);
            }
        };

        loadCartFromFirestore();
    }, [currentUser]);

    // Sync cart to Firestore whenever it changes (after initial load)
    useEffect(() => {
        // Skip sync during initial load
        if (loading) return;

        // Skip if not logged in
        if (!currentUser) return;

        // Sync to Firestore
        const syncToFirestore = async () => {
            try {
                const cartRef = doc(db, 'cart', currentUser.uid);
                const firestoreItems = state.items.map(item => ({
                    productId: item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    image: (item.product as any).image || '',
                    quantity: item.quantity,
                    category: item.product.category,
                    material: item.product.material,
                    addedAt: new Date().toISOString()
                }));

                if (firestoreItems.length > 0) {
                    await setDoc(cartRef, {
                        userId: currentUser.uid,
                        items: firestoreItems,
                        updatedAt: new Date().toISOString()
                    }, { merge: true });
                } else {
                    // If cart is empty, update with empty items array
                    await updateDoc(cartRef, {
                        items: [],
                        updatedAt: new Date().toISOString()
                    });
                }
            } catch (error) {
                console.error('Error syncing cart to Firestore:', error);
            }
        };

        syncToFirestore();
    }, [state.items, currentUser, loading]);

    const handleRemoveItem = async (productId: string) => {
        // Close the confirmation modal
        setDeleteConfirmOpen(false);
        setItemToDelete(null);

        // Remove from local cart (useEffect will sync to Firestore)
        dispatch({ type: 'REMOVE_ITEM', payload: productId });

        setSnackbar({ open: true, message: 'Item removed from cart', severity: 'success' });
    };

    const handleDeleteClick = (productId: string) => {
        setItemToDelete(productId);
        setDeleteConfirmOpen(true);
    };

    const handleCancelDelete = () => {
        setDeleteConfirmOpen(false);
        setItemToDelete(null);
    };

    const handleIncreaseQuantity = async (productId: string) => {
        // Update local cart (useEffect will sync to Firestore)
        dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
    };

    const handleDecreaseQuantity = async (productId: string) => {
        // Update local cart (useEffect will sync to Firestore)
        dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const totalAmount = state.items.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);

    // Show loading state
    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    // Empty cart state
    if (state.items.length === 0) {
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
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, p: 2, borderBottom: '1px solid #eee', bgcolor: '#f9f9f9' }}>
                                <Grid container spacing={2}>
                                    <Grid size={5}><Typography variant="subtitle2" fontWeight={600}>PRODUCT</Typography></Grid>
                                    <Grid size={2}><Typography variant="subtitle2" fontWeight={600} align="center">PRICE</Typography></Grid>
                                    <Grid size={3}><Typography variant="subtitle2" fontWeight={600} align="center">QUANTITY</Typography></Grid>
                                    <Grid size={2}><Typography variant="subtitle2" fontWeight={600} align="right">SUBTOTAL</Typography></Grid>
                                </Grid>
                            </Box>

                            {/* Items */}
                            <Box sx={{ p: 2 }}>
                                {state.items.map((item, index) => (
                                    <Box key={item.product.id}>
                                        {index > 0 && <Divider sx={{ my: 2 }} />}
                                        <Grid container spacing={2} alignItems="center">
                                            {/* Product */}
                                            <Grid size={{ xs: 12, md: 5 }}>
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDeleteClick(item.product.id)}
                                                        sx={{ color: '#999', '&:hover': { color: '#d32f2f' } }}
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                    <Box
                                                        component="img"
                                                        src={Array.isArray(item.product.images) ? item.product.images[0] : (item.product as any).image}
                                                        alt={item.product.name}
                                                        sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                                                    />
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: 'Playfair Display, serif' }}>
                                                            {item.product.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.product.material}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            {/* Price */}
                                            <Grid size={{ xs: 6, md: 2 }}>
                                                <Typography variant="body1" align="center" sx={{ display: { xs: 'block', md: 'block' } }}>
                                                    ₹{item.product.price}
                                                </Typography>
                                            </Grid>

                                            {/* Quantity */}
                                            <Grid size={{ xs: 6, md: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: 1, width: 'fit-content', mx: 'auto' }}>
                                                    <IconButton size="small" onClick={() => handleDecreaseQuantity(item.product.id)} disabled={item.quantity <= 1}>
                                                        <Remove fontSize="small" />
                                                    </IconButton>
                                                    <Typography sx={{ px: 2, minWidth: 30, textAlign: 'center' }}>{item.quantity}</Typography>
                                                    <IconButton size="small" onClick={() => handleIncreaseQuantity(item.product.id)}>
                                                        <Add fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Grid>

                                            {/* Subtotal */}
                                            <Grid size={{ xs: 12, md: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: { xs: 'space-between', md: 'flex-end' }, alignItems: 'center' }}>
                                                    <Typography variant="body2" sx={{ display: { xs: 'block', md: 'none' } }} color="text.secondary">Subtotal:</Typography>
                                                    <Typography variant="subtitle1" fontWeight={600} color="#832729">
                                                        ₹{item.product.price * item.quantity}
                                                    </Typography>
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
                                    onClick={handleCheckout}
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

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

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
        </Box>
    );
};

export default AddToCart;