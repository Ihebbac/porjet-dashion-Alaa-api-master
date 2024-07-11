import Router from "express";
import {
  changePassword,
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  getMe,
  loginAdmin,
  seedData,
  updateAdmin,
  updateAdminSelf,
} from "../controllers/admins";
import { authorize, adminOnly } from "../middlewares/authHandler";

const router = Router();

router
  .route("/")
  .get( getAdmins)
  .post( createAdmin)
  .put(updateAdminSelf);

router
  .get("/me", getMe)
  .post("/login", loginAdmin)
  .post("/seed", seedData)
  .put("/change-password", changePassword);

router
  .route("/:id")
  .get( getAdmin)
  .put( updateAdmin)
  .delete( deleteAdmin);

export default router;
