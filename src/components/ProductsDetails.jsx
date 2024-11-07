// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLoaderData } from "react-router-dom";

function ProductsDetails() {
  const productDetails = useLoaderData();

  return (
    <div>
      <p>
        <b>Product Name: </b>
        {productDetails.name}
      </p>
      <p>
        <b>Description: </b>
        {productDetails.description}
      </p>
      <p>
        <b>Price: </b>
        {productDetails.price}
      </p>
    </div>
  );
}

export default ProductsDetails;

export const productDetailsLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`http://localhost:5001/products/${id}`);
  if (!res.ok) {
    throw Error("Could not found the product");
  }
  return res.json();
};
