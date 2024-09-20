import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import noteImage from "../assets/note-image.png";
interface StickyNoteProps extends BoxProps {
  children?: ReactNode;
  width?: string;
  height?: string;
  // tapeWidth?: string;
  // tapeHeight?: string;
}

function StickyNote({
  children,
  width = "80%",
  height = "100%",
  position = "relative",
  // tapeWidth = "70px",
  // tapeHeight = "25px",
  ...boxProps
}: StickyNoteProps) {
  return (
    <Box
      position={position}
      width={width} // Take the full width of the grid cell
      height={height} // Take the full height of the grid cell
      bgImage={noteImage} // Light yellow background
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      {...boxProps}
    >
      {/* Top Tape */}
      {/* <Box
        position="absolute"
        top="-10px"
        left="50%"
        transform="translateX(-50%) rotate(-10deg)"
        width={tapeWidth} // Tape width as a percentage of the sticky note's width
        height={tapeHeight}
        bg="white" // Light grey for the tape
        opacity={0.8}
      /> */}

      {/* Children */}
      <Box position="relative" p="10px" width="100%" height="100%">
        {children}
      </Box>
    </Box>
  );
}

export default StickyNote;
