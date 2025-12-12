import { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Paper, Skeleton } from "@mui/material";

const GoldRate = () => {
  const [rate24, setRate24] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGoldRate = async () => {
    try {
      setLoading(true);
      const API_KEY = "OBAL00RQP9OL3XUCTGVI227UCTGVI";
      const response = await fetch(
        `https://api.metals.dev/v1/latest?api_key=${API_KEY}&currency=INR`
      );
      const data = await response.json();
      const goldPerOunce = data?.metals?.gold;

      if (!goldPerOunce) {
        setRate24(null);
        setLoading(false);
        return;
      }

      const gramPrice = goldPerOunce / 31.103476;
      setRate24(parseFloat(gramPrice.toFixed(2)));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gold rate:", error);
      setRate24(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldRate();
    const interval = setInterval(fetchGoldRate, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculations
  const rate22 = rate24 ? Math.round(rate24 * 0.916) : null;
  const rate18 = rate24 ? Math.round(rate24 * 0.75) : null;
  const rate14 = rate24 ? Math.round(rate24 * 0.585) : null;

  const rates = [
    { purity: "14 Karat", value: rate14, label: "Affordable Luxury" },
    { purity: "18 Karat", value: rate18, label: "Diamond Jewellery" },
    { purity: "22 Karat", value: rate22, label: "Standard Gold" },
  ];

  return (
    <Box sx={{ bgcolor: "#fbfbfb", py: 6 }}>
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
            Stay updated with the latest gold prices in your city
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {rates.map((item, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
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
            * Rates are indicative and subject to change.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default GoldRate;
