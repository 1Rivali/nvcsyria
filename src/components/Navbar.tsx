import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import CustomLink from "./CustomLink";

export default function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
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
      {
        <Box position={"relative"} textAlign={isMobile ? "center" : "center"}>
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
      }
      {!isMobile && (
        <HStack
          justifyContent={isMobile ? "center" : "flex-end"}
          w={isMobile ? "100%" : "auto"}
        >
          <CustomLink to="/">
            <Text fontSize={isMobile ? "sm" : "md"}>الرئيسية</Text>
          </CustomLink>
          <CustomLink to="/salam">
            <Text fontSize={isMobile ? "sm" : "md"}>حكايا سلام</Text>
          </CustomLink>
        </HStack>
      )}
      {isMobile && (
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={IconButton}
                icon={
                  isOpen ? (
                    <CloseIcon color={"secondary.500"} />
                  ) : (
                    <HamburgerIcon color={"secondary.500"} />
                  )
                }
                border={"solid 2px"}
                borderColor={"secondary.500"}
              />
              <MenuList
                backgroundColor={"white"}
                color={"secondary.500"}
                zIndex={"88"}
              >
                <CustomLink to="/">
                  <Text fontSize={isMobile ? "sm" : "md"}>الرئيسية</Text>
                </CustomLink>
                <CustomLink to="/salam">
                  <Text fontSize={isMobile ? "sm" : "md"}>حكايا سلام</Text>
                </CustomLink>
              </MenuList>
            </>
          )}
        </Menu>
      )}
    </HStack>
  );
}
