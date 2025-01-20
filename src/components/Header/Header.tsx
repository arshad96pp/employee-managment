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
  Popover,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slicess/authSlice";

const Header = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const menuItems = isLoggedIn
    ? [
        { text: "Home", path: "/" },
        { text: "Employees", path: "/EmployeeList" },
        { text: "Designations", path: "/designationList" },
        { text: "Logout", path: "/logout" }, // Add logout item for drawer
      ]
    : [
        { text: "Login", path: "/" },
        { text: "Register", path: "/register" },
      ];

  const handleNavigation = (path: string) => {
    setActivePath(path);
    navigate(path);
    if (path === "/logout") {
      handleLogout(); // Logout if the user clicks "Logout"
    }
  };

  const handleLogout = () => {
    // Handle logout logic (clear session or token)
    console.log("Logging out...");
    dispatch(logout());
    navigate("/"); // Redirect to home or login page
    setDrawerOpen(false); // Close drawer on mobile after logout
  };

  const handleAvatarHover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "avatar-popover" : undefined;

  return (
    <Box>
      <AppBar
        position="static"
        style={{ background: isLoggedIn ? "#333" : "white" }}
      >
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
                display: { xs: isLoggedIn ? "none" : "", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: isLoggedIn ? "white" : "black" }}
              >
                {isLoggedIn ? "Admin Template" : "Employee Manager"}
              </Typography>
              {isLoggedIn &&
                menuItems.slice(0, -1).map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      color: activePath === item.path ? "white" : "gray",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
            </Box>

            {/* Welcome Message, Avatar, and Logout Button */}
            <Box
              sx={{
                display: { xs: isLoggedIn ? "none" : "", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              {isLoggedIn ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  onMouseEnter={handleAvatarHover}
                  onMouseLeave={handleAvatarLeave}
                >
                  <Typography sx={{ fontSize: "14px" }}>
                    Welcome Muhammed Shafi P
                  </Typography>

                  <Avatar
                    alt="User Avatar"
                    src="https://via.placeholder.com/150" // Placeholder image URL
                    sx={{ width: 40, height: 40, mr: 1 }}
                  />

                  {/* Popover (Dropdown Menu) */}
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleAvatarLeave}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Box sx={{ width: 200 }}>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Box>
                  </Popover>
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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
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
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color: activePath === item.path ? "white" : "gray",
                    backgroundColor:
                      activePath === item.path ? "#333" : "transparent",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#333",
                    },
                  }}
                >
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
