import userModel from "../models/user.model.js";
import tokenBlacklistModel from "../models/blacklist.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

/**
 * @description register new user
 */

 export async function registerUserController(req,res) {
    const {userName,email,password} = req.body

    if(!userName || !email || !password){
        return res.status(400).json({
            message : "please provide the necessay credentials"
        })
    }

    const userExists = await userModel.findOne({
        $or : [{userName},{email}]
    })

    if(userExists){
        return res.status(400).json({
            message : "credentials already in use"
        })
    }

    const hash =  await bcrypt.hash(password,10)

    const user = await userModel.create({
        userName,
        email,
        password : hash
    })

    const token = jwt.sign(
        {id : user._id , userName : user.userName},
        process.env.JWT_SECRET,
        {expiresIn : "3d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message : "User registered successfully",
        user : {
            id : user._id,
            userName : user.userName,
            email : user.email
        }
    })


}

/**
 * @description login a user , expects email and password
 */
export async function loginUserController(req,res){
    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }

    const token = jwt.sign(
        {id: user._id , userName : user.userName},
        process.env.JWT_SECRET,
        {expiresIn : "3d"}
    )

    res.cookie("token",token)
    res.status(200).json({
        message : "User logged In successfully",
        user : {
            id : user._id,
            userName : user.userName,
            email : user.email
        }
    })
}

/**
 * @description logout
 */
export async function logoutUserController(req,res) {
    const token = req.cookies.token

    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")
    res.status(200).json({
        message : "User logged out successfully"
    })
}

/**
 * @description user data
 */
export async function getMeController(req,res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message : "User details fetched successfully",
        user : {
            id : user._id,
            userName : user.userName,
            email : user.email
        }
    })
}


