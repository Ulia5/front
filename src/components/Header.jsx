import React from 'react';
import { Flex, Heading, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const linkStyle = (path) => ({
    fontWeight: pathname === path ? 600 : 500,
    textDecoration: "none",
  });

  return (
    <Flex
      bg="white"
      px={{ base: 4, md: 10 }}
      py={4}
      align="center"
      justify="space-between"
      boxShadow="sm"
    >
      <Heading size="md" as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
        Фильмограф
      </Heading>
      <Flex gap={6} align="center">
        <Link as={RouterLink} to="/" sx={linkStyle("/")}>Главная</Link>
        <Link as={RouterLink} to="/favorites" sx={linkStyle("/favorites")}>
          Избранное
        </Link>
        <Button
          as={RouterLink}
          to="/add"
          colorScheme="primary"
          size="sm"
          display={{ base: "none", md: "inline-flex" }}
        >
          + Добавить фильм
        </Button>
      </Flex>
    </Flex>
  );
}