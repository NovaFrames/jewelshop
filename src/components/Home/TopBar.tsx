import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { useState } from "react";

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        background: "#f7f7f7",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 1,
        fontSize: 14,
      }}
    >
      <Typography>PHONE SHOPPING (01) 123 456 UJ</Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <Typography sx={{ cursor: "pointer" }}>MY ACCOUNT</Typography>
        <Typography sx={{ cursor: "pointer" }}>LOGIN</Typography>
        <Typography sx={{ cursor: "pointer" }}>CREATE AN ACCOUNT</Typography>

        <IconButton size="small">
          <FacebookIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <TwitterIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <PinterestIcon fontSize="small" />
        </IconButton>

        {/* CURRENCY DROPDOWN */}
        <Typography
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ cursor: "pointer" }}
        >
          CURRENCY ▾
        </Typography>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem>USD</MenuItem>
          <MenuItem>INR</MenuItem>
          <MenuItem>EUR</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
