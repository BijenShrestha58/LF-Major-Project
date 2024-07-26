import express from "express";
import userRouter from "./user";
import authRouter from "./auth";

const router = express();
router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
