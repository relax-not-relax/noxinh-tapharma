/* eslint-disable no-unused-vars */

import React from "react";
import bst from "../assets/bst-2.svg";
import ca1 from "../assets/ca-1.png";
import ca2 from "../assets/ca-1.png";
import ca3 from "../assets/ca-3.png";
import { Link, useLoaderData } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import AutoScroll from "../components/home/AutoScroll";
import { highlightItemData } from "../data/highlight-item-data";
import CategoryProducts from "../components/CategoryProducts";
import combosAPI from "../api/combosApi";
import QuestionAnswer from "../components/home/QuestionAnswer";

function Home() {
  const categoriesData = useLoaderData();
  const [carouselBanner, setCarouselBanner] = React.useState([]);

  React.useEffect(() => {
    const fetchCarouselBanner = async () => {
      try {
        const res = await combosAPI.getBanners();
        setCarouselBanner(res.data);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      }
    };

    fetchCarouselBanner();
  }, []);

  return (
    <div className="w-screen h-auto">
      <div className="flex justify-center px-24">
        <img
          src={bst}
          alt=""
          className="h-auto xl:w-[300px] lg:w-[200px] sm:w-[180px] xs:w-[150px]"
        />
      </div>
      <div className="flex grid grid-cols-6 justify-between items-center 2xl:px-40 xl:px-32 lg:px-12 sm:px-8 mt-4">
        {categoriesData.map((category) => {
          return (
            <Link
              key={category.id}
              to={`/combo/${category.id}?pageNumber=0&pageSize=8`}
            >
              <div className="flex flex-col justify-center items-center">
                <img
                  src={category.image}
                  alt=""
                  className="h-auto xl:w-[175px] lg:w-[135px] sm:w-[100px] w-[60px]"
                />
                <p className="sm:text-xl text-base font-light text-black">
                  {category.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <Carousel
        className="rounded-xl sm:mt-12 mt-6"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {carouselBanner
          .slice()
          .reverse()
          .map((banner, index) => {
            return (
              <img
                key={index}
                src={banner.image}
                alt={banner.title}
                className="2xl:h-[600px] xl:h-[530px] lg:h-[350px] sm:h-[250px] h-[220px] w-full object-cover"
              />
            );
          })}
      </Carousel>
      <AutoScroll items={highlightItemData} />
      <CategoryProducts products={categoriesData} />
      <QuestionAnswer />
    </div>
  );
}

export default Home;
