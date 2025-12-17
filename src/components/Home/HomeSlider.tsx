import { Box, useMediaQuery, useTheme, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface Banner {
  id: string;
  title: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
  createdAt: number;
}

const HomeSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const q = query(collection(db, 'banners'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const bannerList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Banner[];
        setBanners(bannerList);
      } catch (error) {
        console.error("Error fetching banners: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: "100%", height: { xs: "600px", md: "600px" }, p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: "12px" }} />
      </Box>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  // Duplicate banners if there are few to ensure smooth loop
  const displayBanners = [...banners];
  while (displayBanners.length > 0 && displayBanners.length < 6) {
    displayBanners.push(...banners);
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "600px", md: "600px" },
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
        loop={displayBanners.length > 1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {displayBanners.map((banner, index) => (
          <SwiperSlide key={`${banner.id}-${index}`}>
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
                src={isMobile ? banner.mobileImageUrl : banner.desktopImageUrl}
                alt={banner.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
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
