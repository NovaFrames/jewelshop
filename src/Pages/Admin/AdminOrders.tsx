import React, { useEffect, useState, useMemo } from 'react';
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
    Select,
    MenuItem,
    CircularProgress,
    IconButton,
    Avatar,
    Stack,
    Grid,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    Drawer,
    Divider,
    Chip,
    Button,
    Tabs,
    Tab
} from '@mui/material';
import {
    Search,
    Visibility,
    ShoppingCart,
    PendingActions,
    CheckCircle,
    Cancel,
    ContactPhone,
    Close
} from '@mui/icons-material';
import { getOrders, updateOrderStatus } from '../../firebase/orderService';
import { type Order } from '../../types';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const config: Record<string, { color: any, icon: any }> = {
        processing: { color: 'primary', icon: <PendingActions sx={{ fontSize: 16 }} /> },
        contacted: { color: 'info', icon: <ContactPhone sx={{ fontSize: 16 }} /> },
        notattended: { color: 'warning', icon: <PendingActions sx={{ fontSize: 16 }} /> },
        cancelled: { color: 'error', icon: <Cancel sx={{ fontSize: 16 }} /> },
        delivered: { color: 'success', icon: <CheckCircle sx={{ fontSize: 16 }} /> }
    };

    const { color, icon } = config[status.toLowerCase()] || { color: 'default', icon: null };

    return (
        <Chip
            icon={icon}
            label={status.toUpperCase()}
            color={color}
            size="small"
            sx={{ fontWeight: 'bold', borderRadius: '6px' }}
        />
    );
};

