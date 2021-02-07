import React, { Component } from "react";
import { Link } from "react-router-dom";

class Products extends Component {
  render() {
    //const productTitles = "List of Products";
    return (
      <section className="all_products">
        {/* <h1 className="text-info">{productTitles}</h1> <hr /> */}
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
                    {product.title} &nbsp; <span className="text-muted">|</span>
                    &nbsp;
                    {/* <b className="text-danger">${product.price}</b> */}
                  </h4>
                  <hr />
                  <p className="card-text">{product.description}</p>
                  <button className="disabled btn btn-secondary btn-lg mr-2 font-weight-bold">
                    ${product.price}
                  </button>
                  {/* <h4>
                    <b className="text-danger">${product.price}</b>
                  </h4> */}
                  {/* <select value="" className="mr-3 btn btn-secondary btn-sm">
                    <option value="M">M </option>
                    <option value="L">L</option>
                    <option value="XXL">XXL</option>
                  </select> */}
                  <Link
                    to="#"
                    className="btn btn-outline-warning btn-lg font-weight-bold"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Products;
