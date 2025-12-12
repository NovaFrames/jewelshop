// src/Pages/Shop/Shop.tsx
import React, { useState } from 'react';
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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel,
    Checkbox,
    IconButton,
    Stack,
    Divider
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
    ExpandMore as ExpandMoreIcon,
    GridView as GridViewIcon,
    ViewList as ViewListIcon,
    FavoriteBorder as FavoriteIcon
} from '@mui/icons-material';
import { products, categories } from '../Products/Products';

const Shop: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Our Store');
    const [sortBy, setSortBy] = useState<string>('default');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter products by category
    const filteredProducts = selectedCategory === 'Our Store'
        ? products
        : products.filter(p => p.category === selectedCategory);

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

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    {/* Sidebar - Filters */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{ position: 'sticky', top: 80 }}>
                            {/* Categories Filter */}
                            <Accordion
                                defaultExpanded
                                sx={{
                                    mb: 2,
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        borderBottom: '1px solid',
                                        borderColor: 'divider'
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={600} fontSize="1rem">
                                        Shop By Categories
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 0 }}>
                                    <Box>
                                        {categories.map((category) => (
                                            <FormControlLabel
                                                key={category.name}
                                                control={
                                                    <Checkbox
                                                        checked={selectedCategory === category.name}
                                                        onChange={() => handleCategoryChange(category.name)}
                                                        sx={{ py: 0.5 }}
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
                                                        <Typography variant="body2" color="text.secondary">
                                                            ({category.count})
                                                        </Typography>
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
                        {/* Header with sorting and view options */}
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
                                <FormControl size="small" sx={{ minWidth: 180 }}>
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

                                <Box sx={{
                                    display: 'flex',
                                    gap: 0.5,
                                    bgcolor: 'white',
                                    borderRadius: 1,
                                    p: 0.5
                                }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => setViewMode('grid')}
                                        sx={{
                                            bgcolor: viewMode === 'grid' ? 'primary.main' : 'transparent',
                                            color: viewMode === 'grid' ? 'white' : 'text.primary',
                                            '&:hover': {
                                                bgcolor: viewMode === 'grid' ? 'primary.dark' : 'action.hover'
                                            }
                                        }}
                                    >
                                        <GridViewIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => setViewMode('list')}
                                        sx={{
                                            bgcolor: viewMode === 'list' ? 'primary.main' : 'transparent',
                                            color: viewMode === 'list' ? 'white' : 'text.primary',
                                            '&:hover': {
                                                bgcolor: viewMode === 'list' ? 'primary.dark' : 'action.hover'
                                            }
                                        }}
                                    >
                                        <ViewListIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Stack>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {/* Products Grid */}
                        <Grid container spacing={3}>
                            {sortedProducts.map((product) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            position: 'relative',
                                        }}
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

                                        {/* Wishlist Icon */}
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                zIndex: 1,
                                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                                '&:hover': {
                                                    bgcolor: 'white',
                                                    color: 'error.main'
                                                }
                                            }}
                                            size="small"
                                        >
                                            <FavoriteIcon fontSize="small" />
                                        </IconButton>

                                        {/* Product Image */}
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                height: 280,
                                                bgcolor: '#f5f5f5',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundImage: `url(${product.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                        </CardMedia>

                                        {/* Product Info */}
                                        <CardContent sx={{ flexGrow: 1, pb: 2 }}>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    textTransform: 'uppercase',
                                                    display: 'block',
                                                    mb: 0.5
                                                }}
                                            >
                                                {product.category}
                                            </Typography>

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

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                                <Rating
                                                    value={product.rating}
                                                    precision={0.5}
                                                    size="small"
                                                    readOnly
                                                    sx={{ fontSize: '1rem' }}
                                                />
                                                <Typography variant="caption" color="text.secondary">
                                                    ({product.reviews})
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                                                    color="primary"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '1.1rem'
                                                    }}
                                                >
                                                    ${product.price}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

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
