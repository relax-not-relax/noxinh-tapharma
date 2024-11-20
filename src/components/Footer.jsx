/* eslint-disable no-unused-vars */
import { Typography } from "@material-tailwind/react";
import React from "react";

function Footer() {
  return (
    <div className="w-full h-auto pt-12 pb-4 bg-gray-900">
      <div className="xl:px-32 md:px-12 sm:px-8 px-6">
        <Typography className="uppercase text-gray-500 md:text-sm text-xs">
          Hộ kinh doanh Nơ Xinh
        </Typography>
        <Typography className="text-gray-500 md:text-sm text-xs">
          Địa chỉ: 28 Đỗ Xuân Hợp, KDC Đất Phương Nam, phường Phước Long B, Thủ
          Đức, Thành phố Thủ Đức
        </Typography>
        <Typography className="text-gray-500 md:text-sm text-xs">
          Mã số doanh nghiệp: 0000000000 | Ngày cấp: 01/01/2020 | Nơi cấp:
          Tp.HCM
        </Typography>
        <Typography className="text-gray-500 md:text-sm text-xs">
          Hotline: 037 670 1892 | Email: example@gmail.com
        </Typography>
      </div>
      <hr className="mt-12 mb-4 border-gray-800" />
      <div className="flex justify-center items-center">
        <Typography className="text-gray-500 text-xs">
          2024 © Noxinh.com All Rights Reserved
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
