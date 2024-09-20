import {
  Box,
  Container,
  Divider,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import paperTexture from "../assets/paper-texture.png";
import useStory from "../hooks/useStory";
export default function StoryDetails() {
  const { storyId } = useParams<{ storyId: string }>();
  const { story } = useStory(storyId!);
  const isMobile = useBreakpointValue({ base: true, md: false });

  function splitStringEvery(str: string, count: number) {
    const result = [];
    for (let i = 0; i < str.length; i += count) {
      result.push(str.slice(i, i + count));
    }
    return result;
  }
  return (
    <Box
      width={"full"}
      height={"full"}
      minHeight={"80vh"}
      bgColor={"primary.500"}
      backgroundImage={paperTexture}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"center"}
      backgroundSize={"cover"}
      p={5}
    >
      <Container minWidth={{ base: "full", lg: "container.lg" }}>
        {story && (
          <Box
            width="full"
            bg="#e7e7e7"
            position="relative"
            boxShadow="10px 10px 15px rgba(0, 0, 0, 0.5)"
          >
            <VStack spacing={0} height={"full"} textAlign={"center"}>
              <>
                <Heading
                  fontSize={{ base: "18px", md: "36px" }}
                  fontWeight={"bold"}
                  mx={2}
                  textAlign={"center"}
                  zIndex={4}
                  width={"full"}
                  pt={20}
                >
                  {story?.attributes.title}
                </Heading>

                <Divider
                  height={"50px"}
                  borderBottomColor="#c3c3c3"
                  borderWidth={"2px"}
                />

                {splitStringEvery(
                  story.attributes.body,
                  !isMobile ? 90 : 30
                ).map((line: string, index: number) => (
                  <Box width={"full"} pt={2} key={index}>
                    <Text
                      fontSize={{ base: "18px", md: "20px" }}
                      fontFamily={"makina"}
                      textAlign={"start"}
                      mr={"17%"}
                      key={index}
                    >
                      {line}
                    </Text>
                    <Divider
                      borderBottomColor="#c3c3c3"
                      borderWidth={"2px"}
                      width={"full"}
                    />
                  </Box>
                ))}

                <Divider
                  height={"50px"}
                  borderBottomColor="#c3c3c3"
                  borderWidth={"2px"}
                />
              </>
            </VStack>
            <Box
              position="absolute"
              top="0"
              right="15%"
              bottom="0"
              width="3px"
              bg="#c3c3c3"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
