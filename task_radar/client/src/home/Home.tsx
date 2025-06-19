import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

function Home() {
  const linkHoverColor = useColorModeValue("purple.300", "purple.500");

  return (
    <Box minH="100vh" bg="black" color="white" px={6} py={10} position="relative">
      {/* Logo */}
      <Text position="absolute" top={5} left={6} fontSize="xl" fontWeight="bold">
        TaskRadar
      </Text>

      {/* Navigation */}
      <Flex position="absolute" top={5} right={6} gap={4}>
        {["Home", "About", "Blog", "FAQ", "Log in"].map((label, idx) => (
          <Link to={label === "Home" ? "/" : `/${label.replace(/\s+/g, "").toLowerCase()}`} key={idx}>
            <Button
              variant="ghost"
              size="sm"
              color="white"
              _hover={{ bg: "purple.400", color: "white" }}
              fontWeight="medium"
            >
              {label}
            </Button>
          </Link>
        ))}
      </Flex>

      {/* Hero Section */}
      <VStack spacing={8} textAlign="center" maxW="4xl" mx="auto" mt="20">
        <Heading
          as="h1"
          fontSize={["3xl", "5xl", "6xl", "7xl", "8xl"]}
          fontWeight="extrabold"
          fontFamily="serif"
        >
          From Workforce to Worthforce{" "}
          <Text as="span" fontStyle="italic" color="purple.500" fontFamily="serif">
            with TaskRadar.
          </Text>
        </Heading>

        <Text color="gray.400" fontSize="lg" px={4}>
          TaskRadar is more than a project dashboard — it's your intelligent work engine. Designed
          for single-lead teams, it helps assign tasks, manage projects, and gives real-time
          visibility into work patterns, focus time, and productivity.
        </Text>

        <Box
          border="1px solid"
          borderColor="purple.600"
          rounded="lg"
          p={4}
          mt={6}
          display="inline-flex"
        >
          <Button
            size="lg"
            px={6}
            py={3}
            fontSize="md"
            colorScheme="purple"
            rightIcon={<FaArrowRight />}
            _hover={{ bg: "purple.900" }}
          >
            Get Started
          </Button>
        </Box>

        <HStack spacing={4}>
          <Link to="/login">
            <Button
              bg="purple.700"
              color="white"
              _hover={{ bg: "purple.600", color: "white" }}
              size="lg"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              bg="purple.700"
              color="white"
              _hover={{ bg: "purple.600", color: "white" }}
              size="lg"
            >
              Sign Up
            </Button>
          </Link>
        </HStack>
      </VStack>

      {/* Footer */}
      <Text position="absolute" bottom={5} fontSize="sm" color="gray.400" opacity={0.7} textAlign="center" w="100%">
        Built with MERN • Analytics Ready • Built for Builders • Powered by Productivity
      </Text>
    </Box>
  );
}

export default Home;