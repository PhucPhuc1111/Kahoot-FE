// src/utils/storageUtils.js

// Hàm chung
const sessionStorageWrapper = {
    get: (key) => {
        try {
            const data = sessionStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`[sessionStorage] GET error (${key}):`, error);
            return null;
        }
    },

    set: (key, data) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`[sessionStorage] SET error (${key}):`, error);
            // Xử lý khi bị quá dung lượng
            if (error.name === 'QuotaExceededError') {
                sessionStorage.clear();
                console.warn('Cleared sessionStorage due to quota exceeded');
            }
        }
    }
};

// Hàm riêng cho từng loại dữ liệu
export const questionStorage = {
    save: (data) => sessionStorageWrapper.set('current_question', data),
    load: () => sessionStorageWrapper.get('current_question') || {
        id: Date.now(),
        content: "",
        answers: [],
        timeLimitSec: 30
    }
};

export const answersStorage = {
    save: (data) => sessionStorageWrapper.set('current_answers', data),
    load: () => sessionStorageWrapper.get('current_answers') || [{
        id: '0',
        content: "",
        isAnswer: false
    }]
};

export const quizStorage = {
    save: (data) => sessionStorageWrapper.set('saved_questions', data),
    load: () => sessionStorageWrapper.get('saved_questions') || [],
    clear: () => sessionStorageWrapper.set('saved_questions', [])
};