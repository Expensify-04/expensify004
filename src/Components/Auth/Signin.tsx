import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {GoogleLogin, type CredentialResponse} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import {useNavigate, Link} from "@tanstack/react-router";
import {toast} from "react-toastify";
import {useAuth} from "./Authentication";
import type {GoogleUser} from "../../Types/Types";

import img1 from "../../assets/images/slide1 (1).png";
import img2 from "../../assets/images/slide2.png";
import img3 from "../../assets/images/slide3.png";
import phone from "../../assets/images/phone.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";

const images = [img1, img2, img3];

const Signin: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const {setIsLoggedIn} = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevImage = () =>
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  const nextImage = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

  const handlePhoneNumber = () => navigate({to: "/signin"});

  const handleEmailSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      window.dispatchEvent(new Event("storage"));
      toast.success("Login successfully");
      setIsLoggedIn(true);
      navigate({to: "/dashboard"});
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = (response: CredentialResponse) => {
    if (response.credential) {
      try {
        const decoded: GoogleUser = jwtDecode(response.credential);
        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem("isAuthenticated", "true");
        window.dispatchEvent(new Event("storage"));
        toast.success("Google login successful");
        setIsLoggedIn(true);
        navigate({to: "/dashboard"});
      } catch (error) {
        toast.error("Google login failed");
      }
    } else {
      toast.warn("No credential received from Google login");
    }
  };

  return (
    <Box display="flex" minHeight="100vh" width="100%">
      {/* Left Image Slider */}
      <Box
        position="relative"
        width={{xs: "0", md: "50%"}}
        display={{xs: "none", md: "block"}}
        height="100vh">
        <Box
          component="img"
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          width="100%"
          height="100%"
          sx={{objectFit: "cover"}}
        />

        <Box display="flex" justifyContent="center" mt={1}>
          {images.map((_, index) => (
            <Button
              key={index}
              size="small"
              variant="contained"
              onClick={() => setCurrentIndex(index)}
              sx={{
                minWidth: 10,
                height: 10,
                p: 0,
                m: 0.5,
                backgroundColor: currentIndex === index ? "cyan.main" : "grey.400",
                borderRadius: "50%",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Right Signin Form */}
      <Box
        width={{xs: "100%", md: "50%"}}
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={{xs: 2, md: 6}}
        py={8}>
        <Box width="100%" maxWidth="400px">
          <Typography variant="h4" align="center" color="primary" fontWeight="bold">
            Sign in
          </Typography>
          <Typography variant="caption" display="block" align="center" mt={1}>
            Sign in with your account
          </Typography>

          <Box display="flex" gap={2} justifyContent="center" mt={3} mb={2}>
            <GoogleLogin onSuccess={handleGoogleLogin} />
            <Button
              variant="outlined"
              startIcon={<Box component="img" src={phone} alt="Phone" width={20} />}
              onClick={handlePhoneNumber}
              sx={{textTransform: "none"}}>
              Phone Number
            </Button>
          </Box>

          <Divider />

          <Box mt={3}>
            <Typography variant="body2" mb={1}>
              Or continue with email address
            </Typography>
            <form onSubmit={handleEmailSignin}>
              <TextField
                fullWidth
                required
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faKey} />
                    </InputAdornment>
                  ),
                }}
              />

              <Box display="flex" justifyContent="space-between" mt={1}>
                <FormControlLabel control={<Checkbox size="small" />} label="Remember me" />
                <Typography
                  variant="caption"
                  sx={{cursor: "pointer", "&:hover": {textDecoration: "underline"}}}>
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{mt: 2, py: 1.5, backgroundColor: "#00acc1"}}>
                Sign in
              </Button>
            </form>

            <Typography variant="body2" align="center" mt={3}>
              Don’t have an account?{" "}
              <Link to="/signup" style={{color: "#00acc1", textDecoration: "underline"}}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signin;
