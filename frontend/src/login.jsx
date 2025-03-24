import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Sanitize input to prevent HTML injection
  function sanitizeInput(value) {
    return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Form validation function
  function validateForm() {
    let errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }


  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  }

  
  function handleLogin() {
    if (validateForm()) {
      console.log("Logged in with:", formData);
      alert("Login Successful!");


      setFormData({
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4" style={{ maxWidth: "450px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Login Form</h3>

        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
            {/* <Link to="/register" className="btn btn-success">Signup</Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
