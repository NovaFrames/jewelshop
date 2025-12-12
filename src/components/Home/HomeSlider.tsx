import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import images
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";

const slides = [
  {
    id: 1,
    image: image1,
    title: "Timeless Elegance",
    description: "Discover our latest collection of exquisite designs.",
    cta: "Explore Now"
  },
  {
    id: 2,
    image: image2,
    title: "Modern Artistry",
    description: "Crafted for the contemporary soul.",
    cta: "Shop Collection"
  },
  {
    id: 3,
    image: image3,
    title: "Royal Heritage",
    description: "Experience the grandeur of tradition.",
    cta: "View Designs"
  },
  // Duplicating slides to ensure smooth loop with centeredSlides and slidesPerView="auto"
  {
    id: 4,
    image: image1,
    title: "Timeless Elegance",
    description: "Discover our latest collection of exquisite designs.",
    cta: "Explore Now"
  },
  {
    id: 5,
    image: image2,
    title: "Modern Artistry",
    description: "Crafted for the contemporary soul.",
    cta: "Shop Collection"
  },
  {
    id: 6,
    image: image3,
    title: "Royal Heritage",
    description: "Experience the grandeur of tradition.",
    cta: "View Designs"
  },
];

const HomeSlider = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "500px", md: "600px" },
        position: "relative",
        bgcolor: "#fff", // White background as seen in screenshot gaps
        py: 2,
        "& .swiper": {
          width: "100%",
          height: "100%",
          paddingBottom: "40px", // Space for pagination
        },
        "& .swiper-slide": {
          width: { xs: "90%", md: "85%" }, // Center slide width
          height: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "transform 0.3s ease",
          // Inactive slides scale down slightly
          "&.swiper-slide-prev, &.swiper-slide-next": {
            transform: "scale(0.95)",
            opacity: 0.7,
          },
        },
        // Custom Pagination (Diamond shape)
        "& .swiper-pagination-bullet": {
          width: "8px",
          height: "8px",
          borderRadius: "0", // Square
          transform: "rotate(45deg)",
          backgroundColor: "#b0b0b0",
          opacity: 0.5,
          margin: "0 6px !important",
        },
        "& .swiper-pagination-bullet-active": {
          backgroundColor: "#832729", // Tanishq-like maroon
          opacity: 1,
        },
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {/* Background Image */}
              <Box
                component="img"
                src={slide.image}
                alt={slide.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Gradient Overlay for Text Readability */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)",
                }}
              />

            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomeSlider;
