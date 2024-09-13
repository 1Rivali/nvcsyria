import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config/constants";

const AdminLogin = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin/home");
    }
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      });
      localStorage.setItem("token", `Bearer ${response.data.data.token}`);
      toast({
        title: "تسجيل الدخول ناجح",
        description: "تم تسجيل الدخول بنجاح",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/admin/home");
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="primary.50"
      dir="rtl" // Right-to-left direction for Arabic
    >
      <Box
        w={{ base: "90%", sm: "80%", md: "400px" }}
        p={{ base: "6", md: "8" }}
        bg="white"
        borderRadius="10px"
        boxShadow="lg"
      >
        <Heading
          mb="6"
          color="primary.500"
          textAlign="center"
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          تسجيل الدخول
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <FormControl id="username" isRequired>
              <FormLabel>اسم المستخدم</FormLabel>
              <Input
                type="text"
                placeholder="أدخل اسم المستخدم"
                _placeholder={{ color: "white", opacity: "0.8" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>كلمة المرور</FormLabel>
              <Input
                type="password"
                placeholder="أدخل كلمة المرور"
                _placeholder={{ color: "white", opacity: "0.8" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              bg="primary.500"
              _hover={{ bg: "secondary.600" }}
              size="lg"
              w="100%"
            >
              تسجيل الدخول
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLogin;
