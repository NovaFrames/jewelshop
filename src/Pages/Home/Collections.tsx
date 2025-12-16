// src/pages/CollectionsPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  alpha,
  Drawer,
  IconButton,
} from '@mui/material';
import {
  Search,
  FilterList,
  Sort,
  Close,
  Check,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Sample data
const collections = [
  {
    id: '1',
    name: 'Gold Collection',
    description: 'Elegant gold jewelry for special occasions',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    productCount: 24,
    featured: true,
  },
  {
    id: '2',
    name: 'Silver Elegance',
    description: 'Timeless silver pieces for everyday wear',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    productCount: 18,
    featured: true,
  },
  {
    id: '3',
    name: 'Diamond Dreams',
    description: 'Sparkling diamonds that captivate',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    productCount: 12,
    featured: true,
  },
  {
    id: '4',
    name: 'Pearl Perfection',
    description: 'Classic pearls with modern twists',
    image: 'https://images.unsplash.com/photo-1589674781759-8b5af6c97a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    productCount: 15,
    featured: false,
  },
  {
    id: '5',
    name: 'Rose Gold Romance',
    description: 'Warm rose gold for romantic moments',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    productCount: 20,
    featured: false,
  },
  {
    id: '6',
    name: 'Platinum Purity',
    description: 'Premium platinum jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    productCount: 8,
    featured: false,
  },
];

const categories = [
  'All Categories',
  'Necklaces',
  'Earrings',
  'Rings',
  'Bracelets',
  'Watches',
];

const materials = ['Gold', 'Silver', 'Diamond', 'Pearl', 'Platinum', 'Rose Gold'];

const CollectionsPage: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Our Collections
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 400,
                opacity: 0.9,
                maxWidth: 600,
              }}
            >
              Discover handcrafted jewelry pieces from our exclusive collections
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 4, md: 6 } }}>
        {/* Filters and Search Bar */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{ mb: 6, alignItems: { xs: 'stretch', md: 'center' } }}
        >
          <TextField
            fullWidth
            placeholder="Search collections..."
            variant="contained"
            color='secondary'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color='secondary'
              startIcon={<FilterList />}
              onClick={() => setFilterOpen(true)}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              Filters
            </Button>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={<Sort sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="name-asc">Name: A-Z</MenuItem>
                <MenuItem value="name-desc">Name: Z-A</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        {/* Category Chips */}
        <Box sx={{ mb: 6, overflowX: 'auto', py: 1 }}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'nowrap' }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                sx={{
                  px: 2,
                  py: 3,
                  fontSize: '0.9rem',
                  fontWeight: selectedCategory === category ? 600 : 400,
                }}
              />
            ))}
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {/* Desktop Filters */}
          <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                position: 'sticky',
                top: 100,
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Filters
              </Typography>

              {/* Price Range */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Price Range
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, value) => setPriceRange(value as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  step={100}
                  sx={{ color: 'primary.main' }}
                />
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                  <Typography variant="body2">${priceRange[0]}</Typography>
                  <Typography variant="body2">${priceRange[1]}</Typography>
                </Stack>
              </Box>

              {/* Materials */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Material
                </Typography>
                <FormGroup>
                  {materials.map((material) => (
                    <FormControlLabel
                      key={material}
                      control={
                        <Checkbox
                          checked={selectedMaterials.includes(material)}
                          onChange={() => handleMaterialToggle(material)}
                          size="small"
                        />
                      }
                      label={material}
                    />
                  ))}
                </FormGroup>
              </Box>

              <Button
                variant="contained"
                color='secondary'
                fullWidth
                onClick={() => {
                  setPriceRange([0, 5000]);
                  setSelectedMaterials([]);
                }}
              >
                Clear All
              </Button>
            </Box>
          </Grid>

          {/* Collections Grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Grid container spacing={4}>
              {collections.map((collection, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={collection.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          image={collection.image}
                          alt={collection.name}
                          sx={{
                            height: 240,
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                        {collection.featured && (
                          <Chip
                            label="Featured"
                            color="primary"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              left: 12,
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                          {collection.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {collection.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            mb: 3,
                            color: 'text.secondary',
                          }}
                        >
                          {collection.productCount} products
                        </Typography>
                        <Button
                          variant="contained"
                          color='secondary'
                          color="primary"
                          fullWidth
                          sx={{ mt: 'auto' }}
                        >
                          View Collection
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination
                count={10}
                color="primary"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: '1rem',
                    minWidth: 40,
                    height: 40,
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 350 },
            p: 3,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          <IconButton onClick={() => setFilterOpen(false)}>
            <Close />
          </IconButton>
        </Stack>

        {/* Price Range */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={(_, value) => setPriceRange(value as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={5000}
            step={100}
            sx={{ color: 'primary.main' }}
          />
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="body2">${priceRange[0]}</Typography>
            <Typography variant="body2">${priceRange[1]}</Typography>
          </Stack>
        </Box>

        {/* Materials */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Material
          </Typography>
          <Stack spacing={1}>
            {materials.map((material) => (
              <Button
                key={material}
                variant={selectedMaterials.includes(material) ? 'contained' : 'outlined'}
                onClick={() => handleMaterialToggle(material)}
                startIcon={selectedMaterials.includes(material) ? <Check /> : undefined}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                }}
              >
                {material}
              </Button>
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            color='secondary'
            fullWidth
            onClick={() => {
              setPriceRange([0, 5000]);
              setSelectedMaterials([]);
            }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            color='secondary'
            fullWidth
            onClick={() => setFilterOpen(false)}
          >
            Apply Filters
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default CollectionsPage;