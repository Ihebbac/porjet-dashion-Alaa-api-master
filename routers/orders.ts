import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrderbycustomer,
  getOrderDetails,
  getOrders,
} from "../controllers/orders";
import { adminOnly } from "../middlewares/authHandler";

const router = Router();

router.route("/").get(getOrders).post(createOrder);
// TESTing only
// router.route("/").patch(getOrderDetails);
router.route("/customer/:id").get(getOrderbycustomer);

router.route("/:id").get(getOrder).delete(deleteOrder);

export default router;
