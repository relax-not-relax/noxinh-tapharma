import { useContext } from "react";
import { enqueueSnackbar } from "notistack";
import { CartContext } from "../provider/CartContext";

export const useAddToCart = () => {
  const { addProductToCart } = useContext(CartContext);

  const handleAddToCart = (item, amountP, setValue) => {
    setValue(true);
    addProductToCart({ product: item, amount: amountP });
    setValue(false);
    enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng!", {
      variant: "success",
      autoHideDuration: 2500,
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
  };

  return { handleAddToCart };
};
