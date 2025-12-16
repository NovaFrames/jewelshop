import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField,
    Typography,
    CircularProgress,
    Divider,
    Snackbar,
    Alert
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import {
    getCategories,
    addCategory,
    deleteCategory,
    getMaterials,
    addMaterial,
    deleteMaterial,
    type Category,
    type Material
} from '../../firebase/categoryService';

const AdminCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [newMaterial, setNewMaterial] = useState('');
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [cats, mats] = await Promise.all([getCategories(), getMaterials()]);
            setCategories(cats);
            setMaterials(mats);
        } catch (error) {
            showSnackbar('Failed to fetch data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        try {
            await addCategory(newCategory.trim());
            setNewCategory('');
            showSnackbar('Category added', 'success');
            fetchData();
        } catch (error) {
            showSnackbar('Failed to add category', 'error');
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (window.confirm('Delete this category?')) {
            try {
                await deleteCategory(id);
                showSnackbar('Category deleted', 'success');
                fetchData();
            } catch (error) {
                showSnackbar('Failed to delete category', 'error');
            }
        }
    };

    const handleAddMaterial = async () => {
        if (!newMaterial.trim()) return;
        try {
            await addMaterial(newMaterial.trim());
            setNewMaterial('');
            showSnackbar('Material added', 'success');
            fetchData();
        } catch (error) {
            showSnackbar('Failed to add material', 'error');
        }
    };

    const handleDeleteMaterial = async (id: string) => {
        if (window.confirm('Delete this material?')) {
            try {
                await deleteMaterial(id);
                showSnackbar('Material deleted', 'success');
                fetchData();
            } catch (error) {
                showSnackbar('Failed to delete material', 'error');
            }
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Manage Categories & Materials
            </Typography>

            <Grid container spacing={4}>
                {/* Categories Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Categories
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="New Category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddCategory}
                                sx={{ bgcolor: '#832729', '&:hover': { bgcolor: '#6b1f21' } }}
                            >
                                Add
                            </Button>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                            {categories.map((category) => (
                                <ListItem key={category.id} divider>
                                    <ListItemText primary={category.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => handleDeleteCategory(category.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                            {categories.length === 0 && (
                                <Typography variant="body2" color="textSecondary" align="center">
                                    No categories found.
                                </Typography>
                            )}
                        </List>
                    </Paper>
                </Grid>

                {/* Materials Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Materials
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="New Material"
                                value={newMaterial}
                                onChange={(e) => setNewMaterial(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddMaterial}
                                sx={{ bgcolor: '#832729', '&:hover': { bgcolor: '#6b1f21' } }}
                            >
                                Add
                            </Button>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                            {materials.map((material) => (
                                <ListItem key={material.id} divider>
                                    <ListItemText primary={material.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => handleDeleteMaterial(material.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                            {materials.length === 0 && (
                                <Typography variant="body2" color="textSecondary" align="center">
                                    No materials found.
                                </Typography>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AdminCategories;
