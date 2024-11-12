/* eslint-disable no-unused-vars */
import React from "react";
import bst from "../assets/bst-2.svg";
import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";
import deserialize from "../util/deserialize";
import combosAPI from "../api/combosApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import ComboProductCard from "../components/combo/ComboProductCard";

SearchProducts.propTypes = {};

function SearchProducts(props) {
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [active, setActive] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [sort, setSort] = React.useState("");
  const [searchName, setSearchName] = React.useState("");
  const [totalProducts, setTotalProducts] = React.useState(0);

  const next = () => {
    if (active === totalPages) return;
    const currentPage = parseInt(searchParams.get("pageNumber") || "0", 10);
    const newPageNumber = currentPage + 1;
    setActive(active + 1);
    searchParams.set("pageNumber", newPageNumber);
    setSearchParams(searchParams);
  };

  const prev = () => {
    const currentPage = parseInt(searchParams.get("pageNumber") || "0", 10);
    if (active === 1) return;
    setActive(active - 1);
    const newPageNumber = currentPage - 1;
    searchParams.set("pageNumber", newPageNumber);
    setSearchParams(searchParams);
  };

  React.useEffect(() => {
    setIsLoading(true);
    const findSortString = searchParams.get("sort") || "id,desc";
    const sortString = deserialize(findSortString) || "id,desc";
    setSort(sortString);
    const fetchData = async () => {
      const pageSize = searchParams.get("pageSize") || 8;
      const pageNumber = searchParams.get("pageNumber") || 0;
      const sort = searchParams.get("sort") || "id,desc";
      const search = searchParams.get("productName") || null;

      try {
        const res = await combosAPI.getProductsBySearch({
          search,
          sort,
          pageNumber,
          pageSize,
        });
        console.log(res.data.content);
        setProducts(res.data.content);
        const number = res.data.pageable.pageNumber + 1;
        const searchString = deserialize(search);
        setSearchName(searchString);
        setActive(number);
        setTotalPages(res.data.totalPages);
        setTotalProducts(res.data.totalElements);
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to get products by search: ", error);
      }
    };

    fetchData();
  }, [searchParams]);

  React.useEffect(() => {
    const fetchCategories = () => {
      const storedData = JSON.parse(sessionStorage.getItem("categoriesNoxinh"));
      setCategories(storedData);
    };

    fetchCategories();
  }, []);
  return (
    <div className="w-screen h-auto">
      <div className="flex justify-center px-24">
        <img
          src={bst}
          alt=""
          className="h-auto xl:w-[200px] lg:w-[200px] sm:w-[180px] xs:w-[150px]"
        />
      </div>
      <div className="flex grid grid-cols-6 justify-between items-center 2xl:px-40 xl:px-32 lg:px-12 sm:px-8 mt-4">
        {categories.map((category) => {
          return (
            <Link
              key={category.id}
              to={`/combo/${category.id}?pageNumber=0&pageSize=8`}
            >
              <div className="flex flex-col justify-center items-center">
                <img
                  src={category.image}
                  alt=""
                  className="h-auto xl:w-[150px] lg:w-[135px] sm:w-[100px] w-[60px]"
                />
                <p className="sm:text-xl text-base font-light text-black">
                  {category.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <hr className="my-12" />
      <div className="xl:px-32 md:px-12 sm:px-8 px-6">
        <div className="flex md:flex-row flex-col md:justify-between md:items-center justify-start gap-y-4">
          <div className="md:w-72 w-full">
            <Select
              label="Sắp xếp theo"
              onChange={(e) => {
                setSort(e);
                searchParams.set("sort", e);
                setSearchParams(searchParams);
              }}
              value={sort}
            >
              <Option value="id,desc">Mới nhất</Option>
              <Option value="id,asc">Cũ nhất</Option>
              <Option value="price,asc">Giá thấp nhất</Option>
              <Option value="price,desc">Giá cao nhất</Option>
            </Select>
          </div>
          <div className="flex items-center gap-8">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-gray-900">{active}</strong> of{" "}
              <strong className="text-gray-900">{totalPages}</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={next}
              disabled={active === totalPages}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
        <h4 className="md:text-3xl text-xl font-light my-8">
          {totalProducts} kết quả tìm kiếm cho{" "}
          <span className="font-semibold text-pink-500">
            &ldquo;{searchName}&rdquo;
          </span>
        </h4>

        {isLoading ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <>
                <Card className="mt-6 w-full animate-pulse">
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="relative grid h-56 place-items-center bg-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-12 w-12 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </CardHeader>
                  <CardBody>
                    <Typography
                      as="div"
                      variant="h1"
                      className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                    >
                      &nbsp;
                    </Typography>
                    <Typography
                      as="div"
                      variant="paragraph"
                      className="mb-2 h-2 w-full rounded-full bg-gray-300"
                    >
                      &nbsp;
                    </Typography>
                    <Typography
                      as="div"
                      variant="paragraph"
                      className="mb-2 h-2 w-full rounded-full bg-gray-300"
                    >
                      &nbsp;
                    </Typography>
                    <Typography
                      as="div"
                      variant="paragraph"
                      className="mb-2 h-2 w-full rounded-full bg-gray-300"
                    >
                      &nbsp;
                    </Typography>
                    <Typography
                      as="div"
                      variant="paragraph"
                      className="mb-2 h-2 w-full rounded-full bg-gray-300"
                    >
                      &nbsp;
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button
                      disabled
                      tabIndex={-1}
                      className="h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
                    >
                      &nbsp;
                    </Button>
                  </CardFooter>
                </Card>
              </>
            ))}
          </div>
        ) : (
          <div className="flex-auto flex justify-start flex-wrap 2xl:gap-x-12 lg:gap-x-3 sm:gap-x-3 lg:gap-y-12 gap-y-8 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 my-12">
            {products.map((product, index) => {
              return <ComboProductCard key={index} product={product} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchProducts;
