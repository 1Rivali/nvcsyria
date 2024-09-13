import {
  Box,
  Heading,
  Text,
  AbsoluteCenter,
  useBreakpointValue,
  Center,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import StickyNote from "../components/StickyNote";
import { FramedImage } from "../components/FramedImage";
import { ServiceData } from "../types/servicesTypes";

interface HomeServiceSectionProps {
  service: ServiceData;
  index: number;
  transformValues: number[][];
  mobileTransformValues: number[][];
}

const HomeServiceSection: React.FC<HomeServiceSectionProps> = ({
  service,
  index,
  transformValues,
  mobileTransformValues,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (!isMobile) {
    return (
      <HStack
        transform={index % 2 === 0 ? "rotate(0)" : "rotate(180deg)"}
        justifyContent={"space-between"}
        minW={"full"}
        height={"100vh"}
        width={"full"}
      >
        <StickyNote
          transform={index % 2 === 0 ? "rotate(10deg)" : "rotate(170deg)"}
          height={"50%"}
          width={"25%"}
          m={"auto"}
          left={"5%"}
          bottom={0}
          top={0}
        >
          <AbsoluteCenter>
            <Box textAlign={"center"}>
              <Heading fontSize={"64px"} as={"h1"} mb={"10%"}>
                خدماتنا
              </Heading>
              <Text fontSize={index !== 2 ? "30px" : "23px"}>
                {service.text}
              </Text>
            </Box>
          </AbsoluteCenter>
        </StickyNote>

        <VStack>
          <FramedImage
            imageSrc={service.images[0].src}
            imageAlt={service.images[0].alt}
            width={service.images[0].width}
            height={service.images[0].height}
            transform={index % 2 === 0 ? `rotate(10deg)` : `rotate(190deg)`}
            left="10%"
            top={index % 2 === 0 ? "10%" : "0%"}
            bottom={index % 2 === 0 ? "0%" : "20%"}
            zIndex={2}
          />
          <HStack>
            <FramedImage
              imageSrc={service.images[1].src}
              imageAlt={service.images[1].alt}
              width={service.images[1].width}
              height={service.images[1].height}
              transform={index % 2 === 0 ? `rotate(5deg)` : `rotate(175deg)`}
              left="10%"
              zIndex={2}
            />
            <FramedImage
              imageSrc={service.images[2].src}
              imageAlt={service.images[2].alt}
              width={service.images[2].width}
              height={service.images[2].height}
              transform={index % 2 === 0 ? `rotate(-10deg)` : `rotate(190deg)`}
              left="10%"
              zIndex={2}
            />
          </HStack>
        </VStack>
      </HStack>
    );
  }
  return (
    <Box position="relative" height={"70vh"} width={"full"}>
      <Center>
        <HStack>
          {service.images.map((image, idx) => (
            <FramedImage
              key={idx}
              imageSrc={image.src}
              imageAlt={image.alt}
              width={"120px"}
              height={"120px"}
              zIndex={idx + 2}
              transform={`translate(${mobileTransformValues[idx][0]}%, ${mobileTransformValues[idx][1]}%)`}
            />
          ))}
        </HStack>
        <StickyNote
          position={"absolute"}
          height={"50%"}
          width={"80%"}
          bottom={0}
          mb={5}
        >
          <AbsoluteCenter>
            <Box textAlign={"center"}>
              <Heading>خدماتنا</Heading>
              <Text fontSize={"14px"}>{service.text}</Text>
            </Box>
          </AbsoluteCenter>
        </StickyNote>
      </Center>
    </Box>
  );
};

export default HomeServiceSection;
