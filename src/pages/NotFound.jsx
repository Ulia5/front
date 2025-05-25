import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box textAlign="center" py={20}>
      <Heading mb={4}>404</Heading>
      <Text mb={6}>Страница не найдена</Text>
      <Button as={Link} to="/" colorScheme="primary">
        На главную
      </Button>
    </Box>
  );
}