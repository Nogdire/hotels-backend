import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Register
// hhtp://localhost:3002/api/auth/register
router.post("/register", register);

// Login
router.post("/login", login);

// Get Me
router.get("/getme", checkAuth, getMe);

export default router;
