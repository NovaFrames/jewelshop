// src/Pages/ProductDetails/ProductDetails.tsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
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
    Tabs,
    Tab,
    TextField
} from '@mui/material';
import {
    FavoriteBorder as FavoriteIcon,
    Facebook,
    Twitter,
    Instagram,
    Pinterest,
    Add,
    Remove
} from '@mui/icons-material';
import { products } from '../Products/Products';
import { useCart } from '../../contexts/CartContext';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ProductDetails: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const { dispatch } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Find the product by ID
    const product = products.find(p => p.id === productId);

    // Related products (same category)
    const relatedProducts = products
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4);

    if (!product) {
        return (
            <Container sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Product not found</Typography>
                <Button variant="contained"
                    color='secondary' onClick={() => navigate('/shop')}>
                    Back to Shop
                </Button>
            </Container>
        );
    }

    // Mock multiple images if not present
    const productImages = product.images && product.images.length > 0
        ? product.images
        : [product.image, product.image, product.image, product.image];

    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                product: product,
                quantity: quantity
            }
        });
        // Optionally show snackbar
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: '#fff', minHeight: '100vh', py: 4 }}>
            <Container>
                <Grid container spacing={6}>
                    {/* Left Side - Product Images */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <Card
                                elevation={0}
                                sx={{
                                    mb: 2,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: 0
                                }}
                            >
                                {product.discount && (
                                    <Chip
                                        label={`-${product.discount}%`}
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            zIndex: 2,
                                            bgcolor: '#832729',
                                            color: 'white',
                                            borderRadius: 0,
                                            fontWeight: 600
                                        }}
                                    />
                                )}
                                <CardMedia
                                    component="img"
                                    image={productImages[selectedImage]}
                                    alt={product.name}
                                    sx={{
                                        width: '100%',
                                        height: { xs: 400, md: 600 },
                                        objectFit: 'cover'
                                    }}
                                />
                            </Card>

                            {/* Thumbnails */}
                            <Grid container spacing={2}>
                                {productImages.map((img, index) => (
                                    <Grid size={{ xs: 3 }} key={index}>
                                        <Card
                                            elevation={0}
                                            onClick={() => setSelectedImage(index)}
                                            sx={{
                                                cursor: 'pointer',
                                                border: selectedImage === index ? '1px solid #000' : '1px solid transparent',
                                                borderRadius: 0,
                                                opacity: selectedImage === index ? 1 : 0.7,
                                                transition: 'all 0.2s ease',
                                                '&:hover': { opacity: 1 }
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={img}
                                                alt={`${product.name} ${index + 1}`}
                                                sx={{ width: '100%', height: 100, objectFit: 'cover' }}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Right Side - Product Details */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 400,
                                    mb: 2,
                                    fontFamily: 'Playfair Display, serif',
                                    color: '#333'
                                }}
                            >
                                {product.name}
                            </Typography>

                            {/* Rating */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <Rating value={product.rating} precision={0.5} readOnly size="small" />
                                <Typography variant="body2" color="text.secondary">
                                    (1 customer review)
                                </Typography>
                            </Box>

                            {/* Price */}
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 600,
                                    mb: 3,
                                    color: '#832729',
                                    fontFamily: 'Playfair Display, serif'
                                }}
                            >
                                ₹{product.price}
                                {product.originalPrice && (
                                    <Typography
                                        component="span"
                                        variant="h5"
                                        sx={{
                                            textDecoration: 'line-through',
                                            color: '#999',
                                            ml: 2,
                                            fontWeight: 400
                                        }}
                                    >
                                        ₹{product.originalPrice}
                                    </Typography>
                                )}
                            </Typography>

                            <Typography variant="body1" paragraph sx={{ color: '#666', mb: 4, lineHeight: 1.8 }}>
                                {product.description}
                            </Typography>

                            {/* Add to Cart Section */}
                            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd' }}>
                                    <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    <TextField
                                        value={quantity}
                                        inputProps={{ style: { textAlign: 'center', padding: '10px 0', width: '40px' } }}
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                    />
                                    <IconButton onClick={() => setQuantity(quantity + 1)}>
                                        <Add fontSize="small" />
                                    </IconButton>
                                </Box>
                                <Button
                                    variant="contained"
                                    color='secondary'
                                    size="large"
                                    onClick={handleAddToCart}
                                    sx={{
                                        bgcolor: '#832729',
                                        color: 'white',
                                        px: 6,
                                        '&:hover': { bgcolor: '#6b1f21' },
                                        borderRadius: 0,
                                        textTransform: 'uppercase',
                                        letterSpacing: 1
                                    }}
                                >
                                    Add to Cart
                                </Button>
                                <IconButton sx={{ border: '1px solid #ddd', borderRadius: 0 }}>
                                    <FavoriteIcon />
                                </IconButton>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Stack spacing={1} sx={{ mb: 4 }}>
                                <Typography variant="body2">
                                    <Box component="span" fontWeight="bold" color="#333">SKU:</Box> {product.id}
                                </Typography>
                                <Typography variant="body2">
                                    <Box component="span" fontWeight="bold" color="#333">Category:</Box> {product.category}
                                </Typography>
                                <Typography variant="body2">
                                    <Box component="span" fontWeight="bold" color="#333">Tags:</Box> {product.tags?.join(', ')}
                                </Typography>
                            </Stack>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Typography variant="body2" fontWeight="bold" color="#333">Share:</Typography>
                                <Facebook fontSize="small" sx={{ color: '#666', cursor: 'pointer', '&:hover': { color: '#3b5998' } }} />
                                <Twitter fontSize="small" sx={{ color: '#666', cursor: 'pointer', '&:hover': { color: '#1da1f2' } }} />
                                <Instagram fontSize="small" sx={{ color: '#666', cursor: 'pointer', '&:hover': { color: '#e1306c' } }} />
                                <Pinterest fontSize="small" sx={{ color: '#666', cursor: 'pointer', '&:hover': { color: '#bd081c' } }} />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Tabs Section */}
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ width: '100%', mt: 4 }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                <Tabs value={tabValue} onChange={handleTabChange} aria-label="product tabs" textColor="inherit" indicatorColor="primary">
                                    <Tab label="Description" sx={{ fontWeight: 600, textTransform: 'uppercase' }} />
                                    <Tab label="Additional Information" sx={{ fontWeight: 600, textTransform: 'uppercase' }} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={tabValue} index={0}>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, maxWidth: '800px', mx: 'auto', textAlign: 'center' }}>
                                    {product.description}
                                </Typography>
                            </CustomTabPanel>
                            <CustomTabPanel value={tabValue} index={1}>
                                <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
                                    <Grid container spacing={2}>
                                        <Grid size={6}><Typography fontWeight="bold">Weight</Typography></Grid>
                                        <Grid size={6}><Typography color="text.secondary">{product.weight} g</Typography></Grid>
                                        <Divider sx={{ width: '100%', my: 1 }} />
                                        <Grid size={6}><Typography fontWeight="bold">Dimensions</Typography></Grid>
                                        <Grid size={6}><Typography color="text.secondary">N/A</Typography></Grid>
                                        <Divider sx={{ width: '100%', my: 1 }} />
                                        <Grid size={6}><Typography fontWeight="bold">Material</Typography></Grid>
                                        <Grid size={6}><Typography color="text.secondary">{product.material}</Typography></Grid>
                                    </Grid>
                                </Box>
                            </CustomTabPanel>
                        </Box>
                    </Grid>

                    {/* Related Products */}
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ mt: 8 }}>
                            <Typography variant="h4" align="center" sx={{ mb: 4, fontFamily: 'Playfair Display, serif' }}>
                                Related Products
                            </Typography>
                            <Grid container spacing={4}>
                                {relatedProducts.map((relatedProduct) => (
                                    <Grid size={{ xs: 6, md: 3 }} key={relatedProduct.id}>
                                        <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ position: 'relative', overflow: 'hidden', '&:hover img': { transform: 'scale(1.05)' } }}>
                                                <CardMedia
                                                    component="img"
                                                    image={relatedProduct.image}
                                                    alt={relatedProduct.name}
                                                    sx={{ height: 300, objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    color='secondary'
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 10,
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        bgcolor: 'white',
                                                        color: 'black',
                                                        '&:hover': { bgcolor: '#333', color: 'white' },
                                                        opacity: 0,
                                                        transition: 'opacity 0.3s ease',
                                                        '.MuiBox-root:hover &': { opacity: 1 }
                                                    }}
                                                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                                                >
                                                    Quick View
                                                </Button>
                                            </Box>
                                            <Box sx={{ pt: 2, textAlign: 'center' }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    component={RouterLink}
                                                    to={`/product/${relatedProduct.id}`}
                                                    sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 600, fontFamily: 'Playfair Display, serif' }}
                                                >
                                                    {relatedProduct.name}
                                                </Typography>
                                                <Typography variant="body1" color="#832729" fontWeight="bold" sx={{ mt: 1 }}>
                                                    ₹{relatedProduct.price}
                                                </Typography>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProductDetails;
