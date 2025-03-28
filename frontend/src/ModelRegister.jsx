import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModelRegister() {
  const [modelData, setModelData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "male",
    certificate: null,
    photo: null,
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setModelData({ ...modelData, [name]: value });
  }

  // Handle file inputs separately
  function handleFileChange(e) {
    const { name, files } = e.target;
    setModelData({ ...modelData, [name]: files[0] });
  }

  async function handleModelRegister(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", modelData.name);
    formData.append("email", modelData.email);
    formData.append("age", modelData.age);
    formData.append("gender", modelData.gender);
    formData.append("certificate", modelData.certificate);
    formData.append("photo", modelData.photo);

    try {
      await axios.post("http://localhost:3001/register-model", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Model registered successfully");
      navigate("/");
    } catch (error) {
      console.error("Error registering model:", error);
      alert("Model registration failed");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4" style={{ maxWidth: "450px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Model Registration</h3>

        <form onSubmit={handleModelRegister} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={modelData.name}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={modelData.email}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={modelData.age}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <select name="gender" value={modelData.gender} onChange={handleChange} className="form-control mb-3" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Upload Certificate:</label>
          <input
            type="file"
            name="certificate"
            onChange={handleFileChange}
            className="form-control mb-3"
            accept=".pdf, .jpg, .jpeg, .png"
            required
          />

          <label>Upload Photo:</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="form-control mb-3"
            accept=".jpg, .jpeg, .png"
            required
          />

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default ModelRegister;
