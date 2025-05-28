import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 0,
        mt: 0,
        textAlign: "center",
        borderTop: "1px solid #22d3ee", // cyan-300
        bgcolor: "#ecfeff", // cyan-50
      }}>
      <Box sx={{display: "flex", justifyContent: "center", gap: 3, mb: 1}}>
        <IconButton
          aria-label="Instagram"
          sx={{
            color: "#134e4a", // cyan-900 / dark cyan
            transition: "color 0.3s",
            "&:hover": {color: "#ec4899"}, // pink-500
          }}>
          <InstagramIcon />
        </IconButton>
        <IconButton
          aria-label="Twitter"
          sx={{
            color: "#134e4a",
            transition: "color 0.3s",
            "&:hover": {color: "#3b82f6"}, // blue-500
          }}>
          <TwitterIcon />
        </IconButton>
        <IconButton
          aria-label="Facebook"
          sx={{
            color: "#134e4a",
            transition: "color 0.3s",
            "&:hover": {color: "#1d4ed8"}, // blue-700
          }}>
          <FacebookIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" sx={{color: "#134e4a"}}>
        &copy; 2025 Expense Tracker
      </Typography>
    </Box>
  );
}

export default Footer;
