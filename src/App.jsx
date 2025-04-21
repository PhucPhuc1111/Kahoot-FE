import React from "react";
import Login from "./components/Login";

import Header from "./components/Header"; // Import Header component
import WaitRoomScreen from "./screens/WaitRoomScreen";
import QuestionScreen from "./screens/QuestionScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateKahoot from "./screens/CreateKahootScreen";
import CreateQuestion from "./screens/CreateQuestionScreen";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/createK" element={<CreateKahoot />} />
          <Route path="/createQ" element={<CreateQuestion />} />
          <Route path="/" element={<WaitRoomScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderBoard" element={<LeaderBoardScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;