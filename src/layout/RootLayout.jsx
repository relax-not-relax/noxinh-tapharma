/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import DefaultBar from "../components/Defaultbar";
import CartDrawer from "../components/home/CartDrawer";
import SignInForm from "../components/authentication/SignInForm";
import SignUpForm from "../components/authentication/SignUpForm";
import cartAPI from "../api/cartApi";

function RootLayout() {
  const scrollableContainerRef = React.useRef(null);
  const [openRight, setOpenRight] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  const loginStatus = sessionStorage.getItem("isLogin");
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchCart = async () => {
    try {
      const res = await cartAPI.getAll();
      setCart(res.data.page.content);
      console.log(res.data.page.content);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const openDrawerRight = () => {
    setOpenRight(true);
    setIsLoading(true);
    if (loginStatus === "true") {
      fetchCart();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
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
      <CartDrawer
        openRight={openRight}
        closeDrawerRight={closeDrawerRight}
        cart={cart}
        setCart={setCart}
        loading={isLoading}
      />
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
