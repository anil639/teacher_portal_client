import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        userName,
        password,
      });
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          sx={{ marginTop: "30px", marginBottom: "30px", color: "red" }}
          variant="h4"
          component="h1"
          gutterBottom
        >
          TAILWEBS
        </Typography>
        <Paper
          elevation={3}
          sx={{ padding: 4, width: "100%", borderRadius: "5px" }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              label="UserName"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#1A1919" }}
            >
              Login
            </Button>
            <Typography mt={3}>
              Don't have an account ?
              <span>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  SignUp
                </Link>
              </span>
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
