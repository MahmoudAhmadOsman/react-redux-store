import React from "react";
import store from "./store";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Filter from "./components/Filter";
import Footer from "./components/Footer";

import NavBar from "./components/NavBar";
import Products from "./components/Products";

// import data from "./data.json";
class App extends React.Component {
  //const { isLoading } = useState(false);

  constructor() {
    super();

    this.state = {
      //products: data.products,
      // cartItems: [],
      //2.Prevent lossing items after page is refreshed by using local storage
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      // size: "",
      // sort: "",
      isLoading: false,
    };
  }

  //createOrder method from Cart.js component
  createOrder = (order) => {
    alert(order.name + " " + order.email + " " + order.address);
    console.log(order);
  };

  //Remove Items from the lsit
  removeFromCart = (product) => {
    alert("Are you sure you want to remove this item?");
    //1, create an instance of cart item
    const cartItems = this.state.cartItems.slice();
    //2. then filter items based on id inside setState
    //3. pass this func to the Cart as a props
    this.setState({ cartItems: cartItems.filter((x) => x.id !== product.id) });
    //2.Prevent lossing items after page is refreshed by using local storage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x.id !== product.id))
    );
  };

  //AddToCart function on btn
  addToCart = (product) => {
    // alert("You added an item!!");
    //Create clone of cart items
    const cartItems = this.state.cartItems.slice();

    //Already in cart or not
    let alreadyInCart = false;

    //Loop though cart items using forEach func
    cartItems.forEach((item) => {
      //Check item
      if (item.id === product.id) {
        item.count++; // if item already exists, then increment by 1
        alreadyInCart = true;
      }
    });

    //If not in the Cart
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    //Now set the state
    this.setState({ cartItems });
    //1.Prevent lossing items after page is refreshed by using local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  //filterProducts function
  //Moved to ProductAction
  // filterProducts = (event) => {
  //   console.log("Sort products", event.target.value);
  //   console.log(event.target.value);
  //   if (event.target.value === "") {
  //     this.setState({
  //       size: event.target.value,
  //       product: data.products,
  //     });
  //   } else {
  //     this.setState({
  //       size: event.target.value,
  //       products: data.products.filter(
  //         (product) => product.availableSizes.indexOf(event.target.value) >= 0
  //       ),
  //     });
  //   }
  // };

  //sortProducts or size
  //Moved to ProductAction
  // sortProducts = (event) => {
  //   //console.log(event.target.value);
  //   //Create a varibe to chec the sort later
  //   const sort = event.target.value;

  //   //SetState(get the current state)
  //   this.setState((state) => ({
  //     sort: sort,
  //     products: this.state.products
  //       .slice()
  //       .sort((a, b) =>
  //         sort === "lowest"
  //           ? a.price > b.price
  //             ? 1
  //             : -1
  //           : sort === "highest"
  //           ? a.price < b.price
  //             ? 1
  //             : -1
  //           : a.id < b.id
  //           ? 1
  //           : -1
  //       ),
  //   }));
  // };

  render() {
    return (
      <Provider store={store}>
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
                {/*Now  All of the product properties will come form Redux store */}
                {/* <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                ></Filter> */}

                <Filter></Filter>
              </div>
              {/* Start of Cart Component */}
              <div className="alert">
                {/* Pass cartItems to the cart component as props */}
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                  isLoading={this.isLoading}
                />
              </div>
              {/* End of Cart Component */}

              {/* Start of Product Component */}
              {/* <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products> */}
              {/*Now  All of the product properties will come form Redux store */}
              <Products addToCart={this.addToCart}></Products>

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
