import React from "react";
import Login from './login.js';
import Blockchain from './blockchain.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          {/* <Route path="/welcome">
            <Blockchain />
          </Route> */}
          {/* <Route path="/"> */}
          <Route path="/" element={ <Login />} />
          <Route path="/welcome" element={ <Blockchain />} />
          {/* <Route path="/" render={() => <Login />} /> */}
        </Routes>
      </div>
    </Router>
  );
}