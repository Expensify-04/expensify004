import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import {useAuth} from "../Components/Auth/Authentication";
import {useNavigate, useLocation} from "@tanstack/react-router";
import ProfileImage from "./ProfileImage";

type UserProfile = {
  email?: string;
  name?: string;
  picture?: string;
  phone?: string;
};

const pages = [
  {name: "Home", path: "/"},
  {name: "Dashboard", path: "/dashboard"},
  {name: "Currency Converter", path: "/currency"},
];

function Navbar() {
  const {logout, isLoggedIn} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const updateProfile = () => {
      const googleUserData = localStorage.getItem("user");
      const firstname = localStorage.getItem("firstname");
      const email = localStorage.getItem("email");
      const phone = localStorage.getItem("phonenumber");

      if (googleUserData) {
        try {
          const user: UserProfile = JSON.parse(googleUserData);
          setProfile(user);
        } catch {
          setProfile(null);
        }
      } else if (firstname || email) {
        setProfile({
          name: firstname || "",
          email: email || "",
          phone: phone || "",
        });
      } else {
        setProfile(null);
      }
    };

    updateProfile();
    const handleStorage = () => updateProfile();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [isLoggedIn]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
    setProfile(null);
    navigate({to: "/", replace: true});
  };

  const handleNavigate = (path: string) => {
    navigate({to: path});
    handleCloseNavMenu();
  };

  // Hide navbar on login/signup pages
  if (["/signin", "/signup"].includes(location.pathname.toLowerCase())) {
    return null;
  }

  return (
    <AppBar position="static" sx={{backgroundColor: "#0092b8"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate({to: "/"})}
            sx={{
              mr: 2,
              display: {xs: "none", md: "flex"},
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              cursor: "pointer",
              textDecoration: "none",
            }}>
            Expensify
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              {pages.map(({name, path}) => (
                <MenuItem key={name} onClick={() => handleNavigate(path)}>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate({to: "/"})}
            sx={{
              flexGrow: 1,
              display: {xs: "flex", md: "none"},
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}>
            Expensify
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
            {pages.map(({name, path}) => (
              <Button key={name} onClick={() => handleNavigate(path)} sx={{my: 2, color: "white"}}>
                {name}
              </Button>
            ))}
          </Box>

          {isLoggedIn && profile ? (
            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <ProfileImage name={profile.name || "User"} size={40} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                <MenuItem disabled>Welcome, {profile.name || "User"}</MenuItem>
                {profile.email && <MenuItem disabled>Email: {profile.email}</MenuItem>}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button onClick={() => navigate({to: "/signin"})} color="inherit" sx={{ml: 2}}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
