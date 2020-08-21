import React from 'react';
import Sorting from './components/sorting/sorting';
import Trees from './components/trees/trees';
import './App.css';
import Graph from './components/graphs/graph/graph';
import BinarySearchVisualizer from './components/searching/binary-search/binary-search-visualizer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/sorting">
                Sorting
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Trees
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/trees" className="dropdown-item" href="#">
                  Binary Search Trees
                </Link>
                <Link className="dropdown-item" href="#">
                  Binary Tree
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Graphs
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/graphs" className="dropdown-item" href="#">
                  Directed Graphs
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Searching
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/binary-search" className="dropdown-item" href="#">
                  Binary Search
                </Link>
              </div>
            </li>
          </ul>
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
          <Route path="/graphs">
            <Graph />
          </Route>
          <Route path="/binary-search">
            <BinarySearchVisualizer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
