/* eslint-disable no-unused-vars */
import React from "react";
import { useSearchParams } from "react-router-dom";
import orderAPI from "../api/orderApi";
import {
  Chip,
  IconButton,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import OrderProduct from "../components/order/OrderProduct";

function OrderHistory() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderHistory, setOrderHistory] = React.useState([]);
  const [active, setActive] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

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
    const fetchOrderHistory = async () => {
      setIsLoading(true);
      const pageSize = searchParams.get("pageSize") || 8;
      const pageNumber = searchParams.get("pageNumber") || 0;
      try {
        const res = await orderAPI.get({ pageNumber, pageSize });
        setOrderHistory(res.data.content);
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.log("Faild to fetch order history: ", error);
      }
    };

    fetchOrderHistory();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (orderHistory.length === 0 && isLoading === false) {
    return (
      <div className="w-full h-auto">
        <hr className="mt-3" />
        <div className="w-full flex md:flex-row flex-col md:justify-between justify-start md:items-center items-start xl:px-32 md:px-12 sm:px-8 px-6 my-8">
          <h2 className="font-normal lg:text-4xl text-2xl">Lịch sử đơn hàng</h2>
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
        <hr />
        <Typography className="xl:px-32 md:px-12 sm:px-8 px-6 mt-3 text-gray-700 font-normal italic lg:text-4xl text-2xl">
          Bạn chưa có đơn hàng nào, hãy bắt đầu mua sắm tại Noxinh.com!
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      <hr className="mt-3" />
      <div className="w-full flex md:flex-row flex-col md:justify-between justify-start md:items-center items-start xl:px-32 md:px-12 sm:px-8 px-6 my-8">
        <h2 className="font-normal lg:text-4xl text-2xl">Lịch sử đơn hàng</h2>
        <div className="flex items-center gap-8 md:mt-0 mt-4">
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
      <hr />
      <div className="w-full xl:px-32 md:px-12 sm:px-8 px-3">
        {orderHistory.map((order) => {
          return (
            <>
              <div className="w-full bg-gray-50 p-4 mt-4" key={order.id}>
                <div className="flex justify-between items-center">
                  <div className="w-fit h-auto">
                    <div className="flex mb-1">
                      <h4 className="me-2 font-light text-gray-700 sm:text-base text-[14px]">
                        Mã đơn hàng:{" "}
                      </h4>
                      <h4 className="sm:text-base text-[14px]">{order.id}</h4>
                    </div>
                    <div className="flex">
                      <h4 className="me-2 font-light text-gray-700 sm:text-base text-[14px]">
                        Người mua hàng:{" "}
                      </h4>
                      <h4 className="sm:text-base text-[14px]">
                        {order.recipientName}
                      </h4>
                    </div>
                  </div>
                  {order.status === "Hoàn thành" ? (
                    <Chip
                      color="green"
                      value={order.status}
                      className="font-normal sm:text-xs text-[10px]"
                    />
                  ) : (
                    <Chip
                      color="blue"
                      value={order.status}
                      className="font-normal sm:text-xs text-[10px]"
                    />
                  )}
                </div>
                <hr className="my-3" />
                <OrderProduct id={order.id} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default OrderHistory;
