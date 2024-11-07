/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Drawer,
  IconButton,
  Input,
  Option,
  Select,
  Slider,
  Typography,
} from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";

FilterDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChangeMin: PropTypes.func.isRequired,
  onChangeMax: PropTypes.func.isRequired,
};

function FilterDrawer({ onClose, isOpen, min, max, onChangeMin, onChangeMax }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = () => {
    onClose();
    searchParams.set("minPrice", min);
    searchParams.set("maxPrice", max);
    setSearchParams(searchParams);
    console.log("Min: ", min);
    console.log("Max: ", max);
  };

  const handleShowAll = () => {
    onClose();
    searchParams.delete("minPrice");
    searchParams.delete("maxPrice");
    searchParams.delete("search");
    searchParams.set("sort", "id,desc");
    setSearchParams(searchParams);
    window.location.reload();
    console.log("Show all products");
  };

  return (
    <Drawer placement="left" open={isOpen} onClose={onClose} className="p-4">
      <div className="flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Bộ lọc
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <hr className="my-8" />
      <div className="">
        <h3 className="text-[#505050] mb-4">Khoảng giá</h3>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Typography
              variant="h6"
              className="font-normal text-[#505050] uppercase text-sm"
            >
              Min
            </Typography>
            <div className="flex items-center gap-2">
              <Typography
                variant="h6"
                className="font-normal text-[#505050] uppercase text-sm"
              >
                {min}
              </Typography>
              <Typography
                variant="h6"
                className="font-normal text-[#505050] uppercase text-sm"
              >
                VND
              </Typography>
            </div>
          </div>
          <div className="w-full">
            <Slider
              value={min ? min / 10000 : 0}
              defaultValue={0}
              onChange={onChangeMin}
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Typography
              variant="h6"
              className="font-normal text-[#505050] uppercase text-sm"
            >
              Max
            </Typography>
            <div className="flex items-center gap-2">
              <Typography
                variant="h6"
                className="font-normal text-[#505050] uppercase text-sm"
              >
                {max}
              </Typography>
              <Typography
                variant="h6"
                className="font-normal text-[#505050] uppercase text-sm"
              >
                VND
              </Typography>
            </div>
          </div>
          <div className="w-full">
            <Slider
              value={max ? max / 10000 : 0}
              defaultValue={0}
              onChange={onChangeMax}
            />
          </div>
        </div>
        <Button className="w-full mt-10" onClick={handleFilter}>
          Áp dụng
        </Button>
        <Button color="pink" className="w-full mt-4" onClick={handleShowAll}>
          Hiển thị tất cả
        </Button>
      </div>
    </Drawer>
  );
}

export default FilterDrawer;
