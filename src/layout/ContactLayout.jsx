// eslint-disable-next-line no-unused-vars
import React from "react";
import Contact from "../pages/Contact";
import { Outlet } from "react-router-dom";

function ContactLayout() {
  return (
    <div>
      <Contact />
      <Outlet />
    </div>
  );
}

export default ContactLayout;
