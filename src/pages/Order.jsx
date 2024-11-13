/* eslint-disable no-unused-vars */
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import addressAPI from "../api/addressApi";
import formatPrice from "../util/formatPrice";
import { useSnackbar } from "notistack";
import orderAPI from "../api/orderApi";
import { CartContext } from "../provider/CartContext";
import cartAPI from "../api/cartApi";

function Order() {
  const location = useLocation();
  const [cart, setCart] = React.useState(location.state?.cart || []);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [province, setProvince] = React.useState(0);
  const [district, setDistrict] = React.useState(0);
  const [ward, setWard] = React.useState(0);
  const { amount, updateCartAmount } = React.useContext(CartContext);
  const navigate = useNavigate();

  const [isSubmit, setIsSubmit] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await addressAPI.getProvince();
        setProvinces(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };

    fetchProvinces();
    const total = cart.reduce(
      (sum, product) => sum + product.price * product.amount,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  React.useEffect(() => {
    if (location.state?.cart) {
      setCart(location.state.cart);
    }
  }, [location.state?.cart]);

  React.useEffect(() => {
    const fetchDistricts = async () => {
      if (province !== 0) {
        try {
          const res = await addressAPI.getDistrict(province);
          setDistricts(res.data);
        } catch (error) {
          console.error("Failed to fetch district:", error);
        }
      } else {
        setDistricts([]);
      }
    };

    fetchDistricts();
  }, [province]);

  React.useEffect(() => {
    const fetchWards = async () => {
      if (district !== 0) {
        try {
          const res = await addressAPI.getWard(district);
          setWards(res.data);
        } catch (error) {
          console.error("Failed to fetch ward:", error);
        }
      } else {
        setWards([]);
      }
    };

    fetchWards();
  }, [district]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const cartRequest = cart.map((item) => ({
      productId: item.id,
      amount: item.amount,
    }));
    const request = {
      provinceId: data.province,
      districtId: data.district,
      wardId: data.ward,
      specificAddress: data.addressDetails,
      recipientName: data.fullname,
      recipientPhone: data.phone,
      products: cartRequest,
    };

    try {
      setIsSubmit(true);
      const res = await orderAPI.add(request);
      console.log("Order added successfully!");
      reset();
      const resCart = await cartAPI.getAll();
      updateCartAmount(resCart.data.page.totalElements);
      setIsSubmit(false);
      enqueueSnackbar("Đặt hàng thành công!", {
        variant: "success",
        autoHideDuration: 3500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      navigate("/historyOrder?pageNumber=0&pageSize=8", { replace: true });
    } catch (error) {
      console.log("Error adding order: ", error);
      setIsSubmit(false);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const phoneRegex = /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g;

  return (
    <div>
      <hr className="mt-3" />
      <h2 className="font-normal text-4xl xl:px-32 md:px-12 sm:px-8 px-6 my-8">
        Thanh toán
      </h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex lg:flex-row flex-col h-auto w-full">
          <div className="grow xl:px-32 md:px-12 sm:px-8 px-6 lg:border-r-2 border-r-none border-zinc-500 pb-16">
            <h3 className="text-xl mt-8">Thông tin liên hệ</h3>
            <Typography
              className="my-3 font-normal text-sm"
              variant="paragraph"
              color="gray"
            >
              Vui lòng nhập đầy đủ thông tin.
            </Typography>
            <div className="w-full mt-8">
              <Input
                label="Họ và tên"
                size="md"
                {...register("fullname", {
                  required: "Vui lòng nhập tên",
                })}
                error={!!errors.fullname}
              />
              {errors.fullname && (
                <Typography color="red" className="text-xs mt-1 italic">
                  {errors.fullname.message}
                </Typography>
              )}
            </div>
            <div className="mt-4 w-full">
              <Input
                label="Số điện thoại"
                type="phone"
                size="md"
                {...register("phone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: phoneRegex,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
                error={!!errors.phone}
              />
              {errors.phone && (
                <Typography color="red" className="text-xs mt-1 italic">
                  {errors.phone.message}
                </Typography>
              )}
            </div>
            <h3 className="text-xl mt-8">Địa chỉ giao hàng</h3>
            <Typography
              className="my-3 font-normal text-sm"
              variant="paragraph"
              color="gray"
            >
              Vui lòng nhập đầy đủ thông tin.
            </Typography>
            <div className="mt-8">
              <Select
                label="Chọn thành phố"
                {...register("province", {
                  required: "Vui lòng chọn thành phố",
                })}
                onChange={(e) => {
                  setProvince(e);
                  setValue("province", e, {
                    shouldValidate: true,
                  });
                }}
                error={!!errors.province}
              >
                {provinces.map((province) => (
                  <Option key={province.id} value={province.id}>
                    {province.name}
                  </Option>
                ))}
              </Select>
              {errors.province && (
                <Typography color="red" className="text-xs mt-1 italic">
                  {errors.province.message}
                </Typography>
              )}
            </div>

            <div className="mt-4">
              <Select
                label="Chọn quận"
                {...register("district", { required: "Vui lòng chọn quận" })}
                onChange={(e) => {
                  setDistrict(e);
                  setValue("district", e, {
                    shouldValidate: true,
                  });
                }}
                error={!!errors.district}
              >
                {districts.map((district) => (
                  <Option key={district.id} value={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
              {errors.district && (
                <Typography color="red" className="text-xs mt-1 italic">
                  {errors.district.message}
                </Typography>
              )}
            </div>

            <div className="mt-4">
              <Select
                label="Chọn phường"
                {...register("ward", { required: "Vui lòng chọn phường" })}
                onChange={(e) => {
                  setWard(e);
                  setValue("ward", e, {
                    shouldValidate: true,
                  });
                }}
                error={!!errors.ward}
              >
                {wards.map((ward) => (
                  <Option key={ward.id} value={ward.id}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
              {errors.ward && (
                <Typography color="red" className="text-xs mt-1 italic">
                  {errors.ward.message}
                </Typography>
              )}
            </div>

            <div className="mt-4">
              <Input
                label="Số nhà"
                size="md"
                {...register("addressDetails", {
                  required: "Vui lòng nhập số nhà",
                })}
                error={!!errors.addressDetails}
              />
              {errors.addressDetails && (
                <Typography color="red" className="text-xs mt-1 italic">
                  {errors.addressDetails.message}
                </Typography>
              )}
            </div>
          </div>
          <div className="flex-none xl:w-[40%] lg:w-[50%] w-full h-full">
            <div className="w-full h-full lg:pt-8 lg:ps-12 lg:pe-24 lg:px-0 lg:pb-0 pb-12 md:px-12 sm:px-8 px-6">
              {cart.map((item, index) => {
                return (
                  <div key={index} className="mb-3">
                    <div className="w-full h-auto flex justify-between">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          className="h-auto sm:w-[150px] w-[100px] rounded-lg object-cover object-center"
                        />
                        <div>
                          <p className="text-xl xl:mb-3 mb-1">{item.name}</p>
                          <p className="text-normal font-light">
                            Số lượng: {item.amount}
                          </p>
                        </div>
                      </div>
                      <Typography className="font-normal text-normal">
                        {formatPrice(item.price)}
                      </Typography>
                    </div>
                  </div>
                );
              })}
              <div className="mt-12">
                <div className="flex justify-between items-center">
                  <p className="font-light xl:text-lg md:text-base text-gray-600">
                    Tổng tiền hàng
                  </p>
                  <p className="font-normal xl:text-xl md:text-lg">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-light xl:text-lg md:text-base text-gray-600">
                    Tổng phí vận chuyển
                  </p>
                  <p className="font-normal xl:text-xl md:text-lg">
                    Thanh toán khi nhận hàng
                  </p>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <p className="font-normal xl:text-lg md:text-base text-gray-700">
                    Tổng thanh toán
                  </p>
                  <p className="font-semibold text-2xl text-pink-700">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
                <Typography
                  color="gray"
                  className="mt-2 flex items-center gap-1 font-normal text-xs"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tổng thanh toán phụ thuộc vào địa chỉ thanh toán để tính phí
                  vận chuyển
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex md:flex-row flex-col justify-end items-center mt-8 md:mb-24 mb-8 xl:px-32 md:px-12 sm:px-8 px-6">
          <Typography className="sm:text-sm text-xs md:me-12 me-0 md:mb-0 mb-6">
            Đội ngũ Noxinh.com sẽ liên hệ với bạn qua số điện thoại của bạn cung
            cấp sau khi đặt hàng, xin cảm ơn!
          </Typography>
          {!isSubmit ? (
            <Button className="w-[200px] py-6 bg-[#FFA7DC]" type="submit">
              Đặt hàng
            </Button>
          ) : (
            <Button
              loading={true}
              fullWidth
              className="w-[200px] py-6 bg-[#FFA7DC]"
            >
              Đặt hàng
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Order;
