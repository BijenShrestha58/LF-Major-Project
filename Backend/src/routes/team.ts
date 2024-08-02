import express from "express";
import {
  createTeam,
  addPokemonToTeam,
  getTeamById,
  getTeamsByUserId,
} from "../controller/team";

const router = express();

router.post("/", createTeam);
router.put("/add-pokemon", addPokemonToTeam);
router.get("/:id", getTeamById);
router.get("/user/:userId", getTeamsByUserId);
export default router;
