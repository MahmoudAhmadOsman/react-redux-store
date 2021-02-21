import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <section className="home">
        <div className="container mt-1">
          <small className="text-muted float-right">
            Design and Developed by Mr.{" "}
            <a href="http://mahmoudosman.com" target="blank">
              Mahmoud Osman
            </a>
          </small>
        </div>
      </section>
    );
  }
}
