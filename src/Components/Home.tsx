import {useEffect} from "react";
import {motion} from "framer-motion";
import Lenis from "@studio-freight/lenis";
import {features} from "../Data/Features";
import type {Feature} from "../Types/Types";
import finance from "../assets/images/finances.png";
import {useNavigate} from "@tanstack/react-router";
import {Box, Button, Container, Typography, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const lenis = new Lenis({lerp: 0.1, easing: (t: number) => t});
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom right, #eef2ff, #ffffff)",
      }}>
      {/* Hero Section */}
      <Box component="section" sx={{flex: 1, px: 3, pt: 12, pb: 6}}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{xs: 12, md: 6}}>
              <motion.div
                initial={{opacity: 0, y: -30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "#06b6d4",
                  }}>
                  Master Your Finances with Confidence
                </Typography>
                <Typography variant="body1" sx={{mb: 3, color: "#4b5563"}}>
                  Visualize, manage, and take control of your financial future — all in one
                  intuitive dashboard.
                </Typography>

                {/* Fix: Animate only button, not block */}
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  style={{border: "none", background: "none", padding: 0}}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#06b6d4",
                      "&:hover": {backgroundColor: "#0891b2"},
                      color: "#ffffff",
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      borderRadius: "8px",
                      boxShadow: 3,
                    }}
                    onClick={() => navigate({to: "/signin"})}>
                    Get Started
                  </Button>
                </motion.button>
              </motion.div>
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <Box
                component="img"
                src={finance}
                alt="Finance illustration"
                sx={{mx: "auto", width: 240, height: 240}}
              />
            </Grid>
          </Grid>

          {/* Features Section */}
          <Box sx={{mt: 10}}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 5,
                fontWeight: 600,
                color: "#1f2937",
              }}>
              Features Designed to Empower You
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {features.map((feature: Feature, index: number) => (
                <Grid
                  size={{xs: 12, sm: 6, md: 4}}
                  key={index}
                  sx={{display: "flex", justifyContent: "center"}}>
                  <motion.div
                    whileHover={{rotateY: 8, rotateX: 6, scale: 1.04}}
                    transition={{type: "spring", stiffness: 200, damping: 12}}>
                    <Paper
                      elevation={4}
                      sx={{
                        p: 3,
                        textAlign: "center",
                        borderRadius: "16px",
                        maxWidth: 320,
                        height: "100%",
                        cursor: "pointer",
                        transition: "box-shadow 0.3s",
                        "&:hover": {
                          boxShadow: 10,
                        },
                      }}>
                      <Box sx={{display: "flex", justifyContent: "center", mb: 2}}>
                        <Box
                          component="img"
                          src={feature.img}
                          alt={feature.title}
                          sx={{width: 96, height: 96}}
                        />
                      </Box>
                      <Typography variant="h6" sx={{color: "#06b6d4", fontWeight: 600, mb: 1}}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{color: "#4b5563"}}>
                        {feature.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Bottom CTA Section */}
      <Box component="section" sx={{backgroundColor: "#cffafe", py: 10}}>
        <Container maxWidth="md" sx={{textAlign: "center"}}>
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: "#164e63",
            }}>
            Track Your Finances
          </Typography>
          <Typography variant="body1" sx={{mb: 5, color: "#1f2937"}}>
            Wealth is not about having a lot of money — it’s about having control over your money.
          </Typography>
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            style={{border: "none", background: "none", padding: 0}}>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                color: "#ffffff",
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "9999px",
                boxShadow: 3,
              }}
              onClick={() => navigate({to: "/signin"})}>
              Let's Save
            </Button>
          </motion.button>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
