// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

AutoScroll.propTypes = {
  items: PropTypes.array.isRequired,
};

function AutoScroll({ items }) {
  return (
    <div
      className="slider w-full xl:h-[400px] lg:h-[300px] md:h-[250px] sm:h-[200px] h-[150px] bg-black overflow-hidden"
      style={{ "--quantity": `${items.length}` }}
    >
      <div className="list">
        {items.map((item, index) => (
          <div
            key={index}
            className="item"
            style={{ "--position": `${index + 1}` }}
          >
            <div className="h-full flex items-center">
              <div className="grid justify-items-center">
                <img
                  src={item.image}
                  alt=""
                  className="w-full md:mb-12 mb-4 md:px-14 sm:px-8 px-4"
                />
                <p className="xl:text-2xl lg:text-xl sm:text-base text-white">
                  {item.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutoScroll;
