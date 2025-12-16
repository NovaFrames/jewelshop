import React, { useState } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemText, Button, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import type { MegaMenuContent } from './navbarData';
import { motion } from 'framer-motion';

interface MegaMenuProps {
    data: MegaMenuContent;
    onClose?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ data, onClose, onMouseEnter, onMouseLeave }) => {
    const [activeTab, setActiveTab] = useState(data.tabs[0]);

    const navigate = useNavigate();
    const currentCategories = data.categories[activeTab] || [];

    return (
        <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            elevation={4}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave || onClose}
            sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1300,
                borderRadius: '0 0 8px 8px',
                overflow: 'hidden',
                mt: '1px',
                borderTop: '1px solid #e0e0e0',
            }}
        >
            <Box sx={{ display: 'flex', minHeight: 400 }}>
                {/* Left Sidebar - Tabs */}
                <Box sx={{ width: 250, bgcolor: '#f9f9f9', py: 2 }}>
                    <List component="nav">
                        {data.tabs.map((tab) => (
                            <ListItem
                                key={tab}
                                component="div"
                                onClick={() => setActiveTab(tab)}
                                sx={{
                                    cursor: 'pointer',
                                    position: 'relative',
                                    bgcolor: activeTab === tab ? '#f0e6e6' : 'transparent', // Light pinkish bg for active
                                    color: activeTab === tab ? '#832729' : 'text.primary', // Maroon for active
                                    '&:hover': {
                                        bgcolor: '#f0e6e6',
                                        color: '#832729',
                                    },
                                    pl: 4,
                                    borderLeft: activeTab === tab ? '4px solid #832729' : '4px solid transparent',
                                }}
                            >
                                <ListItemText
                                    primary={tab}
                                    primaryTypographyProps={{
                                        fontWeight: activeTab === tab ? 700 : 500,
                                        fontFamily: '"Playfair Display", serif' // Trying to match the font style if possible
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Middle Content - Categories Grid */}
                <Box sx={{ flex: 1, p: 4, bgcolor: 'white' }}>
                    <Grid container spacing={2}>
                        {currentCategories.map((item) => (
                            <Grid size={{ xs: 6, sm: 4 }} key={item.name}>
                                <Link
                                    to={item.path}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 1,
                                            cursor: 'pointer',
                                            '&:hover .icon-placeholder': {
                                                transform: 'scale(1.1)',
                                            },
                                            '&:hover .category-name': {
                                                color: '#832729',
                                            }
                                        }}
                                    >
                                        {/* Placeholder Icon */}
                                        <Box
                                            className="icon-placeholder"
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                bgcolor: '#f5f5f5',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'transform 0.3s ease',
                                                color: '#d4af37' // Gold color
                                            }}
                                        >
                                            {/* We can replace this with actual icons later */}
                                            <span style={{ fontSize: '20px' }}>✦</span>
                                        </Box>
                                        <Typography
                                            className="category-name"
                                            variant="body1"
                                            sx={{
                                                fontWeight: 500,
                                                transition: 'color 0.2s ease'
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                        {currentCategories.length === 0 && (
                            <Typography sx={{ p: 2, color: 'text.secondary' }}>No items in this category yet.</Typography>
                        )}
                    </Grid>
                </Box>

                {/* Right Sidebar - Promo */}
                <Box sx={{ width: 350, p: 3, bgcolor: 'white', borderLeft: '1px solid #eee' }}>
                    {data.promoImage ? (
                        <Box
                            component="img"
                            src={data.promoImage}
                            alt="Promo"
                            sx={{ width: '100%', borderRadius: 2, mb: 2, height: 250, objectFit: 'cover' }}
                        />
                    ) : (
                        <Box sx={{ width: '100%', height: 250, bgcolor: '#eee', borderRadius: 2, mb: 2 }} />
                    )}

                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', mb: 1, color: '#333' }}>
                        {data.promoTitle}
                    </Typography>
                </Box>
            </Box>

            {/* Bottom Banner */}
            {data.bottomBanner && (
                <Box sx={{
                    bgcolor: '#fff9f9',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #eee',
                    px: 4
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Small banner image if needed */}
                        <Box component="img" src={data.bottomBanner.image} sx={{ width: 60, height: 40, bgcolor: '#ddd', borderRadius: 1 }} />
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#333' }}>
                                {data.bottomBanner.text}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {data.bottomBanner.subText}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        onClick={() => navigate("/all-jewellery")}
                        variant="contained"
                        color='secondary'
                        sx={{
                            bgcolor: '#832729',
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: 20,
                            px: 4,
                            '&:hover': { bgcolor: '#601a1c' }
                        }}
                    >
                        {data.bottomBanner.buttonText}
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default MegaMenu;
