import express from "express";
import {
  addCate,
  cateRemove,
  cateUpdate,
  getAllcate,
} from "../Controller/cateProduct.js";
import checkAuth from "../midlewares/checkAuth.js";

const router = express.Router();

router.get("/", getAllcate);
router.post("/", addCate);
router.put("/:id", cateUpdate);
router.delete("/:id", cateRemove);

export default router;
