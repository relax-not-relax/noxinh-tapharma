// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./home/ProductCard";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

CategoryProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

function CategoryProducts({ products }) {
  const navigate = useNavigate();
  return (
    <div>
      {products.map((category) => {
        return (
          <div
            key={category.id}
            className="w-full h-auto xl:px-24 xl:py-16 px-12 py-8 flex justify-start items-center flex-wrap lg:flex-nowrap"
          >
            <div className="2xl:w-[200px] xl:w-[150px] lg:w-[120px] sm:w-full h-auto grid justify-items-center 2xl:me-32 xl:me-24 lg:me-12">
              <img
                src={category.image}
                alt=""
                className="lg:w-full sm:w-[30%] w-[50%]"
              />
              <h2 className="uppercase text-xl mt-4 text-center">
                Công chúa {category.name}
              </h2>
              <h4 className="uppercase text-lg font-light text-center lg:mb-0 mb-10">
                ({category.color})
              </h4>
              <Button
                variant="outlined"
                className="xl:mt-3 xl:mb-0 mb-8"
                onClick={() => {
                  navigate(
                    `/combo/${category.id}?pageNumber=0&pageSize=8&sort=id,desc`
                  );
                }}
              >
                Xem tất cả
              </Button>
            </div>
            <div className="flex-auto flex justify-start flex-wrap 2xl:gap-x-4 xl:gap-x-3 lg:gap-x-0 sm:gap-x-3 lg:gap-y-0 gap-y-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
              {category.productPages.content.slice(0, 4).map((item) => {
                return <ProductCard key={item.id} product={item} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryProducts;
