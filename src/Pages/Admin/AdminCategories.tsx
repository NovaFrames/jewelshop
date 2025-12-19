import React, { useState, useEffect, useMemo } from 'react';
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
    Alert,
    Card,
    CardContent,
    Stack,
    InputAdornment,
    Fade
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Category as CategoryIcon,
    Diamond as MaterialIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
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

const StatCard: React.FC<{ title: string; value: number; icon: any; color: string }> = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: `${color}15`,
                    color: color,
                    display: 'flex'
                }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {value}
                    </Typography>
                </Box>
            </Stack>
        </CardContent>
    </Card>
);

const AdminCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [newMaterial, setNewMaterial] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [materialSearch, setMaterialSearch] = useState('');
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
            showSnackbar('Category added successfully', 'success');
            fetchData();
        } catch (error) {
            showSnackbar('Failed to add category', 'error');
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id);
                showSnackbar('Category deleted successfully', 'success');
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
            showSnackbar('Material added successfully', 'success');
            fetchData();
        } catch (error) {
            showSnackbar('Failed to add material', 'error');
        }
    };

    const handleDeleteMaterial = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this material?')) {
            try {
                await deleteMaterial(id);
                showSnackbar('Material deleted successfully', 'success');
                fetchData();
            } catch (error) {
                showSnackbar('Failed to delete material', 'error');
            }
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const filteredCategories = useMemo(() => {
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(categorySearch.toLowerCase())
        );
    }, [categories, categorySearch]);

    const filteredMaterials = useMemo(() => {
        return materials.filter(mat =>
            mat.name.toLowerCase().includes(materialSearch.toLowerCase())
        );
    }, [materials, materialSearch]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress color="secondary" size={60} thickness={4} />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a' }}>
                    Categories & Materials
                </Typography>
            </Stack>

            {/* Stats Overview */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <StatCard
                        title="Total Categories"
                        value={categories.length}
                        icon={<CategoryIcon />}
                        color="#6366f1"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <StatCard
                        title="Total Materials"
                        value={materials.length}
                        icon={<MaterialIcon />}
                        color="#ec4899"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                {/* Categories Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CategoryIcon color="primary" /> Categories
                        </Typography>

                        <Stack spacing={2} sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Add new category..."
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleAddCategory}
                                    disabled={!newCategory.trim()}
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        bgcolor: '#832729',
                                        '&:hover': { bgcolor: '#6b1f21' },
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Add
                                </Button>
                            </Box>

                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search categories..."
                                value={categorySearch}
                                onChange={(e) => setCategorySearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f8fafc' } }}
                            />
                        </Stack>

                        <Divider sx={{ mb: 2 }} />

                        <List sx={{ maxHeight: 400, overflow: 'auto', pr: 1 }}>
                            {filteredCategories.map((category) => (
                                <Fade in key={category.id}>
                                    <ListItem
                                        sx={{
                                            borderRadius: 2,
                                            mb: 1,
                                            '&:hover': { bgcolor: '#f1f5f9' },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <ListItemText
                                            primary={category.name}
                                            primaryTypographyProps={{ fontWeight: 500 }}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleDeleteCategory(category.id)}
                                                color="error"
                                                sx={{ '&:hover': { bgcolor: '#fee2e2' } }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Fade>
                            ))}
                            {filteredCategories.length === 0 && (
                                <Box sx={{ py: 4, textAlign: 'center' }}>
                                    <Typography variant="body2" color="textSecondary">
                                        {categorySearch ? 'No matching categories found.' : 'No categories added yet.'}
                                    </Typography>
                                </Box>
                            )}
                        </List>
                    </Paper>
                </Grid>

                {/* Materials Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MaterialIcon sx={{ color: '#ec4899' }} /> Materials
                        </Typography>

                        <Stack spacing={2} sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Add new material..."
                                    value={newMaterial}
                                    onChange={(e) => setNewMaterial(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddMaterial()}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleAddMaterial}
                                    disabled={!newMaterial.trim()}
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        bgcolor: '#832729',
                                        '&:hover': { bgcolor: '#6b1f21' },
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Add
                                </Button>
                            </Box>

                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search materials..."
                                value={materialSearch}
                                onChange={(e) => setMaterialSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f8fafc' } }}
                            />
                        </Stack>

                        <Divider sx={{ mb: 2 }} />

                        <List sx={{ maxHeight: 400, overflow: 'auto', pr: 1 }}>
                            {filteredMaterials.map((material) => (
                                <Fade in key={material.id}>
                                    <ListItem
                                        sx={{
                                            borderRadius: 2,
                                            mb: 1,
                                            '&:hover': { bgcolor: '#f1f5f9' },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <ListItemText
                                            primary={material.name}
                                            primaryTypographyProps={{ fontWeight: 500 }}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleDeleteMaterial(material.id)}
                                                color="error"
                                                sx={{ '&:hover': { bgcolor: '#fee2e2' } }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Fade>
                            ))}
                            {filteredMaterials.length === 0 && (
                                <Box sx={{ py: 4, textAlign: 'center' }}>
                                    <Typography variant="body2" color="textSecondary">
                                        {materialSearch ? 'No matching materials found.' : 'No materials added yet.'}
                                    </Typography>
                                </Box>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%', borderRadius: 2 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AdminCategories;
