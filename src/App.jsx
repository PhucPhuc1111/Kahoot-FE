import React from "react";
import Login from "./Login";
import Header from "./components/Header"; // Import Header component
import WaitRoomScreen from "./screens/WaitRoomScreen";
import QuestionScreen from "./screens/QuestionScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnswerScreen from "../../../kahootfptu/src/screens/AnswerScreen";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<WaitRoomScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/answer" element={<AnswerScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
