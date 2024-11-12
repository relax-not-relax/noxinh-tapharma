import { useContext } from "react";
import { enqueueSnackbar } from "notistack";
import cartAPI from "../api/cartApi";
import { CartContext } from "../provider/CartContext";

export const useAddToCart = () => {
  const { amount, updateCartAmount } = useContext(CartContext);

  const handleAddToCart = async (item, amountP, setValue) => {
    setValue(true);
    try {
      await cartAPI.add({ id: `${item.id}`, amount: amountP });
      setValue(false);
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
        setValue(false);
        enqueueSnackbar("Vui lòng đăng nhập để thêm giỏ hàng", {
          variant: "error",
          autoHideDuration: 2500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else if (error.status === 500) {
        console.log("Failed to add product: ", error);
        try {
          const resP = await cartAPI.getById({ id: item.id });
          const amountRequest = amountP + resP.data.product.amount;
          console.log(amountRequest);
          const data = {
            productId: item.id,
            amount: amountRequest,
          };
          try {
            await cartAPI.update(data);
            setValue(false);
            enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng!", {
              variant: "success",
              autoHideDuration: 2500,
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          } catch (errorN) {
            console.log("Failed to add product: ", errorN);
            setValue(false);
            enqueueSnackbar("Vui lòng thử lại!", {
              variant: "error",
              autoHideDuration: 2500,
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
        } catch (errorP) {
          console.log("Failed to add product: ", errorP);
          setValue(false);
          enqueueSnackbar("Vui lòng thử lại!", {
            variant: "error",
            autoHideDuration: 2500,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      } else {
        setValue(false);
        enqueueSnackbar("Vui lòng thử lại!", {
          variant: "error",
          autoHideDuration: 2500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    }
  };

  return { handleAddToCart };
};
