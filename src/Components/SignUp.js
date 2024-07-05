import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  //new user signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/register", {
        userName,
        password,
      });
      setSuccess("Teacher registered successfully");
      setError("");
      navigate("/login");
    } catch (err) {
      setError("Error registering teacher");
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
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#1A1919" }}
            >
              Sign Up
            </Button>
            <Typography mt={3}>
              Already have an account ?
              <span>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </span>
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;
