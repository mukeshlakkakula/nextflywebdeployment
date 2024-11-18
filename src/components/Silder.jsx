import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Style/Style.css";
import brand1 from "../Assest/Images/brand-1.svg";
import brand2 from "../Assest/Images/brand-2.svg";
import brand3 from "../Assest/Images/brand-3.svg";
import brand4 from "../Assest/Images/brand-4.svg";
import brand5 from "../Assest/Images/brand-5.svg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const sliderImageUrl = [
  {
    url: brand1, 
  },
  {
    url: brand2, 
  },
  {
    url: brand3, 
  },
  {
    url: brand4,
  },
  {
    url: brand1, 
  },
  {
    url: brand2, 
  },
  {
    url: brand5, 
  },
];

const Slider = () => {
  return (
    <div className="parent  ">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        // showDots={true}
        infinite={true}
        arrows={false} 
        showDots={false}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <div className="slider" key={index}>
              <img src={imageUrl.url} className="h-24 pl-14 sm:pl-0  " alt="movie" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Slider;
