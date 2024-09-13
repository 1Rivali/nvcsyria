import { Box, BoxProps, Image } from "@chakra-ui/react";
import React from "react";
import imageFrame from "../assets/square-image-frame.png";

interface FramedImageProps extends BoxProps {
  imageSrc: string;
  imageAlt: string;
  width?: string;
  height?: string;
  transform?: string;
  zIndex?: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export const FramedImage: React.FC<FramedImageProps> = ({
  imageSrc,
  imageAlt,
  width = "350px",
  height = "350px",
  transform = "none",
  zIndex = 1,

  ...props
}) => {
  return (
    <Box
      position={"relative"}
      width={width}
      height={height}
      // backgroundImage={`url(${imageFrame})`}
      // backgroundSize="contain"
      // backgroundRepeat="no-repeat"
      // backgroundPosition="center"
      // boxShadow="0px 4px 15px rgba(0, 0, 0, 0.75)"
      transform={transform}
      zIndex={zIndex}
      {...props}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        position="absolute"
        top="3%"
        left="4%"
        bottom="3%"
        width="92%"
        height="90%"
      />
    </Box>
  );
};
