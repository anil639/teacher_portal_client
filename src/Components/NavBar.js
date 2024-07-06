import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";

const NavBar = () => {
  //logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <AppBar
        position="static"
        color="transparent"
        sx={{ width: "80%", margin: "0 auto", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ color: "red" }}>
            Tailwebs
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <Button color="inherit" sx={{ marginRight: 2 }}>
              Home
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
