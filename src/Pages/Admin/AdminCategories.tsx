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
    Divider,
    Card,
    CardContent,
    Stack,
    InputAdornment,
    Fade,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    Chip,
    CircularProgress
} from '@mui/material';
import Loader from '../../components/Common/Loader';
import {
    Delete as DeleteIcon,
    Category as CategoryIcon,
    Diamond as MaterialIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import {
    addCategory,
    deleteCategory,
    getMaterials,
    addMaterial,
    deleteMaterial,
    type Category,
    type Material
} from '../../firebase/categoryService';
import { useSnackbar } from '../../contexts/SnackbarContext';

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
    const [selectedMaterialForCategory, setSelectedMaterialForCategory] = useState('');
    const [newMaterial, setNewMaterial] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [materialSearch, setMaterialSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [isAddingMaterial, setIsAddingMaterial] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [deleteType, setDeleteType] = useState<'category' | 'material' | null>(null);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const mats = await getMaterials();
            setMaterials(mats);
            // Derive categories from materials for local state
            const cats: Category[] = [];
            mats.forEach(mat => {
                if (mat.categories) {
                    mat.categories.forEach(catName => {
                        cats.push({
                            id: `${mat.id}_${catName}`,
                            name: catName,
                            materialId: mat.id
                        });
                    });
                }
            });
            setCategories(cats);
        } catch (error) {
            showSnackbar('Failed to fetch data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim() || !selectedMaterialForCategory) {
            showSnackbar('Please enter category name and select a material', 'error');
            return;
        }
        setIsAddingCategory(true);
        try {
            const id = await addCategory(newCategory.trim(), selectedMaterialForCategory);

            // Update local materials state
            setMaterials(prev => prev.map(mat =>
                mat.id === selectedMaterialForCategory
                    ? { ...mat, categories: [...(mat.categories || []), newCategory.trim()] }
                    : mat
            ));

            const newCat: Category = {
                id,
                name: newCategory.trim(),
                materialId: selectedMaterialForCategory
            };
            setCategories(prev => [...prev, newCat]);
            setNewCategory('');
            showSnackbar('Category added successfully', 'success');
        } catch (error) {
            showSnackbar('Failed to add category', 'error');
        } finally {
            setIsAddingCategory(false);
        }
    };

    const handleDeleteCategory = (id: string) => {
        // id is in format `${materialId}_${categoryName}`
        setItemToDelete(id);
        setDeleteType('category');
        setDeleteDialogOpen(true);
    };

    const handleAddMaterial = async () => {
        if (!newMaterial.trim()) return;
        setIsAddingMaterial(true);
        try {
            const id = await addMaterial(newMaterial.trim());
            const newMat: Material = {
                id,
                name: newMaterial.trim(),
                categories: []
            };
            setMaterials(prev => [...prev, newMat]);
            setNewMaterial('');
            showSnackbar('Material added successfully', 'success');
        } catch (error) {
            showSnackbar('Failed to add material', 'error');
        } finally {
            setIsAddingMaterial(false);
        }
    };

    const handleDeleteMaterial = (id: string) => {
        setItemToDelete(id);
        setDeleteType('material');
        setDeleteDialogOpen(true);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
        setDeleteType(null);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete && deleteType) {
            setIsDeleting(true);
            try {
                if (deleteType === 'category') {
                    // itemToDelete is `${materialId}_${categoryName}`
                    const [materialId, categoryName] = itemToDelete.split('_');
                    await deleteCategory(categoryName, materialId);

                    // Update local materials state
                    setMaterials(prev => prev.map(mat =>
                        mat.id === materialId
                            ? { ...mat, categories: mat.categories.filter(c => c !== categoryName) }
                            : mat
                    ));

                    setCategories(prev => prev.filter(cat => cat.id !== itemToDelete));
                    showSnackbar('Category deleted successfully', 'success');
                } else {
                    await deleteMaterial(itemToDelete);
                    setMaterials(prev => prev.filter(mat => mat.id !== itemToDelete));
                    // Also remove categories associated with this material
                    setCategories(prev => prev.filter(cat => cat.materialId !== itemToDelete));
                    showSnackbar('Material deleted successfully', 'success');
                }
            } catch (error) {
                showSnackbar(`Failed to delete ${deleteType}`, 'error');
            } finally {
                setIsDeleting(false);
                handleCancelDelete();
            }
        }
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
        return <Loader fullPage size={60} thickness={4} />;
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
                                    disabled={!newMaterial.trim() || isAddingMaterial}
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        bgcolor: '#832729',
                                        '&:hover': { bgcolor: '#6b1f21' },
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        minWidth: 80
                                    }}
                                >
                                    {isAddingMaterial ? <CircularProgress size={24} color="inherit" /> : 'Add'}
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

                {/* Categories Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CategoryIcon color="primary" /> Categories
                        </Typography>

                        <Stack spacing={2} sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Select Material"
                                    value={selectedMaterialForCategory}
                                    onChange={(e) => setSelectedMaterialForCategory(e.target.value)}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                >
                                    {materials.map((mat) => (
                                        <MenuItem key={mat.id} value={mat.id}>
                                            {mat.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                                        disabled={!newCategory.trim() || !selectedMaterialForCategory || isAddingCategory}
                                        sx={{
                                            borderRadius: 2,
                                            px: 3,
                                            bgcolor: '#832729',
                                            '&:hover': { bgcolor: '#6b1f21' },
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            minWidth: 80
                                        }}
                                    >
                                        {isAddingCategory ? <CircularProgress size={24} color="inherit" /> : 'Add'}
                                    </Button>
                                </Box>
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

                        <Box sx={{ maxHeight: 500, overflow: 'auto', pr: 1 }}>
                            {materials.map((material) => {
                                const materialCategories = filteredCategories.filter(cat => cat.materialId === material.id);
                                if (materialCategories.length === 0 && !categorySearch) return null;
                                if (materialCategories.length === 0 && categorySearch) return null;

                                return (
                                    <Box key={material.id} sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1.5, px: 1, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
                                            {material.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, px: 1 }}>
                                            {materialCategories.map((category) => (
                                                <Fade in key={category.id}>
                                                    <Chip
                                                        label={category.name}
                                                        onDelete={() => handleDeleteCategory(category.id)}
                                                        deleteIcon={<DeleteIcon sx={{ fontSize: '16px !important' }} />}
                                                        sx={{
                                                            borderRadius: 2,
                                                            fontWeight: 500,
                                                            bgcolor: '#f1f5f9',
                                                            '&:hover': { bgcolor: '#e2e8f0' },
                                                            '& .MuiChip-deleteIcon': {
                                                                color: '#94a3b8',
                                                                '&:hover': { color: '#ef4444' }
                                                            }
                                                        }}
                                                    />
                                                </Fade>
                                            ))}
                                        </Box>
                                        {materials.indexOf(material) !== materials.length - 1 && <Divider sx={{ mt: 2, mb: 1, opacity: 0.5 }} />}
                                    </Box>
                                );
                            })}
                            {filteredCategories.length === 0 && (
                                <Box sx={{ py: 4, textAlign: 'center' }}>
                                    <Typography variant="body2" color="textSecondary">
                                        {categorySearch ? 'No matching categories found.' : 'No categories added yet.'}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this {deleteType}? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button onClick={handleCancelDelete} variant="outlined" color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        disabled={isDeleting}
                        sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' }, minWidth: 100 }}
                    >
                        {isDeleting ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminCategories;
