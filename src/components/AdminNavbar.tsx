import { AddIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config/constants";
import AddStoryModal from "./Modals/AddStoryModal";

export default function AdminNavbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    axios
      .post(
        `${baseUrl}/logout/`,
        {},
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(() => {
        localStorage.clear();
        navigate("/");

        toast({
          title: "تسجيل الخروج",
          description: "تم تسجيل الخروج بنجاح",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <HStack
        px={{ base: "2", md: "4" }}
        justifyContent={"space-between"}
        borderBottom="2px solid"
        borderColor={"secondary.500"}
        alignItems={isMobile ? "center" : "center"}
      >
        <Image
          src="/logo.jpg"
          boxSize={isMobile ? "70px" : "120px"}
          mb={isMobile ? "2" : "0"}
        />

        <Box textAlign={isMobile ? "center" : "center"}>
          <Text fontWeight={"bold"} fontSize={isMobile ? "md" : "2xl"}>
            تعاطف للتنمية والتواصل اللاعنفي
          </Text>
          <Text
            color={"secondary.500"}
            fontWeight={"bold"}
            fontSize={isMobile ? "sm" : "xl"}
          >
            مجتمع يحيا بسلام
          </Text>
        </Box>

        {localStorage.getItem("token") ? (
          <HStack spacing={3}>
            <Button
              onClick={onOpen}
              border={"1px solid"}
              borderColor={"secondary.500"}
              _hover={{ backgroundColor: "primary.500" }}
              display={isMobile ? "none" : "flex"} // Hide button on mobile
            >
              <HStack spacing={2}>
                <Icon as={AddIcon} color="secondary.500" />
                <Text fontWeight="bold" color="secondary.500">
                  إضافة قصة
                </Text>
              </HStack>
            </Button>
            <IconButton
              aria-label="Add Story"
              icon={<AddIcon />}
              onClick={onOpen}
              display={isMobile ? "flex" : "none"} // Show icon only on mobile
            />
            <Button
              onClick={handleLogout}
              border={"1px solid"}
              backgroundColor={"primary.500"}
              color={"white"}
              _hover={{
                backgroundColor: "secondary.500",
                color: "primary.500",
              }}
              display={isMobile ? "none" : "flex"} // Hide button on mobile
            >
              <HStack spacing={2}>
                <Icon as={BiLogOut} />
                <Text fontWeight="bold">تسجيل الخروج</Text>
              </HStack>
            </Button>
            <IconButton
              aria-label="Log Out"
              icon={<BiLogOut />}
              onClick={handleLogout}
              display={isMobile ? "flex" : "none"} // Show icon only on mobile
            />
          </HStack>
        ) : (
          <Box />
        )}
      </HStack>

      {/* Use the refactored AddStoryModal component */}
      <AddStoryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
