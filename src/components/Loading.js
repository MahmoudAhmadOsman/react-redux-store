import React from "react";

const Loading = () => {
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-12 ">
          <div
            className="spinner-border m-auto d-flex text-muted "
            title="loading data..."
            style={{ margin: "0 auto" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
