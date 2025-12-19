import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    IconButton,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Divider,
} from '@mui/material';
import Loader from '../../components/Common/Loader';
import { Visibility, Email, Phone, CalendarMonth, Close, LocationOn } from '@mui/icons-material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

interface Address {
    id: string;
    type: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
    phone: string;
}

interface UserData {
    uid: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    createdAt: string;
    addresses?: Address[];
}

const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const usersList = querySnapshot.docs.map(doc => ({
                    uid: doc.id,
                    ...doc.data()
                })) as UserData[];
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleViewUser = (user: UserData) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser(null);
    };

    if (loading) {
        return <Loader fullPage />;
    }

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: 'Playfair Display, serif' }}>
                        Users
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your registered users
                    </Typography>
                </Box>
                <Chip label={`${users.length} Users`} color="primary" variant="outlined" />
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <Table sx={{ minWidth: 650 }} aria-label="users table">
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Contact Info</TableCell>
                            <TableCell>Joined Date</TableCell>
                            <TableCell align="center">Addresses</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.uid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar src={user.avatar} alt={user.name} sx={{ width: 40, height: 40 }}>
                                            {user.name?.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {user.name || 'Unknown User'}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                ID: {user.uid.slice(0, 8)}...
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Stack spacing={0.5}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2">{user.email}</Typography>
                                        </Box>
                                        {user.phone && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="body2">{user.phone}</Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarMonth sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={user.addresses?.length || 0}
                                        size="small"
                                        color={user.addresses && user.addresses.length > 0 ? "default" : "default"}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => handleViewUser(user)}
                                    >
                                        <Visibility fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                    <Typography color="text.secondary">No users found</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* User Details Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        overflow: 'hidden',
                        maxHeight: '90vh'
                    }
                }}
            >
                {selectedUser && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <DialogTitle sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            pb: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <Typography variant="h6" fontWeight={600} sx={{ fontFamily: 'Playfair Display, serif' }}>
                                User Details
                            </Typography>
                            <IconButton onClick={handleCloseDialog} size="small">
                                <Close />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent sx={{
                            p: 0,
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}>
                            <Grid container sx={{ minHeight: '400px' }}>
                                {/* Left Column - Profile Info */}
                                <Grid size={{ xs: 12, md: 5 }} sx={{
                                    bgcolor: 'grey.50',
                                    p: 3,
                                    borderRight: { md: '1px solid' },
                                    borderColor: { md: 'divider' }
                                }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                        <Avatar
                                            src={selectedUser.avatar}
                                            alt={selectedUser.name}
                                            sx={{
                                                width: 120,
                                                height: 120,
                                                mb: 2,
                                                border: '4px solid',
                                                borderColor: 'background.paper',
                                                boxShadow: 2
                                            }}
                                        >
                                            {selectedUser.name?.charAt(0)}
                                        </Avatar>
                                        <Typography variant="h6" fontWeight={700} gutterBottom>
                                            {selectedUser.name || 'Unknown User'}
                                        </Typography>
                                        <Chip
                                            label={selectedUser.uid}
                                            size="small"
                                            variant="outlined"
                                            sx={{ mb: 4, fontSize: '0.7rem', fontFamily: 'monospace' }}
                                        />

                                        <Stack spacing={2.5} sx={{ width: '100%', textAlign: 'left' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, bgcolor: 'white', borderRadius: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', width: '100%' }}>
                                                <Email color="primary" fontSize="small" sx={{ flexShrink: 0 }} />
                                                <Box sx={{ minWidth: 0, width: '100%' }}>
                                                    <Typography variant="caption" color="text.secondary" display="block">Email Address</Typography>
                                                    <Typography variant="body2" fontWeight={500} sx={{ wordBreak: 'break-word' }}>{selectedUser.email}</Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, bgcolor: 'white', borderRadius: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                                <Phone color="primary" fontSize="small" />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" display="block">Phone Number</Typography>
                                                    <Typography variant="body2" fontWeight={500}>{selectedUser.phone || 'N/A'}</Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, bgcolor: 'white', borderRadius: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                                <CalendarMonth color="primary" fontSize="small" />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" display="block">Joined Date</Typography>
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) : 'N/A'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Grid>

                                {/* Right Column - Addresses */}
                                <Grid size={{ xs: 12, md: 7 }} sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                        <Typography variant="h6" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LocationOn color="primary" /> Saved Addresses
                                        </Typography>
                                        <Chip label={selectedUser.addresses?.length || 0} size="small" color="primary" />
                                    </Box>

                                    <Stack spacing={2}>
                                        {selectedUser.addresses && selectedUser.addresses.length > 0 ? (
                                            selectedUser.addresses.map((address, index) => (
                                                <Paper
                                                    key={index}
                                                    elevation={0}
                                                    variant="outlined"
                                                    sx={{
                                                        p: 2,
                                                        border: '1px solid',
                                                        borderColor: address.isDefault ? 'primary.main' : 'divider',
                                                        bgcolor: address.isDefault ? 'primary.50' : 'background.paper',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    {address.isDefault && (
                                                        <Chip
                                                            label="Default"
                                                            size="small"
                                                            color="primary"
                                                            sx={{ position: 'absolute', top: 12, right: 12, height: 20, fontSize: '0.65rem' }}
                                                        />
                                                    )}
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                        <Typography variant="subtitle1" fontWeight={700}>
                                                            {address.name}
                                                        </Typography>
                                                        <Chip
                                                            label={address.type}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ textTransform: 'capitalize', height: 20, fontSize: '0.65rem' }}
                                                        />
                                                    </Box>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                        {address.address}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                        {address.city}, {address.state} {address.zipCode}, {address.country}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Phone sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {address.phone}
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            ))
                                        ) : (
                                            <Box sx={{
                                                py: 8,
                                                textAlign: 'center',
                                                bgcolor: 'grey.50',
                                                borderRadius: 2,
                                                border: '1px dashed',
                                                borderColor: 'divider'
                                            }}>
                                                <LocationOn sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    No addresses saved for this user.
                                                </Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{ p: 2, bgcolor: 'grey.50' }}>
                            <Button onClick={handleCloseDialog} variant="contained" color="secondary">
                                Close Details
                            </Button>
                        </DialogActions>
                    </Box>
                )}
            </Dialog>
        </Box>
    );
};

export default AdminUsers;
