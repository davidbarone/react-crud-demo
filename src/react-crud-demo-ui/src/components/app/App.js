import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import NavBar from "../navbar/NavBar"
import Home from "../home/Home"
import About from "../about/About"

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
      </Router>
    </div>
  );
}

export default App;
