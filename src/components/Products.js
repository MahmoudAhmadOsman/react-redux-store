import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Products extends Component {
  render() {
    const productTitles = "List of Products";
    return (
      <section className="all_products">
        <h1 className="text-info">{productTitles}</h1> <hr />
        <div className="row">
          {this.props.products.map((product) => (
            <div className="col-md-4">
              <div class="card" key={product.id}>
                <Link href={"#" + product.id}>
                  <img
                    class="card-img-top"
                    src={product.image}
                    alt={product.title}
                  />
                </Link>
                <div class="card-body">
                  <h4 class="card-title">
                    {product.title} &nbsp; <span className="text-muted">|</span>{" "}
                    &nbsp;
                    <b className="text-danger">${product.price}</b>
                  </h4>
                  <hr />
                  <p class="card-text">{product.description}</p>{" "}
                  <select
                    name=""
                    id=""
                    className="mr-3 btn btn-secondary btn-sm"
                  >
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XXL">XXL</option>
                  </select>
                  <Link href="#" class="btn btn-outline-warning btn-sm">
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
