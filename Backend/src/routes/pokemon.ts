import express from "express";
import { getAllPokemon, getPokemonDetails } from "../controller/pokemon";

const router = express();

router.get("/", getAllPokemon);

router.get("/:id", getPokemonDetails);

export default router;
