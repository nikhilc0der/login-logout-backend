import { Router } from "express";
import {
  forgetUser,
  loginUser,
  logoutUser,
  registerUser,
  resetpassword,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/forgotPassword").post(forgetUser);

router.route("/resetpassword").patch(resetpassword);

router.route("/logout").post(verifyJWT, logoutUser);

export default router;
