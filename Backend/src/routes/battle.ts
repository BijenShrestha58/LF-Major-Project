import express from "express";
import { createBattle } from "../controller/battle";
import { getAllBattleData } from "../controller/battle";

const router = express();

router.post("/", createBattle);
router.get("/:id", getAllBattleData);

export default router;
