import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Welcome from "./welcome";
import ModelRegister  from "./ModelRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
       <Route path="/model-register" element={<ModelRegister/>} />
      </Routes>
    </Router>
  );
}

export default App;
