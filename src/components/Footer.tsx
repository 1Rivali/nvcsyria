import { Box, HStack, Text, VStack, Link, Image, Icon } from "@chakra-ui/react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      backgroundColor={"primary.500"}
      py={{ base: "4", md: "6" }}
      px={{ base: "2", md: "4" }}
    >
      {/* Decorative Shapes */}
      <Box
        position="absolute"
        top="-20px"
        left="-20px"
        boxSize="100px"
        backgroundColor="secondary.500"
        borderRadius="full"
        opacity={0.6}
      />
      <Box
        position="absolute"
        bottom="-40px"
        right="-40px"
        boxSize="150px"
        backgroundColor="secondary.500"
        borderRadius="full"
        opacity={0.6}
      />
      <Box
        position="absolute"
        top="30%"
        right="10%"
        width="60px"
        height="60px"
        backgroundColor="secondary.500"
        borderRadius="full"
        opacity={0.3}
      />
      <Box
        position="absolute"
        bottom="20%"
        left="15%"
        width="120px"
        height="120px"
        backgroundColor="secondary.500"
        borderRadius="full"
        opacity={0.3}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="200px"
        height="200px"
        backgroundColor="secondary.500"
        borderRadius="50% 50% 0 50%"
        opacity={0.6}
        zIndex={-1}
      />
      <Box
        position="absolute"
        top="70%"
        right="40%"
        width="80px"
        height="80px"
        backgroundColor="secondary.500"
        borderRadius="full"
        opacity={0.2}
      />
      <Box
        position="absolute"
        top="-30px"
        right="30%"
        width="70px"
        height="70px"
        backgroundColor="secondary.500"
        borderRadius="full"
        opacity={0.6}
      />

      <VStack spacing={4} alignItems={"center"} position="relative" zIndex={1}>
        <Image
          src="/logo.jpg"
          boxSize={{ base: "50px", md: "80px" }}
          borderRadius="full"
        />
        <HStack
          spacing={{ base: 4, md: 8 }}
          wrap="wrap"
          justifyContent="center"
          textAlign="center"
        >
          <Link
            href="/"
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="bold"
            color="white"
            _hover={{ textDecoration: "underline", color: "secondary.500" }}
            mb={{ base: 2, md: 0 }}
          >
            الرئيسية
          </Link>
          <Link
            href="/salam"
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="bold"
            color="white"
            _hover={{ textDecoration: "underline", color: "secondary.500" }}
            mb={{ base: 2, md: 0 }}
          >
            حكايا سلام
          </Link>

          <Link
            href="https://www.instagram.com"
            isExternal
            color="white"
            _hover={{ color: "secondary.500" }}
            mb={{ base: 2, md: 0 }}
          >
            <Icon as={FaInstagram} boxSize={{ base: 5, md: 6 }} />
          </Link>
          <Link
            href="https://www.facebook.com"
            isExternal
            color="white"
            _hover={{ color: "secondary.500" }}
            mb={{ base: 2, md: 0 }}
          >
            <Icon as={FaFacebook} boxSize={{ base: 5, md: 6 }} />
          </Link>
        </HStack>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color={"white"}
          textAlign="center"
          px={{ base: 2, md: 0 }}
        >
          © 2024 تعاطف للتنمية والتواصل اللاعنفي. جميع الحقوق محفوظة.
        </Text>
      </VStack>
    </Box>
  );
}
