import { Router } from "express";
import {
  createcollection,
  deletecollection,
  getcollection,
  getcollections,
  updatecollection,
} from "../controllers/collections";

const router = Router();

// router.route("/").get(getCategories).post(adminOnly, createCategory);
router.route("/").get(getcollections).post(createcollection);
router
  .route("/:id")
  .get(getcollection)
  .put(updatecollection)
  .delete(deletecollection);

export default router;
