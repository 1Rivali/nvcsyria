import {
  AbsoluteCenter,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

import bottomHalfImageMobile from "../assets/bottom-half-paper2-mobile.png";
import noteImage from "../assets/note-image.png";
import topHalfImageMobile from "../assets/top-half-paper2-mobile.png";
import paperImage from "../assets/two-halfs-paper2.png";
import StickyNote from "../components/StickyNote";
import useStates from "../hooks/useStates";
import useTags from "../hooks/useTags";

const PickFilter: React.FC = () => {
  const { tags, loading, error } = useTags();
  const { states, loading: statesLoading, error: statesError } = useStates();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate(); // Initialize navigate

  if (loading || statesLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || statesError) {
    return (
      <Center height="100vh">
        <Text color="red.500" fontSize="lg">
          Error: {error?.message || statesError?.message}
        </Text>
      </Center>
    );
  }

  if (!isMobile) {
    return (
      <Flex
        p={10}
        height="90vh"
        width={"full"}
        backgroundImage={paperImage}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
        backgroundColor={"primary.500"}
      >
        <Container textAlign={"center"} maxWidth={"40%"}>
          <Heading mb={10}>المحافظات</Heading>
          <Grid
            templateColumns="repeat(3, 1fr)" // Adjust as needed
            width="100%"
            columnGap={20}
            rowGap={5}
            p={4}
          >
            {states.map((state, index) => (
              <Box
                key={state.id}
                width={"6vw"}
                height={"12vh"}
                textAlign={"center"}
                backgroundImage={noteImage}
                backgroundSize={"contain"}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={"center"}
                alignContent={"center"}
                _hover={{
                  transform: "scale(1.3) rotate(5deg)",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/stories`, { state: { state: state.id } })
                }
                transform={index % 2 === 0 ? "rotate(5deg)" : "rotate(-5deg)"}
              >
                <Text
                  color={"primary.500"}
                  fontSize={"20px"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {state.attributes.name}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>

        <Container textAlign={"center"} maxWidth={"40%"}>
          <Heading mb={10}>الموضوع</Heading>
          <Grid
            templateColumns="repeat(3, 1fr)"
            width="100%"
            columnGap={10}
            rowGap={10}
            p={4}
          >
            {tags.map((tag, index) => (
              <Box
                key={tag.id}
                width={"9vw"}
                height={"18vh"}
                textAlign={"center"}
                backgroundImage={noteImage}
                backgroundSize={"contain"}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={"center"}
                alignContent={"center"}
                fontSize={"20px"}
                _hover={{
                  transform: "scale(1.3) rotate(5deg)",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/stories`, { state: { tag: tag.id } })}
                transform={index % 2 === 0 ? "rotate(5deg)" : "rotate(-5deg)"}
              >
                <Text color={"primary.500"} fontWeight={"bold"}>
                  {tag.attributes.name}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Flex>
    );
  }
  return (
    <Box height={"full"} width={"full"} backgroundColor={"primary.500"} px={2}>
      <Box
        backgroundImage={topHalfImageMobile}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
        py={5}
        px={2}
      >
        <Heading textAlign={"center"}>المحافظات</Heading>
        <SimpleGrid
          width={"full"}
          height={"60vh"}
          columns={[3]}
          py={15}
          mb={"20vh"}
          gap={4}
          top={"10%"}
          position={"relative"}
        >
          {states.map((state, index) => (
            <StickyNote
              key={index}
              py={2}
              width="20vw"
              height="20vw"
              tapeWidth="50%"
              tapeHeight="25%"
              onClick={() =>
                navigate(`/stories`, { state: { state: state.id } })
              }
              transform={index % 2 === 0 ? "rotate(5deg)" : "rotate(-5deg)"}
            >
              <AbsoluteCenter>
                <Text
                  fontSize={"18px"}
                  color={"primary.500"}
                  fontWeight={"bold"}
                >
                  {state.attributes.name}
                </Text>
              </AbsoluteCenter>
            </StickyNote>
          ))}
        </SimpleGrid>
      </Box>

      <Box
        backgroundImage={bottomHalfImageMobile}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
        py={"100px"}
        px={2}
      >
        <Heading textAlign={"center"}>الموضوع</Heading>
        <SimpleGrid
          width={"full"}
          height={"60vh"}
          columns={[2]}
          py={10}
          gap={4}
          top={"10%"}
          position={"relative"}
        >
          {tags.map((tag, index) => (
            <StickyNote
              key={index}
              py={2}
              width="30vw"
              height="30vw"
              tapeWidth="50%"
              tapeHeight="25%"
              onClick={() => navigate(`/stories`, { state: { tag: tag.id } })}
              transform={index % 2 === 0 ? "rotate(5deg)" : "rotate(-5deg)"}
            >
              <AbsoluteCenter>
                <Text
                  fontSize={"18px"}
                  color={"primary.500"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  {tag.attributes.name}
                </Text>
              </AbsoluteCenter>
            </StickyNote>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default PickFilter;
