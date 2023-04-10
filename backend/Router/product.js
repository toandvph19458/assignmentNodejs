import express from "express";
import {
  getAllproduct,
  getOnecate,
  getOneproduct,
  productAdd,
  productRemove,
  productupdate,
  getAllproductSort,
  getAllcateproduct,
} from "../Controller/product.js";
import checkAuth from "../midlewares/checkAuth.js";
import { getAllcate } from "../Controller/cateProduct.js";

const router = express.Router();

router.post("/", productAdd);
router.get("/:id", getOneproduct);
router.get("/", getAllproduct);
router.get("/cate/:id", getAllcateproduct);
router.put("/:id", productupdate);
router.delete("/:id", productRemove);
router.post("/sort/", getAllproductSort);

router.get("/productcate/:id", checkAuth, getOnecate);

export default router;
