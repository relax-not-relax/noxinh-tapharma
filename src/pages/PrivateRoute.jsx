/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { CartContext } from "../provider/CartContext";

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function PrivateRoute({ children }) {
  const location = useLocation();
  const { amount } = React.useContext(CartContext);

  // Kiểm tra state để đảm bảo người dùng truy cập từ CartDrawer
  if (!location.state?.fromCartDrawer || amount === 0) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
