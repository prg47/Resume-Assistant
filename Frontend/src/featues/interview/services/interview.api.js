import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
}) => {
    try {
        const formData = new FormData();

        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        formData.append("resume", resumeFile);

        const response = await api.post("/api/interview/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error generating interview report:", error);

        throw error.response?.data || error;
    }
};

/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(
            `/api/interview/report/${interviewId}`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching interview report:", error);

        throw error.response?.data || error;
    }
};

/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/api/interview/");

        return response.data;
    } catch (error) {
        console.error("Error fetching interview reports:", error);

        throw error.response?.data || error;
    }
};

/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    try {
        const response = await api.post(
            `/api/interview/resume/pdf/${interviewReportId}`,
            null,
            {
                responseType: "blob",
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to generate resume PDF:", error);

        if (error.response?.data instanceof Blob) {
            try {
                const errorText = await error.response.data.text();
                const errorData = JSON.parse(errorText);

                throw new Error(
                    errorData.message ||
                        "Failed to generate resume PDF."
                );
            } catch {
                throw new Error(
                    "Failed to generate resume PDF."
                );
            }
        }

        throw new Error(
            error.response?.data?.message ||
                error.message ||
                "Failed to generate resume PDF."
        );
    }
};