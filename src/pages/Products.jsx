/* eslint-disable no-unused-vars */
import React from "react";
import {
  Link,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import bst from "../assets/bst-2.svg";
import combosAPI from "../api/combosApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import ComboProductCard from "../components/combo/ComboProductCard";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import FilterDrawer from "../components/combo/FilterDrawer";
import deserialize from "../util/deserialize";

function Products() {
  const [comboData, setComboData] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [active, setActive] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [openLeft, setOpenLeft] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(0);

  const onChange = ({ target }) => setSearch(target.value);
  const onChangeMin = ({ target }) => setMin(Math.round(target.value * 10000));
  const onChangeMax = ({ target }) => setMax(Math.round(target.value * 10000));

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

  const onSearch = () => {
    console.log("Search: ", search);
    searchParams.set("search", search);
    setSearchParams(searchParams);
  };

  const openDrawerLeft = () => {
    setOpenLeft(true);
  };
  const closeDrawerLeft = () => setOpenLeft(false);

  React.useEffect(() => {
    setIsLoading(true);
    const findSearchString = searchParams.get("search") || "";
    const searchString = deserialize(findSearchString) || "";
    setSearch(searchString);
    const findSortString = searchParams.get("sort") || "id,desc";
    const sortString = deserialize(findSortString) || "id,desc";
    setSort(sortString);
    const findMinString = searchParams.get("minPrice") || 0;
    const findMaxString = searchParams.get("maxPrice") || 0;
    const findMin = deserialize(findMinString) || 0;
    const findMax = deserialize(findMaxString) || 0;
    setMin(findMin);
    setMax(findMax);
    const fetchComboData = async () => {
      const pageSize = searchParams.get("pageSize") || 8;
      const pageNumber = searchParams.get("pageNumber") || 0;
      const sort = searchParams.get("sort") || "id,desc";
      const search = searchParams.get("search") || null;
      const minPrice = searchParams.get("minPrice") || null;
      const maxPrice = searchParams.get("maxPrice") || null;

      try {
        const res = await combosAPI.getComboById({
          id,
          pageNumber,
          pageSize,
          sort,
          minPrice,
          maxPrice,
          search,
        });
        setComboData(res.data);
        setProducts(res.data.productPages.content);
        const number = res.data.productPages.pageable.pageNumber + 1;
        setActive(number);
        setTotalPages(res.data.productPages.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch combo data:", error);
      }
    };

    fetchComboData();
  }, [id, searchParams]);

  React.useEffect(() => {
    const fetchCategories = () => {
      const storedData = JSON.parse(sessionStorage.getItem("categories"));
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
                {category.id === comboData.id ? (
                  <p className="sm:text-xl text-base font-bold text-[#FF4EB8]">
                    {category.name}
                  </p>
                ) : (
                  <p className="sm:text-xl text-base font-light text-black">
                    {category.name}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <hr className="my-12" />
      <div className="xl:px-32 px-12">
        <div className="w-full flex justify-between items-center">
          <React.Fragment>
            <div className="flex justify-start items-center gap-2">
              <Button
                onClick={openDrawerLeft}
                variant="outlined"
                className="flex items-center gap-3"
              >
                Bộ lọc
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Button>
              <div className="relative flex w-[20rem] hidden md:inline-flex">
                <Input
                  label="Tìm kiếm sản phẩm"
                  value={search ?? ""}
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
                  onClick={onSearch}
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
              <div className="w-72">
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
            </div>
          </React.Fragment>
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
          <FilterDrawer
            onClose={closeDrawerLeft}
            isOpen={openLeft}
            min={min}
            max={max}
            onChangeMin={onChangeMin}
            onChangeMax={onChangeMax}
          />
        </div>

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
          <div className="flex-auto flex justify-start flex-wrap 2xl:gap-x-12 xl:gap-x-3 lg:gap-x-0 sm:gap-x-3 xl:gap-y-12 xl:gap-y-10 lg:gap-y-0 gap-y-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 my-12">
            {products.map((product, index) => {
              return <ComboProductCard key={index} product={product} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

{
  /* <Link key={combo.categoryId} to={combo.id.toString()}>
            <h4>{combo.name}</h4>
            <p>{combo.description}</p>
          </Link> */
}
