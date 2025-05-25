import {
    Box,
    Heading,
    Flex,
    SimpleGrid,
    Input,
    Select,
    Button,
    Spinner,
    useToast,
  } from "@chakra-ui/react";
  import { useEffect, useMemo, useState } from "react";
  import MovieCard from "../components/MovieCard";
  import { getMovies } from "../api";
  
  export default function Home() {
    const toast = useToast();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
  
    useEffect(() => {
      getMovies()
        .then((res) => setMovies(res.data))
        .catch(() => toast({ status: "error", title: "Ошибка загрузки фильмов" }))
        .finally(() => setLoading(false));
    }, [toast]);
  
    // Собираем уникальные значения для селектов
    const genres = useMemo(() => [...new Set(movies.map((m) => m.genre))], [movies]);
    const years = useMemo(() => [...new Set(movies.map((m) => m.year))].sort((a, b) => b - a), [movies]);
  
    const filtered = useMemo(() => {
      return movies.filter((m) => {
        const bySearch = m.title.toLowerCase().includes(search.toLowerCase());
        const byGenre = genre ? m.genre === genre : true;
        const byYear = year ? String(m.year) === year : true;
        const byRating = rating ? m.rating >= Number(rating) : true;
        return bySearch && byGenre && byYear && byRating;
      });
    }, [movies, search, genre, year, rating]);
  
    const resetFilters = () => {
      setSearch("");
      setGenre("");
      setYear("");
      setRating("");
    };
  
    return (
      <Box px={{ base: 4, md: 10 }} py={8} maxW="1440px" mx="auto">
        <Heading size="xl" mb={6} fontWeight="bold">
          Фильмы
        </Heading>
  
        {/* Фильтры */}
        <Flex gap={4} wrap="wrap" mb={8}>
          <Input
            placeholder="Поиск по названию"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxW="250px"
            bg="white"
          />
          <Select
            placeholder="Жанр"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            bg="white"
            maxW="200px"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Год"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            bg="white"
            maxW="120px"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Рейтинг ≥"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            bg="white"
            maxW="150px"
          >
            {[9, 8, 7, 6, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
          <Button onClick={resetFilters} variant="outline" colorScheme="primary">
            Сбросить
          </Button>
        </Flex>
  
        {loading ? (
          <Flex justify="center" mt={20}>
            <Spinner size="xl" />
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
            {filtered.map((movie) => (
              <MovieCard key={movie.id} movie={movie} showFavoriteButton />
            ))}
          </SimpleGrid>
        )}
      </Box>
    );
  }