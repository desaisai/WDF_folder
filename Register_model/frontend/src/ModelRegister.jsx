import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function ModelRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male",
    experience: "",
    password: "",
    confirmPassword: "",
    photo: null,
    certificate: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.age) errors.age = "Age is required.";
    if (!formData.experience) errors.experience = "Experience is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (!formData.photo) errors.photo = "Photo is required.";
    if (!formData.certificate) errors.certificate = "Certificate is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/models/register",
        data
      );
      setMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "Male",
        experience: "",
        password: "",
        confirmPassword: "",
        photo: null,
        certificate: null,
      });
    } catch (error) {
      console.error("Error registering model:", error);
      setMessage("Failed to register model.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Model Registration</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <small className="text-danger">{errors.phone}</small>
          )}
        </div>

        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <small className="text-danger">{errors.age}</small>}
        </div>

        <div className="mb-3">
          <label>Photo</label>
          <input
            type="file"
            name="photo"
            className="form-control"
            onChange={handleChange}
          />
          {errors.photo && (
            <small className="text-danger">{errors.photo}</small>
          )}
        </div>

        <div className="mb-3">
          <label>Certificate</label>
          <input
            type="file"
            name="certificate"
            className="form-control"
            onChange={handleChange}
          />
          {errors.certificate && (
            <small className="text-danger">{errors.certificate}</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>

        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
}

export default ModelRegister;
