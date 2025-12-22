// src/Pages/Shop/Shop.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Rating,
    FormControl,
    Select,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel,
    Checkbox,
    Stack,
    Button,
    CircularProgress,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
    ExpandMore as ExpandMoreIcon,
    ShoppingCartOutlined as CartIcon
} from '@mui/icons-material';
import type { DocumentSnapshot } from 'firebase/firestore';
import { type Product } from '../Products/Products';
import { getPaginatedProducts } from '../../../firebase/productService';
import { getCategories } from '../../../firebase/categoryService';



const Shop: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>('Our Store');
    const [sortBy, setSortBy] = useState<string>('default');
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [dynamicCategories, setDynamicCategories] = useState<{ name: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Fetch initial products and categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [paginatedData, fetchedCategories] = await Promise.all([
                    getPaginatedProducts(4), // Get first 4 products
                    getCategories()
                ]);

                setDisplayedProducts(paginatedData.products);
                setLastVisible(paginatedData.lastVisible);
                setHasMore(paginatedData.products.length === 4);

                // Get unique category names and their counts from categories collection
                const uniqueCategoryNames = Array.from(new Set(fetchedCategories.map(c => c.name)));

                // For now, set count to 0 for each category (you can add a count field to your categories collection)
                const processedCategories = uniqueCategoryNames.map(name => ({
                    name,
                    count: 0 // Not displaying counts since we're using pagination
                })).sort((a, b) => a.name.localeCompare(b.name));

                setDynamicCategories(processedCategories);

            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Load more products
    const loadMoreProducts = useCallback(async () => {
        if (!hasMore || loadingMore || !lastVisible) return;

        try {
            setLoadingMore(true);
            const paginatedData = await getPaginatedProducts(4, lastVisible);

            setDisplayedProducts(prev => [...prev, ...paginatedData.products]);
            setLastVisible(paginatedData.lastVisible);
            setHasMore(paginatedData.products.length === 4);
        } catch (error) {
            console.error('Error loading more products:', error);
        } finally {
            setLoadingMore(false);
        }
    }, [hasMore, loadingMore, lastVisible]);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loadingMore) {
                    loadMoreProducts();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loadingMore, loadMoreProducts]);

    // Filter products by category and search
    const filteredProducts = selectedCategory === 'Our Store'
        ? displayedProducts
        : displayedProducts.filter(p => p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim());


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

    const handleCategoryChange = (categoryName: string) => {
        setSelectedCategory(categoryName);
    };

    // Show loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* Sidebar - Filters */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{ position: 'sticky', top: 180 }}>


                            {/* Categories Filter */}
                            <Accordion
                                defaultExpanded
                                sx={{
                                    mb: 2,
                                    boxShadow: 'none',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    '&:before': { display: 'none' }
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                        minHeight: 48
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={600} fontSize="1rem">
                                        Shop By Categories
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 0 }}>
                                    <Box>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedCategory === 'Our Store'}
                                                    onChange={() => handleCategoryChange('Our Store')}
                                                    sx={{ py: 0.5 }}
                                                    size="small"
                                                />
                                            }
                                            label={
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                    pr: 2
                                                }}>
                                                    <Typography variant="body2">All Jewellery</Typography>
                                                </Box>
                                            }
                                            sx={{
                                                width: '100%',
                                                mx: 0,
                                                px: 2,
                                                py: 0.5,
                                                '&:hover': {
                                                    bgcolor: 'action.hover'
                                                }
                                            }}
                                        />

                                        {dynamicCategories.map((category) => (

                                            <FormControlLabel
                                                key={category.name}
                                                control={
                                                    <Checkbox
                                                        checked={selectedCategory === category.name}
                                                        onChange={() => handleCategoryChange(category.name)}
                                                        sx={{ py: 0.5 }}
                                                        size="small"
                                                    />
                                                }
                                                label={
                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        width: '100%',
                                                        pr: 2
                                                    }}>
                                                        <Typography variant="body2">{category.name}</Typography>
                                                    </Box>
                                                }
                                                sx={{
                                                    width: '100%',
                                                    mx: 0,
                                                    px: 2,
                                                    py: 0.5,
                                                    '&:hover': {
                                                        bgcolor: 'action.hover'
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>

                    {/* Main Content - Products */}
                    <Grid size={{ xs: 12, md: 9 }}>
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
                            {sortedProducts.map((product, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={product.id}>
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

                                        {/* Product Image */}
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                height: 200,
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

                                            {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                {product.originalPrice && (
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            textDecoration: 'line-through',
                                                            fontSize: '0.875rem'
                                                        }}
                                                    >
                                                        ${product.originalPrice}
                                                    </Typography>
                                                )}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '1.1rem',
                                                        color: product.originalPrice ? '#ff4444' : '#333'
                                                    }}
                                                >
                                                    ${product.price}
                                                </Typography>
                                            </Box> */}

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

                                        {/* Second Sale Timer for specific products */}
                                        {(index === 0 || index === 4) && (
                                            <Box sx={{
                                                px: 2,
                                                pb: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1
                                            }}>
                                            </Box>
                                        )}
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Observer target for infinite scroll */}
                        <Box ref={observerTarget} sx={{ height: 20, mt: 2 }} />

                        {/* Loading indicator */}
                        {loadingMore && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress color="secondary" />
                            </Box>
                        )}

                        {/* No more products message */}
                        {!hasMore && sortedProducts.length > 0 && (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No more products to load
                                </Typography>
                            </Box>
                        )}

                        {/* No Results */}
                        {sortedProducts.length === 0 && (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <Typography variant="h5" color="text.secondary">
                                    No products found
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                    Try adjusting your filters
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Shop;