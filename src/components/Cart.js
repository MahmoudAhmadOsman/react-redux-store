import React, { Component } from "react";
import formatCurrency from "../utils/util";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";

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
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
      //isLoading: this.props.isLoading,
    };

    //Now save the order and pass this info to the parent component which is App.js
    this.props.createOrder(order);
  };
  closeModal = () => {
    this.props.clearOrder();
  };
  render() {
    //1st, Get the props
    //Then, show the order
    const { cartItems, order } = this.props;

    return (
      <section className="cart-items">
        <div className="container">
          {order && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button
                  className="btn btn-danger mb-2"
                  onClick={this.closeModal}
                >
                  <i className="fa fa-close "></i>
                </button>
                <div class="container">
                  <h3 className="alert alert-success">
                    <i className="fa fa-check-square text-info mr-3"></i>
                    Thank You. Your order has been placed!
                  </h3>
                  <h2 className="text-primary mb-3">Order Details</h2>

                  <table class="table table-striped mt-3">
                    <thead>
                      <tr>
                        <th>Order Number</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Address</th>
                        <th>Order Date</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-primary">{order.id}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.address}</td>

                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-danger font-weight-bold">
                          {formatCurrency(order.total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-block mt-3">
                    <h4 className="text-danger">Cart Details</h4> <hr />
                    {order.cartItems.map((x) => (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>
                              Number of Items
                              <span className="badge badge-danger rounded-circle ml-3">
                                {x.count}
                              </span>
                            </th>
                          </tr>
                          <tbody>
                            <td>
                              {x.count} {" x "} {x.title}
                            </td>

                            <td>
                              <b>Price:</b> {formatCurrency(x.price)}{" "}
                            </td>
                          </tbody>
                        </thead>
                        <hr />
                      </table>
                    ))}
                  </div>
                </div>
              </Zoom>
            </Modal>
          )}

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
              ))}
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
                      className="btn btn-outline-success btn-lg btn-block font-weight-bold"
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
                            <label htmlFor="name">Full Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-lg"
                              placeholder="Enter your full name"
                              required
                              onChange={this.handleInput}
                            />
                          </div>
                          <div class="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control form-control-lg"
                              placeholder="Enter a valid email address"
                              required
                              onChange={this.handleInput}
                            />
                          </div>

                          <div class="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control form-control-lg"
                              placeholder="Enter your full address"
                              required
                              onChange={this.handleInput}
                            />
                          </div>
                          <button
                            type="submit"
                            class="btn btn-outline-danger btn-lg btn-block"
                          >
                            PLACE ORDER
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
    //first prop
    order: state.order.order,
    //2nd prop
    cartItems: state.cart.cartItems,
  }),
  //Now import CART,  ORDER and CLEAR actions
  {
    removeFromCart,
    createOrder,
    clearOrder,
  }
)(Cart); //(Cart) is the name of the component
//Now add this reducer in the store.js reducers
//Then also add Product.js addToCart()
//Then remove CartItemss props from App.js
