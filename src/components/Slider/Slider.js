import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{lg:{height:'100vh',width:'100%'},mb:"70px",mt:"30px"}}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Slide ${index + 1}`}
            sx={{ width: "100%", height: { xs: '400px', lg: '500px' }, objectFit: "cover" }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
