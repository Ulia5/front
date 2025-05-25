import React from 'react';
import {
    Box,
    Heading,
    SimpleGrid,
    Text,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { getFavorites, getMovies } from "../api";
  import MovieCard from "../components/MovieCard";
  
  export default function Favorites() {
    const [favMovies, setFavMovies] = useState([]);
  
    const loadFavorites = async () => {
      const favIds = getFavorites();
      if (!favIds.length) {
        setFavMovies([]);
        return;
      }
      const res = await getMovies();
      setFavMovies(res.data.filter((m) => favIds.includes(m.id)));
    };
  
    useEffect(() => {
      loadFavorites();
    }, []);
  
    return (
      <Box px={{ base: 4, md: 10 }} py={8} maxW="1440px" mx="auto">
        <Heading size="xl" mb={6} fontWeight="bold">
          Избранное
        </Heading>
  
        {favMovies.length ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
            {favMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} showFavoriteButton />
            ))}
          </SimpleGrid>
        ) : (
          <Text>Вы ещё не добавили фильмы в избранное.</Text>
        )}
      </Box>
    );
  }