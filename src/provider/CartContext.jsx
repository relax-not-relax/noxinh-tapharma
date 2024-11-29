import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
import PropTypes from "prop-types";

export const CartProvider = ({ children }) => {
  const [amount, setAmount] = useState(() => {
    const sessionCart = sessionStorage.getItem("cartNoxinh");
    if (sessionCart) {
      const currentCart = JSON.parse(sessionStorage.getItem("cartNoxinh"));
      const cartAmount = parseInt(currentCart.length) || 0;
      return cartAmount || 0;
    }
    return 0;
  });

  const [cart, setCart] = useState(() => {
    const sessionCart = sessionStorage.getItem("cartNoxinh");
    if (sessionCart) {
      return JSON.parse(sessionStorage.getItem("cartNoxinh"));
    }
    return [];
  });

  useEffect(() => {
    const handleCartChange = () => {
      const updatedCart =
        JSON.parse(sessionStorage.getItem("cartNoxinh")) || [];
      setCart(updatedCart);
      const updatedAmount = updatedCart.length || 0;
      setAmount(updatedAmount);
    };

    window.addEventListener("storage", handleCartChange);

    return () => {
      window.removeEventListener("storage", handleCartChange);
    };
  }, []);

  const addProductToCart = ({ product, amount }) => {
    // Get the current cart from sessionStorage
    const currentCart = JSON.parse(sessionStorage.getItem("cartNoxinh")) || [];

    // Check if the product is already in the cart
    const existingProductIndex = currentCart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingProductIndex >= 0) {
      // If the product exists, update the amount
      currentCart[existingProductIndex].amount += amount;
    } else {
      // If the product doesn't exist, add a new entry
      currentCart.push({ product, amount });
    }

    // Save the updated cart back to sessionStorage
    sessionStorage.setItem("cartNoxinh", JSON.stringify(currentCart));

    const updatedAmount = currentCart.length;
    setAmount(updatedAmount);

    // Update the cart state
    setCart(currentCart);

    // Dispatch storage event to synchronize across windows
    window.dispatchEvent(new Event("storage"));
  };

  const updateProductAmount = (productId, newAmount) => {
    // Get the current cart from sessionStorage
    const currentCart = JSON.parse(sessionStorage.getItem("cartNoxinh")) || [];

    // Find the product index
    const productIndex = currentCart.findIndex(
      (item) => item.product.id === productId
    );

    // If the product exists, update the amount
    if (productIndex >= 0) {
      currentCart[productIndex].amount = newAmount; // Update the amount to the new value
    }

    // Save the updated cart back to sessionStorage
    sessionStorage.setItem("cartNoxinh", JSON.stringify(currentCart));

    // Update the cart state
    setCart(currentCart);

    // Dispatch storage event to synchronize across windows
    window.dispatchEvent(new Event("storage"));
  };

  const removeProductFromCart = (productId) => {
    const currentCart = JSON.parse(sessionStorage.getItem("cartNoxinh")) || [];
    const productIndex = currentCart.findIndex(
      (item) => item.product.id === productId
    );
    if (productIndex >= 0) {
      currentCart.splice(productIndex, 1);
    }
    sessionStorage.setItem("cartNoxinh", JSON.stringify(currentCart));

    // Update the cart state
    setCart(currentCart);

    // Dispatch storage event to synchronize across windows
    window.dispatchEvent(new Event("storage"));
  };

  const deleteAllCart = () => {
    const currentCart = JSON.parse(sessionStorage.getItem("cartNoxinh")) || [];
    currentCart.length = 0; // Clear the cart array
    sessionStorage.setItem("cartNoxinh", JSON.stringify(currentCart));
    setCart([]);

    // Dispatch storage event to synchronize across windows
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <CartContext.Provider
      value={{
        amount,
        cart,
        setCart,
        addProductToCart,
        updateProductAmount,
        removeProductFromCart,
        deleteAllCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
