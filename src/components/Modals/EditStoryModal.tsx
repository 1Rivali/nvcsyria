import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  HStack,
  Badge,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { IState } from "../../types/stateTypes";
import { ITag } from "../../types/tagTypes";
import { StoryFormData } from "../../pages/AdminHome";
import { CloseIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";

interface EditStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: StoryFormData;
  handleFormChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleEditSubmit: () => void;
  setFormData: Dispatch<SetStateAction<StoryFormData>>;
  states: IState[];
  tags: ITag[];
}

const EditStoryModal: React.FC<EditStoryModalProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleFormChange,
  handleEditSubmit,
  states,
  tags,
}) => {
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = Number(e.target.value);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="primary.100">
        <ModalHeader color="primary.800" fontFamily="heading">
          تعديل القصة
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
              onChange={handleFormChange}
              placeholder="أدخل عنوان القصة"
              color="white"
            />
          </FormControl>

          <FormControl id="state_id" mb={4}>
            <FormLabel color="primary.900" fontFamily="body">
              المحافظة
            </FormLabel>
            <Select
              backgroundColor={"primary.500"}
              name="state_id"
              value={formData.state_id}
              onChange={handleFormChange}
              placeholder="اختر المحافظة"
              _placeholder={{
                color: "white",
                opacity: 0.4,
              }}
            >
              {states &&
                states.map((state) => (
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

          <FormControl id="teller" mb={4}>
            <FormLabel color="primary.900" fontFamily="body">
              الراوي
            </FormLabel>
            <Input
              backgroundColor={"primary.500"}
              name="teller"
              value={formData.teller}
              onChange={handleFormChange}
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
              onChange={handleFormChange}
              placeholder="أدخل الكلمات المفتاحية"
              color="white"
            />
          </FormControl>

          <FormControl id="body" mb={4}>
            <FormLabel color="primary.900" fontFamily="body">
              المحتوى
            </FormLabel>
            <Textarea
              name="body"
              value={formData.body}
              onChange={handleFormChange}
              placeholder="أدخل نص القصة"
              color="white"
              backgroundColor={"primary.500"}
              _hover={{ bg: "secondary.200" }}
              _focus={{ bg: "primary.500", borderColor: "secondary.500" }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="primary.500"
            color="white"
            _hover={{ bg: "primary.600" }}
            mr={3}
            onClick={handleEditSubmit}
          >
            حفظ
          </Button>
          <Button variant="ghost" onClick={onClose} color="primary.500">
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditStoryModal;
