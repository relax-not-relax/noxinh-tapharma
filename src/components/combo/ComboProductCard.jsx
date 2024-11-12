/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import formatPrice from "../../util/formatPrice";
import { Button, Card, Typography } from "@material-tailwind/react";
import ProductDetails from "./ProductDetails";
import { useSnackbar } from "notistack";
import { useAddToCart } from "../../util/useAddToCart";

ComboProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

function ComboProductCard({ product }) {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);
  const { handleAddToCart } = useAddToCart();

  const openProductDialog = () => setIsProductDialogOpen(true);
  const closeProductDialog = () => setIsProductDialogOpen(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="flex-col justify-start items-center w-full">
      <Card
        className="cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={openProductDialog}
      >
        {!isImageLoaded && (
          <div className="w-full h-64 bg-gray-300 animate-pulse rounded-md mb-4"></div>
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
          handleAddToCart(product, 1, setIsAdding);
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

export default ComboProductCard;
