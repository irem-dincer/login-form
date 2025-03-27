import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Success from "./Components/Success";
import './App.css'; //import css file

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/success" element={<Success />} />
        </Routes>
  
    </Router>
  );
}

export default App;