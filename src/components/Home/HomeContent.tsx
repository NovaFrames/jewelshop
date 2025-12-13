import * as React from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Tabs,
    Tab,
    Card,
    CardMedia,
    CardContent,
    Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    originalPrice?: string;
    rating: number;
    reviews: number;
    sale?: boolean;
}

const products: Product[] = [
    {
        id: 1,
        name: "Vighnaharta Gold And Rhodium Plated Alloy",
        image: "https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/42_02-600x689.jpg",
        price: "$600 – $655",
        rating: 5,
        reviews: 1,
        sale: true,
    },
    {
        id: 2,
        name: "The Tamasvini Gold and Diamond Nosepin for Women",
        image: "https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/24_02-600x689.jpg",
        price: "$100 – $590",
        rating: 5,
        reviews: 1,
        sale: true,
    },
    {
        id: 3,
        name: "Kisna Hallmarked Gold Earring for Women",
        image: "https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/21_02-600x689.jpg",
        price: "$69 – $229",
        rating: 5,
        reviews: 1,
        sale: true,
    },
    {
        id: 4,
        name: "Beebeecraft Gold Plated Threader Earrings",
        image: "https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/22_02-600x689.jpg",
        price: "$590",
        rating: 5,
        reviews: 1,
        sale: true,
    },
    {
        id: 5,
        name: "Darling Silver Golden Love In Nature Bracelet",
        image: "https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/20_02-600x689.jpg",
        price: "$200",
        rating: 5,
        reviews: 1,
        sale: false,
    },
    {
        id: 6,
        name: "Caratgold Designer Gold And Diamond Pendant",
        image: "https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/25_02-600x689.jpg",
        price: "$75 – $200",
        rating: 5,
        reviews: 1,
        sale: false,
    },
    {
        id: 7,
        name: "Bansuri Italian Bracelet Yellow Leaf Bracelet",
        image: "https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/40_02-600x689.jpg",
        price: "$45",
        rating: 5,
        reviews: 1,
        sale: false,
    },
    {
        id: 8,
        name: "Ocean Zen Zap Diamond Chain Pendant",
        image: "https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/22_03-600x689.jpg",
        price: "$360",
        rating: 5,
        reviews: 1,
        sale: false,
    },
];

