import { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Paper, Skeleton } from "@mui/material";
import { subscribeToGoldRates, subscribeToGoldMultiplier, type GoldRates } from "../../firebase/goldRateService";

const GoldRate = () => {
  const [goldRates, setGoldRates] = useState<GoldRates | null>(null);
  const [multiplier, setMultiplier] = useState<number>(1.07);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Subscribe to real-time updates for gold rates
    const unsubscribeRates = subscribeToGoldRates((rates) => {
      setGoldRates(rates);
      if (rates) setLoading(false);
    });

    // Subscribe to real-time updates for multiplier
    const unsubscribeMultiplier = subscribeToGoldMultiplier((m) => {
      if (m) setMultiplier(m.value);
    });

    return () => {
      unsubscribeRates();
      unsubscribeMultiplier();
    };
  }, []);

  const rates = [
    {
      purity: "14 Karat",
      value: goldRates?.gold14k
        ? Math.round(goldRates.gold14k * multiplier)
        : 0,
      label: "Affordable Luxury",
    },
    {
      purity: "18 Karat",
      value: goldRates?.gold18k
        ? Math.round(goldRates.gold18k * multiplier)
        : 0,
      label: "Diamond Jewellery",
    },
    {
      purity: "22 Karat",
      value: goldRates?.gold22k
        ? Math.round(goldRates.gold22k * multiplier)
        : 0,
      label: "Standard Gold",
    },
    {
      purity: "24 Karat",
      value: goldRates?.gold24k
        ? Math.round(goldRates.gold24k * multiplier)
        : 0,
      label: "Pure Gold",
    },
  ];

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: "#832729",
              fontWeight: 700,
              mb: 1,
            }}
          >
            Today's Gold Rate
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666", fontStyle: "italic" }}
          >
            Stay updated with the latest gold prices in Tamil Nadu
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {rates.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#832729",
                    fontWeight: 600,
                    mb: 1,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {item.purity}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#888", mb: 2, fontSize: "0.9rem" }}
                >
                  {item.label}
                </Typography>
                {loading ? (
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={40}
                    sx={{ mx: "auto" }}
                  />
                ) : (
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#333",
                    }}
                  >
                    ₹ {item.value ? item.value.toLocaleString() : "N/A"}
                    <Typography
                      component="span"
                      sx={{ fontSize: "0.9rem", color: "#666", ml: 0.5 }}
                    >
                      / gm
                    </Typography>
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "#999" }}>
            * Rates are indicative and subject to change. Last updated: {goldRates?.updatedAt?.toDate ? goldRates.updatedAt.toDate().toLocaleString() : 'Recently'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default GoldRate;
