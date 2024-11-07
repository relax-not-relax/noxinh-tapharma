/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

ComboLayout.propTypes = {};

function ComboLayout(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ComboLayout;
