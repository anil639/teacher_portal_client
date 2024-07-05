import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
function App() {
  const [token, setToken] = useState("");
  // console.log(token);
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  );
}

export default App;
