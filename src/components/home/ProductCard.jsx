// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import formatPrice from "../../util/formatPrice";
import { Button, Card, Typography } from "@material-tailwind/react";
import cartAPI from "../../api/cartApi";
import { useSnackbar } from "notistack";
import ProductDetails from "../combo/ProductDetails";
import { CartContext } from "../../provider/CartContext";

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

function ProductCard({ product }) {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { amount, updateCartAmount } = React.useContext(CartContext);

  const openProductDialog = () => setIsProductDialogOpen(true);
  const closeProductDialog = () => setIsProductDialogOpen(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleAddToCart = async (amountP) => {
    setIsAdding(true);
    try {
      await cartAPI.add({ id: `${product.id}`, amount: amountP });
      setIsAdding(false);
      enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng!", {
        variant: "success",
        autoHideDuration: 2500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      const newAmount = amount + 1;
      updateCartAmount(newAmount);
    } catch (error) {
      console.log("Failed to add product: ", error);

      if (error.status === 403) {
        setIsAdding(false);
        enqueueSnackbar("Vui lòng đăng nhập để thêm giỏ hàng", {
          variant: "error",
          autoHideDuration: 2500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else if (error.status === 500) {
        console.log("Failed to add product: ", error);
        try {
          const resP = await cartAPI.getById({ id: `${product.id}` });
          const amountRequest = amountP + resP.data.product.amount;
          console.log(amountRequest);
          const data = {
            productId: `${product.id}`,
            amount: amountRequest,
          };
          try {
            await cartAPI.update(data);
            setIsAdding(false);
            enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng!", {
              variant: "success",
              autoHideDuration: 2500,
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          } catch (errorN) {
            console.log("Failed to add product: ", errorN);
            setIsAdding(false);
            enqueueSnackbar("Vui lòng thử lại!", {
              variant: "error",
              autoHideDuration: 2500,
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
        } catch (errorP) {
          console.log("Failed to add product: ", errorP);
          setIsAdding(false);
          enqueueSnackbar("Vui lòng thử lại!", {
            variant: "error",
            autoHideDuration: 2500,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      } else {
        setIsAdding(false);
        enqueueSnackbar("Vui lòng thử lại!", {
          variant: "error",
          autoHideDuration: 2500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    }
  };
  return (
    <div className="flex-col justify-start items-center 2xl:w-72 xl:w-56 lg:w-40">
      <Card
        className="cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={openProductDialog}
      >
        {!isImageLoaded && (
          <div className="w-full xl:h-48 lg:h-40 sm:h-64 bg-gray-300 animate-pulse rounded-md mb-4"></div>
        )}
        <img
          src={product.image}
          alt=""
          className={`w-full ${isImageLoaded ? "block" : "hidden"}`}
          onLoad={handleImageLoad}
        />
      </Card>
      <h1 className="2xl:mt-4 xl:mt-3 mt-2 2xl:text-2xl xl:text-xl text-lg">
        {product.name}
      </h1>
      <p className="mt-1 2xl:text-xl text-base text-[#505050]">
        {formatPrice(product.price)}
      </p>
      <p className="2xl:my-4 xl:my-3 my-2 2xl:text-base text-xs font-light text-[#8F8F8F]">
        {product.description}
      </p>
      <Button
        className="w-full bg-[#FFA7DC]"
        loading={isAdding}
        onClick={() => {
          handleAddToCart(1);
        }}
      >
        <Typography className="xl:text-sm text-[10px] font-bold">
          Thêm vào giỏ hàng
        </Typography>
      </Button>
      <ProductDetails
        product={product}
        isOpen={isProductDialogOpen}
        onClose={closeProductDialog}
      />
    </div>
  );
}

export default ProductCard;
