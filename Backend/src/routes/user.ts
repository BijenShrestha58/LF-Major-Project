import express from "express";
import { createUser, getUsers } from "../controller/user";
import { validateReqBody } from "../middlewares/validator";
import { createUserBodySchema } from "../schema/user/createUser";
import { getUserByUsername } from "../controller/user";

const router = express();

router.get("/", getUsers);
router.post("/", validateReqBody(createUserBodySchema), createUser);
router.get("/:username", getUserByUsername);
export default router;
