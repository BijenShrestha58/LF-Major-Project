import express from "express";

const router = express();
router.use("/user", userRouter);

export default router;
