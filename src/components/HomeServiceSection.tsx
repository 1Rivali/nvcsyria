import {
  Box,
  Heading,
  Text,
  AbsoluteCenter,
  useBreakpointValue,
  HStack,
  VStack,
  Container,
} from "@chakra-ui/react";
import StickyNote from "../components/StickyNote";
import { FramedImage } from "../components/FramedImage";
import { ServiceData } from "../types/servicesTypes";

interface HomeServiceSectionProps {
  service: ServiceData;
  index: number;
  transformValues: number[][];
  mobileTransformValues: number[][];
  mobileRotateValues: number[];
}

const HomeServiceSection: React.FC<HomeServiceSectionProps> = ({
  service,
  index,
  mobileTransformValues,
  mobileRotateValues,
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
          transform={index % 2 === 0 ? "rotate(0deg)" : "rotate(180deg)"}
          height={"70%"}
          width={"35%"}
          m={"auto"}
          left={"5%"}
          bottom={0}
          top={0}
        >
          <AbsoluteCenter>
            <Box textAlign={"center"}>
              <Heading
                mt={20}
                fontSize={index !== 2 ? "46px" : "36px"}
                as={"h1"}
                mb={"2%"}
              >
                {index !== 2 ? "خدماتنا" : 'مشروع "حكايا سلام"'}
              </Heading>
              <Text fontSize={index !== 2 ? "25px" : "20px"}>
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
    <Box position="relative" height={"78vh"} width={"full"}>
      <StickyNote position={"absolute"} height={"75%"} width={"100%"} mb={5}>
        <AbsoluteCenter>
          <Container textAlign={"center"}>
            <Heading
              mt={20}
              fontSize={index !== 2 ? "16px" : "20px"}
              as={"h1"}
              mb={"2%"}
            >
              {index !== 2 ? "خدماتنا" : 'مشروع "حكايا سلام"'}
            </Heading>
            <Text fontSize={"14px"}>{service.text}</Text>
          </Container>
        </AbsoluteCenter>
      </StickyNote>
      <HStack>
        {service.images.map((image, idx) => (
          <FramedImage
            key={idx}
            imageSrc={image.src}
            imageAlt={image.alt}
            width={"140px"}
            height={"140px"}
            zIndex={idx === 1 ? idx : idx + 2}
            transform={`translate(${mobileTransformValues[idx][0]}%, ${mobileTransformValues[idx][1]}%) rotate(${mobileRotateValues[idx]}deg)`}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default HomeServiceSection;
