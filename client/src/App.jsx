import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./index.css";

import Flame from './pages/Flame'
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Header from  './components/Header';
import NavBar from './components/NavBar';

function App() {
  
  
  return (
    <Router>

    <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/flame" element={<Flame />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <NavBar/>
    </Router>
  );
}

export default App;
