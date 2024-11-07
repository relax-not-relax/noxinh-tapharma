/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import addressAPI from "../../api/addressApi";
import findAddress from "../../util/findAddress";
import { useForm } from "react-hook-form";
import authenticationAPI from "../../api/authenticationApi";
import { useSnackbar } from "notistack";

SignUpForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function SignUpForm({ isOpen, onClose }) {
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [province, setProvince] = React.useState(0);
  const [district, setDistrict] = React.useState(0);
  const [ward, setWard] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);

  const [isSubmit, setIsSubmit] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
  }, []);

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

  const phoneRegex = /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = async (data) => {
    const request = {
      name: data.fullname,
      phone: data.phone,
      password: data.password,
      specificAddress: data.addressDetails,
      province_id: data.province,
      district_id: data.district,
      ward_id: data.ward,
      email: data.email,
    };

    try {
      setIsSubmit(true);
      const res = await authenticationAPI.register(request);
      if (res.status === 200) {
        setIsSubmit(false);
        console.log("Successfully registered");
        onClose();
        reset();
        enqueueSnackbar("Đăng ký tài khoản thành công!", {
          variant: "success",
          autoHideDuration: 4000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        enqueueSnackbar("Vui lòng đăng nhập lại!", {
          variant: "warning",
          autoHideDuration: 4000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      console.error("Error register:", error.status);
      setIsSubmit(false);
      onClose();
      enqueueSnackbar("Đăng ký tài khoản không thành công!", {
        variant: "error",
        autoHideDuration: 4000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      enqueueSnackbar("Vui lòng đăng ký lại!", {
        variant: "warning",
        autoHideDuration: 4000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  return (
    <div>
      <Dialog
        size="xs"
        open={isOpen}
        dismiss={{ outsidePress: false }}
        handler={onClose}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-2">
              <div className="w-full flex justify-between items-center">
                <Typography variant="h4" color="blue-gray">
                  Đăng Ký
                </Typography>
                <IconButton variant="text" color="blue-gray" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              </div>

              <Typography
                className="mb-3 font-normal text-sm"
                variant="paragraph"
                color="gray"
              >
                Vui lòng nhập đầy đủ thông tin.
              </Typography>
              <div>
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

              <div className="mt-2">
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

              <div className="mt-2">
                <Input
                  label="Email"
                  type="email"
                  size="md"
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: emailRegex,
                      message: "Email không hợp lệ",
                    },
                  })}
                  error={!!errors.email}
                />
                {errors.phone && (
                  <Typography color="red" className="text-xs mt-1 italic">
                    {errors.email.message}
                  </Typography>
                )}
              </div>

              <div className="mt-2">
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

              <div className="mt-2">
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

              <div className="mt-2">
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

              <div className="mt-2">
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

              <div className="mt-2">
                <div className="relative flex w-full max-w-[24rem]">
                  <Input
                    label="Mật khẩu"
                    type={showPassword ? "text" : "password"}
                    size="md"
                    {...register("password", {
                      required: "Vui lòng nhập mật khẩu",
                      pattern: {
                        value: passwordRegex,
                        message:
                          "Mật khẩu phải có ít nhất 8 ký tự, chứa chữ hoa, chữ thường và số",
                      },
                    })}
                    error={!!errors.password}
                  />
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    size="sm"
                    onClick={toggleShowPassword}
                    className="!absolute right-1 top-1 rounded"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </IconButton>
                </div>
                {errors.password && (
                  <Typography color="red" className="text-xs mt-1 italic">
                    {errors.password.message}
                  </Typography>
                )}
              </div>

              <div className="mt-2">
                <div className="relative flex w-full max-w-[24rem]">
                  <Input
                    label="Nhập lại mật khẩu"
                    type={showPassword ? "text" : "password"}
                    size="md"
                    {...register("confirmPassword", {
                      required: "Vui lòng nhập lại mật khẩu",
                    })}
                    error={!!errors.confirmPassword}
                  />
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    size="sm"
                    onClick={toggleShowPassword}
                    className="!absolute right-1 top-1 rounded"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </IconButton>
                </div>

                {errors.confirmPassword && (
                  <Typography color="red" className="text-xs mt-1 italic">
                    {errors.confirmPassword.message}
                  </Typography>
                )}
              </div>
            </CardBody>

            <CardFooter>
              {!isSubmit ? (
                <Button fullWidth className="bg-[#FFA7DC]" type="submit">
                  Đăng Ký
                </Button>
              ) : (
                <Button
                  loading={true}
                  fullWidth
                  className="flex items-center justify-center"
                >
                  Đăng ký
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </div>
  );
}

export default SignUpForm;
