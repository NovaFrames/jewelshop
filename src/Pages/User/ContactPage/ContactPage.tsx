// src/Pages/ContactPage/ContactPage.tsx
import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Stack,
    Paper,
    IconButton,
    InputAdornment,
    Divider,
    alpha,
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn,
    Schedule,
    Send,
    Facebook,
    Instagram,
    Pinterest,
    Twitter,
    CheckCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSnackbar } from '../../../contexts/SnackbarContext';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const { showSnackbar } = useSnackbar();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Call the Cloud Function to send emails
            const response = await fetch('https://us-central1-jewelshop-603b2.cloudfunctions.net/sendContactEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showSnackbar('Message sent successfully! We\'ll get back to you soon.', 'success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                });
            } else {
                showSnackbar('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            showSnackbar('Failed to send message. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: <Phone sx={{ fontSize: 24 }} />,
            title: 'Phone',
            details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
        },
        {
            icon: <Email sx={{ fontSize: 24 }} />,
            title: 'Email',
            details: ['support@jewelry.com', 'sales@jewelry.com'],
        },
        {
            icon: <LocationOn sx={{ fontSize: 24 }} />,
            title: 'Location',
            details: ['123 Jewel Street', 'New York, NY 10001'],
        },
        {
            icon: <Schedule sx={{ fontSize: 24 }} />,
            title: 'Business Hours',
            details: ['Mon - Fri: 9AM - 6PM', 'Sat: 10AM - 4PM'],
        },
    ];

    const faqs = [
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for all items in original condition.',
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship worldwide with various shipping options available.',
        },
        {
            question: 'How can I track my order?',
            answer: 'Tracking information will be emailed to you once your order ships.',
        },
        {
            question: 'Do you offer customization?',
            answer: 'Yes, we offer custom engraving and some customization options.',
        },
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Container sx={{ py: { xs: 8, md: 12 } }}>
                <Grid container spacing={6}>
                    {/* Contact Information */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Box sx={{ position: 'sticky', top: 100 }}>
                                <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: 'primary.main' }}>
                                    Get in Touch
                                </Typography>

                                <Stack spacing={0} sx={{ bgcolor: '#fff', borderRadius: 2, border: '1px solid #eee', overflow: 'hidden' }}>
                                    {contactInfo.map((info, index) => (
                                        <Box key={index}>
                                            <Box sx={{ p: 3, display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                                                <Box sx={{ color: '#832729', mt: 0.5 }}>{info.icon}</Box>
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: 1 }}>
                                                        {info.title}
                                                    </Typography>
                                                    {info.details.map((detail, idx) => (
                                                        <Typography
                                                            key={idx}
                                                            variant="body2"
                                                            sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                                                        >
                                                            {detail}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </Box>
                                            {index < contactInfo.length - 1 && <Divider />}
                                        </Box>
                                    ))}
                                </Stack>

                                {/* Social Media */}
                                <Box sx={{ mt: 6 }}>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                        Follow Us
                                    </Typography>
                                    <Stack direction="row" spacing={2}>
                                        {[
                                            { icon: <Facebook />, color: '#1877F2' },
                                            { icon: <Instagram />, color: '#E1306C' },
                                            { icon: <Pinterest />, color: '#E60023' },
                                            { icon: <Twitter />, color: '#1DA1F2' },
                                        ].map((social, index) => (
                                            <IconButton
                                                key={index}
                                                sx={{
                                                    bgcolor: alpha(social.color, 0.1),
                                                    color: social.color,
                                                    '&:hover': {
                                                        bgcolor: alpha(social.color, 0.2),
                                                    },
                                                }}
                                            >
                                                {social.icon}
                                            </IconButton>
                                        ))}
                                    </Stack>
                                </Box>

                                {/* FAQ Preview */}
                                <Box sx={{ mt: 6 }}>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                        Frequently Asked
                                    </Typography>
                                    <Stack spacing={2}>
                                        {faqs.slice(0, 2).map((faq, index) => (
                                            <Paper
                                                key={index}
                                                elevation={0}
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    bgcolor: 'background.paper',
                                                }}
                                            >
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    {faq.question}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {faq.answer}
                                                </Typography>
                                            </Paper>
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>

                    {/* Contact Form */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 3, md: 6 },
                                    borderRadius: 3,
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
                                    Send us a Message
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                    We'll get back to you within 24 hours
                                </Typography>

                                <Divider sx={{ mb: 4 }} />

                                <Box component="form" onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Your Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                                color='secondary'
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                variant="outlined"
                                                color='secondary'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Phone sx={{ color: 'text.secondary' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                                color='secondary'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Email sx={{ color: 'text.secondary' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={12}>
                                            <TextField
                                                fullWidth
                                                label="Your Message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                color='secondary'
                                            />
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color='secondary'
                                            size="large"
                                            disabled={loading}
                                            endIcon={<Send />}
                                            sx={{
                                                px: 6,
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </Button>
                                    </Box>
                                </Box>

                                {/* Map Section */}
                                <Box sx={{ mt: 8 }}>
                                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                                        Visit Our Store
                                    </Typography>
                                    <Box
                                        sx={{
                                            height: 300,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            bgcolor: 'grey.100',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <Typography color="text.secondary">
                                            [Map Integration Here]
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Full FAQ Section */}
                                <Box sx={{ mt: 8 }}>
                                    <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                                        Frequently Asked Questions
                                    </Typography>
                                    <Grid container spacing={3}>
                                        {faqs.map((faq, index) => (
                                            <Grid size={{ xs: 12, md: 6 }} key={index}>
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: 3,
                                                        height: '100%',
                                                        borderRadius: 2,
                                                        bgcolor: 'background.default',
                                                    }}
                                                >
                                                    <Stack direction="row" spacing={2} alignItems="flex-start">
                                                        <CheckCircle sx={{ color: 'primary.main', mt: 0.5 }} />
                                                        <Box>
                                                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                                                {faq.question}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {faq.answer}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ContactPage;