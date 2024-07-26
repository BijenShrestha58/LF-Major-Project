import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  getMyDetails,
} from "../controller/user";
import { validateReqBody } from "../middlewares/validator";
import { createUserBodySchema } from "../schema/user/createUser";
import { getUserByUsername } from "../controller/user";
import { authenticate } from "../middlewares/auth";

const router = express();

router.get("/", getUsers);
router.post("/", validateReqBody(createUserBodySchema), createUser);
router.get("/me", authenticate, getMyDetails);
router.get("/username/:username", authenticate, getUserByUsername);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
