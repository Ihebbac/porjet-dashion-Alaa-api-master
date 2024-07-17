import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductCount,
  getProducts,
  searchProducts,
  searchProductsByCat,
  searchProductsByCollection,
  updateProduct,
} from "../controllers/products";
import { adminOnly } from "../middlewares/authHandler";

const router = Router();

router
  .get("/", getProducts)
  .get("/count", getProductCount)
  .get("/search", searchProducts)
  .post("/", createProduct);

router
  .get("/:id", getProduct)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);

router.get("/cat/:catId", searchProductsByCat);
router.get("/col/:colId", searchProductsByCollection);

export default router;
