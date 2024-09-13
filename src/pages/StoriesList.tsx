import {
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StickyNote from "../components/StickyNote";
import StoryFilters from "../components/StoryFilters";
import useStates from "../hooks/useStates";
import useStories from "../hooks/useStories";
import useTags from "../hooks/useTags";
import { IStoryFilters } from "../types/storyTypes";
import { MdDateRange } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";

const StoriesList: React.FC = () => {
  const location = useLocation();

  const [filters, setFilters] = useState<IStoryFilters>(location.state);
  const { tags } = useTags();
  const { states } = useStates();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { stories, loading } = useStories(filters);

  const navigate = useNavigate();

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const updatedFilters: IStoryFilters = { ...prev };
      console.log("value", value);
      if (value === "") {
        delete updatedFilters[name];

        return updatedFilters;
      }
      updatedFilters[name] = value;
      return updatedFilters;
    });
  };
  const clearFilters = () => {
    setFilters(location.state);
  };
  function formatDateToAgo(date: Date | string): string {
    const parsedDate = new Date(date); // Ensure the date is a Date object
    return formatDistanceToNow(parsedDate, { addSuffix: false });
  }

  return (
    <>
      <Box bgColor={"primary.500"}>
        <Box
          border="1px solid black"
          width="full"
          height="full"
          bg="#e9e9e9"
          position="relative"
        >
          <VStack spacing={0} height={"full"} align="flex-start" padding="10px">
            {Array.from({
              length:
                stories.length === 0 || stories.length <= 5
                  ? 30
                  : stories.length * 5,
            }).map((_, index) => (
              <>
                <Divider
                  key={index}
                  height={"50px"}
                  borderColor="#c3c3c3"
                  borderWidth={"2px"}
                />
              </>
            ))}
          </VStack>
          <Box
            position="absolute"
            top="0"
            right="15%"
            bottom="0"
            width="2px"
            bg="gray.500"
          />
          {/* the margin of the paper */}
          {!isMobile && (
            <StoryFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
              clearFilters={clearFilters}
              states={states}
              tags={tags}
              position={"absolute"}
              width={"15%"}
              top="0"
              right="0"
              bottom="0"
              spacing={4}
              padding="10px"
            />
          )}

          {/* the body of the paper */}
          {stories && (
            <Box position="absolute" top="10px" left="10%" right="20%">
              {isMobile && (
                <StoryFilters
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                  clearFilters={clearFilters}
                  states={states}
                  tags={tags}
                  spacing={4}
                  padding="10px"
                  mb={10}
                />
              )}
              <SimpleGrid
                height={"fit-content"}
                bottom="10px"
                columns={[1, 2, 3, 4, 4]}
                gap={6}
              >
                {loading && <Spinner size={"xl"} />}
                {stories.map((story, index) => (
                  <>
                    <StickyNote
                      key={index}
                      _hover={{
                        transform: "scale(1.2) rotate(5deg)",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/stories/${story.id}`)}
                    >
                      <VStack textAlign={"center"} spacing={{ base: 2, md: 4 }}>
                        <Heading
                          as={"h6"}
                          fontSize={{ base: "18px", md: "20px", lg: "26px" }} // Responsive font size
                          isTruncated
                          maxW="full" //
                        >
                          {story.attributes.title}
                        </Heading>
                        <Text
                          color={"black"}
                          fontSize={{ base: "16px", md: "18px", lg: "24px" }}
                          noOfLines={1}
                        >
                          {story.includes.place.attributes.name}
                        </Text>
                        <Text
                          color={"black"}
                          fontSize={{ base: "16px", md: "18px", lg: "24px" }}
                          noOfLines={1}
                        >
                          {story.includes.category[0].attributes.name}
                        </Text>
                        <Text
                          color={"secondary.800"}
                          fontSize={{ base: "16px", md: "18px", lg: "24px" }}
                          noOfLines={1}
                        >
                          {story.attributes.teller}
                        </Text>

                        <HStack fontWeight={"bold"}>
                          <MdDateRange size={"24px"} />
                          <Text>
                            قبل {formatDateToAgo(story.attributes.created_at)}
                          </Text>
                        </HStack>
                      </VStack>
                    </StickyNote>
                  </>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default StoriesList;
