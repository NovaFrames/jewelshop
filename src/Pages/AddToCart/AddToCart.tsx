// src/Pages/AddToCart/AddToCart.tsx
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    IconButton,
    Button,
    Divider,
    Stack,
    Breadcrumbs,
    Link,
    Paper,
} from '@mui/material';
import {
    Delete,
    ShoppingBagOutlined,
    LocalShipping,
    Security,
    CardGiftcard,
    ArrowForward,
    Home as HomeIcon,
    Add,
    Remove,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const AddToCart: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useCart();

    const handleRemoveItem = (productId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
    };

    const handleIncreaseQuantity = (productId: string) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
    };

    const handleDecreaseQuantity = (productId: string) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
    };

    const handleCheckout = () => {
        // Navigate to checkout page (to be implemented)
        navigate('/checkout');
    };

    const totalWeight = state.items.reduce((sum, item) => {
        return sum + ((item.product.weight ?? 0) * item.quantity);
    }, 0);

    const totalItems = state.items.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

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
                            color: 'primary.light',
                            opacity: 0.3,
                            mb: 3,
                        }}
                    />
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                        Your Cart is Empty
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                        Looks like you haven't added any items to your cart yet.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/shop')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: 'background.default', py: 6 }}>
            <Container maxWidth="xl">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    sx={{ mb: 4 }}
                    separator="›"
                    aria-label="breadcrumb"
                >
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
                        Shopping Cart
                    </Typography>
                </Breadcrumbs>

                {/* Page Title */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                            fontFamily: 'Playfair Display, serif',
                        }}
                    >
                        Shopping Cart
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Cart Items Section */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                overflow: 'hidden',
                            }}
                        >
                            {/* Cart Header */}
                            <Box
                                sx={{
                                    bgcolor: 'primary.dark',
                                    color: 'white',
                                    p: 2,
                                    display: { xs: 'none', md: 'block' },
                                }}
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid size={5}>
                                        <Typography variant="subtitle2" sx={{ textAlign: 'center' }} fontWeight={600}>
                                            Product
                                        </Typography>
                                    </Grid>
                                    <Grid size={2}>
                                        <Typography variant="subtitle2" sx={{ textAlign: 'center' }} fontWeight={600}>
                                            Quantity
                                        </Typography>
                                    </Grid>
                                    <Grid size={2}>
                                        <Typography variant="subtitle2" sx={{ textAlign: 'center' }} fontWeight={600}>
                                            Weight
                                        </Typography>
                                    </Grid>
                                    <Grid size={2}>
                                        <Typography variant="subtitle2" sx={{ textAlign: 'center' }} fontWeight={600}>
                                            Total Weight
                                        </Typography>
                                    </Grid>
                                    <Grid size={1}>
                                        <Typography variant="subtitle2" sx={{ textAlign: 'center' }} fontWeight={600}>
                                            Action
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Cart Items */}
                            <Box sx={{ p: { xs: 2, md: 3 } }}>
                                {state.items.map((item, index) => (
                                    <Box key={item.product.id}>
                                        {index > 0 && <Divider sx={{ my: 3 }} />}
                                        <Grid container spacing={2} alignItems="center">
                                            {/* Product Info */}
                                            <Grid size={{ xs: 12, md: 5 }}>
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <Card
                                                        sx={{
                                                            width: { xs: 100, md: 120 },
                                                            height: { xs: 100, md: 120 },
                                                            flexShrink: 0,
                                                            bgcolor: '#fafafa',
                                                            boxShadow: 'none',
                                                            border: '1px solid',
                                                            borderColor: 'divider',
                                                        }}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            image={
                                                                Array.isArray(item.product.images)
                                                                    ? item.product.images[0]
                                                                    : (item.product as any).image || ''
                                                            }
                                                            alt={item.product.name}
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'contain',
                                                                p: 1,
                                                            }}
                                                        />
                                                    </Card>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 600,
                                                                mb: 0.5,
                                                                fontSize: { xs: '1rem', md: '1.25rem' },
                                                            }}
                                                        >
                                                            {item.product.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ display: { xs: 'block', md: 'none' } }}
                                                        >
                                                            Weight: {item.product.weight} Gram
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ display: { xs: 'block', md: 'none' } }}
                                                        >
                                                            Total: {(item.product.weight ?? 0) * item.quantity} Gram
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            {/* Quantity Controls */}
                                            <Grid size={{ xs: 12, md: 2 }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: { xs: 'flex-start', md: 'center' },
                                                    }}
                                                >
                                                    {/* Mobile view for quantity */}
                                                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
                                                        <Typography variant="body2" fontWeight={600} sx={{ minWidth: 60 }}>
                                                            Quantity:
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleDecreaseQuantity(item.product.id)}
                                                                disabled={item.quantity <= 1}
                                                                sx={{
                                                                    border: '1px solid',
                                                                    borderColor: 'divider',
                                                                    borderRadius: 1,
                                                                }}
                                                            >
                                                                <Remove fontSize="small" />
                                                            </IconButton>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    minWidth: 30,
                                                                    textAlign: 'center',
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {item.quantity}
                                                            </Typography>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleIncreaseQuantity(item.product.id)}
                                                                sx={{
                                                                    border: '1px solid',
                                                                    borderColor: 'divider',
                                                                    borderRadius: 1,
                                                                }}
                                                            >
                                                                <Add fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>

                                                    {/* Desktop view for quantity */}
                                                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDecreaseQuantity(item.product.id)}
                                                            disabled={item.quantity <= 1}
                                                            sx={{
                                                                border: '1px solid',
                                                                borderColor: 'divider',
                                                                borderRadius: 1,
                                                            }}
                                                        >
                                                            <Remove fontSize="small" />
                                                        </IconButton>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                minWidth: 30,
                                                                textAlign: 'center',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleIncreaseQuantity(item.product.id)}
                                                            sx={{
                                                                border: '1px solid',
                                                                borderColor: 'divider',
                                                                borderRadius: 1,
                                                            }}
                                                        >
                                                            <Add fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            {/* Unit Weight */}
                                            <Grid size={{ xs: 12, md: 2 }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: { xs: 'flex-start', md: 'center' },
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            display: { xs: 'none', md: 'block' },
                                                            textAlign: 'center',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {item.product.weight} Gram
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            display: { xs: 'flex', md: 'none' },
                                                            alignItems: 'center',
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        <span style={{ fontWeight: 600 }}>Unit:</span> {item.product.weight} Gram
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            {/* Total Weight */}
                                            <Grid size={{ xs: 12, md: 2 }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: { xs: 'flex-start', md: 'center' },
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            display: { xs: 'none', md: 'block' },
                                                            textAlign: 'center',
                                                            fontWeight: 600,
                                                            color: 'primary.main',
                                                        }}
                                                    >
                                                        {(item.product.weight ?? 0) * item.quantity} Gram
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            display: { xs: 'flex', md: 'none' },
                                                            alignItems: 'center',
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        <span style={{ fontWeight: 600 }}>Total:</span> {(item.product.weight ?? 0) * item.quantity} Gram
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            {/* Remove Button */}
                                            <Grid size={{ xs: 12, md: 1 }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: { xs: 'flex-start', md: 'center' },
                                                    }}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleRemoveItem(item.product.id)}
                                                        sx={{
                                                            mt: { xs: 0, md: 1 },
                                                        }}
                                                    >
                                                        <Delete fontSize="small" />
                                                        <Typography variant="body2" sx={{ ml: 0.5, display: { xs: 'inline', md: 'none' } }}>
                                                            Remove
                                                        </Typography>
                                                    </IconButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Order Summary Section */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ position: 'sticky', top: 100 }}>

                            {/* Order Summary */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                }}
                            >
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                    Order Summary
                                </Typography>

                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body1">Total Items</Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {totalItems}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body1">Total Weight</Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {totalWeight} Gram
                                        </Typography>
                                    </Box>

                                    <Divider />
                                </Stack>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    size="large"
                                    onClick={handleCheckout}
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        mt: 3,
                                        py: 1.5,
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                    }}
                                >
                                    Proceed to Book
                                </Button>

                                {/* Benefits */}
                                <Stack spacing={2} sx={{ mt: 3 }}>
                                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                        <LocalShipping sx={{ color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Easy Booking
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                        <Security sx={{ color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Secure Your Product
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                        <CardGiftcard sx={{ color: 'primary.main' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Get Your Product
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AddToCart;