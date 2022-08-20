import express from 'express';
const router = express.Router();

import authenticateUser from "../middleware/auth.js";

import {register, login, updateUser} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 10,
    message: 'too many requests from this source, please try again in 15 mins'
})

router.route('/register')
    .post(apiLimiter, register);

router.route('/login')
    .post(apiLimiter, login);

router.route("/update-user")
    .patch(authenticateUser, updateUser);

export default router;

