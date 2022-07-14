import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import Navbar from './Navbar'
import BallGame from './ballGame4.0';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ballGame" element={<BallGame />} />
      </Routes>
    </Router>
  );
}

export default App;