export default function HomeContent() {
    const [activeTab, setActiveTab] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const navigate = useNavigate();
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>


            {/* ================= PALETTE PERFECTION BANNER ================= */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    alignItems: "center",
                    gap: 6,
                    mb: 8,
                }}
            >
                <Box sx={{ pt: { xs: 6, md: 0 }, pl: { xs: 0, md: 6 }, textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: "1.75rem", md: "2.125rem" },
                        }}
                    >
                        Palette Perfection: Mastering Color Similarity
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            color: "text.secondary",
                            lineHeight: 1.7,
                        }}
                    >
                        When Luxury Meets Style: Unique Design and Craftsmanship
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "white",
                            textTransform: "none",
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                        }}
                        onClick={() => navigate("/shop")}
                    >
                        Shop Now
                    </Button>
                </Box>

                <Box sx={{ position: "relative" }}>
                    <Box
                        component="img"
                        src="https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/cms-banner-04.jpg"
                        sx={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                        }}
                    />
                    {/* Overlapping Product Card */}
                    <Card
                        sx={{
                            position: "absolute",
                            bottom: { xs: -40, md: 60 },
                            right: { xs: 10, md: 450 },
                            width: { xs: 140, md: 180 },
                            bgcolor: "white",
                            boxShadow: "none"
                        }}
                    >
                        <CardMedia
                            component="img"
                            image="https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/cms-banner-04-02.jpg"
                            alt="Bold Hoops"
                            sx={{
                                height: { xs: 120, md: 150 },
                                objectFit: "contain",
                                p: 2,
                                bgcolor: "#fafafa",
                            }}
                        />
                        <CardContent sx={{ p: 1.5, textAlign: "center" }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                            >
                                Bold Hoops
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 700, fontSize: "0.875rem" }}
                            >
                                Still Choosing?
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* ================= FEATURED PRODUCTS ================= */}
            <Box sx={{ mb: 8 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        mb: 3,
                    }}
                >
                    Featured Products
                </Typography>

                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    centered
                    sx={{
                        mb: 4,
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "1rem",
                            minWidth: 120,
                        },
                        "& .Mui-selected": {
                            color: "black",
                        },
                        "& .MuiTabs-indicator": {
                            bgcolor: "black",
                        },
                    }}
                >
                    <Tab label="All Access" />
                    <Tab label="Best Sellers" />
                    <Tab label="On Sale" />
                </Tabs>

                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                            <Card
                                sx={{
                                    position: "relative",
                                    boxShadow: "none",
                                    border: "1px solid #f0f0f0",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        "& .product-image": {
                                            transform: "scale(1.05)",
                                        },
                                        "& .sale-badge": {
                                            opacity: 1,
                                            visibility: "visible",
                                        },
                                        "& .action-buttons": {
                                            opacity: 1,
                                            visibility: "visible",
                                        },
                                        "& .view-products-btn": {
                                            opacity: 1,
                                            visibility: "visible",
                                            transform: "translateY(0) translateX(50%)",
                                        },
                                    },
                                }}
                            >


                                {/* Action Buttons - Only visible on hover */}
                                {/* <Box
                                    className="action-buttons"
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        zIndex: 2,
                                        opacity: 0,
                                        visibility: "hidden",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: "white",
                                            border: "1px solid #e0e0e0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                bgcolor: "black",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "1.2rem" }}>♡</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: "white",
                                            border: "1px solid #e0e0e0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                bgcolor: "black",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "1rem" }}>⚖</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: "white",
                                            border: "1px solid #e0e0e0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                bgcolor: "black",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "1rem" }}>👁</Typography>
                                    </Box>
                                </Box> */}

                                <Box sx={{ overflow: "hidden", bgcolor: "#fafafa", position: "relative" }}>
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        alt={product.name}
                                        className="product-image"
                                        sx={{
                                            objectFit: "contain",
                                            transition: "transform 0.3s ease",
                                        }}
                                    />

                                    {/* View Products Button - Only visible on hover */}
                                    <Button
                                        variant="outlined"
                                        className="view-products-btn"
                                        sx={{
                                            position: "absolute",
                                            bottom: 20,
                                            textTransform: "none",
                                            fontWeight: 600,
                                            opacity: 0,
                                            visibility: "hidden",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        View Products
                                    </Button>
                                </Box>

                                <CardContent sx={{ textAlign: "center", p: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1,
                                            minHeight: 40,
                                            fontSize: "0.875rem",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            mb: 1,
                                        }}
                                    >
                                        <Rating
                                            value={product.rating}
                                            readOnly
                                            size="small"
                                            sx={{ fontSize: "1rem" }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 700,
                                            color: "text.primary",
                                        }}
                                    >
                                        {product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* ================= TOP HERO GRID ================= */}
            <Grid container spacing={3} sx={{ mb: 8 }}>
                {/* Left Big Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            backgroundImage:
                                "url('https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/cms-banner-01.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: { xs: 300, md: "100%" },
                            minHeight: 400,
                            p: 4,
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            position: "relative",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                "& img": {
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        <Box sx={{ position: "relative", zIndex: 2 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Let Here Know
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mt: 1,
                                    mb: 2,
                                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                                }}
                            >
                                The Perfect Bracelets
                            </Typography>
                            <Button variant="outlined" onClick={() => navigate("/shop")}>Shop Now</Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Two Cards */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Box
                                sx={{
                                    backgroundImage:
                                        "url('https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/cms-banner-02.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: { xs: 200, md: 190 },
                                    p: 4,
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    transition: "all 0.3s ease",
                                    overflow: "hidden",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "0.75rem",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        Extra Sale
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        Ring Collection
                                    </Typography>
                                    <Button variant="outlined" onClick={() => navigate("/shop")}>Shop Now</Button>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid size={12}>
                            <Box
                                sx={{
                                    backgroundImage:
                                        "url('https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/cms-banner-03.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: { xs: 200, md: 190 },
                                    p: 4,
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    transition: "all 0.3s ease",
                                    overflow: "hidden",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        Impression
                                        <br />
                                        Gold collection
                                    </Typography>
                                    <Button variant="outlined" onClick={() => navigate("/shop")}>Shop Now</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* ================= PALETTE PERFECTION BANNER ================= */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    alignItems: "center",
                    gap: 6,
                    mb: 8,
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <Box
                        component="img"
                        src="https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/cms-banner-05.jpg"
                        sx={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                        }}
                    />
                    {/* Overlapping Product Card */}
                    <Card
                        sx={{
                            position: "absolute",
                            bottom: { xs: -40, md: 60 },
                            right: { xs: 10, md: -100 },
                            width: { xs: 140, md: 180 },
                            bgcolor: "white",
                            boxShadow: "none"
                        }}
                    >
                        <CardMedia
                            component="img"
                            image="https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/cmc-banner-05-02.jpg"
                            alt="Bold Hoops"
                            sx={{
                                height: { xs: 120, md: 150 },
                                objectFit: "contain",
                                p: 2,
                                bgcolor: "#fafafa",
                            }}
                        />
                        <CardContent sx={{ p: 1.5, textAlign: "center" }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                            >
                                Bold Hoops
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 700, fontSize: "0.875rem" }}
                            >
                                Still Choosing?
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ pt: { xs: 6, md: 0 }, pl: { xs: 0, md: 6 }, textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: "1.75rem", md: "2.125rem" },
                        }}
                    >
                        Palette Perfection: Mastering Color Similarity
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            color: "text.secondary",
                            lineHeight: 1.7,
                        }}
                    >
                        When Luxury Meets Style: Unique Design and Craftsmanship
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "white",
                            textTransform: "none",
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                        }}
                        onClick={() => navigate("/shop")}
                    >
                        Shop Now
                    </Button>
                </Box>
            </Box>

            {/* ================= BANNER ================= */}
            <Grid container spacing={3} sx={{ mt: 8 }}>
                <Grid size={{ xs: 12 }}>
                    <Box
                        sx={{
                            backgroundImage:
                                "url('https://opencart.mahardhi.com/MT04/jewels/image/catalog/banners/banner3.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            p: { xs: 3, md: 5 },
                            borderRadius: 4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", // Center the content horizontally
                            position: "relative",
                            overflow: "hidden",
                            textAlign: "center", // Ensure text within the inner Box is centered
                        }}
                    >
                        <Box sx={{ zIndex: 1, width: { xs: "100%", md: "50%" } }}>
                            <Typography
                                variant="body2"
                                sx={{ mb: 1, color: "#5c2c2c", fontWeight: 500 }}
                            >
                                For a best ever bridal season
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    mb: 3,
                                    fontFamily: "serif",
                                    color: "#333",
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                }}
                            >
                                Diamond Jewellery Collection
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/shop")}
                            >
                                Shop Now
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </Container >
    );
}
