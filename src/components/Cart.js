import React, { Component } from "react";

export class Cart extends Component {
  render() {
    //1st, Get the props
    const { cartItems } = this.props;

    return (
      <section className="cart-items">
        <div className="">
          {/* If cart items are equal to 0, cart is empty */}
          {cartItems.length === 0 ? (
            <div cartItems="alert alert-danger">
              <h5 className="text-danger">Your Cart is empty!</h5>
            </div>
          ) : (
            <div className="container p-2">
              <h4>
                You have{" "}
                <b className="badge badge-danger">{cartItems.length}</b> in your
                cart.
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
                    <p className="text-muted ml-3">{item.title}</p>
                  </div>

                  <div className="item-price">
                    <small className="text-muted ml-1">${item.price}</small>
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
                    <button className="btn btn-warning btn-lg btn-block font-weight-bold">
                      Proceed
                    </button>
                  </div>
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

export default Cart;
