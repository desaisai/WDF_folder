import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("brand"); // Default to brand
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
        userType,
      });

      console.log('Login response:', response.data); // Debug log

      if (userType === "model") {
        navigate("/model-register");  // ✅ Redirect model to registration form
      } else {
        navigate("/welcome");  // ✅ Redirect brand to dashboard
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4" style={{ maxWidth: "450px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Login Form</h3>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <label>User Type</label>
            <select 
              className="form-control" 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="brand">Brand</option>
              <option value="model">Model</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;