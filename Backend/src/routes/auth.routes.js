import express from "express";
import { registerUserController,loginUserController
    ,logoutUserController,getMeController } from "../controllers/auth.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get("/",(req,res)=>{
    res.status(200).json({
        msg : "auth routes api up and running"
    })
})

/**
 * @route POST
 * @description Register a new user
 */

router.post("/register",registerUserController)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 */
router.post("/login",loginUserController)

/**
 * @route GET /api/auth/logout
 * @description user logout
 */

router.get("/logout",logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
router.get("/get-me",authUserMiddleware,getMeController)

export default router