/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import formatPrice from "../../util/formatPrice";
import cartAPI from "../../api/cartApi";

CartProduct.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function CartProduct({ item, onDelete }) {
  const [value, setValue] = React.useState(1);

  React.useEffect(() => {
    setValue(item.quantity);
  }, [item.quantity]);

  return (
    <div className="w-full flex justify-between items-start mt-6">
      <div className="flex justify-start items-start">
        <img src={item.image} alt="" className="sm:w-[120px] w-[85px] h-auto" />
        <div className="w-fit px-4">
          <Typography className="leading-none font-bold text-[#505050] sm:text-base text-sm">
            {item.name}
          </Typography>
          <div className="w-fit sm:mt-4 mt-2">
            <div className="flex justify-start items-center">
              <div className="relative w-fit sm:me-4 me-1">
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="xl:w-[120px] sm:w-[100px] w-[100px] !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-[50px]",
                  }}
                />
                <div className="absolute right-1 top-1 flex sm:gap-0.5 gap-0">
                  <IconButton
                    size="sm"
                    variant="text"
                    className="rounded"
                    onClick={() => setValue((cur) => (cur === 0 ? 0 : cur - 1))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                    </svg>
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant="text"
                    className="rounded"
                    onClick={() => setValue((cur) => cur + 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                    </svg>
                  </IconButton>
                </div>
              </div>
              <IconButton variant="text" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-start">
        <Typography className="font-normal text-sm">
          {formatPrice(item.price)}
        </Typography>
      </div>
    </div>
  );
}

export default CartProduct;
