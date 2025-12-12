import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Slide Data
const slides = [
    {
        id: 1,
        items: [
            {
                image: 'https://corano-demo.myshopify.com/cdn/shop/files/home4-slider4_480x.jpg?v=1614342429',
                subtitle: 'Radiant',
                title: 'Body Jewels',
                buttonText: 'Shop Now',
            },
            {
                image: 'https://corano-demo.myshopify.com/cdn/shop/files/home4-slider3_480x.jpg?v=1614342428',
                subtitle: 'Earrings',
                title: 'Collection Arrival',
                buttonText: 'Shop Now',
            },
            {
                image: 'https://corano-demo.myshopify.com/cdn/shop/files/home4-slider2_480x.jpg?v=1614342427',
                subtitle: 'Stunning',
                title: 'Diamond Rings',
                buttonText: 'Shop Now',
            }
        ]
    },
    {
        id: 2,
        items: [
            {
                image: 'https://corano-demo.myshopify.com/cdn/shop/files/home4-slider1_480x.jpg?v=1614342426',
                subtitle: 'Exclusive',
                title: 'Gold Bracelets',
                buttonText: 'Shop Now',
            },
            {
                image: 'https://goldsmith.ninetheme.com/wp-content/uploads/2022/12/5.png',
                subtitle: 'Forever',
                title: 'Engagement Rings',
                buttonText: 'Shop Now',
            },
            {
                image: 'https://goldsmith.ninetheme.com/wp-content/uploads/2022/12/7.png',
                subtitle: 'Classic',
                title: 'Gold Pendants',
                buttonText: 'Shop Now',
            }
        ]
    }
];

const LandingPage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden', bgcolor: '#f8f8f8' }}>
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect={'fade'}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                // navigation={!isMobile}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                loop={true}
                style={{ width: '100%' }}
            >
                {slides.map((slide, slideIndex) => (
                    <SwiperSlide key={slide.id}>
                        <Box sx={{ width: '100%', height: '100%' }}>
                            <Grid container spacing={0} sx={{ height: '100%' }}>
                                {slide.items.map((item, itemIndex) => (
                                    <Grid size={4} key={itemIndex} sx={{ height: '100%' }}>
                                        <motion.div
                                            initial={{ y: '-100%', opacity: 0 }}
                                            animate={activeIndex === slideIndex ? { y: '0%', opacity: 1 } : { y: '-100%', opacity: 0 }}
                                            transition={{
                                                duration: 1,
                                                delay: itemIndex * 0.2,
                                                ease: [0.22, 1, 0.36, 1] // Custom ease for smooth "drop"
                                            }}
                                            style={{ height: '100%', width: '100%' }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    height: { xs: '500px', md: '600px' }, // Reduced height to prevent excessive zooming
                                                    overflow: 'hidden',
                                                    '&:hover .bg-image': {
                                                        transform: 'scale(1.05)',
                                                    }
                                                }}
                                            >
                                                {/* Background Image */}
                                                <Box
                                                    className="bg-image"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundImage: `url(${item.image})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'top center',
                                                        transition: 'transform 0.6s ease',
                                                    }}
                                                />

                                                {/* Overlay */}
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '50%',
                                                        background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)',
                                                        opacity: 0.9,
                                                    }}
                                                />

                                                {/* Content */}
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: '10%',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        textAlign: 'center',
                                                        width: '100%',
                                                        px: 2,
                                                        color: '#000',
                                                        zIndex: 2,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '2px',
                                                            fontWeight: 500,
                                                            mb: 1,
                                                            fontSize: { xs: '0.75rem', md: '1rem' },
                                                            opacity: 0,
                                                            animation: activeIndex === slideIndex ? `fadeInUp 0.8s ease forwards ${0.8 + (itemIndex * 0.2)}s` : 'none'
                                                        }}
                                                    >
                                                        {item.subtitle}
                                                    </Typography>

                                                    <Typography
                                                        variant="h3"
                                                        sx={{
                                                            fontFamily: '"Playfair Display", serif',
                                                            fontWeight: 600,
                                                            mb: { xs: 1.5, md: 3 },
                                                            fontSize: { xs: '1.5rem', md: '2.5rem' },
                                                            lineHeight: 1.2,
                                                            whiteSpace: 'pre-line',
                                                            opacity: 0,
                                                            animation: activeIndex === slideIndex ? `fadeInUp 0.8s ease forwards ${1.0 + (itemIndex * 0.2)}s` : 'none'
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Typography>

                                                    <Button
                                                        variant="outlined"

                                                    >
                                                        {item.buttonText}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Styles */}
            <style>
                {`
          .swiper-button-next, .swiper-button-prev {
            color: #fff;
            width: 50px;
            height: 50px;
            background: rgba(0,0,0,0.3);
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          .swiper-button-next:hover, .swiper-button-prev:hover {
            background: #7d3c3c;
            color: #fff;
          }
          .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #fff;
            opacity: 0.6;
            border: 1px solid #333;
          }
          .swiper-pagination-bullet-active {
            opacity: 1;
            background: #7d3c3c;
            border-color: #7d3c3c;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 40px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
        `}
            </style>
        </Box>
    );
};

export default LandingPage;
