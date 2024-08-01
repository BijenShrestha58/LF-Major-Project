import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import pokemonRouter from "./pokemon";
import teamPokemonRouter from "./teamPokemon";
import teamRouter from "./team";

const router = express();
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/pokemon", pokemonRouter);
router.use("/team-pokemon", teamPokemonRouter);
router.use("/team", teamRouter);

export default router;
