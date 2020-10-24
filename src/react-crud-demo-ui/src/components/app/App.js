import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import NavBar from "../navbar/NavBar"
import Home from "../home/Home"
import About from "../about/About"
import TasksPage from '../TasksPage/TasksPage';
import TaskPage from '../TaskPage/TaskPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/tasks" exact component={TasksPage} />
        <Route path="/task/:id" component={TaskPage} />
        <Route path="/task" component={TaskPage} />        
        <Route path="/about" exact component={About} />
      </Router>
    </div>
  );
}

export default App;
