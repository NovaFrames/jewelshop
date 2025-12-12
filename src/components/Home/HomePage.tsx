// src/pages/HomePage.tsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  IconButton,
  Rating,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  alpha,
  Fade,
  useTheme,
} from '@mui/material';
import {
  ArrowForward,
  Search,
  FavoriteBorder,
  ShoppingBagOutlined,
  Instagram,
  Facebook,
  Pinterest,
  Twitter,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Sample data
const featuredCollections = [
  {
    id: '1',
    name: 'Gold Collection',
    description: 'Elegant gold pieces for special occasions',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    productCount: 24,
  },
  {
    id: '2',
    name: 'Silver Elegance',
    description: 'Timeless silver jewelry for everyday wear',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    productCount: 18,
  },
  {
    id: '3',
    name: 'Diamond Dreams',
    description: 'Sparkling diamonds that captivate',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    productCount: 12,
  },
];

const bestSellers = [
  {
    id: '1',
    name: 'Pearl Necklace',
    description: 'Classic freshwater pearls with gold clasp',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    tags: ['Bestseller', 'New'],
  },
  {
    id: '2',
    name: 'Gold Hoop Earrings',
    description: '14k gold hoops for any occasion',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1594576722512-582d5577dc56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    tags: ['Popular'],
  },
  {
    id: '3',
    name: 'Silver Bracelet',
    description: 'Sterling silver with intricate design',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1605100940453-2e9168fdcce4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    tags: ['Sale'],
  },
  {
    id: '4',
    name: 'Diamond Ring',
    description: 'Solitaire diamond in platinum setting',
    price: 1599.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 56,
    inStock: true,
    tags: ['Luxury'],
  },
];

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '90vh' },
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(to right, ${alpha(
              theme.palette.primary.dark,
              0.9
            )}, ${alpha(theme.palette.primary.main, 0.7)})`,
            zIndex: 1,
          }}
        />
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
          }}
        />
        <Container
          sx={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ maxWidth: 600, color: 'white' }}>
            <Fade in timeout={1000}>
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Timeless Elegance, Modern Luxury
              </Typography>
            </Fade>
            <Fade in timeout={1500}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontWeight: 400,
                  opacity: 0.9,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                }}
              >
                Discover our exclusive collection of handcrafted jewelry pieces
                that tell your unique story.
              </Typography>
            </Fade>
            <Fade in timeout={2000}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/collections"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/about"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: alpha('#ffffff', 0.1),
                    },
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Fade>
          </Box>
        </Container>
      </Box>

      {/* Collections Section */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            Our Collections
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            Explore our curated collections of fine jewelry
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featuredCollections.map((collection, index) => (
            <Grid size={{xs:12,md:4}} key={collection.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    height: 400,
                  }}
                  component={RouterLink}
                  to={`/collections/${collection.id}`}
                >
                  <CardMedia
                    component="img"
                    image={collection.image}
                    alt={collection.name}
                    sx={{
                      height: '100%',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: alpha('#000000', 0.7),
                      color: 'white',
                      p: 3,
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                      {collection.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                      {collection.description}
                    </Typography>
                    <Typography variant="caption">
                      {collection.productCount} products
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={RouterLink}
            to="/collections"
            endIcon={<ArrowForward />}
            sx={{
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            View All Collections
          </Button>
        </Box>
      </Container>

      {/* Best Sellers Section */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              Best Sellers
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
            >
              Most loved pieces from our collection
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {bestSellers.map((product, index) => (
              <Grid size={{xs:12,md:3}} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          height: 280,
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                        }}
                      >
                        <IconButton
                          sx={{
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'primary.50' },
                          }}
                        >
                          <FavoriteBorder />
                        </IconButton>
                        <IconButton
                          sx={{
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'primary.50' },
                          }}
                        >
                          <ShoppingBagOutlined />
                        </IconButton>
                      </Box>
                      {product.tags.map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: tagIndex === 0 ? 12 : 60,
                            bgcolor:
                              tag === 'Sale'
                                ? 'error.main'
                                : tag === 'New'
                                ? 'success.main'
                                : 'primary.main',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {product.description}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                          ({product.reviews})
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: 'line-through',
                              color: 'text.secondary',
                            }}
                          >
                            ${product.originalPrice.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            bgcolor: 'primary.50',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
            Stay Updated
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            Subscribe to our newsletter for exclusive offers and new arrivals
          </Typography>
          <Box
            component="form"
            sx={{
              maxWidth: 500,
              mx: 'auto',
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: { bgcolor: 'background.paper' },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              sx={{ px: 4, whiteSpace: 'nowrap' }}
            >
              Subscribe
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Social Media Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, borderTop: 1, borderColor: 'divider' }}>
        <Container>
          <Typography
            variant="h5"
            sx={{ mb: 4, textAlign: 'center', fontWeight: 600, color: 'primary.main' }}
          >
            Follow Us
          </Typography>
          <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            sx={{ flexWrap: 'wrap' }}
          >
            <IconButton
              size="large"
              sx={{
                color: '#E1306C',
                bgcolor: alpha('#E1306C', 0.1),
                '&:hover': { bgcolor: alpha('#E1306C', 0.2) },
              }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                color: '#1877F2',
                bgcolor: alpha('#1877F2', 0.1),
                '&:hover': { bgcolor: alpha('#1877F2', 0.2) },
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                color: '#E60023',
                bgcolor: alpha('#E60023', 0.1),
                '&:hover': { bgcolor: alpha('#E60023', 0.2) },
              }}
            >
              <Pinterest />
            </IconButton>
            <IconButton
              size="large"
              sx={{
                color: '#1DA1F2',
                bgcolor: alpha('#1DA1F2', 0.1),
                '&:hover': { bgcolor: alpha('#1DA1F2', 0.2) },
              }}
            >
              <Twitter />
            </IconButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;