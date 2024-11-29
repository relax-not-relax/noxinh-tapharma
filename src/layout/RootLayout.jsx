/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import DefaultBar from "../components/Defaultbar";
import CartDrawer from "../components/home/CartDrawer";
import SignInForm from "../components/authentication/SignInForm";
import SignUpForm from "../components/authentication/SignUpForm";
import cartAPI from "../api/cartApi";
import Footer from "../components/Footer";
import { CartContext } from "../provider/CartContext";

function RootLayout() {
  const scrollableContainerRef = React.useRef(null);
  const [openRight, setOpenRight] = React.useState(false);

  const openDrawerRight = () => {
    setOpenRight(true);
  };
  const closeDrawerRight = () => setOpenRight(false);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);

  const openSignInForm = () => {
    setIsDialogOpen(true);
    setIsSignUpOpen(false);
  };
  const openSignUpForm = () => {
    setIsDialogOpen(false);
    setIsSignUpOpen(true);
  };

  const closeSignInForm = () => setIsDialogOpen(false);
  const closeSignUpForm = () => setIsSignUpOpen(false);

  return (
    <div
      ref={scrollableContainerRef}
      className="max-h-screen w-full overflow-scroll"
    >
      <DefaultBar
        scrollContainerRef={scrollableContainerRef}
        openDrawerRight={openDrawerRight}
        openSignInForm={openSignInForm}
      />
      <Outlet />
      <Footer />
      <CartDrawer openRight={openRight} closeDrawerRight={closeDrawerRight} />
      <SignInForm
        isOpen={isDialogOpen}
        onClose={closeSignInForm}
        onSwitchToSignUp={openSignUpForm}
      />
      <SignUpForm isOpen={isSignUpOpen} onClose={closeSignUpForm} />
    </div>
  );
}

export default RootLayout;
