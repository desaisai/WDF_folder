import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="container mt-5 text-center">
      <h2>Welcome to the Dashboard</h2>
      <p>You are successfully logged in!</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}

export default Welcome;
