import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Data from "./views/Data";
import About from "./views/About";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={Home} />
        <Route path="/Data" element={Data} />
        <Route path="/About" element={About} />
      </Routes>
    </Router>
  );
};

export default App;
