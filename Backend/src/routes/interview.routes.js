import express from "express"
import { authUserMiddleware } from "../middlewares/auth.middleware.js"
import { generateInterviewReportController,getInterviewReportById,getAllInterviewReports } from "../controllers/interview.controller.js"
import { upload } from "../middlewares/file.middleware.js"

const router = express.Router()

/**
 * @route POST
 * @description generate new interview report on basis of user self description resume pdf and job description
 * @access private
 */

router.post("/",authUserMiddleware,upload.single("resume"),generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by id
 * @access private
 */

router.get("/report/:interviewId",authUserMiddleware,getInterviewReportById)

/**
 * @route GET /api/interview
 * @description get all interview reports of logged in user
 */
router.get("/", authUserMiddleware, getAllInterviewReports)


export default router