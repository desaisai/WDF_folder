import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState({});

  function sanitizeInput(value) {
    return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function validateForm() {
    let errors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Name can only contain letters and spaces.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!formData.rePassword) {
      errors.rePassword = "Please re-enter your password.";
    } else if (formData.password !== formData.rePassword) {
      errors.rePassword = "Passwords do not match.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    // Update both formData and individual states
    setFormData({ ...formData, [name]: sanitizeInput(value) });

    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  function handleRegister() {
    if (validateForm()) {
      axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log(result)
        setFormData({
          name: "",
          email: "",
          password: "",
          rePassword: "",
        });
        setName("");
        setEmail("");
        setPassword("");
      }).catch((err) => console.log(err));
    }
  }

  const passwordsMatch =
    formData.password && formData.password === formData.rePassword;

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "450px", margin: "0 auto" }}
      >
        <h3 className="text-center mb-4">Signup Form</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="form-label fw-bold text-primary"
              style={{ fontSize: "18px" }}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          <div className="mb-3">
            <label
              className="form-label fw-bold text-success"
              style={{ fontSize: "18px" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label
              className="form-label fw-bold text-danger"
              style={{ fontSize: "18px" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <div className="mb-3">
            <label
              className="form-label fw-bold text-warning"
              style={{ fontSize: "18px" }}
            >
              Re-enter Password
            </label>
            <input
              type="password"
              name="rePassword"
              className="form-control"
              placeholder="Re-enter your password"
              value={formData.rePassword}
              onChange={handleChange}
            />
            {errors.rePassword && (
              <small className="text-danger">{errors.rePassword}</small>
            )}
          </div>

          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRegister}
              disabled={!passwordsMatch}
            >
              Register
            </button>
            <Link to="/login" className="btn btn-success">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
