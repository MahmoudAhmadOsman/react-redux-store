import React, { Component } from "react";
import formatCurrency from "../utils/util";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";

class Cart extends Component {
  constructor(props) {
    super();
    //Initially set the state to false
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  // handleInput function that handles the form
  handleInput = (e) => {
    //Get the form value
    this.setState({ [e.target.name]: e.target.value });
  };

  //createOrder - when form is submitted
  createOrder = (e) => {
    // alert("Form sumitteed");
    e.preventDefault();
    //Now create order objects
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems, // include cart items here
      isLoading: this.props.isLoading,
    };
    //Now save the order and pass this info to the parent component which is App.js
    this.props.createOrder(order);
  };

  render() {
    //1st, Get the props
    const { cartItems } = this.props;

    return (
      <section className="cart-items">
        <div className="container">
          {/* If cart items are equal to 0, cart is empty */}
          {cartItems.length === 0 ? (
            <div cartItems="alert alert-danger">
              <h5 className="text-danger">
                <i class="fa fa-shopping-bag fa-2x" aria-hidden="true"></i>
                <small className="text-muted">
                  <b className="badge badge-danger">{cartItems.length}</b>
                  {/* Empty pack or cart */}
                </small>
              </h5>
            </div>
          ) : (
            <div className="container p-2">
              <h4>
                {/* You have{" "}
                <b className="badge badge-danger">{cartItems.length}</b> items
                in your cart. */}
                <i class="fa fa-cart-plus fa-2x " aria-hidden="true"></i>

                <b className="badge badge-success">{cartItems.length}</b>
              </h4>
            </div>
          )}

          {/* Start of Cart list items */}

          <div className="cart-items container">
            <ul className="list-group">
              {cartItems.map((item) => (
                <li className="list-group-item" key={cartItems.id}>
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-title">
                    <p className="text-muted font-weight-bold ml-3">
                      {item.title}
                    </p>
                  </div>
                  <div className="item-description">
                    <p className="text-muted">
                      {item.description.slice(0, 20)}...
                    </p>
                  </div>
                  <div className="item-price">
                    <small className="text-muted ml-1">
                      {/* ${item.price} */}
                      {formatCurrency(item.price)}
                    </small>
                    <small>&nbsp;X &nbsp; {item.count} </small>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm mt-1 mx-auto"
                    onClick={() => this.props.removeFromCart(item)}
                  >
                    Remove
                  </button>
                </li>
              ))}{" "}
              {/* Start of total div */}
              {cartItems.length !== 0 && (
                <div className="total mt-2">
                  {/* Now use reduce fun */}
                  <hr />
                  <h5>
                    Total:{" "}
                    <span className="text-danger text-muted">
                      ${cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                    </span>
                  </h5>
                  <hr />{" "}
                  <div className="proceed mt-4">
                    <button
                      onClick={() => {
                        this.setState({ showCheckout: true });
                      }}
                      className="btn btn-warning btn-lg btn-block font-weight-bold"
                    >
                      Proceed
                    </button>
                  </div>
                  {/* Start of showing the checkout form */}
                  {this.state.showCheckout && (
                    <div className="checkout-form-container mt-4">
                      <hr />
                      <Zoom>
                        <h3 className="text-primary">Checkout</h3>
                        <form onSubmit={this.createOrder}>
                          <div class="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              required
                              onChange={this.handleInput}
                            />
                          </div>
                          <div class="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              required
                              onChange={this.handleInput}
                            />
                          </div>

                          <div class="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              required
                              onChange={this.handleInput}
                            />
                          </div>
                          <button
                            type="submit"
                            class="btn btn-outline-primary btn-md"
                          >
                            Submit
                          </button>
                        </form>
                      </Zoom>
                    </div>
                  )}
                  {/* End of showing the checkout form */}
                </div>
              )}
              {/* End of total div */}
            </ul>
          </div>

          {/* End of Cart list items */}
        </div>
      </section>
    );
  }
}

export default connect(
  (state) => ({
    //first props
    cartItems: state.cart.cartItems,
  }),
  //Now define the cart action
  { removeFromCart }
)(Cart); //(Cart) is the name of the component
//Now add this reducer in the store.js reducers
//Then also add Product.js addToCart()
//Then remove CartItemss props from App.js
