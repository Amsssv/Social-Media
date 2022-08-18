import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";

const router = Router();
const controller = new UserController();

router.post(
  "/signup",
  body("email").isEmail().withMessage("Incorrect Email"),
  body("password")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password is too short"),
  controller.signUp
);
router.post("/login", controller.logIn);

// router.get('/refresh', UserController.refresh);

export default router;
