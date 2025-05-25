import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import AddEditMovie from "./pages/AddEditMovie";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Box bg="#F3F3F3" minH="100vh">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/add" element={<AddEditMovie />} />
        <Route path="/edit/:id" element={<AddEditMovie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}