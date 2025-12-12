// src/pages/HomePage.tsx
import React from 'react';
import { Button } from '@mui/material';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Container,
} from '@mui/material';

interface CategoryItem {
  title: string;
  image?: string;
}

const categories: CategoryItem[] = [
  { title: "EARRINGS", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwa0e3f2e8/homepage/shopByCategory/earrings-25-11-25.jpg" },
  { title: "FINGER RINGS", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwf908d297/homepage/shopByCategory/ring-25-11-25.jpg" },
  { title: "PENDANTS", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwda9a1adc/homepage/shopByCategory/pendant-25-11-25.jpg" },
  { title: "MANGALSUTRA", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwac800abe/homepage/shopByCategory/mangalsutra-25-11-25.jpg" },
  { title: "BRACELETS", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw523fbc6d/homepage/shopByCategory/bracelets-25-11-25.jpg" },
  { title: "BANGLES", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw7ee74c79/homepage/shopByCategory/bangles-25-11-25.jpg" },
  { title: "CHAINS", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw901912c0/homepage/shopByCategory/chains-25-11-25.jpg" },
  { title: "ALL JEWELRY", image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw811a2edc/homepage/shopByCategory/all-jew-cat.jpg" },
];

const HomePage: React.FC = () => {

  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Container>
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontFamily: "serif",
          }}
        >
          Find Your Perfect Match
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          sx={{ mb: 4, color: "text.secondary" }}
        >
          Shop by Categories
        </Typography>

        {/* Grid of Categories */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
        >
          {categories.map((cat, idx) => (
            <Grid size={{ xs: 6, md: 3 }} key={idx}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "16px",
                }}
              >
                <CardActionArea>
                  <Box
                    component="img"
                    src={cat.image}
                    alt={cat.title}
                    sx={{
                      width: "90%",
                      height: 300,
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                </CardActionArea>
              </Card>

              <Typography
                variant="subtitle2"
                sx={{
                  mt: 1.5,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                {cat.title}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8 }}>
          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 1,
              fontFamily: "serif",
            }}
          >
            New Jewels
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="subtitle1"
            sx={{ mb: 4, color: "text.secondary" }}
          >
            Choose Right One
          </Typography>
        </Box>

        {/* Promotional Banners */}
        <Grid container spacing={3} sx={{ mt: 8 }}>
          {/* Left Banner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundImage:
                  "url('https://opencart.mahardhi.com/MT04/jewels/image/catalog/banners/banner2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                height: 320,
                position: "relative",
                overflow: "hidden",
                textAlign: "left",
              }}
            >
              {/* Overlay (optional) */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.35)",
                }}
              />

              {/* Content */}
              <Box sx={{ zIndex: 1, width: "60%" }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: "#5c2c2c", fontWeight: 500 }}
                >
                  Sale 20% Discounts
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
                  Bracelet<br />Jewellery
                </Typography>

                <Button
                  variant="outlined"
                >
                  Shop Now
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Banner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundImage:
                  "url('https://opencart.mahardhi.com/MT04/jewels/image/catalog/banners/banner1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                height: 320,
                position: "relative",
                overflow: "hidden",
                textAlign: "left",
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.35)",
                }}
              />

              {/* Content */}
              <Box sx={{ zIndex: 1, width: "60%" }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: "#5c2c2c", fontWeight: 500 }}
                >
                  Only From $195.00
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
                  Necklace<br />Jewellery
                </Typography>

                <Button
                  variant="outlined"
                >
                  Shop Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};

export default HomePage;