const StatCard: React.FC<{ title: string; value: number | string; icon: any; color: string }> = ({ title, value, icon, color }) => (
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

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('processing');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleOrderStatusChange = async (orderId: string, newStatus: string) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(prevOrders => prevOrders.map(order => {
                if (order.id === orderId) {
                    return { ...order, status: newStatus, updatedAt: new Date().toISOString() };
                }
                return order;
            }));
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (order.userName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (order.userEmail || '').toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    const stats = useMemo(() => {
        return {
            total: orders.length,
            processing: orders.filter(o => o.status === 'processing').length,
            contacted: orders.filter(o => o.status === 'contacted').length,
            revenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
        };
    }, [orders]);

    const statusCounts = useMemo(() => {
        const counts: Record<string, number> = {
            all: orders.length,
            processing: orders.filter(o => o.status === 'processing').length,
            contacted: orders.filter(o => o.status === 'contacted').length,
            notattended: orders.filter(o => o.status === 'notattended').length,
            cancelled: orders.filter(o => o.status === 'cancelled').length,
            delivered: orders.filter(o => o.status === 'delivered').length,
        };
        return counts;
    }, [orders]);

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setDrawerOpen(true);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, color: '#1a1a1a' }}>
                Orders Management
            </Typography>

            {/* Stats Overview */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard title="Total Orders" value={stats.total} icon={<ShoppingCart />} color="#6366f1" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard title="Processing" value={stats.processing} icon={<PendingActions />} color="#f59e0b" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard title="Contacted" value={stats.contacted} icon={<ContactPhone />} color="#3b82f6" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard title="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon={<CheckCircle />} color="#10b981" />
                </Grid>
            </Grid>

            {/* Status Tabs */}
            <Paper sx={{ mb: 3, borderRadius: 3, display: 'flex', justifyContent: 'space-between', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Tabs
                    value={statusFilter}
                    onChange={(_, newValue) => setStatusFilter(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        px: 2,
                        '& .MuiTab-root': {
                            minHeight: 64,
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '0.95rem',
                            color: 'text.secondary',
                            '&.Mui-selected': { color: '#6366f1' }
                        },
                        '& .MuiTabs-indicator': {
                            height: 3,
                            borderRadius: '3px 3px 0 0',
                            bgcolor: '#6366f1'
                        }
                    }}
                >
                    <Tab label={`Processing (${statusCounts.processing})`} value="processing" />
                    <Tab label={`Contacted (${statusCounts.contacted})`} value="contacted" />
                    <Tab label={`Not Attended (${statusCounts.notattended})`} value="notattended" />
                    <Tab label={`Cancelled (${statusCounts.cancelled})`} value="cancelled" />
                    <Tab label={`Delivered (${statusCounts.delivered})`} value="delivered" />
                </Tabs>

                {/* Toolbar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ p: 2 }} color="text.secondary">
                        Showing {filteredOrders.length} orders
                    </Typography>
                    <TextField
                        placeholder="Search orders..."
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: 300 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Paper>

            <Paper sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>

                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ fontWeight: 500, color: '#6366f1' }}>#{order.id.slice(-6).toUpperCase()}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.userName}</Typography>
                                        <Typography variant="caption" color="text.secondary">{order.userEmail}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>₹{order.totalAmount}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={order.status || 'processing'}
                                            size="small"
                                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                                            sx={{
                                                minWidth: 130,
                                                borderRadius: 2,
                                                '& .MuiSelect-select': { py: 0.5, fontSize: '0.875rem' }
                                            }}
                                        >
                                            <MenuItem value="processing">Processing</MenuItem>
                                            <MenuItem value="contacted">Contacted</MenuItem>
                                            <MenuItem value="notattended">Not Attended</MenuItem>
                                            <MenuItem value="cancelled">Cancelled</MenuItem>
                                            <MenuItem value="delivered">Delivered</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<Visibility />}
                                            onClick={() => handleViewDetails(order)}
                                            sx={{ borderRadius: 2, textTransform: 'none' }}
                                        >
                                            Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredOrders.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography sx={{ py: 3 }} color="text.secondary">
                                            No orders found for this status.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Order Details Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width: { xs: '100%', sm: 500 }, p: 0 } }}
            >
                {selectedOrder && (
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8fafc' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Order Details</Typography>
                            <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
                        </Box>
                        <Divider />

                        <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
                            <Stack spacing={4}>
                                {/* Order Status Header */}
                                <Box sx={{ p: 2, borderRadius: 3, bgcolor: '#f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">Order Status</Typography>
                                        <StatusBadge status={selectedOrder.status || 'processing'} />
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="caption" color="text.secondary" display="block">Order Date</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {new Date(selectedOrder.createdAt).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Order Items */}
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Order Items ({selectedOrder.items.length})</Typography>
                                    <Stack spacing={2}>
                                        {selectedOrder.items.map((item, idx) => (
                                            <Paper key={idx} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Avatar src={item.image} variant="rounded" sx={{ width: 60, height: 60 }} />
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                                                        <Typography variant="caption" color="text.secondary">{item.material} | Qty: {item.quantity}</Typography>
                                                    </Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{item.price}</Typography>
                                                </Stack>
                                            </Paper>
                                        ))}
                                    </Stack>
                                </Box>

                                {/* Customer Info */}
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Customer Information</Typography>
                                    <Stack spacing={1}>
                                        <Typography variant="body2"><strong>Name:</strong> {selectedOrder.userName}</Typography>
                                        <Typography variant="body2"><strong>Email:</strong> {selectedOrder.userEmail}</Typography>
                                        <Typography variant="body2"><strong>Phone:</strong> {selectedOrder.userPhone}</Typography>
                                    </Stack>
                                </Box>

                                {/* Shipping Address */}
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Shipping Address</Typography>
                                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#fafafa' }}>
                                        <Typography variant="body2">{selectedOrder.deliveryAddress.address}</Typography>
                                        <Typography variant="body2">{selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} - {selectedOrder.deliveryAddress.zipCode}</Typography>
                                        <Typography variant="body2">{selectedOrder.deliveryAddress.country}</Typography>
                                    </Paper>
                                </Box>

                                {/* Order Summary */}
                                <Box sx={{ pt: 2 }}>
                                    <Divider sx={{ mb: 2 }} />
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Total Amount</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#6366f1' }}>₹{selectedOrder.totalAmount}</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                )}
            </Drawer>
        </Box>
    );
};

export default AdminOrders;
