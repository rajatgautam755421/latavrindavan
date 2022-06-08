import React from "react";

const NoAuth = () => {
  return (
    <>
      <div className="container mt-4">
        <h1 style={{ fontSize: "30px", margin: "20px 0px" }}>Not Authorised</h1>
        <img
          src="https://www.elegantthemes.com/blog/wp-content/uploads/2019/12/401-error-wordpress-featured-image.jpg"
          style={{ width: "50%", margin: "0px auto" }}
        />
      </div>
    </>
  );
};

export default NoAuth;
