import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Products from "./components/Products/Products";
import Scan from "./components/Ia/Scan/Scan";
import Pay from "./components/Ia/Pay/Pay";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ia">IA</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Router path="/pay">
            <Pay />
          </Router>
          <Route path="/ia">
            <Scan />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/">
            <p>Bienvenue sur le projet devlab : CAISSE AUTO</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
