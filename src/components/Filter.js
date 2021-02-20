import { connect } from "react-redux";
import React, { Component } from "react";

import { filterProducts, sortProducts } from "../actions/productActions";

import Loading from "./Loading";

class Filter extends Component {
  render() {
    return (
      // Show loading if there are no filtered products
      !this.props.filterProducts ? (
        <Loading />
      ) : (
        <section className="filter-component">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="form-control">
                  <b>Sort by price:</b> &nbsp;
                  <select
                    className="col-sm-2"
                    value={this.props.sort}
                    onChange={(e) =>
                      this.props.sortProducts(
                        this.props.filteredProducts,
                        e.target.value
                      )
                    }
                  >
                    &nbsp;
                    <option disabled>Select one</option>
                    <option value="latest">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                  </select>
                  &nbsp; &nbsp;
                  <b>Filter by Size</b> :&nbsp; &nbsp;
                  <select
                    className=" col-sm-2"
                    value={this.props.size}
                    onChange={(e) =>
                      this.props.filterProducts(
                        this.props.products,
                        e.target.value
                      )
                    }
                  >
                    <option disabled>Select one</option>
                    <option value="">ALL</option>
                    <option value="M">M</option>
                    <option value="S">S</option>
                    <option value="L">L</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    );
  }
}

export default connect(
  (state) => ({
    //Map the state to props
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    //Actions from productActions.js
    filterProducts,
    sortProducts,
  }
)(Filter);
