import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Grid,
    Card,
    CardContent,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Stack,
    Divider
} from '@mui/material';
import Loader from '../../components/Common/Loader';
import { Add, Delete, Edit, CloudUpload, Image as ImageIcon, Smartphone, Monitor } from '@mui/icons-material';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase/firebase';

interface Banner {
    id: string;
    title: string;
    desktopImageUrl: string;
    mobileImageUrl: string;
    createdAt: number;
}

const AdminBanner: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [desktopFile, setDesktopFile] = useState<File | null>(null);
    const [mobileFile, setMobileFile] = useState<File | null>(null);
    const [desktopPreview, setDesktopPreview] = useState<string>('');
    const [mobilePreview, setMobilePreview] = useState<string>('');

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const q = query(collection(db, 'banners'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const bannerList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Banner[];
            setBanners(bannerList);
        } catch (error) {
            console.error("Error fetching banners: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (banner?: Banner) => {
        if (banner) {
            setEditingBanner(banner);
            setTitle(banner.title);
            setDesktopPreview(banner.desktopImageUrl);
            setMobilePreview(banner.mobileImageUrl);
        } else {
            setEditingBanner(null);
            setTitle('');
            setDesktopPreview('');
            setMobilePreview('');
        }
        setDesktopFile(null);
        setMobileFile(null);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingBanner(null);
        setTitle('');
        setDesktopFile(null);
        setMobileFile(null);
        setDesktopPreview('');
        setMobilePreview('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);

            if (type === 'desktop') {
                setDesktopFile(file);
                setDesktopPreview(previewUrl);
            } else {
                setMobileFile(file);
                setMobilePreview(previewUrl);
            }
        }
    };

    const uploadImage = async (file: File, path: string) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const handleSave = async () => {
        if (!title || (!editingBanner && (!desktopFile || !mobileFile))) {
            alert("Please fill in all fields and select both images.");
            return;
        }

        setUploading(true);
        try {
            let desktopUrl = editingBanner?.desktopImageUrl || '';
            let mobileUrl = editingBanner?.mobileImageUrl || '';

            const timestamp = Date.now();

            if (desktopFile) {
                desktopUrl = await uploadImage(desktopFile, `banners/desktop_${timestamp}_${desktopFile.name}`);
            }

            if (mobileFile) {
                mobileUrl = await uploadImage(mobileFile, `banners/mobile_${timestamp}_${mobileFile.name}`);
            }

            const bannerData = {
                title,
                desktopImageUrl: desktopUrl,
                mobileImageUrl: mobileUrl,
                createdAt: editingBanner ? editingBanner.createdAt : timestamp
            };

            if (editingBanner) {
                await updateDoc(doc(db, 'banners', editingBanner.id), bannerData);
            } else {
                await addDoc(collection(db, 'banners'), bannerData);
            }

            handleCloseDialog();
            fetchBanners();
        } catch (error) {
            console.error("Error saving banner: ", error);
            alert("Failed to save banner. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteClick = (banner: Banner) => {
        setBannerToDelete(banner);
        setDeleteDialogOpen(true);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setBannerToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (bannerToDelete) {
            try {
                await deleteDoc(doc(db, 'banners', bannerToDelete.id));

                // Try to delete images from storage
                try {
                    const desktopRef = ref(storage, bannerToDelete.desktopImageUrl);
                    const mobileRef = ref(storage, bannerToDelete.mobileImageUrl);
                    await deleteObject(desktopRef);
                    await deleteObject(mobileRef);
                } catch (e) {
                    console.warn("Could not delete images from storage", e);
                }

                fetchBanners();
            } catch (error) {
                console.error("Error deleting banner: ", error);
                alert("Failed to delete banner.");
            } finally {
                setDeleteDialogOpen(false);
                setBannerToDelete(null);
            }
        }
    };

    if (loading) {
        return <Loader fullPage />;
    }

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: 'Playfair Display, serif' }}>
                        Banner Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage homepage banners for desktop and mobile
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Add New Banner
                </Button>
            </Box>

            <Grid container spacing={3}>
                {banners.map((banner) => (
                    <Grid size={12} key={banner.id}>
                        <Card variant="outlined" sx={{ overflow: 'visible' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Typography variant="h6" fontWeight={600}>{banner.title}</Typography>
                                    <Box>
                                        <IconButton color="primary" onClick={() => handleOpenDialog(banner)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteClick(banner)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, md: 8 }}>
                                        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Monitor fontSize="small" /> Desktop View
                                        </Typography>
                                        <Box
                                            component="img"
                                            src={banner.desktopImageUrl}
                                            alt="Desktop Banner"
                                            sx={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: 1,
                                                bgcolor: 'grey.100'
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Smartphone fontSize="small" /> Mobile View
                                        </Typography>
                                        <Box
                                            component="img"
                                            src={banner.mobileImageUrl}
                                            alt="Mobile Banner"
                                            sx={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: 1,
                                                bgcolor: 'grey.100'
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {banners.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
                            <ImageIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                            <Typography color="text.secondary">No banners found. Add your first banner!</Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontFamily: 'Playfair Display, serif' }}>
                    {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="Banner Title"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Summer Sale 2024"
                        />

                        <Divider />

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Monitor /> Desktop Image
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                                    Recommended size: 1920x768px
                                </Typography>

                                <Box
                                    sx={{
                                        border: '2px dashed',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        p: 2,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        bgcolor: 'grey.50',
                                        '&:hover': { bgcolor: 'grey.100' },
                                        position: 'relative',
                                        height: '200px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onClick={() => document.getElementById('desktop-upload')?.click()}
                                >
                                    {desktopPreview ? (
                                        <Box
                                            component="img"
                                            src={desktopPreview}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                p: 1
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <CloudUpload sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                                            <Typography variant="body2" color="text.secondary">Click to upload desktop image</Typography>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        id="desktop-upload"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, 'desktop')}
                                    />
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Smartphone /> Mobile Image
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                                    Recommended size: 800x800px
                                </Typography>

                                <Box
                                    sx={{
                                        border: '2px dashed',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        p: 2,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        bgcolor: 'grey.50',
                                        '&:hover': { bgcolor: 'grey.100' },
                                        position: 'relative',
                                        height: '200px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onClick={() => document.getElementById('mobile-upload')?.click()}
                                >
                                    {mobilePreview ? (
                                        <Box
                                            component="img"
                                            src={mobilePreview}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                p: 1
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <CloudUpload sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                                            <Typography variant="body2" color="text.secondary">Click to upload mobile image</Typography>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        id="mobile-upload"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, 'mobile')}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="secondary"
                        disabled={uploading}
                        startIcon={uploading ? <Loader inline size={20} color="inherit" /> : null}
                    >
                        {uploading ? 'Saving...' : 'Save Banner'}
                    </Button>
                </DialogActions>
            </Dialog>

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
                        Are you sure you want to delete this banner? This action cannot be undone.
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
                        sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminBanner;
