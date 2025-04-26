import axios from "axios";

export const createQuestion = async (questionData) => {
    try {

        const quizId = localStorage.getItem("quizId");
        const quizTitle = localStorage.getItem("quizTitle");
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `https://fptkahoot-eqebcwg8aya7aeea.southeastasia-01.azurewebsites.net/api/quiz/${quizId}/questions`,
            questionData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Create Question API error:", error);
        throw error;
    }
};
