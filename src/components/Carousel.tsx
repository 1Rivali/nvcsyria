import React, { useState, useEffect } from "react";
import { Box, IconButton, Image, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps {
  items: string[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically transition to the next slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <Box
      position="relative"
      width={{ base: "100%", md: "80%" }}
      margin="0 auto"
      height={"full"}
    >
      <Flex>
        <Box flex="none" width="100%" position="relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                opacity: { duration: 1 },
              }}
              style={{ position: "absolute", width: "100%" }}
            >
              <Image
                src={items[currentIndex]}
                alt={`Slide ${currentIndex}`}
                width="100%"
                height={{ base: "60vh", md: "80vh" }}
                objectFit="cover"
                borderRadius="xl"
                boxShadow="10px 10px 15px rgba(0, 0, 0, 0.5)"
              />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Flex>

      <IconButton
        aria-label="Previous Slide"
        icon={<ChevronLeftIcon boxSize={{ base: "5", md: "7" }} />}
        position="absolute"
        top="50%"
        left={{ base: "5px", md: "10px" }}
        transform="translateY(-50%)"
        backgroundColor="primary.500"
        color="white"
        _hover={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        onClick={goToPrevious}
        borderRadius="full"
        size={{ base: "sm", md: "md" }}
      />

      <IconButton
        aria-label="Next Slide"
        icon={<ChevronRightIcon boxSize={{ base: "5", md: "7" }} />}
        position="absolute"
        top="50%"
        right={{ base: "5px", md: "10px" }}
        transform="translateY(-50%)"
        backgroundColor="primary.500"
        color="white"
        _hover={{ backgroundColor: "secondary.500", color: "primary.500" }}
        onClick={goToNext}
        borderRadius="full"
        size={{ base: "sm", md: "md" }}
      />
    </Box>
  );
};

export default Carousel;
