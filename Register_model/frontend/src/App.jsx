import React from "react";
import { Routes, Route } from "react-router-dom";
import ModelRegister from "./ModelRegister"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<ModelRegister />} />
    </Routes>
  );
}

export default App;
