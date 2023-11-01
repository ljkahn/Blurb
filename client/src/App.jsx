import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Error from "./pages/Error";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;