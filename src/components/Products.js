import React, { Component } from "react";

import { Link } from "react-router-dom";
import formatCurrency from "../utils/util";

import Modal from "react-modal";

import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import Loading from "./Loading";

class Products extends Component {
  // Product Modal
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  //Now fetch the product from backen using componentDidMount function
  componentDidMount() {
    this.props.fetchProducts(); //Call the fetch products
  }

  //Open the Modal
  openModal = (product) => {
    this.setState({ product });
  };

  //Close the Modal
  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const productTitles = "Products";
    const { product } = this.state;

    return (
      <section className="all_products">
        <div className="container">
          <h1 className="text-info">{productTitles}</h1> <hr /> <br />
          {!this.props.products ? (
            <Loading />
          ) : (
            <div className="row">
              {this.props.products.map((product) => (
                <Zoom>
                  <div className="col-md-4">
                    <div className="card" key={product.id}>
                      <Link
                        to={"#" + product.id}
                        onClick={() => this.openModal(product)}
                      >
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
                          {formatCurrency(product.price)}
                        </button>

                        <Link
                          to={"#" + product.id}
                          className="btn btn-outline-warning btn-lg font-weight-bold"
                          onClick={() => this.props.addToCart(product)}
                        >
                          Add to Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </Zoom>
              ))}
            </div>
          )}
          <div className="row">
            {/* Start of Modal */}
            {product && (
              <Modal isOpen={true} onRequestClose={this.closeModal}>
                <Zoom>
                  <button
                    className="btn btn-danger mb-3"
                    onClick={this.closeModal}
                  >
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </button>
                  <div className="product-details">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            className="img-thumbnail img-responsive"
                            src={product.image}
                            alt={product.title}
                            title={product.title}
                          ></img>
                        </div>

                        <div className="col-md-6">
                          <h1>{product.title}</h1>

                          <h1 className="text-dark">
                            Price: &nbsp;
                            <span className="text-danger">
                              {formatCurrency(product.price)}
                            </span>
                          </h1>
                          <h3 className="text-muted mr-3">
                            Avaiable Sizes:
                            {product.availableSizes.map((closeTheModal) => (
                              <span>
                                <button
                                  className="btn btn-dark btn-sm ml-2 mr-2"
                                  disabled
                                >
                                  {closeTheModal}
                                </button>
                              </span>
                            ))}
                          </h3>
                          <div className="starts-reviews">
                            <p>
                              Stars | {product.starts}
                              {product.stars.map((star) => (
                                <i class="fa fa-star ml-1" aria-hidden="true">
                                  {product.star}
                                </i>
                              ))}
                            </p>
                          </div>

                          <hr />
                          <div className="description text-muted">
                            <h4>Description</h4>
                            <p>{product.description}</p>
                          </div>
                          <button
                            className="btn btn-outline-warning btn-lg font-weight-bold"
                            onClick={() => {
                              this.props.addToCart(product);
                              this.closeModal();
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>

                        {/* <div className="product-details-description">
                      

                    
                      <div className="product-price">
                       
                       
                      </div>
                    </div> */}
                      </div>
                    </div>
                  </div>
                </Zoom>
              </Modal>
            )}
            {/* End of Modal */}
          </div>
        </div>
      </section>
    );
  }
}

export default connect((state) => ({ products: state.products.items }), {
  fetchProducts,
})(Products);
