import express from "express";
import { signin, signup } from "../Controller/authController.js";
import {
  addUser,
  userRemove,
  userUpdate,
} from "../Controller/userController.js";
import checkAuth from "../midlewares/checkAuth.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/signin", signin);

router.delete("/delete", userRemove);
router.put("/update/:id", userUpdate);
router.post("/add", addUser);

export default router;
