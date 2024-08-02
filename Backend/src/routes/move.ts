import express from "express";
import { getMoveById } from "../controller/move";

const router = express();

router.get("/:id", getMoveById);

export default router;
