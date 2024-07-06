import "./App.css";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Pages/Home";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  // console.log(token);
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login setToken={setToken} />}
        />
        <Route
          path="/"
          element={token ? <Home token={token} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
