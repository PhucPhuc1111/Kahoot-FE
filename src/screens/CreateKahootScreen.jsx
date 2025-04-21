import Title from "antd/es/skeleton/Title";
import { useState } from "react";
import React from 'react';

const CreateKahoot = () => {
    const input = {
        border: "1px solid",
        width: "300px",
        height: "30px",
        margin: "10px",
        padding: "5px",
        borderRadius: "5px",
    };

    const [kahoot, setKahoot] = useState({ Title: "", Description: "" });

    const handleOnChangeTitle = (e) => {
        setKahoot({ ...kahoot, Title: e.target.value });
        console.log(kahoot);
    };

    const handleOnChangeDes = (e) => {
        setKahoot({ ...kahoot, Description: e.target.value });
        console.log(kahoot);
    };

    return (
        <div
            className="create-kahoot-screen"
            style={{

                textAlign: "center",
                display: "flex",
                justifyContent: 'center',
                flexDirection: "column",
                alignItems: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"

            }}
        >
            <h1>Create Kahoot</h1>
            <form method="get"
                action={`/createQ`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "50px",
                }}
            >
                <input
                    name="KahootTitle"
                    style={input}
                    type="text"
                    onChange={handleOnChangeTitle}
                    placeholder="Kahoot Title"
                    required
                    margin="20px"
                    padding="10px"
                    height="80px"
                />
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

                <button type="submit">Create Kahoot</button>
            </form>
        </div>
    );
};

export default CreateKahoot;