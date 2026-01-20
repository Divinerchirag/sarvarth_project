import { Router } from "express";
import * as controller from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);
router.use(authorizeAdmin("ADMIN"));

router.post("/users", controller.createUser);
router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUser);
router.patch("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

export default router;
