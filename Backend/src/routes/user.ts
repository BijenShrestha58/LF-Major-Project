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
import { authenticate, authorize } from "../middlewares/auth";

const router = express();

router.get("/", getUsers);
router.post("/", validateReqBody(createUserBodySchema), createUser);
router.get("/me", authenticate, authorize(["user", "admin"]), getMyDetails);
router.get("/username/:username", authenticate, getUserByUsername);
router.get("/:id", authenticate, authorize(["user", "admin"]), getUserById);
router.put("/:id", authenticate, authorize(["user", "admin"]), updateUser);
router.delete("/:id", authenticate, authorize(["user", "admin"]), deleteUser);

export default router;
