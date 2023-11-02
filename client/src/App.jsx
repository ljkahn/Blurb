import { HashRouter as Router, Routes, Route } from "react-router-dom";

import React, { useState, useEffect } from "react";
import "./index.css";

import Notifications from './pages/Notifications'
import Flame from './pages/Flame'
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Header from  './components/Header';
import NavBar from './components/NavBar';
import Likes from './pages/Likes';
import CommentPage from "./pages/CommentPage";


function App() {
  
 
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/flame" element={<Flame />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/comment" element={<CommentPage />} />
      </Routes>
      <NavBar/>
    </Router>
  );
}

export default App;
