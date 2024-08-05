import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import pokemonRouter from "./pokemon";
import teamPokemonRouter from "./teamPokemon";
import teamRouter from "./team";
import moveRouter from "./move";
import battleRouter from "./battle";

const router = express();
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/pokemon", pokemonRouter);
router.use("/team-pokemon", teamPokemonRouter);
router.use("/team", teamRouter);
router.use("/move", moveRouter);
router.use("/battle", battleRouter);
export default router;
