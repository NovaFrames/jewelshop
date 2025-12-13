import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { products } from "../../Pages/Products/Products";

export default function HomeContent() {

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

                <Box sx={{ mt: 8, textAlign: "center" }}>
                    {/* Title */}
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            mb: 1,
                            fontFamily: "serif",
                        }}
                    >
                        Featured Products
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="subtitle1"
                        sx={{ mb: 4, color: "text.secondary" }}
                    >
                        Choose your favorite
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {products.slice(0, 8).map((product) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                            <Card
                                sx={{
                                    position: "relative",
                                    boxShadow: "none",
                                    border: "1px solid #f0f0f0",
                                    transition: "all 0.3s ease",
                                    display: { xs: "flex", sm: "block" },
                                    flexDirection: { xs: "row", sm: "column" },
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
                                            transform: { xs: "translateY(0)", sm: "translateY(0) translateX(50%)" },
                                        },
                                    },
                                }}
                            >
                                {/* Action Buttons - Only visible on hover */}
                                <Box
                                    className="action-buttons"
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: { xs: "auto", sm: 10 },
                                        left: { xs: 10, sm: "auto" },
                                        display: "flex",
                                        flexDirection: { xs: "row", sm: "column" },
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
                                                bgcolor: "#9f7e44",
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
                                                bgcolor: "#9f7e44",
                                                color: "white",
                                            },
                                        }}
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        <Typography sx={{ fontSize: "1rem" }}>👁</Typography>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        overflow: "hidden",
                                        bgcolor: "#fafafa",
                                        position: "relative",
                                        width: { xs: "40%", sm: "100%" },
                                        flexShrink: 0,
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        alt={product.name}
                                        className="product-image"
                                        sx={{
                                            objectFit: "contain",
                                            transition: "transform 0.3s ease",
                                            height: { xs: "150px", sm: "auto" },
                                        }}
                                    />

                                    {/* View Products Button - Only visible on hover on desktop */}
                                    <Button
                                        variant="outlined"
                                        className="view-products-btn"
                                        sx={{
                                            display: { xs: "none", sm: "block" },
                                            position: "absolute",
                                            bottom: 20,
                                            textTransform: "none",
                                            fontWeight: 600,
                                            opacity: 0,
                                            visibility: "hidden",
                                            transition: "all 0.3s ease",
                                        }}
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        View Product
                                    </Button>
                                </Box>

                                <CardContent
                                    sx={{
                                        textAlign: { xs: "left", sm: "center" },
                                        p: 2,
                                        width: { xs: "60%", sm: "100%" },
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1,
                                            minHeight: { xs: "auto", sm: 40 },
                                            fontSize: "0.875rem",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: { xs: "flex-start", sm: "center" },
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
                                        ${product.price}
                                    </Typography>

                                    {/* View Product Button for Mobile */}
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            display: { xs: "block", sm: "none" },
                                            mt: 1,
                                            textTransform: "none",
                                            fontWeight: 600,
                                            fontSize: "0.75rem",
                                            py: 0.5,
                                        }}
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        View Product
                                    </Button>
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
