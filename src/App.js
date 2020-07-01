import React from 'react';
import Sorting from './components/sorting/sorting.component'
import Trees from './components/trees/trees.component'
import './App.css';
import Navbar from './components/navbar/navbar.component'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default function App() {
  return (
    <Router>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Sorting</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/sorting">Sorting</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trees">Trees</Link>
              </li>
            </ul>
        </div>
    </nav>
       

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/sorting">
            <Sorting />
          </Route>
          <Route path="/trees">
            <Trees />
          </Route>
          {/* <Route path="/">
            <Home />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}
