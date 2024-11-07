/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import formatPrice from "../../util/formatPrice";

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

function ProductDetails({ product, isOpen, onClose, onAddToCart }) {
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Dialog
        open={isOpen}
        dismiss={{ outsidePress: false }}
        handler={onClose}
        className="bg-transparent shadow-none"
      >
        <Card className="w-full flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-1/2 shrink-0 rounded-r-none"
          >
            <img
              src={product.image}
              alt="card-image"
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="w-full flex justify-between items-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {product.name}
              </Typography>
              <IconButton
                variant="text"
                className="rounded-full"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>

            <Typography variant="h5" color="gray" className="mb-4 uppercase">
              {formatPrice(product.price)}
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              {product.description}
            </Typography>
            <div className="flex justify-start items-center mb-10">
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
              <Button
                onClick={() => {
                  onAddToCart(value);
                }}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
            <div className="flex gap-2 mb-2">
              <Typography className="text-sm">Tình trạng sản phẩm:</Typography>
              {product.status ? (
                <Typography className="text-sm text-pink-600 font-semibold">
                  Còn hàng
                </Typography>
              ) : (
                <Typography className="text-sm text-red-600 font-semibold">
                  Hết hàng
                </Typography>
              )}
            </div>
            <div className="flex gap-2 mb-2">
              <Typography className="text-sm">Loại sản phẩm:</Typography>
              <Typography className="text-sm font-semibold">
                {product.comboName}
              </Typography>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </div>
  );
}

export default ProductDetails;
