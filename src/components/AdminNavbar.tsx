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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BiLogOut, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AddStoryModal from "./Modals/AddStoryModal";
import UpdateUserModal from "./Modals/UpdateUserModal"; // Import the new modal

export default function AdminNavbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDialogOpen,
    onOpen: onDialogOpen,
    onClose: onDialogClose,
  } = useDisclosure();
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
        toast({
          title: "تسجيل الخروج",
          description: "تم تسجيل الخروج بنجاح",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      });
    localStorage.clear();
    navigate("/");
  };

  const handleUpdateSuccess = () => {
    localStorage.clear(); // Perform any action after a successful user update (e.g., log out)
    navigate("/admin"); // Redirect or any other success action
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
            {/* Desktop Buttons */}
            <Button
              onClick={onOpen}
              border={"1px solid"}
              borderColor={"secondary.500"}
              _hover={{ backgroundColor: "primary.500" }}
              display={isMobile ? "none" : "flex"}
            >
              <HStack spacing={2}>
                <Icon as={AddIcon} color="secondary.500" />
                <Text fontWeight="bold" color="secondary.500">
                  إضافة قصة
                </Text>
              </HStack>
            </Button>

            <Button
              onClick={onDialogOpen}
              border={"1px solid"}
              backgroundColor={"primary.500"}
              color={"white"}
              _hover={{
                backgroundColor: "secondary.500",
                color: "primary.500",
              }}
              display={isMobile ? "none" : "flex"}
            >
              <HStack spacing={2}>
                <Text fontWeight="bold">تحديث المستخدم</Text>
              </HStack>
            </Button>

            <Button
              onClick={handleLogout}
              border={"1px solid"}
              backgroundColor={"primary.500"}
              color={"white"}
              _hover={{
                backgroundColor: "secondary.500",
                color: "primary.500",
              }}
              display={isMobile ? "none" : "flex"}
            >
              <HStack spacing={2}>
                <Icon as={BiLogOut} />
                <Text fontWeight="bold">تسجيل الخروج</Text>
              </HStack>
            </Button>

            {/* Mobile Menu - Hamburger Icon */}
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                display={isMobile ? "flex" : "none"}
              />
              <MenuList>
                <MenuItem icon={<AddIcon />} onClick={onOpen}>
                  إضافة قصة
                </MenuItem>
                <MenuItem icon={<BiUser />} onClick={onDialogOpen}>
                  تحديث المستخدم
                </MenuItem>
                <MenuItem icon={<BiLogOut />} onClick={handleLogout}>
                  تسجيل الخروج
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <Box />
        )}
      </HStack>

      {/* Modals */}
      <AddStoryModal isOpen={isOpen} onClose={onClose} />
      <UpdateUserModal
        isOpen={isDialogOpen}
        onClose={onDialogClose}
        onSuccess={handleUpdateSuccess}
      />
    </>
  );
}
