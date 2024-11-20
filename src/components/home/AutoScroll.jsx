/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import ProductDetails from "../combo/ProductDetails";

AutoScroll.propTypes = {
  items: PropTypes.array.isRequired,
};

function AutoScroll({ items }) {
  const [productSelected, setProductSelected] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (product) => {
    setProductSelected(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div
      className="slider w-full xl:h-[400px] lg:h-[300px] md:h-[250px] sm:h-[200px] h-[150px] bg-gray-50 overflow-hidden"
      style={{ "--quantity": `${items.length}` }}
    >
      <div className="list">
        {items.map((item, index) => (
          <div
            key={index}
            className="item"
            style={{ "--position": `${index + 1}` }}
          >
            <div
              className="h-full flex items-center"
              onClick={() => {
                handleOpen(item);
              }}
            >
              <div className="grid justify-items-center">
                <img
                  src={item.sliderImage}
                  alt=""
                  className="w-full md:mb-12 mb-4 md:px-14 sm:px-8 px-4"
                />
                <p className="xl:text-2xl lg:text-xl sm:text-base text-black">
                  {item.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {productSelected ? (
        <ProductDetails
          isOpen={open}
          onClose={handleClose}
          product={productSelected}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AutoScroll;
