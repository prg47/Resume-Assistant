import { PDFParse } from "pdf-parse"
import { generateInterviewReport,generateResumePdf, } from "../services/ai.service.js"
import interviewReportModel from "../models/interviewReport.model.js"


export async function generateInterviewReportController(req, res) {
    try {
        const parser = new PDFParse({
            data: req.file.buffer,
        });

        const pdfResult = await parser.getText();

        const resumeContent = pdfResult.text;

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription,
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAi,
        });

        res.status(201).json({
            message: "Interview Report generated successfully",
            interviewReport,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
}

export async function getInterviewReportById(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id,
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found.",
            });
        }

        return res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error.",
        });
    }
}

export async function getAllInterviewReports(req, res, next) {
    try {
        const excludedFields = [
            "-resume",
            "-selfDescription",
            "-jobDescription",
            "-__v",
            "-technicalQuestions",
            "-behavioralQuestions",
            "-skillGaps",
            "-preparationPlan",
        ].join(" ");

        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select(excludedFields);

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error.",
        });
    }
}

export async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params;

        const interviewReport = await interviewReportModel.findById(
            interviewReportId
        );

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found.",
            });
        }

        const {
            resume,
            jobDescription,
            selfDescription,
        } = interviewReport;

        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription,
        });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
        });

        return res.send(pdfBuffer);
    } catch (error) {
        console.error(
            "Generate resume PDF controller error:",
            error
        );

        return res.status(500).json({
            message: "Failed to generate resume PDF.",
            error:
                process.env.NODE_ENV === "development"
                    ? error instanceof Error
                        ? error.message
                        : String(error)
                    : undefined,
        });
    }
}