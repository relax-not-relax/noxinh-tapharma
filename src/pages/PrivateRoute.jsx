/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function PrivateRoute({ children }) {
  const accessToken = sessionStorage.getItem("accessTokenNoxinh");
  const location = useLocation();
  const cartAmount = parseInt(sessionStorage.getItem("cartNoxinhAmount"), 10);

  // Kiểm tra state để đảm bảo người dùng truy cập từ CartDrawer
  if (!accessToken || !location.state?.fromCartDrawer || cartAmount === 0) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
