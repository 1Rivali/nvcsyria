import {
  Box,
  Heading,
  Icon,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { FaPeace } from "react-icons/fa"; // Import the peace icon from react-icons
import CarouselSlider from "../components/Carousel";
import ImageGrid from "../components/ImagesGrid";

import peaceImageRight from "../assets/peace-image-right.png";
import peaceImage from "../assets/peace-image.png";
import image1 from "../assets/salam/1.jpg";
import image2 from "../assets/salam/2.jpg";
import image3 from "../assets/salam/3.jpg";
import serv1 from "../assets/services/1.jpg";
import serv2 from "../assets/services/2.jpg";
import serv3 from "../assets/services/3.jpg";
import serv4 from "../assets/services/4.jpg";
import serv5 from "../assets/services/5.jpg";
import serv6 from "../assets/services/6.jpg";

export default function Home() {
  const images = [image1, image2, image3];
  const servicesImages = [serv6, serv1, serv2, serv3, serv4, serv5];
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <VStack w={"100%"} p={4} spacing={10} position="relative">
      {!isMobile && (
        <>
          <Box
            position="absolute"
            top="6%"
            left="0"
            // bgColor={"black"}
            // transform="translateY(-50%) translateX(-70%);"
          >
            <Image
              src={peaceImageRight}
              left={0}
              width={"30%"}
              position={"relative"}
              transform="translateY(-60%) translateX(-230%);"
            />
          </Box>
          <Box position={"absolute"} left={"2%"} top={"35%"}>
            <Icon
              as={FaPeace}
              boxSize={"100px"}
              color="primary.500"
              transform={"rotate(-30deg);"}
            />
          </Box>
          <Box position={"absolute"} right={"2%"} top={"2%"}>
            <Icon
              as={FaPeace}
              boxSize={"100px"}
              color="secondary.500"
              transform={"rotate(30deg);"}
            />
          </Box>
          <Box
            position="absolute"
            top="35%"
            right="0"
            transform="translateY(-50%)"
          >
            <Image src={peaceImage} width={"30%"} />
          </Box>
        </>
      )}

      <CarouselSlider items={images} />
      <Box width={"full"}>
        <Heading
          fontSize={{ base: "2xl", md: "4xl" }}
          bgGradient="linear(to-r, teal.400, blue.500)"
          bgClip="text"
          textAlign="center"
          fontWeight="extrabold"
          textShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Text
            as="span"
            display="inline-block"
            borderBottom="2px"
            borderColor="teal.500"
          >
            تعو نفرجيكون خدماتنا
          </Text>
        </Heading>
      </Box>
      <ImageGrid images={servicesImages} />
    </VStack>
  );
}
