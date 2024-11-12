/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

PrivateRouteHistory.propTypes = {
  children: PropTypes.node.isRequired,
};

function PrivateRouteHistory({ children }) {
  const accessToken = sessionStorage.getItem("accessTokenNoxinh");

  // Kiểm tra state để đảm bảo người dùng truy cập từ CartDrawer
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRouteHistory;
