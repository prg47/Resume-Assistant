import express from "express";

const router = express.Router()

router.get("/",(req,res)=>{
    res.status(200).json({
        msg : "auth routes api up and running"
    })
})

export default router