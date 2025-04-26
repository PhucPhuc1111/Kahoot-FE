import React, { state, useState, useEffect } from "react";
import { InputNumber, notification, Upload, Checkbox, Button, Popover } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import * as XLSX from 'xlsx';
import { createQuestion } from '../services/createQuestion.js';

import '../components/CreateQuestion.css';

const CreateQuestion = () => {
    const quizId = localStorage.getItem("quizId");
    const [answers, setAnswers] = useState([{ id: '0', content: "", isAnswer: false }]);
    const [question, setQuestion] = useState({
        id: Date.now(),
        content: "",
        file: null,
        answers: [],
        timeLimitSec: 30, // Giá trị mặc định 30 giây
    });

    const [savedQuestions, setSavedQuestions] = useState(() => {
        if (!quizId) return []; // Nếu không có quizId, trả về mảng rỗng
        const saved = localStorage.getItem(`savedQuestions_${quizId}`);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (quizId) {
            localStorage.setItem(`savedQuestions_${quizId}`, JSON.stringify(savedQuestions));
        }
    }, [savedQuestions, quizId]);
    const handleAddAnswer = () => {
        console.log("LOG:", answers);
        if (answers.length >= 4) {
            notification.error({
                message: 'Số lượng câu trả lời tối đa là 4',
                description: 'Vui lòng nhập nội dung câu hỏi.',
                placement: 'topRight'
            });
        } else {
            const newAnswer = {
                id: Date.now(),
                content: '',
                isAnswer: false
            }
            setAnswers([...answers, newAnswer]);
        }

    }
    const handleToggleCheckbox = (id, isChecked) => {
        const updatedAnswers = answers.map(answer =>
            answer.id === id ? { ...answer, isAnswer: isChecked } : answer
        );
        setAnswers(updatedAnswers);
    };



    const headerStyle = {
        textAlign: "left", color: "black", width: "600px", margin: "30px",


    }

    const handleDuplicateAnswer = (id) => {
        const answerToDuplicate = answers.find((answer) => answer.id === id);

        const newAnswer = { ...answerToDuplicate, id: Date.now() };
        setAnswers([...answers, newAnswer]);
    };
    const handleSaveQuestion = () => {
        const updatedQuestion = {
            ...question,
            answers: answers,
        };

        const isExist = savedQuestions.some(q => q.id === updatedQuestion.id);
        if (updatedQuestion.content === "") {
            notification.error({
                message: 'Lỗi lưu câu hỏi',
                description: 'Vui lòng nhập nội dung câu hỏi.',
                placement: 'topRight'
            });

        } else if (updatedQuestion.answers.length < 2) {
            notification.error({
                message: 'Lỗi lưu câu hỏi',
                description: 'Vui lòng nhập ít nhất 2 câu trả lời.',
                placement: 'topRight'
            });
        } else if (updatedQuestion.answers.some(answer => answer.isAnswer === true) === false) {
            notification.error({
                message: 'Lỗi lưu câu hỏi',
                description: 'Vui lòng nhập 1 đáp án.',
                placement: 'topRight'
            });
        }
        if (isExist) {

            setSavedQuestions(savedQuestions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
        } else {

            setSavedQuestions([...savedQuestions, updatedQuestion]);
        }

        console.log("LOG:", updatedQuestion);
    };
    const handleDeleteAnswer = (id) => {
        const newAnswers = answers.filter((answer) => answer.id !== id);
        setAnswers(newAnswers);
    };

    const handleChangeAnswer = (id, value) => {



        const updatedAnswers = answers.map(answer =>
            answer.id === id ? { ...answer, content: value } : answer
        );

        setAnswers(updatedAnswers);

        console.log("LOG:", updatedAnswers.find(a => a.id === id));
    };
    const handleChangeFile = (file) => {
        setQuestion({ ...question, file: file });
        console.log("LOG:", question.file);

    }
    const handleChangeQuestion = (id, value) => {
        setQuestion({ ...question, content: value });
        console.log("LOG:", question);
    }
    const handleSelectQuestion = (q) => {
        setQuestion({
            id: q.id,
            content: q.content,
            file: q.file,
            answers: q.answers,
        });
        setAnswers(q.answers);
    };
    const handleAddQuestion = () => {
        const newQuestion = {
            id: Date.now(),
            content: "",
            file: null,
            answers: [],
        };

        setSavedQuestions([...savedQuestions, newQuestion]);
        console.log("LOG:", newQuestion);
        console.log("LOG:", savedQuestions);
    }
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(savedQuestions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSavedQuestions(items);
        console.log("LOG:", items);
    }
    const handleDeleteQuestion = (id) => {
        const newSavedQuestions = savedQuestions.filter((question) => question.id !== id);
        setSavedQuestions(newSavedQuestions);
        console.log("LOG:", newSavedQuestions);
    }
    const handleChangeImport = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const imported = rows.slice(1).map((r, i) => ({
                id: Date.now() + i,
                content: r[0] || "",
                file: null,
                answers: ["A", "B", "C", "D"].map((opt, j) => ({
                    id: Date.now() + i + j,
                    content: r[j + 1] || "",
                    isAnswer: (r[5]?.toString().trim().toUpperCase() === opt),
                })),
            }));

            setSavedQuestions(imported);
        };

        reader.readAsArrayBuffer(file);
    };
    const handleChangeTime = (value) => {
        setQuestion({ ...question, timeLimitSec: value });
        console.log("LOG:", question.timeLimitSec);
    }


    const handleSaveQuizz = async () => {
        const quizId = localStorage.getItem("quizId");

        if (!quizId) {
            notification.error({
                message: 'Lỗi',
                description: 'Không tìm thấy Quiz ID trong localStorage.',
                placement: 'topRight'
            });
            return;
        }

        console.log("📌 Quiz ID:", quizId);
        console.log("📌 Raw savedQuestions:", savedQuestions);

        if (!savedQuestions || savedQuestions.length === 0) {
            notification.warning({
                message: 'Cảnh báo',
                description: 'Bạn chưa có câu hỏi nào!',
                placement: 'topRight'
            });
            return;
        }

        // Format lại câu hỏi
        const formattedQuestions = savedQuestions.map((q, index) => {
            const formatted = {
                questionText: q.content,
                timeLimitSec: q.timeLimitSec === undefined ? 30 : q.timeLimitSec, // Sử dụng toán tử điều kiện
                isRandomAnswer: true,
                answers: q.answers.map((a) => ({
                    answerText: a.content,
                    isCorrect: a.isAnswer
                })),
            };

            // In  câu hỏi
            console.log(`Câu hỏi ${index + 1}:`, JSON.stringify(formatted, null, 2));
            return formatted;
        });


        console.log("🚀 Sending full formattedQuestions to API:\n", JSON.stringify(formattedQuestions, null, 2));

        try {
            const res = await createQuestion(formattedQuestions);
            console.log("✅ API Response:", res);
            alert("Các câu hỏi đã được lưu!");
        } catch (error) {
            console.error("❌ Error saving questions:", error);
            alert("Đã xảy ra lỗi khi lưu câu hỏi.");
        }
    };






    return (
        <div style={{ backgroundColor: "pink", fontFamily: "cursive", padding: "20px" }}>

            <div style={{ display: "flex" }}>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="questions" type="group">
                        {(provided) => (
                            <div
                                style={{
                                    width: "300px",
                                    backgroundColor: "#f7f7f7",
                                    padding: "20px",
                                    borderRadius: "20px",
                                    marginTop: "100px",
                                }}
                            >
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                >
                                    {savedQuestions.map((q, index) => (
                                        <Draggable key={q.id.toString()} draggableId={q.id.toString()} index={index}>
                                            {(dragProvided) => (
                                                <div
                                                    ref={dragProvided.innerRef}
                                                    {...dragProvided.draggableProps}
                                                    {...dragProvided.dragHandleProps}
                                                    onClick={() => handleSelectQuestion(q)}
                                                    className="custom-button"
                                                    style={{
                                                        backgroundColor: "#ffffff",
                                                        padding: "10px",
                                                        borderRadius: "10px",
                                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                        cursor: "pointer",
                                                        color: "black",
                                                        transition: "all 0.3s ease",
                                                        ...dragProvided.draggableProps.style,
                                                    }}
                                                >
                                                    {`Question ${index + 1}: ${q.content}`}
                                                    <br />
                                                    <Button
                                                        className="custom-button"
                                                        size="small"
                                                        style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteQuestion(q.id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}

                                    <button className="custom-button" onClick={handleAddQuestion}>
                                        + More Question
                                    </button>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                < div style={{ margin: "100px", padding: "50px", borderRadius: "30px", backgroundColor: "#f0f2f5" }}>

                    <form style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "50px" }}>
                        <h1>{localStorage.getItem("quizTitle") || "Create Quiz"}</h1>
                        <h3 style={headerStyle}>Question </h3>

                        <input
                            type="text" onChange={(e) => handleChangeQuestion(question.id, e.target.value)}
                            placeholder="Question"
                            required
                            className="text-input"
                            value={question.content}
                        />
                        <h3 style={headerStyle}>Upload File </h3>
                        <Upload
                            accept=".pdf, .doc, .png, .jpg, .jpeg"
                            onChange={(info) => handleChangeFile(info.file)}
                            maxCount={1}
                            beforeUpload={() => false}  //
                            style={{ width: "100%" }}
                        >
                            <Button

                                icon={<UploadOutlined />}
                                className="text-input"

                            >
                                Click to Upload
                            </Button>

                        </Upload>
                        <Upload
                            accept=".xls,.xlsx"
                            onChange={(info) => {
                                const file = info.fileList[0]?.originFileObj;
                                if (file) {
                                    handleChangeImport(file);
                                }
                            }}
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <Button
                                style={{ marginTop: "20px", backgroundColor: "black", color: "white" }}
                                icon={<UploadOutlined />}
                                className="text-input"
                            >
                                Import Question
                            </Button>
                        </Upload>
                        <h3 style={headerStyle}>Time (second)</h3>
                        <InputNumber
                            min={5}
                            max={120}
                            defaultValue={30}
                            value={question.timeLimitSec}
                            onChange={(value) => handleChangeTime(value)}
                            style={{
                                width: '100%',
                                marginBottom: '20px',
                                border: '1px solid #d9d9d9',
                                borderRadius: '5px',
                                padding: '8px 12px',
                                fontSize: '16px',
                            }}
                            addonAfter="giây" // Hiển thị đơn vị
                        />




                        <h3 style={headerStyle}>Answer </h3>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", width: "600px" }}>
                            {answers.map((answer) => (
                                <Popover
                                    key={answer.id}
                                    trigger="hover"
                                    placement="topRight"
                                    content={
                                        <div style={{ display: "flex", flexDirection: "column", width: "auto", gap: "5px" }}>
                                            <Button
                                                size="small"
                                                onClick={() => handleDeleteAnswer(answer.id)}
                                                className="custom-button"
                                                style={{ backgroundColor: "red", color: "white" }}>
                                                Delete
                                            </Button>
                                            <Button
                                                size="small"
                                                onClick={() => handleDuplicateAnswer(answer.id)}
                                                className="custom-button"
                                                style={{ backgroundColor: "Blue", color: "white" }}>
                                                Duplicate
                                            </Button>
                                        </div>
                                    }
                                >
                                    <div className="answer-container">
                                        <input
                                            type="text"
                                            placeholder={`  Answer`}
                                            required
                                            value={answer.content}
                                            className="input-basic"
                                            onChange={(e) => handleChangeAnswer(answer.id, e.target.value)}
                                        />
                                        <Checkbox
                                            checked={answer.isAnswer}
                                            onChange={(e) => handleToggleCheckbox(answer.id, e.target.checked)}
                                            style={{ margin: '10px', fontSize: '10px' }}
                                        />
                                    </div>
                                </Popover>
                            ))}


                        </div>
                        <button type="button" onClick={handleAddAnswer}
                            className="custom-button"
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                backgroundColor: "#4CAF50",
                                color: "white",
                                border: "none",
                                cursor: "pointer"

                            }}>Add Answer</button>
                        <button
                            type="button"
                            className="custom-button"
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                backgroundColor: "#1890ff",
                                color: "white",
                                border: "none",
                                cursor: "pointer"
                            }}
                            onClick={
                                handleSaveQuestion
                            }
                        >
                            Save Question
                        </button>
                        <button
                            type="button"
                            className="custom-button"
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                backgroundColor: "#1890ff",
                                color: "white",
                                border: "none",
                                cursor: "pointer"
                            }}
                            onClick={
                                handleSaveQuizz
                            }
                        >
                            Save Quizz
                        </button>

                    </form >        </div >
            </div >
        </div >

    );

}

export default CreateQuestion;
