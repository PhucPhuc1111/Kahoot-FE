import { Button, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { createKahoot } from '../services/createKahoot';
// ✨ import API đã tách
import { useNavigate } from "react-router-dom";
import '../components/CreateQuestion.css';
import React from 'react';

const CreateKahoot = () => {
    const inputStyle = {
        border: "1px solid",
        width: "300px",
        height: "30px",
        margin: "10px",
        padding: "5px",
        borderRadius: "5px",
    };
    const navigate = useNavigate();
    const [kahoot, setKahoot] = useState({ Title: "", Description: "" });
    const [file, setFile] = useState(null);

    const handleOnChangeTitle = (e) => {
        setKahoot({ ...kahoot, Title: e.target.value });
    };

    const handleOnChangeDes = (e) => {
        setKahoot({ ...kahoot, Description: e.target.value });
    };

    const handleChangeFile = (file) => {
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Title", kahoot.Title);
        formData.append("Description", kahoot.Description);
        if (file) {
            formData.append("ImgUrl", file);
        }

        try {
            const data = await createKahoot(formData);
            const quizId = data.data?.quizId;

            if (quizId) {
                localStorage.setItem("quizId", quizId.toString());
                alert("Tạo kahoot thành công!");
                navigate(`/createq`);
            } else {
                alert("Không lấy được ID từ server!");
            }
        } catch (error) {
            alert("Tạo kahoot thất bại!");
        }
    };


    return (
        <div
            className="create-kahoot-screen"
            style={{
                backgroundColor: "pink",
                fontFamily: "Arial, sans-serif",
                width: "100%",
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 9999,
            }}>

            <div
                className="create-kahoot-screen"
                style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: 'center',
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: " white",
                    borderRadius: "20px",
                    padding: "40px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                <h1>Create Kahoot</h1>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "50px",
                    }}
                >
                    <input
                        name="KahootTitle"
                        style={inputStyle}
                        type="text"
                        onChange={handleOnChangeTitle}
                        placeholder="Kahoot Title"
                        required
                    />
                    <Upload
                        accept=".png, .jpg, .jpeg"
                        beforeUpload={() => false}
                        onChange={(info) => handleChangeFile(info.file)}
                        maxCount={1}
                        style={{ width: "200px" }}
                    >
                        <Button
                            style={{
                                width: "300px",
                                height: "50px",
                                backgroundColor: "pink",
                                color: "black",
                                borderRadius: "5px",
                                margin: "10px",
                            }}
                            icon={<UploadOutlined />}
                            className="text-input"
                        >
                            Click to Upload Kahoot Image
                        </Button>
                    </Upload>
                    <textarea
                        placeholder="Description"
                        required
                        name="KahootDescription"
                        style={{
                            width: "300px",
                            height: "100px",
                            color: "black",
                            textAlign: 'left',
                            padding: '10px',
                            backgroundColor: "#f0f0f0",
                            borderRadius: "15px",
                            margin: "10px",
                        }}
                        onChange={handleOnChangeDes}
                    ></textarea>
                    <button
                        type="submit"
                        style={{
                            width: "200px",
                            height: "50px",
                            backgroundColor: "lightgreen",
                            border: "none",
                            borderRadius: "10px",
                            marginTop: "10px",
                            fontSize: "16px",
                        }}
                    >
                        Create Kahoot
                    </button>
                </form>
            </div>
        </div >
    );
};

export default CreateKahoot;
