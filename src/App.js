import React from "react";
import store from "./store";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Cart from "./components/Cart";

import Home from "./components/Home";

import Filter from "./components/Filter";
import Footer from "./components/Footer";

import NavBar from "./components/NavBar";
import Products from "./components/Products";

// import data from "./data.json";
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <section classNameName="main-content">
            <NavBar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
            <div className="front-page">
              <div className="main-filter mt-2">
                <Filter></Filter>
              </div>
              {/* Start of Cart Component */}
              <div className="alert">
                <Cart />
              </div>

              {/*Now  All of the product properties will come from Redux store */}
              <Products></Products>

              {/* End of Product Component */}
            </div>
          </section>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
