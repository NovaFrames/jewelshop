// src/pages/ContactPage.tsx
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
  Alert,
  Snackbar,
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

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setOpenSnackbar(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 32 }} />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: '#4CAF50',
    },
    {
      icon: <Email sx={{ fontSize: 32 }} />,
      title: 'Email',
      details: ['support@jewelry.com', 'sales@jewelry.com'],
      color: '#2196F3',
    },
    {
      icon: <LocationOn sx={{ fontSize: 32 }} />,
      title: 'Location',
      details: ['123 Jewel Street', 'New York, NY 10001'],
      color: '#FF9800',
    },
    {
      icon: <Schedule sx={{ fontSize: 32 }} />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9AM - 6PM', 'Sat: 10AM - 4PM'],
      color: '#9C27B0',
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
      {/* Hero Header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 400,
                opacity: 0.9,
                maxWidth: 600,
              }}
            >
              Get in touch with our team for any inquiries or support
            </Typography>
          </motion.div>
        </Container>
      </Box>

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

                <Stack spacing={4}>
                  {contactInfo.map((info, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: alpha(info.color, 0.05),
                        borderLeft: `4px solid ${info.color}`,
                      }}
                    >
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box sx={{ color: info.color }}>{info.icon}</Box>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            {info.title}
                          </Typography>
                          {info.details.map((detail, idx) => (
                            <Typography
                              key={idx}
                              variant="body2"
                              sx={{ color: 'text.secondary' }}
                            >
                              {detail}
                            </Typography>
                          ))}
                        </Box>
                      </Stack>
                    </Paper>
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
          <Grid size={{ xs: 12, md: 4 }}>
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
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="contained"
                        color='secondary'
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="contained"
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
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="contained"
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
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        variant="contained"
                        color='secondary'
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={6}
                        variant="contained"
                        color='secondary'
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color='secondary'
                      color="primary"
                      size="large"
                      endIcon={<Send />}
                      sx={{
                        px: 6,
                        py: 1.5,
                        fontSize: '1.1rem',
                      }}
                    >
                      Send Message
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
                      <Grid size={{ xs: 12, md: 4 }} key={index}>
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
          icon={<CheckCircle />}
        >
          Message sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;