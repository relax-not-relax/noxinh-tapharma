// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet } from "react-router-dom";

function ProductsLayout() {
  return (
    <div>
      <h2>Products List</h2>
      <p>List of current available product.</p>
      <Outlet />
    </div>
  );
}

export default ProductsLayout;
