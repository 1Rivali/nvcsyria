import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditStoryModal from "../components/Modals/EditStoryModal";
import StickyNote from "../components/StickyNote";
import StoryFilters from "../components/StoryFilters";
import { apiVersion, baseUrl } from "../config/constants";
import useStates from "../hooks/useStates";
import useStories from "../hooks/useStories";
import useTags from "../hooks/useTags";
import { IStoryFilters } from "../types/storyTypes";

export interface StoryFormData {
  title: string;
  body: string;
  teller: string;
  keywords: string;
  tags: number[];
  state_id: string;
}

export default function AdminHome() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [filters, setFilters] = useState<IStoryFilters>({});
  const [formData, setFormData] = useState<StoryFormData>({
    state_id: "",
    title: "",
    body: "",
    teller: "",
    keywords: "",
    tags: [],
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingStory, setEditingStory] = useState(null);
  const { tags } = useTags();
  const { states } = useStates();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { stories, loading } = useStories(filters);

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
    setFilters({});
  };

  const handleEditClick = (story: any) => {
    console.log(story);
    setEditingStory(story);
    setFormData({
      state_id: story.relationships.place.data.id || "",
      title: story.attributes.title || "",
      body: story.attributes.body || "",
      teller: story.attributes.teller || "",
      keywords: story.attributes.keywords || "",
      tags: story.includes.category.map((e) => Number(e.id)) || "",
    });
    onOpen();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `${baseUrl}/${apiVersion}/stories/${editingStory.id}`,
        {
          ...formData,
          keywords: `[${formData.keywords}]`,
          tags: formData.tags,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

  const handleDeleteClick = async (storyId: number) => {
    try {
      await axios.delete(`${baseUrl}/${apiVersion}/stories/${storyId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  function formatDateToAgo(date: Date | string): string {
    const parsedDate = new Date(date); // Ensure the date is a Date object
    return formatDistanceToNow(parsedDate, { addSuffix: false });
  }

  return (
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
            clearFilters={clearFilters}
            handleFilterChange={handleFilterChange}
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
                clearFilters={clearFilters}
                handleFilterChange={handleFilterChange}
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
                <Box position="relative" key={index} m={2}>
                  {/* Sticky Note */}
                  <StickyNote
                    _hover={{
                      transform: "scale(1.2) rotate(5deg)",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/stories/${story.id}`)}
                  >
                    <VStack textAlign={"center"} spacing={{ base: 2, md: 4 }}>
                      <Heading
                        as={"h6"}
                        fontSize={{ base: "16px", md: "18px", lg: "20px" }} // Responsive font size
                        isTruncated
                        maxW="full" // Ensures the Heading doesn't overflow horizontally
                      >
                        {story.attributes.title}
                      </Heading>
                      <Text
                        color={"black"}
                        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                        noOfLines={1} // Truncate after 1 line
                      >
                        {story.includes.place.attributes.name}
                      </Text>
                      <Text
                        color={"black"}
                        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                        noOfLines={1} // Truncate after 1 line
                      >
                        {story.includes.category[0].attributes.name}
                      </Text>
                      <Text
                        color={"secondary.800"}
                        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                        noOfLines={1} // Truncate after 1 line
                      >
                        {story.attributes.teller}
                      </Text>

                      <HStack fontWeight={"bold"}>
                        <BsEye size={"24px"} />
                        <Text
                          fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                          textAlign={"center"}
                          noOfLines={1} // Truncate after 1 line
                        >
                          {story.attributes.clicks}
                        </Text>
                      </HStack>

                      <HStack fontWeight={"bold"}>
                        <MdDateRange size={"24px"} />
                        <Text>
                          قبل
                          {formatDateToAgo(story.attributes.created_at)}
                        </Text>
                      </HStack>
                    </VStack>
                  </StickyNote>

                  {/* Edit Button (Left) */}
                  <Button
                    position="absolute"
                    left="6"
                    top="0"
                    transform="translateY(-50%)"
                    size="sm"
                    borderRadius="full"
                    colorScheme="blue"
                    onClick={() => handleEditClick(story)}
                  >
                    ✎
                  </Button>

                  {/* Delete Button (Right) */}
                  <Button
                    position="absolute"
                    right="0"
                    top="0"
                    transform="translateY(-50%)"
                    size="sm"
                    borderRadius="full"
                    colorScheme="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(story.id);
                    }}
                  >
                    ✖
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Box>
      <EditStoryModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        setFormData={setFormData}
        handleFormChange={handleFormChange}
        handleEditSubmit={handleEditSubmit}
        states={states}
        tags={tags}
      />
    </Box>
  );
}
