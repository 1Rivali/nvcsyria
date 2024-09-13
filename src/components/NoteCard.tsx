import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import noteImage from "../assets/note-image.png";
interface NoteCardProps {
  text: string;
  transform: string;
}
export const NoteCard: React.FC<NoteCardProps> = ({
  text,
  transform,
  ...props
}) => {
  return (
    <Box
      position={"absolute"}
      m={"auto"}
      left={"5%"}
      bottom={0}
      top={0}
      height={"80%"}
      width={"40%"}
      transform={transform}
      {...props}
    >
      <Image
        src={noteImage}
        width={"full"}
        height={"full"}
        position={"absolute"}
      />
      <Heading
        position={"relative"}
        height={"min-content"}
        width={"20%"}
        top={"30%"}
        right={0}
        left={0}
        mx={"auto"}
      >
        خدماتنا
      </Heading>
      <Text
        position={"relative"}
        top={"40%"}
        bottom={"50%"}
        px={"10%"}
        m={"auto"}
        fontSize={"xl"}
      >
        {text}
      </Text>
    </Box>
  );
};
