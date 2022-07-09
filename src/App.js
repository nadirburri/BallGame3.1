import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import BallGame from './ballGame3.1';


function App() {
  return (
    <Router>
      <div className="navBar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ballGame">BallGame</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ballGame" element={<BallGame />} />
      </Routes>
    </Router>
  );
}

export default App;
