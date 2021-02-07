import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import NavBar from "./components/NavBar";
import Products from "./components/Products";

import data from "./data.json";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  render() {
    return (
      <Router>
        <section classNameName="main-content">
          {/* <NavBar /> */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
          <div className="front-page">
            <div className="container">
              <Products products={this.state.products}></Products>
            </div>
          </div>
        </section>
      </Router>
    );
  }
}

export default App;
