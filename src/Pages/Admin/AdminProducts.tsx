import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    FormControlLabel,
    Switch,
    Grid,
    CircularProgress,
    Snackbar,
    Alert,
    MenuItem,
    Stack
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';
import { type Product } from '../User/Products/Products';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../firebase/productService';
import { getCategories, getMaterials, type Category, type Material } from '../../firebase/categoryService';
import { uploadImage } from '../../firebase/uploadService';

const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productsData, categoriesData, materialsData] = await Promise.all([
                getProducts(),
                getCategories(),
                getMaterials()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
            setMaterials(materialsData);
        } catch (error) {
            showSnackbar('Failed to fetch data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (product?: Product) => {
        if (product) {
            setCurrentProduct({
                ...product,
                images: product.images || (product.image ? [product.image] : [])
            });
            setIsEditing(true);
        } else {
            setCurrentProduct({
                name: '',
                description: '',
                price: 0,
                category: '',
                material: '',
                image: '',
                images: [],
                rating: 0,
                reviews: 0,
                inStock: true,
                tags: [],
                weight: 0
            });
            setIsEditing(false);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentProduct({});
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setUploading(true);
            try {
                const newImages: string[] = [];
                for (let i = 0; i < event.target.files.length; i++) {
                    const file = event.target.files[i];
                    const url = await uploadImage(file);
                    newImages.push(url);
                }

                setCurrentProduct(prev => {
                    const updatedImages = [...(prev.images || []), ...newImages];
                    return {
                        ...prev,
                        images: updatedImages,
                        image: updatedImages.length > 0 ? updatedImages[0] : prev.image // Sync main image
                    };
                });
                showSnackbar('Images uploaded successfully', 'success');
            } catch (error) {
                showSnackbar('Failed to upload images', 'error');
            } finally {
                setUploading(false);
            }
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setCurrentProduct(prev => {
            const updatedImages = (prev.images || []).filter((_, index) => index !== indexToRemove);
            return {
                ...prev,
                images: updatedImages,
                image: updatedImages.length > 0 ? updatedImages[0] : '' // Update main image if needed
            };
        });
    };

    const handleSave = async () => {
        try {
            // Basic validation
            if (!currentProduct.name || !currentProduct.price) {
                showSnackbar('Name and Price are required', 'error');
                return;
            }

            const productData = {
                ...currentProduct,
                price: Number(currentProduct.price),
                originalPrice: currentProduct.originalPrice ? Number(currentProduct.originalPrice) : undefined,
                rating: Number(currentProduct.rating),
                reviews: Number(currentProduct.reviews),
                discount: currentProduct.discount ? Number(currentProduct.discount) : undefined,
                weight: Number(currentProduct.weight),
                tags: Array.isArray(currentProduct.tags) ? currentProduct.tags : (currentProduct.tags as unknown as string).split(',').map((t: string) => t.trim()),
                // Ensure image is set if images array exists
                image: (currentProduct.images && currentProduct.images.length > 0) ? currentProduct.images[0] : (currentProduct.image || ''),
                images: currentProduct.images || []
            } as Product;

            if (isEditing && currentProduct.id) {
                await updateProduct(currentProduct.id, productData);
                showSnackbar('Product updated successfully', 'success');
            } else {
                // Remove id if it exists (it shouldn't for new, but just in case)
                const { id, ...newProductData } = productData;
                await addProduct(newProductData);
                showSnackbar('Product added successfully', 'success');
            }
            fetchData();
            handleCloseDialog();
        } catch (error) {
            showSnackbar('Error saving product', 'error');
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                showSnackbar('Product deleted successfully', 'success');
                fetchData();
            } catch (error) {
                showSnackbar('Error deleting product', 'error');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Product Management
                </Typography>
                <Button
                    variant="contained"
                    color='secondary'
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Add Product
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress color="secondary" />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <Box
                                            component="img"
                                            src={product.image}
                                            alt={product.name}
                                            sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }}
                                        />
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>₹{product.price}</TableCell>
                                    <TableCell>
                                        <Typography color={product.inStock ? 'success.main' : 'error.main'}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenDialog(product)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(product.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="name"
                                label="Product Name"
                                fullWidth
                                value={currentProduct.name || ''}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                select
                                name="category"
                                label="Category"
                                fullWidth
                                value={currentProduct.category || ''}
                                onChange={handleChange}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="price"
                                label="Price"
                                type="number"
                                fullWidth
                                value={currentProduct.price || ''}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="originalPrice"
                                label="Original Price"
                                type="number"
                                fullWidth
                                value={currentProduct.originalPrice || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                name="description"
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                value={currentProduct.description || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                select
                                name="material"
                                label="Material"
                                fullWidth
                                value={currentProduct.material || ''}
                                onChange={handleChange}
                            >
                                {materials.map((option) => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Image Upload Section */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle1" gutterBottom>Product Images</Typography>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    component="label"
                                    variant="contained"
                                    color='secondary'
                                    startIcon={<CloudUploadIcon />}
                                    disabled={uploading}
                                >
                                    Upload Images
                                    <input
                                        type="file"
                                        hidden
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                                {uploading && <CircularProgress size={24} sx={{ ml: 2 }} />}
                            </Box>

                            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
                                {currentProduct.images?.map((img, index) => (
                                    <Box key={index} sx={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
                                        <Box
                                            component="img"
                                            src={img}
                                            alt={`Product ${index + 1}`}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1, border: '1px solid #ddd' }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRemoveImage(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                bgcolor: 'white',
                                                boxShadow: 1,
                                                '&:hover': { bgcolor: '#f5f5f5' }
                                            }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                name="rating"
                                label="Rating"
                                type="number"
                                fullWidth
                                inputProps={{ step: 0.1, min: 0, max: 5 }}
                                value={currentProduct.rating || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                name="reviews"
                                label="Reviews Count"
                                type="number"
                                fullWidth
                                value={currentProduct.reviews || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                name="weight"
                                label="Weight (g)"
                                type="number"
                                fullWidth
                                value={currentProduct.weight || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                name="tags"
                                label="Tags (comma separated)"
                                fullWidth
                                value={Array.isArray(currentProduct.tags) ? currentProduct.tags.join(', ') : currentProduct.tags || ''}
                                onChange={(e) => setCurrentProduct(prev => ({ ...prev, tags: e.target.value as unknown as string[] }))}
                                helperText="Enter tags separated by commas (e.g. sale, new, trending)"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={currentProduct.inStock || false}
                                        onChange={handleChange}
                                        name="inStock"
                                    />
                                }
                                label="In Stock"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained"
                        color='secondary' sx={{ bgcolor: '#832729', '&:hover': { bgcolor: '#6b1f21' } }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AdminProducts;
