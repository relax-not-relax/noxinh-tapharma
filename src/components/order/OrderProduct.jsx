/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import orderAPI from "../../api/orderApi";
import formatPrice from "../../util/formatPrice";
import { Spinner, Typography } from "@material-tailwind/react";

OrderProduct.propTypes = {
  id: PropTypes.number.isRequired,
};

function OrderProduct({ id }) {
  const [orderData, setOrderData] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Đặt `loading` thành `true` mặc định

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        const res = await orderAPI.getById({ id: id });
        console.log(res.data);
        setOrderData(res.data);
        setProducts(res.data.products);
      } catch (error) {
        console.log("Failed to get order data: ", error);
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!orderData) {
    return (
      <Typography variant="h6" color="red" className="mt-3">
        Không thể tải dữ liệu đơn hàng.
      </Typography>
    );
  }

  return (
    <div className="w-full h-auto">
      {products.map((product) => (
        <div className="w-full mb-2" key={product.id}>
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <img
                src={product.image}
                className="w-[100px] h-auto rounded-lg object-cover object-center"
              />
              <div className="ms-3">
                <h4 className="font-light">{product.name}</h4>
                <p>x{product.amount}</p>
              </div>
            </div>
            <p className="text-pink-400">{formatPrice(product.price)}</p>
          </div>
        </div>
      ))}
      <hr className="my-3" />
      <div className="flex md:flex-row flex-col justify-between lg:items-center md:items-end items-start lg:mt-8 mt-2">
        <div className="flex items-center">
          <p className="font-light text-gray-700 sm:text-base text-[12px]">
            {orderData.status === "Hoàn thành"
              ? "Đơn hàng đã được vận chuyển đến:"
              : "Đơn hàng đang được vận chuyển đến:"}
          </p>
          <p className="ms-2 sm:text-base text-[12px]">
            {orderData.specificAddress}, {orderData.ward?.name},{" "}
            {orderData.district?.name}, {orderData.province?.name}
          </p>
        </div>
        <div className="flex items-end md:mt-0 mt-3">
          <p className="font-light text-gray-700 me-2">Thành tiền: </p>
          <p className="text-pink-400 lg:text-2xl text-xl font-semibold">
            {formatPrice(orderData.totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;
