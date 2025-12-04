import React from "react";
import Slider from "react-slick";
import Home1 from "../../assets/images/Home1.png";
import Home2 from "../../assets/images/home2.png";
import Home3 from "../../assets/images/Home3.png";
import Home4 from "../../assets/images/Home4.png";
import Home5 from "../../assets/images/Home5.png";
import "./Home.css";

const HomeBanner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="custom-dot"></div> // 👈 custom class for styling
    ),
  };

  return (
   
      <Slider {...settings}>
        <div className="items height">
          <img src={Home1} className="w-100" alt="Banner 1" />
        </div>
        <div className="items height">
          <img src={Home2} className="w-100" alt="Banner 2" />
        </div>
        <div className="items height">
          <img src={Home3} className="w-100" alt="Banner 3" />
        </div>
        <div className="items height">
          <img src={Home4} className="w-100" alt="Banner 4" />
        </div>
        <div className="items height">
          <img src={Home5} className="w-100" alt="Banner 5" />
        </div>
      </Slider>
  );
};

export default HomeBanner;
