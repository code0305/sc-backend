import express from "express";
import { signup,login, me } from "../controller/userController.js"
import { authUser } from "../middleware/authUser.js";
const router = express.Router();

router.post("/register", signup);
router.post("/login",login)
router.get("/me",authUser,me);
export default router;