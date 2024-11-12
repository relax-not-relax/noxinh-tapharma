/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Drawer,
  IconButton,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import cartAPI from "../../api/cartApi";
import CartProduct from "./CartProduct";
import formatPrice from "../../util/formatPrice";
import { useNavigate } from "react-router-dom";

CartDrawer.propTypes = {
  openRight: PropTypes.bool.isRequired,
  closeDrawerRight: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setCart: PropTypes.func.isRequired,
};

function CartDrawer({ openRight, closeDrawerRight, cart, loading, setCart }) {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const total = cart.reduce((sum, product) => {
      return sum + product.price * product.amount;
    }, 0);

    setTotalPrice(total);
  }, [cart]);

  const handleDeleteItem = async (id) => {
    setIsDeleting(true);

    try {
      await cartAPI.delete({ id: id });
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      setIsDeleting(false);
    } catch (error) {
      console.log("Faild to delete item:", error);
    }
  };

  return (
    <div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-6 max-h-screen h-screen"
        size={450}
      >
        <div className="flex flex-col h-full w-full">
          <div className="mb-6 flex items-center justify-between flex-none">
            <Typography variant="h4" color="blue-gray">
              Giỏ hàng
            </Typography>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={closeDrawerRight}
            >
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
          <div className="flex justify-between items-center flex-none">
            <Typography
              variant="h6"
              className="font-normal text-[#505050] uppercase text-sm"
            >
              Sản phẩm
            </Typography>
            <Typography
              variant="h6"
              className="font-normal text-[#505050] uppercase text-sm"
            >
              Giá
            </Typography>
          </div>
          <hr className="my-3 flex-none" />

          {loading ? (
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : cart.length === 0 ? (
            <div className="w-full flex justify-center items-center">
              <Typography className="text-gray-500">
                Giỏ hàng đang trống
              </Typography>
            </div>
          ) : (
            <div className="overflow-y-auto grow hide-scrollbar">
              {cart.map((product, index) => (
                <CartProduct
                  key={index}
                  item={product}
                  onDelete={() => {
                    handleDeleteItem(product.id);
                  }}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          )}

          <div className="flex-none">
            <hr className="my-6" />
            <div className="flex justify-between items-center">
              <Typography
                variant="h6"
                className="font-semibold text-[#505050] uppercase text-lg"
              >
                Tổng ước tính
              </Typography>
              <Typography
                variant="h6"
                className="font-normal text-[#505050] uppercase text-base"
              >
                {formatPrice(totalPrice)}
              </Typography>
            </div>
            <Typography className="mt-4 mb-3 text-xs text-[#505050] italic">
              Phí vận chuyển sẽ được tính tại trang thanh toán
            </Typography>
            <Button
              className="w-full h-16 bg-[#FFA7DC]"
              onClick={() => {
                closeDrawerRight();
                navigate("/order", { state: { cart, fromCartDrawer: true } });
              }}
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default CartDrawer;
