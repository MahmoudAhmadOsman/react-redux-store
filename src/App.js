import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Filter from "./components/Filter";

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

  //filterProducts function
  filterProducts = (event) => {
    console.log("Sort products", event.target.value);
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        product: data.products,
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  //sortProducts or size
  sortProducts = (event) => {
    //console.log(event.target.value);
    //Create a varibe to chech the sort later
    const sort = event.target.value;

    //SetState(get the current state)
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a.id < b.id
            ? 1
            : -1
        ),
    }));
  };

  render() {
    return (
      <Router>
        <section classNameName="main-content">
          <NavBar />
          <Switch>
            {/* <Route exact path="/">
              <Home />
            </Route> */}
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
          <div className="front-page">
            <div className="main-filter mt-2">
              {/*1. Filter component: pass props here to access in Filter component */}
              {/*2. Define properties for the filter selected items */}
              {/*3. The, define functions that handles when items are selected */}
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
            </div>

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
