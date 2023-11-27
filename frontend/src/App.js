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
        <Route path="/" exact Component={Home} />
        <Route path="/Data" Component={Data} />
        <Route path="/About" Component={About} />
      </Routes>
    </Router>
  );
};

export default App;
