import express from "express";
import {
  createTeamPokemon,
  addMovesToTeamPokemon,
  getTeamPokemonById,
  getPokemonImageByTeamPokemonId,
} from "../controller/teamPokemon";

const router = express();

router.post("/", createTeamPokemon);
router.put("/add-moves", addMovesToTeamPokemon);
router.get("/:id", getTeamPokemonById);
router.get("/image/:id", getPokemonImageByTeamPokemonId);

export default router;
