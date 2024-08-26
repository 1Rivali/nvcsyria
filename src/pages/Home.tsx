import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { FaPeace } from "react-icons/fa";
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
import colorImage from "../assets/color-image.png";

export default function Home() {
  const images = [image1, image2, image3];
  const servicesImages = [serv6, serv1, serv2, serv3, serv4, serv5];
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <VStack w={"100%"} p={4} spacing={10} height={"full"}>
      <HStack
        justifyContent={"space-between"}
        width={"full"}
        height={!isMobile ? "80vh" : "60vh"}
      >
        {!isMobile && (
          <VStack height={"full"} justifyContent={"space-between"} flex={"1"}>
            <Box
              boxSize={"120px"}
              backgroundImage={`url('${colorImage}')`}
              backgroundSize="fill"
              backgroundPosition="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0px 4px 10px rgba(0, 0, 0, 1)"
              borderRadius="full"
              padding={"10"}
            >
              <Icon
                as={FaPeace}
                color="secondary.500"
                width={"100px"}
                height={"auto"}
                transform={"rotate(30deg);"}
              />
            </Box>
            <Image src={peaceImage} width={"200px"} />
          </VStack>
        )}
        <CarouselSlider items={images} />
        {!isMobile && (
          <VStack
            flex={"1"}
            height={"full"}
            justifyContent={"space-between"}
            alignContent={"space-between"}
          >
            <Image src={peaceImageRight} width={"200px"} />
            <Box
              boxSize={"120px"}
              backgroundImage={`url('${colorImage}')`}
              backgroundSize="fill"
              backgroundPosition="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0px 4px 10px rgba(0, 0, 0, 1)"
              borderRadius="full"
              padding={"10"}
            >
              <Icon
                as={FaPeace}
                color="secondary.500"
                width={"100px"}
                height={"auto"}
                transform={"rotate(-30deg)"}
              />
            </Box>
          </VStack>
        )}
      </HStack>
      <Box width={"full"} mt={"5rem"}>
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
            ما هي خدماتنا ؟
          </Text>
        </Heading>
      </Box>
      <ImageGrid images={servicesImages} />
    </VStack>
  );
}
