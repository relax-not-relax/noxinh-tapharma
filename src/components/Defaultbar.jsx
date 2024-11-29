/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/SUPER.png";
import zalo from "../assets/zalo-icon.png";
//import { NavLink, useNavigate } from "react-router-dom";
import {
  Input,
  IconButton,
  Navbar,
  MobileNav,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Badge,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authenticationAPI from "../api/authenticationApi";
import { useSnackbar } from "notistack";
import { CartContext } from "../provider/CartContext";

Defaultbar.propTypes = {
  scrollContainerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  openDrawerRight: PropTypes.func.isRequired,
  openSignInForm: PropTypes.func.isRequired,
};

function Defaultbar({ scrollContainerRef, openDrawerRight, openSignInForm }) {
  const [search, setSearch] = React.useState("");
  const onChange = ({ target }) => setSearch(target.value);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { amount } = React.useContext(CartContext);
  const location = useLocation();

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        if (scrollTop > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainerRef]);

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 768 && setOpenNav(false)
    );
  }, []);

  const handleSearchProducts = () => {
    navigate(
      `product/search?productName=${search}&pageNumber=0&pageSize=12&sort=id,desc`
    );
  };

  return (
    <Navbar
      className={`sticky top-0 z-10 h-max max-w-full rounded-none px-0 pt-4 pb-0 transition-all duration-300 ${
        isScrolled ? "shadow-md backdrop-blur-md" : ""
      }`}
      shadow={false}
      blurred={false}
    >
      <div className="xl:px-24 lg:px-12 sm:px-4 px-4 w-full h-auto flex sm:justify-between justify-start items-center">
        <div className="h-auto w-fit flex justify-start items-center">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="h-auto xl:w-64 lg:w-44 sm:w-28 w-28"
            />
          </Link>

          <div className="relative flex w-full max-w-[24rem] hidden md:inline-flex">
            <Input
              label="Tìm kiếm sản phẩm"
              value={search}
              onChange={onChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <IconButton
              size="sm"
              disabled={!search}
              className="!absolute right-1 top-1 bg-[#FFA7DC]"
              onClick={handleSearchProducts}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="lg:size-4 sm:size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </IconButton>
          </div>
        </div>
        <div className="h-auto sm:w-fit w-full flex justify-end items-center">
          <div className="sm:px-8 px-4 h-auto w-fit flex justify-end items-center inline-flex">
            <img src={zalo} alt="" className="xl:w-16 lg:w-12 w-10 h-auto" />
            <div className="sm:ms-4 ms-2">
              <p className="font-light text-black xl:text-base sm:text-sm text-[10px]">
                Hỗ trợ khách hàng
              </p>
              <a
                href="https://zalo.me/0376701892"
                target="_blank"
                rel="noopener noreferrer"
                className="xl:text-xl sm:text-sm text-[10px] font-normal text-black"
              >
                Zalo: 037.670.1892
              </a>
            </div>
          </div>
          <div className="h-auto w-fit py-2 px-4 grid justify-items-start bg-[#FFA7DC] hidden lg:inline-block">
            <h2 className="xl:text-xl lg:text-lg text-black">FREESHIP</h2>
            <p className="xl:text-base lg:text-sm font-light text-black">
              TOÀN QUỐC đơn từ 200K
            </p>
          </div>
          <div className="mx-4">
            <div className="hidden lg:inline-block">
              <Badge content={amount}>
                <IconButton
                  variant="text"
                  className="rounded-full"
                  onClick={() => {
                    if (location.pathname === "/order") {
                      return;
                    } else {
                      openDrawerRight();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </IconButton>
              </Badge>
            </div>
          </div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="black"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="black"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav
        open={openNav}
        className="w-full md:px-12 sm:px-4 px-3 bg-black"
      >
        <div className="flex justify-start items-center py-4">
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              label="Tìm kiếm sản phẩm"
              value={search}
              onChange={onChange}
              className="pr-20 text-white"
              containerProps={{
                className: "min-w-0",
              }}
              color="white"
              labelProps={{
                className: "xl:text-lg lg:text-base font-normal text-white",
              }}
            />
            <IconButton
              size="sm"
              disabled={!search}
              className="!absolute right-1 top-1 bg-[#FFA7DC]"
              onClick={handleSearchProducts}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="lg:size-4 sm:size-4 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </IconButton>
          </div>
        </div>

        <div className="flex justify-start items-center py-4">
          <div className="h-auto w-fit py-2 px-4 grid justify-items-start bg-[#FFA7DC]">
            <h2 className="xl:text-xl lg:text-lg text-base text-black">
              FREESHIP
            </h2>
            <p className="xl:text-base lg:text-sm text-sm font-light text-black">
              TOÀN QUỐC đơn từ 200K
            </p>
          </div>
          <div className="mx-4">
            <Badge content={amount}>
              <IconButton
                variant="text"
                className="rounded-full"
                onClick={() => {
                  if (location.pathname === "/order") {
                    return;
                  } else {
                    openDrawerRight();
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="white"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </IconButton>
            </Badge>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default Defaultbar;
