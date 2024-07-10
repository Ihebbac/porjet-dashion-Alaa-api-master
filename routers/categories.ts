import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categories";
import { adminOnly } from "../middlewares/authHandler";

const router = Router();

// router.route("/").get(getCategories).post(adminOnly, createCategory);
router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
