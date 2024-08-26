import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import colorImage from "../assets/color-image.png";

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const CustomLink = ({ to, children }: CustomLinkProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Link to={to}>
      <Box
        position="relative"
        p={{ base: 6, md: 12 }}
        fontWeight="bold"
        fontSize={{ base: "md", md: "lg" }}
        bgSize={{ base: "150%", md: "cover" }}
        sx={{
          ...(isActive
            ? {
                color: "secondary.300",
                backgroundImage: `url(${colorImage})`,
                backgroundSize: isMobile ? "fill" : "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : { color: "primary" }),
        }}
      >
        {children}
      </Box>
    </Link>
  );
};

export default CustomLink;
