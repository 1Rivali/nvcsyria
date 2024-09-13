import { Box } from "@chakra-ui/react";
import HomeBanner from "../components/HomeBanner";
import HomeServiceGrid from "../components/HomeServicesGrid";

export default function Home() {
  return (
    <Box w={"100%"} height={"full"}>
      <HomeBanner />
      {/* <HomeServiceBanner /> */}
      <HomeServiceGrid />
    </Box>
  );
}
