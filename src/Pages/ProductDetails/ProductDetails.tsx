// src/Pages/AddToCart/AddToCart.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Chip,
    Divider,
    Card,
    CardMedia,
    IconButton,
    Rating,
    Stack,
    Breadcrumbs,
    Link
} from '@mui/material';
import {
    ShoppingCart as CartIcon,
    FavoriteBorder as FavoriteIcon,
    Share as ShareIcon,
    LocalShipping as ShippingIcon,
    Verified as VerifiedIcon,
    ArrowBack as ArrowBackIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { products } from '../Products/Products';

const ProductDetails: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(0);

    // Find the product by ID
    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <Container sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Product not found</Typography>
                <Button variant="contained" onClick={() => navigate('/shop')}>
                    Back to Shop
                </Button>
            </Container>
        );
    }

    // Mock multiple images (in real app, product would have multiple images)
    const productImages = [product.image, product.image, product.image, product.image];

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                {/* Breadcrumbs */}
                <Box sx={{ mb: 3 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/shop')}
                        sx={{ mb: 2, color: 'text.secondary' }}
                    >
                        Back to Shop
                    </Button>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        sx={{ fontSize: '0.875rem' }}
                    >
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                            sx={{ cursor: 'pointer' }}
                        >
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/shop"
                            sx={{ cursor: 'pointer' }}
                        >
                            Shop
                        </Link>
                        <Typography color="text.primary" sx={{ fontSize: '0.875rem' }}>
                            {product.name}
                        </Typography>
                    </Breadcrumbs>
                </Box>

                <Grid container spacing={4}>
                    {/* Left Side - Product Images */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ position: 'sticky', top: 80 }}>
                            {/* Main Product Image */}
                            <Card
                                sx={{
                                    mb: 2,
                                    bgcolor: 'white',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: 2
                                }}
                            >
                                {/* Sale Badge */}
                                {product.discount && (
                                    <Chip
                                        label={`${product.discount}% OFF`}
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            zIndex: 2,
                                            fontWeight: 700,
                                            fontSize: '0.875rem',
                                            bgcolor: '#ff4444',
                                            color: 'white',
                                            height: '32px'
                                        }}
                                    />
                                )}

                                {/* Wishlist & Share Icons */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        zIndex: 2,
                                        display: 'flex',
                                        gap: 1
                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            bgcolor: 'white',
                                            boxShadow: 2,
                                            '&:hover': {
                                                bgcolor: 'white',
                                                color: 'error.main'
                                            }
                                        }}
                                        size="small"
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                </Box>

                                <CardMedia
                                    component="img"
                                    image={productImages[selectedImage]}
                                    alt={product.name}
                                    sx={{
                                        width: '100%',
                                        height: { xs: 400, md: 500 },
                                        objectFit: 'cover'
                                    }}
                                />
                            </Card>

                            {/* Thumbnail Images */}
                            <Grid container spacing={2}>
                                {productImages.map((img, index) => (
                                    <Grid size={{ xs: 3 }} key={index}>
                                        <Card
                                            onClick={() => setSelectedImage(index)}
                                            sx={{
                                                cursor: 'pointer',
                                                border: '2px solid',
                                                borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                                                transition: 'all 0.2s ease',
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                }
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={img}
                                                alt={`${product.name} ${index + 1}`}
                                                sx={{
                                                    width: '100%',
                                                    height: 100,
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Right Side - Product Details */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ bgcolor: 'white', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                            {/* Category Badge */}
                            <Chip
                                label={product.category}
                                size="small"
                                sx={{
                                    mb: 2,
                                    bgcolor: '#f0f0f0',
                                    color: 'text.secondary',
                                    fontWeight: 600
                                }}
                            />

                            {/* Product Name */}
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                                    lineHeight: 1.2
                                }}
                            >
                                {product.name}
                            </Typography>

                            {/* Rating & Reviews */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <Rating
                                    value={product.rating}
                                    precision={0.5}
                                    size="medium"
                                    readOnly
                                    sx={{
                                        '& .MuiRating-iconFilled': {
                                            color: '#fbbf24'
                                        }
                                    }}
                                />
                            </Box>

                            {/* Price */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 700,
                                            color: product.originalPrice ? '#ff4444' : 'text.primary',
                                            fontSize: { xs: '2rem', md: '2.5rem' }
                                        }}
                                    >
                                       ₹{product.price}
                                    </Typography>
                                    {product.originalPrice && (
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                textDecoration: 'line-through',
                                                color: 'text.secondary',
                                                fontSize: '1.5rem'
                                            }}
                                        >
                                            ₹{product.originalPrice}
                                        </Typography>
                                    )}
                                </Box>
                                {product.originalPrice && (
                                    <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                                        You save ₹{product.originalPrice - product.price} ({product.discount}% off)
                                    </Typography>
                                )}
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Product Description */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    Description
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                    {product.description}
                                </Typography>
                            </Box>

                            {/* Product Details */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Product Details
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Material:
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {product.material}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Category:
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {product.category}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Availability:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                            sx={{ color: product.inStock ? 'success.main' : 'error.main' }}
                                        >
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Action Buttons */}
                            <Stack spacing={2} sx={{ mb: 3 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={<CartIcon />}
                                    sx={{
                                        bgcolor: '#333',
                                        color: 'white',
                                        py: 1.75,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor: '#000'
                                        }
                                    }}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        py: 1.75,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor: 'primary.dark'
                                        }
                                    }}
                                >
                                    Buy Now
                                </Button>
                            </Stack>

                            {/* Features */}
                            <Box
                                sx={{
                                    bgcolor: '#f9f9f9',
                                    borderRadius: 2,
                                    p: 2.5,
                                    border: '1px solid',
                                    borderColor: 'divider'
                                }}
                            >
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <ShippingIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>
                                                Free Shipping
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                On orders over ₹1000
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <VerifiedIcon sx={{ color: 'success.main', fontSize: 28 }} />
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>
                                                Authenticity Guaranteed
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                100% genuine products
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box
                                            sx={{
                                                width: 28,
                                                height: 28,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Typography sx={{ fontSize: 24 }}>🔄</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>
                                                Easy Returns
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                30-day return policy
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProductDetails;
