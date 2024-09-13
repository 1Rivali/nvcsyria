import { Image, useBreakpointValue } from "@chakra-ui/react";
import bannerImageDesktop from "../assets/home-banner-desk.png";
import bannerImageMobile from "../assets/home-banner-mobile.jpg";

const HomeBanner = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Image
      src={isMobile ? bannerImageMobile : bannerImageDesktop}
      height={"full"}
      width={"full"}
    />
  );
};

export default HomeBanner;
