import { useContext } from "react";
import { CartContext } from "../provider/CartContext";

export const useChangeAmount = () => {
  const { updateProductAmount, removeProductFromCart, deleteAllCart } =
    useContext(CartContext);

  const handleChangeAmount = (id, amount, setValue) => {
    setValue(true);
    updateProductAmount(id, amount);
    setValue(false);
  };

  const handleRemoveProduct = (productId) => {
    removeProductFromCart(productId);
  };

  const handleRemoveCart = () => {
    deleteAllCart();
  };

  return { handleChangeAmount, handleRemoveProduct, handleRemoveCart };
};
