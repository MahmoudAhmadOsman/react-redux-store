import React, { Component } from "react";
import { Link } from "react-router-dom";

class Products extends Component {
  addToCart = () => {
    alert("Working on it!!!");
  };

  render() {
    const productTitles = "Products";
    return (
      <section className="all_products">
        <div className="container">
          <h1 className="text-info">{productTitles}</h1> <hr /> <br />
          <div className="row">
            {this.props.products.map((product) => (
              <div className="col-md-4">
                <div className="card" key={product.id}>
                  <Link to={"#" + product.id}>
                    <img
                      className="card-img-top"
                      src={product.image}
                      alt={product.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h4 className="card-title">
                      {product.title} &nbsp;
                      {/* <span className="text-muted"></span> */}
                      &nbsp;
                      {/* <b className="text-danger">${product.price}</b> */}
                    </h4>
                    <hr />
                    <p className="card-text">{product.description}</p>
                    <button className="disabled btn btn-secondary btn-lg mr-2 font-weight-bold">
                      ${product.price}
                    </button>

                    <Link
                      to={"#" + product.id}
                      className="btn btn-outline-warning btn-lg font-weight-bold"
                      onClick={this.addToCart}
                    >
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="col-md-2">
              <h1>Right col</h1>
            </div> */}
          </div>
        </div>
      </section>
    );
  }
}

export default Products;
