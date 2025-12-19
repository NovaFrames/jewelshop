import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Chip,
    Divider,
    CircularProgress,
} from '@mui/material';
import { ShoppingBagOutlined, AccessTime, CheckCircle, Cancel } from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
    material: string;
}

interface Order {
    id: string;
    uid: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'processing' | 'ordered' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

const Orders: React.FC = () => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Load orders from Firestore
    useEffect(() => {
        const loadOrders = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            try {
                const ordersRef = collection(db, 'orders');
                const q = query(
                    ordersRef,
                    where('uid', '==', currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                console.log(querySnapshot);

                const ordersData: Order[] = [];
                querySnapshot.forEach((doc) => {
                    ordersData.push({ id: doc.id, ...doc.data() } as Order);
                });

                // Sort client-side
                ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                setOrders(ordersData);
            } catch (error) {
                console.error('Error loading orders:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [currentUser]);

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'processing':
                return 'warning';
            case 'ordered':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    // Get status icon
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'processing':
                return <AccessTime fontSize="small" />;
            case 'ordered':
                return <CheckCircle fontSize="small" />;
            case 'cancelled':
                return <Cancel fontSize="small" />;
            default:
                return null;
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Redirect if not logged in
    if (!currentUser) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Please login to view your orders
                </Typography>
            </Container>
        );
    }

    // Show loading state
    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress color="secondary" />
            </Container>
        );
    }

    // Empty orders state
    if (orders.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh' }}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <ShoppingBagOutlined
                        sx={{
                            fontSize: 120,
                            color: 'text.secondary',
                            opacity: 0.2,
                            mb: 3,
                        }}
                    />
                    <Typography variant="h3" sx={{ mb: 2, fontFamily: 'Playfair Display, serif' }}>
                        No Orders Yet
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                        You haven't placed any orders yet. Start shopping to see your orders here!
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Box sx={{ py: 6, bgcolor: '#fafafa', minHeight: '100vh' }}>
            <Container maxWidth="xl">
                <Typography
                    variant="h3"
                    sx={{
                        mb: 6,
                        textAlign: 'center',
                        fontFamily: 'Playfair Display, serif',
                        color: '#333'
                    }}
                >
                    My Orders
                </Typography>

                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid size={{ xs: 12 }} key={order.id}>
                            <Paper elevation={0} sx={{ border: '1px solid #eee', overflow: 'hidden' }}>
                                {/* Order Header */}
                                <Box sx={{ bgcolor: '#f9f9f9', p: 2, borderBottom: '1px solid #eee' }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Order ID
                                            </Typography>
                                            <Typography variant="body1" fontWeight={600}>
                                                {order.id.substring(0, 8).toUpperCase()}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Order Date
                                            </Typography>
                                            <Typography variant="body1">
                                                {formatDate(order.createdAt)}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Total Amount
                                            </Typography>
                                            <Typography variant="h6" color="#832729">
                                                ₹{order.totalAmount.toLocaleString()}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 3 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                Status
                                            </Typography>
                                            <Chip
                                                icon={getStatusIcon(order.status) as any}
                                                label={order.status.toUpperCase()}
                                                color={getStatusColor(order.status) as any}
                                                size="small"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* Order Items */}
                                <Box sx={{ p: 2 }}>
                                    {order.items.map((item, index) => (
                                        <Box key={index}>
                                            {index > 0 && <Divider sx={{ my: 2 }} />}
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                        <Box
                                                            component="img"
                                                            src={item.image}
                                                            alt={item.name}
                                                            sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                                                        />
                                                        <Box>
                                                            <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: 'Playfair Display, serif' }}>
                                                                {item.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {item.material} • {item.category}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 6, md: 2 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Price
                                                    </Typography>
                                                    <Typography variant="body1" fontWeight={600}>
                                                        ₹{item.price.toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={{ xs: 6, md: 2 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Quantity
                                                    </Typography>
                                                    <Typography variant="body1" fontWeight={600}>
                                                        {item.quantity}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 2 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Subtotal
                                                    </Typography>
                                                    <Typography variant="subtitle1" fontWeight={600} color="#832729">
                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Orders;
