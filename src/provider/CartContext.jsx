import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
import PropTypes from "prop-types";

export const CartProvider = ({ children }) => {
  const [amount, setAmount] = useState(() => {
    return parseInt(sessionStorage.getItem("cartNoxinhAmount")) || 0;
  });

  useEffect(() => {
    const handleCartChange = () => {
      const updatedAmount =
        parseInt(sessionStorage.getItem("cartNoxinhAmount")) || 0;
      setAmount(updatedAmount);
    };

    window.addEventListener("storage", handleCartChange);

    return () => {
      window.removeEventListener("storage", handleCartChange);
    };
  }, []);

  const updateCartAmount = (newAmount) => {
    sessionStorage.setItem("cartNoxinhAmount", newAmount);
    setAmount(newAmount);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <CartContext.Provider value={{ amount, updateCartAmount }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
