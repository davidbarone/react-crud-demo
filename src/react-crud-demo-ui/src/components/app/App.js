import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import HomePage from "../HomePage/HomePage"
import About from "../AboutPage/AboutPage"
import TasksPage from '../TasksPage/TasksPage';
import TaskPage from '../TaskPage/TaskPage';
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="mainContainer">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/tasks" exact component={TasksPage} />
            <Route path="/task/:id" component={TaskPage} />
            <Route path="/task" component={TaskPage} />
            <Route path="/about" exact component={About} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
