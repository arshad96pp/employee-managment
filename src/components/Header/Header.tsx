import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const menuItems = isLoggedIn
    ? [
      { text: "Home", path: "/" },
      { text: "Employees", path: "/EmployeeList" },
      { text: "Designations", path: "/designationList" },
    ]
    : [
      { text: "Login", path: "/" },
      { text: "Register", path: "/register" },
    ];

  return (
    <Box>
      <AppBar position="static" style={{ background: isLoggedIn ? "#333" : "white" }}>
        <Container maxWidth="lg">
          <Toolbar style={{ padding: 0 }}>
            {/* Hamburger Menu for Small Screens */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo and Menu for Larger Screens */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: isLoggedIn ? "white" : "black" }}>
                {isLoggedIn ? "Admin Template" : "Employee Manager"}
              </Typography>
              {isLoggedIn &&
                menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    onClick={() => navigate(item.path)}
                  >
                    {item.text}
                  </Button>
                ))}
            </Box>

            {/* Welcome Message or Authentication Buttons */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              {isLoggedIn ? (
                <Box sx={{ display: "flex", justifyItems: 'start', alignItems: "center", gap: '10px' }}>
                  <Typography sx={{ fontSize: '14px' }}>Welcome Muhammed Shafi P</Typography>

                  <Avatar
                    alt="User Avatar"
                    src="https://via.placeholder.com/150" // Placeholder image URL
                    sx={{ width: 40, height: 40, mr: 1 }}
                  />
                </Box>
              ) : (
                <>
                  <Button
                    sx={{ color: "black" }}
                    color="inherit"
                    onClick={() => navigate("/")}
                  >
                    Login
                  </Button>
                  <Button
                    sx={{ color: "black" }}
                    color="inherit"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          {/* Drawer Header with Avatar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              borderBottom: "1px solid #ccc", // Optional: Divider at the bottom
            }}
          >
            <Typography variant="h6">Menu</Typography>
            <Avatar
              alt="User Avatar"
              src="https://via.placeholder.com/150" // Placeholder image URL
              sx={{ width: 40, height: 40 }}
            />
          </Box>

          {/* Drawer Menu Items */}
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
