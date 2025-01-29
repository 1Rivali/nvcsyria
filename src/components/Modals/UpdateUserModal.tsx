// UpdateUserModal.tsx
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config/constants";

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateUserModal({
  isOpen,
  onClose,
  onSuccess,
}: UpdateUserModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleUpdateUser = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/update_user`,
        { username, password },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (response.status === 204) {
        toast({
          title: "تحديث المستخدم",
          description: "تم تحديث معلومات المستخدم بنجاح",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onSuccess(); // Call the success handler to log out or perform another action
        onClose(); // Close the modal
      }
      if (response.status === 400) {
        toast({
          title: "خطأ",
          description: "فشل تحديث المستخدم، يوجد مستخدم بنفس الاسم",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch {
      toast({
        title: "خطأ",
        description: "فشل تحديث المستخدم",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mr={8}>تحديث بيانات المستخدم</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>اسم المستخدم الجديد</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="اسم المستخدم"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>كلمة المرور الجديدة</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            backgroundColor={"primary.500"}
            color={"white"}
            mr={3}
            onClick={handleUpdateUser}
          >
            تحديث
          </Button>
          <Button variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
