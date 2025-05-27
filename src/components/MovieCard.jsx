import React from 'react';
import {
    Card,
    CardBody,
    Image,
    Heading,
    Text,
    Button,
    Flex,
    IconButton,
    Box,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { Star, StarOff } from "lucide-react";
  import { isFavorite, toggleFavorite } from "../api";
  import { useState } from "react";
  
  export default function MovieCard({ movie, showFavoriteButton = false }) {
    const [fav, setFav] = useState(isFavorite(movie.id));
  
    const handleToggle = () => {
      toggleFavorite(movie.id);
      setFav(!fav);
    };
  
    return (
      <Card bg="white" boxShadow="sm" borderRadius="lg" overflow="hidden">
        {movie.poster && (
          <Image src={movie.poster} alt={movie.title} h="300px" w="100%" objectFit="cover" />
        )}
        <CardBody>
          <Flex justify="space-between" align="start" mb={2} gap={2}>
            <Box>
              <Heading size="md" noOfLines={2} mb={1}>
                {movie.title}
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {movie.year} • {movie.genre} • ⭐ {movie.rating}
              </Text>
            </Box>
            {showFavoriteButton && (
              <IconButton
                variant="ghost"
                icon={fav ? <Star fill="currentColor" /> : <StarOff />}
                onClick={handleToggle}
                aria-label="favorite"
              />
            )}
          </Flex>
          <Button as={Link} to={`/movies/${movie.id}`} colorScheme="primary" size="sm">
            Подробнее
          </Button>
        </CardBody>
      </Card>
    );
  }