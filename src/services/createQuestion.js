import axios from "axios";

export const createQuestion = async (quizId, questionData) => {
    try {
        const token = localStorage.getItem("token"); // Giả sử bạn đã lưu token khi login

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
