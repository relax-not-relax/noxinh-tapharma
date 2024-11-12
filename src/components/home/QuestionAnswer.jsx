/* eslint-disable no-unused-vars */
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import React from "react";

function QuestionAnswer() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="w-full flex lg:flex-row flex-col justify-between lg:items-center items-start xl:px-32 md:px-12 sm:px-8 px-6 lg:py-0 md:py-16 py-12 bg-black lg:h-96">
      <div>
        <h2 className="text-white font-light xl:text-4xl md:text-3xl text-2xl">
          Tất cả những gì bạn cần biết về
        </h2>
        <h2 className="text-white xl:text-4xl md:text-3xl text-2xl font-semibold md:mt-4 mt-2">
          Noxinh.com
        </h2>
        <p className="text-white mt-8 font-light xl:text-xl md:text-base text-sm lg:w-[80%]">
          Bạn có bất kỳ câu hỏi nào về Noxinh.com, chúng tôi đã tổng hợp đầy đủ
          các câu trả lời thường gặp ngay tại đây để hỗ trợ bạn tốt nhất.
        </p>
      </div>
      <div className="lg:w-[60%] xl:w-full md:mt-4 lg:mt-0 mt-2">
        <Accordion open={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="text-white hover:!text-white lg:text-xl sm:text-base text-sm"
          >
            What is Material Tailwind?
          </AccordionHeader>
          <AccordionBody className="text-white md:text-sm text-xs">
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="text-white hover:!text-white lg:text-xl sm:text-base text-sm"
          >
            How to use Material Tailwind?
          </AccordionHeader>
          <AccordionBody className="text-white md:text-sm text-xs">
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3}>
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className="text-white hover:!text-white lg:text-xl sm:text-base text-sm"
          >
            What can I do with Material Tailwind?
          </AccordionHeader>
          <AccordionBody className="text-white md:text-sm text-xs">
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
}

export default QuestionAnswer;
