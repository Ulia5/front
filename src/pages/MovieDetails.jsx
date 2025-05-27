import React from 'react';
import {
    Box,
    Heading,
    Text,
    Image,
    Button,
    Flex,
    Spinner,
    useToast,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { deleteMovie, getMovieById, isFavorite, toggleFavorite } from "../api";
  import { Star, StarOff } from "lucide-react";
  
  export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [movie, setMovie] = useState(null);
    const [fav, setFav] = useState(false);
  
    useEffect(() => {
      getMovieById(id)
        .then((res) => {
          setMovie(res.data);
          setFav(isFavorite(res.data.id));
        })
        .catch(() => navigate("/"));
    }, [id, navigate]);
  
    const handleDelete = async () => {
      await deleteMovie(id);
      toast({ status: "success", title: "Фильм удалён" });
      navigate("/");
    };
  
    const handleToggleFav = () => {
      toggleFavorite(movie.id);
      setFav(!fav);
    };
  
    if (!movie)
      return (
        <Flex justify="center" mt={20}>
          <Spinner size="xl" />
        </Flex>
      );
  
    return (
      <Box px={{ base: 4, md: 10 }} py={8} maxW="900px" mx="auto" bg="white" borderRadius="lg" boxShadow="sm">
        {movie.poster && (
          <Image src={movie.poster} alt={movie.title} w="100%" h="400px" objectFit="cover" mb={6} borderRadius="lg" />
        )}
        <Heading mb={3}>{movie.title}</Heading>
        <Text mb={1} color="gray.600">
          {movie.year} • {movie.genre} • ⭐ {movie.rating}
        </Text>
        <Text mb={6}>{movie.description}</Text>
        <Flex gap={4}>
          <Button leftIcon={fav ? <Star /> : <StarOff />} colorScheme="primary" onClick={handleToggleFav}>
            {fav ? "Убрать из избранного" : "В избранное"}
          </Button>
          <Button onClick={() => navigate(`/edit/${movie.id}`)}>Редактировать</Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Удалить
          </Button>
        </Flex>
      </Box>
    );
  }