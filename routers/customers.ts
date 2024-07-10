import { Router } from "express";
import {
  deleteCustomer,
  getCustomer,
  getCustomers,
} from "../controllers/customers";
import { adminOnly } from "../middlewares/authHandler";

const router = Router();

router.get("/", getCustomers);

router
  .get("/:id", adminOnly, getCustomer)
  .delete("/:id", deleteCustomer);

export default router;
