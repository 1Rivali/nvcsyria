import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { apiVersion, baseUrl } from "../../config/constants";
import useStates from "../../hooks/useStates";
import useTags from "../../hooks/useTags";

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  body: string;
  teller: string;
  keywords: string;
  tags: number[];
  state: string;
}

export default function AddStoryModal({ isOpen, onClose }: AddStoryModalProps) {
  const { tags } = useTags();
  const { states } = useStates();
  const toast = useToast();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    body: "",
    teller: "",
    keywords: "",
    tags: [],
    state: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = Number(e.target.value);

    // Add the selected tag to the list if not already present
    if (!formData.tags.includes(selectedTag)) {
      setFormData({ ...formData, tags: [...formData.tags, selectedTag] });
    }
  };

  const removeTag = (tagId: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagId),
    });
  };

  const handleSubmit = async () => {
    const requestData = {
      state_id: formData.state,
      title: formData.title,
      body: formData.body,
      teller: formData.teller,
      keywords: formData.keywords,
      tags: formData.tags,
    };

    try {
      await axios.post(`${baseUrl}/${apiVersion}/stories/`, requestData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast({
        title: "نجاح",
        description: "تمت إضافة القصة بنجاح",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      window.location.reload();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة القصة",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error creating story:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="primary.100">
        <ModalHeader color="primary.800" fontFamily="heading">
          إضافة قصة جديدة
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="title" mb={4}>
            <FormLabel color="primary.900" fontFamily="body">
              عنوان القصة
            </FormLabel>
            <Input
              backgroundColor={"primary.500"}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="أدخل عنوان القصة"
              color="white"
            />
          </FormControl>

          <FormControl id="body" mb={4}>
            <FormLabel color="primary.900" fontFamily="body">
              نص القصة
            </FormLabel>
            <Textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="أدخل نص القصة"
              color="white"
              backgroundColor={"primary.500"}
              _hover={{ bg: "secondary.200" }}
              _focus={{ bg: "primary.500", borderColor: "secondary.500" }}
            />
          </FormControl>

          <FormControl id="teller" mb={4}>
            <FormLabel color="primary.900" fontFamily="body">
              الراوي
            </FormLabel>
            <Input
              backgroundColor={"primary.500"}
              name="teller"
              value={formData.teller}
              onChange={handleChange}
              placeholder="أدخل اسم الراوي"
              color="white"
            />
          </FormControl>

          <FormControl id="keywords" mb={4}>
            <FormLabel color="primary.900" fontFamily="body">
              الكلمات المفتاحية (مفصولة بفواصل)
            </FormLabel>
            <Input
              backgroundColor={"primary.500"}
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="أدخل الكلمات المفتاحية"
              color="white"
            />
          </FormControl>

          <FormControl id="state">
            <FormLabel>المحافظة</FormLabel>
            <Select
              backgroundColor={"primary.500"}
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="اختر المحافظة"
              _placeholder={{
                color: "white",
                opacity: 0.4,
              }}
            >
              {states.map((state) => (
                <option
                  style={{ color: "black" }}
                  key={state.id}
                  value={state.id}
                >
                  {state.attributes.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="tags" mb={4}>
            <FormLabel>النوع</FormLabel>
            <Select
              backgroundColor={"primary.500"}
              name="tags"
              onChange={handleTagChange}
              placeholder="اختر النوع"
              _placeholder={{
                color: "white",
                opacity: 0.4,
              }}
            >
              {tags.map((tag) => (
                <option style={{ color: "black" }} key={tag.id} value={tag.id}>
                  {tag.attributes.name}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Display selected tags as badges */}
          <HStack spacing={2} mb={4} wrap="wrap">
            {formData.tags.map((tagId) => {
              const tag = tags.find((tag) => tag.id === tagId);
              return (
                <Badge
                  key={tagId}
                  backgroundColor={"secondary.500"}
                  p={2}
                  borderRadius={"xl"}
                >
                  <HStack justifyContent={"space-between"}>
                    <Text>{tag?.attributes.name}</Text>
                    <IconButton
                      ml={2}
                      size="xs"
                      backgroundColor={"transparent"}
                      icon={<CloseIcon />}
                      onClick={() => removeTag(tagId)}
                      aria-label="Remove tag"
                    />
                  </HStack>
                </Badge>
              );
            })}
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="primary.500"
            color="white"
            _hover={{ bg: "primary.600" }}
            mr={3}
            onClick={handleSubmit}
          >
            إضافة
          </Button>
          <Button variant="ghost" onClick={onClose} color="primary.500">
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
