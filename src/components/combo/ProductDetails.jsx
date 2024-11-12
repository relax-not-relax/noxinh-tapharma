/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import formatPrice from "../../util/formatPrice";
import { useAddToCart } from "../../util/useAddToCart";

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function ProductDetails({ product, isOpen, onClose }) {
  const [value, setValue] = React.useState(1);
  const [isAdding, setIsAdding] = React.useState(false);
  const { handleAddToCart } = useAddToCart();

  return (
    <div>
      <Dialog
        open={isOpen}
        dismiss={{ outsidePress: false }}
        handler={onClose}
        className="bg-transparent shadow-none"
        size="lg"
      >
        <DialogBody className="lg:overflow-hidden overflow-scroll">
          <Card className="w-full md:flex-row flex-col">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 xl:w-1/2 lg:w-[55%] md:w-1/2 w-full shrink-0 xl:rounded-r-none"
            >
              <img
                src={product.image}
                alt="card-image"
                className="w-full h-full object-cover xl:object-center lg:object-top"
              />
            </CardHeader>
            <CardBody>
              <div className="w-full flex justify-between items-center xl:mb-2 md:mb-0">
                <Typography
                  color="blue-gray"
                  className="md:text-2xl text-xl font-extrabold"
                >
                  {product.name}
                </Typography>

                <IconButton
                  variant="text"
                  disabled={isAdding}
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

              <Typography
                variant="h5"
                color="gray"
                className="lg:mb-4 md:mb-3 mb-2 uppercase"
              >
                {formatPrice(product.price)}
              </Typography>
              <Typography
                color="gray"
                className="lg:mb-8 md:mb-6 mb-4 font-normal lg:text-base md:text-sm text-sm"
              >
                {product.description}
              </Typography>
              <div className="flex justify-start items-center md:mb-10 mb-4">
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
                      onClick={() =>
                        setValue((cur) => (cur === 1 ? 1 : cur - 1))
                      }
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
                  loading={isAdding}
                  onClick={() => {
                    handleAddToCart(product, value, setIsAdding);
                  }}
                  className="font-bold xl:text-xs lg:text-[10px] md:text-[8px] sm:text-xs text-[8px]"
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
              <div className="flex gap-2 mb-2">
                <Typography className="lg:text-sm md:text-xs text-sm">
                  Tình trạng sản phẩm:
                </Typography>
                {product.status ? (
                  <Typography className="lg:text-sm md:text-xs text-sm text-pink-600 font-semibold">
                    Còn hàng
                  </Typography>
                ) : (
                  <Typography className="lg:text-sm md:text-xs text-sm text-red-600 font-semibold">
                    Hết hàng
                  </Typography>
                )}
              </div>
              <div className="flex gap-2 mb-2">
                <Typography className="lg:text-sm md:text-xs text-sm">
                  Loại sản phẩm:
                </Typography>
                <Typography className="lg:text-sm md:text-xs text-sm font-semibold">
                  {product.comboName}
                </Typography>
              </div>
            </CardBody>
          </Card>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default ProductDetails;
