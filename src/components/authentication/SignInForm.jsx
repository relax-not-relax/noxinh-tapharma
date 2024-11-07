/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Dialog,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import authenticationAPI from "../../api/authenticationApi";

SignInForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSwitchToSignUp: PropTypes.func.isRequired,
};

function SignInForm({ isOpen, onClose, onSwitchToSignUp }) {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorResponse, setErrorResponse] = React.useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const phoneRegex = /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const onSubmit = async (data) => {
    const request = {
      phone: data.phone,
      password: data.password,
    };

    try {
      setIsSubmit(true);
      const res = await authenticationAPI.login(request);
      if (res.status === 200) {
        sessionStorage.setItem("accessToken", res.data.accessToken);
        sessionStorage.setItem("refreshToken", res.data.refreshToken);
        sessionStorage.setItem("isLogin", true);

        setIsSubmit(false);
        console.log("Successfully login");
        onClose();
        reset();
        enqueueSnackbar("Đăng nhập thành công!", {
          variant: "success",
          autoHideDuration: 2500,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      console.error("Error register:", error);
      setIsSubmit(false);
      setErrorResponse(error.response.data.message);
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
                  Đăng Nhập
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
                Nhập số điện thoại và mật khẩu để đăng nhập.
              </Typography>

              <div className="">
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
            </CardBody>
            <CardFooter className="">
              <Typography
                className="mb-3 font-normal text-xs italic"
                variant="paragraph"
                color="red"
              >
                {errorResponse}
              </Typography>
              {!isSubmit ? (
                <Button fullWidth className="bg-[#FFA7DC]" type="submit">
                  Đăng nhập
                </Button>
              ) : (
                <Button
                  loading={true}
                  fullWidth
                  className="flex items-center justify-center"
                >
                  Đăng nhập
                </Button>
              )}
              <Typography variant="small" className="mt-4 flex justify-center">
                Bạn chưa có tài khoản?
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold cursor-pointer"
                  onClick={onSwitchToSignUp}
                >
                  Đăng ký
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </div>
  );
}

export default SignInForm;
