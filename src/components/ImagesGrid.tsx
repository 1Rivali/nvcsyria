import React from "react";
import { Grid, Image, Box } from "@chakra-ui/react";
import decoration1 from "../assets/decoration-1.png";
interface ImagesGridProps {
  images: string[];
}
const ImageGrid: React.FC<ImagesGridProps> = ({ images }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
      p={4}
      width={"80%"}
      margin="0 auto"
    >
      {images.map((src, index) => (
        <Box
          key={index}
          overflow="hidden"
          borderRadius="lg"
          boxShadow="lg"
          transition="transform 0.3s ease, box-shadow 0.3s ease"
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "2xl",
          }}
        >
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            objectFit="cover"
            width="100%"
            height="100%"
            transition="opacity 0.3s ease"
            _hover={{ opacity: 0.8 }}
          />

          {/* {index % 2 === 0 ? (
            
          ) : (
            <Box />
          )} */}
        </Box>
      ))}
    </Grid>
  );
};

export default ImageGrid;
