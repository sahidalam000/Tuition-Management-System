import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  forgotPassword
} from "../controllers/authController.js";

const router = express.Router();


// REGISTER
router.post(
"/register",
registerUser
);


router.post(
"/login",
loginUser
);


router.put(

"/forgot-password",

forgotPassword

);


router.get(

"/me",

protect,

getCurrentUser

);

export default router;
