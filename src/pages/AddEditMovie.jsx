import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    Heading,
    useToast,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { createMovie, getMovieById, updateMovie } from "../api";
  
  export default function AddEditMovie() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const toast = useToast();
    const [form, setForm] = useState({
      title: "",
      genre: "",
      year: "",
      rating: "",
      poster: "",
      description: "",
    });
  
    useEffect(() => {
      if (isEdit) {
        getMovieById(id).then((res) => setForm(res.data));
      }
    }, [id, isEdit]);
  
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isEdit) {
        await updateMovie(id, form);
        toast({ status: "success", title: "Фильм обновлён" });
      } else {
        await createMovie(form);
        toast({ status: "success", title: "Фильм добавлен" });
      }
      navigate("/");
    };
  
    return (
      <Box px={{ base: 4, md: 10 }} py={8} maxW="600px" mx="auto" bg="white" boxShadow="sm" borderRadius="lg">
        <Heading size="lg" mb={6}>
          {isEdit ? "Редактирование фильма" : "Добавить фильм"}
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Название</FormLabel>
            <Input name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Жанр</FormLabel>
            <Input name="genre" value={form.genre} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Год</FormLabel>
            <Input type="number" name="year" value={form.year} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Рейтинг</FormLabel>
            <Select name="rating" value={form.rating} onChange={handleChange} placeholder="Выберите рейтинг">
              {[10, 9, 8, 7, 6, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Постер (URL)</FormLabel>
            <Input name="poster" value={form.poster} onChange={handleChange} />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Описание</FormLabel>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </FormControl>
          <Button colorScheme="primary" type="submit">
            {isEdit ? "Сохранить" : "Добавить"}
          </Button>
        </form>
      </Box>
    );
  }