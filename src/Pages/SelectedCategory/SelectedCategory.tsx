// src/Pages/SelectedCategory/SelectedCategory.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Rating,
    FormControl,
    Select,
    MenuItem,
    Stack,
    Button,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
    ShoppingCartOutlined as CartIcon,
} from '@mui/icons-material';
import { products } from '../Products/Products';

const SelectedCategory: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState<string>('default');

    // Parse the URL path to determine category and material
    const pathname = location.pathname;
    const pathParts = pathname.split('/').filter(Boolean);

    let materialFilter = '';
    let categoryFilter = '';
    let displayName = '';

    if (pathParts.length === 2 && (pathParts[0] === 'gold' || pathParts[0] === 'diamond')) {
        // Format: '/gold/bangles' or '/diamond/rings'
        materialFilter = pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1);
        const catPart = pathParts[1].split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        categoryFilter = catPart;
        displayName = `${materialFilter} ${categoryFilter}`;
    } else if (pathParts.length === 1) {
        // Format: '/earrings' or '/nose-pin'
        categoryFilter = pathParts[0].split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        displayName = categoryFilter;
    }

    // Filter products by category and/or material
    const filteredProducts = products.filter(p => {
        // Normalize strings for comparison
        const productCategory = p.category.toLowerCase();
        const productMaterial = p.material.toLowerCase();
        const searchCategory = categoryFilter.toLowerCase();
        const searchMaterial = materialFilter.toLowerCase();

        // Check category match
        let categoryMatch = false;
        if (searchCategory === 'all') {
            categoryMatch = true;
        } else if (searchCategory.includes('earring')) {
            categoryMatch = productCategory.includes('earring');
        } else if (searchCategory.includes('ring') && !searchCategory.includes('earring')) {
            categoryMatch = productCategory.includes('ring') && !productCategory.includes('earring');
        } else if (searchCategory.includes('pendant')) {
            categoryMatch = productCategory.includes('pendant') || productCategory.includes('prayer');
        } else if (searchCategory.includes('chain')) {
            categoryMatch = productCategory.includes('chain') || productCategory.includes('prayer');
        } else if (searchCategory.includes('necklace')) {
            categoryMatch = productCategory.includes('necklace') || productCategory.includes('prayer');
        } else if (searchCategory.includes('bangle')) {
            categoryMatch = productCategory.includes('bangle') || productCategory.includes('barrette');
        } else if (searchCategory.includes('bracelet')) {
            categoryMatch = productCategory.includes('bracelet');
        } else if (searchCategory.includes('nose')) {
            categoryMatch = productCategory.includes('nose');
        } else {
            categoryMatch = productCategory.includes(searchCategory) || searchCategory.includes(productCategory);
        }

        // If we have a material filter, check both category and material
        if (searchMaterial) {
            const materialMatch = productMaterial.includes(searchMaterial);
            return categoryMatch && materialMatch;
        }

        return categoryMatch;
    });

    // Apply sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortBy(event.target.value);
    };

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                {/* Category Header */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            fontFamily: '"DM Sans", serif',
                            color: '#832729',
                            mb: 1
                        }}
                    >
                        {displayName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Discover our exquisite collection of {displayName.toLowerCase()}
                    </Typography>
                </Box>

                {/* Header with results count and sorting */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Typography variant="body2" color="text.secondary">
                        Showing 1–{Math.min(20, sortedProducts.length)} of {sortedProducts.length} results
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <Select
                                value={sortBy}
                                onChange={handleSortChange}
                                displayEmpty
                                sx={{ bgcolor: 'white' }}
                            >
                                <MenuItem value="default">Default sorting</MenuItem>
                                <MenuItem value="price-low">Price: Low to High</MenuItem>
                                <MenuItem value="price-high">Price: High to Low</MenuItem>
                                <MenuItem value="rating">Sort by rating</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>

                {/* Products Grid */}
                <Grid container spacing={3}>
                    {sortedProducts.map((product) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    bgcolor: 'white',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                {/* Sale Badge */}
                                {product.discount && (
                                    <Chip
                                        label={`-${product.discount}%`}
                                        color="error"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            zIndex: 1,
                                            fontWeight: 600,
                                            fontSize: '0.75rem'
                                        }}
                                    />
                                )}

                                {/* Product Image */}
                                <CardMedia
                                    component="div"
                                    sx={{
                                        height: 250,
                                        bgcolor: '#f5f5f5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundImage: `url(${product.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderBottom: '1px solid #f0f0f0'
                                    }}
                                />

                                {/* Product Info */}
                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                    <Typography
                                        variant="body1"
                                        component="h3"
                                        sx={{
                                            fontSize: '0.95rem',
                                            fontWeight: 500,
                                            mb: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            minHeight: '2.8em',
                                            lineHeight: 1.4
                                        }}
                                    >
                                        {product.name}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                                        <Rating
                                            value={product.rating}
                                            precision={0.5}
                                            size="small"
                                            readOnly
                                            sx={{ fontSize: '1rem', color: '#ffd700' }}
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            ({product.reviews})
                                        </Typography>
                                    </Box>

                                    {/* Add to Cart Button */}
                                    <Button
                                        variant="contained"
                                        color='secondary'
                                        fullWidth
                                        size="small"
                                        startIcon={<CartIcon />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/product/${product.id}`);
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* No Results */}
                {sortedProducts.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h5" color="text.secondary">
                            No products found in this category
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            Try browsing other categories
                        </Typography>
                        <Button
                            variant="contained"
                            color='secondary'
                            onClick={() => navigate('/all-jewellery')}
                            sx={{
                                mt: 3,
                                bgcolor: '#832729',
                                '&:hover': { bgcolor: '#601a1c' }
                            }}
                        >
                            View All Jewellery
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default SelectedCategory;
