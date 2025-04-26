import axios from "axios";

const API_URL = "https://fptkahoot-eqebcwg8aya7aeea.southeastasia-01.azurewebsites.net/api";

export const createKahoot = async (kahootData) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJUZWFjaGVyIiwiZXhwIjoxNzQ1NjY4MzMyLCJpc3MiOiJLYWhvb3QiLCJhdWQiOiJLYWhvb3QgRW5kIFVzZXJzIn0.Ic8yXpGe5E1oLi1em0mQgPVo9fP8pAUZsyqpkMCSDUI"; // nên tách ra file .env hoặc lấy từ localStorage

        const response = await axios.post(`${API_URL}/quiz`, kahootData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });

        const quizId = response.data?.data?.quizId;
        if (quizId) {
            localStorage.setItem("quizId", quizId.toString());
            localStorage.setItem("quizTitle", kahootData.get("Title"));
            localStorage.setItem("token", token); // Lưu token vào localStorage nếu cần thiết
        }

        return response.data; // vẫn trả về để component dùng nếu muốn
    } catch (error) {
        console.error("❌ Create Kahoot API error:", error);
        throw error;
    }
};
