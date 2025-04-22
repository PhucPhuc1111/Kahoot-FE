import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitingRoomScreen from "./screens/WaitingRoomScreen";
import AnswerScreen from "./screens/AnswerScreen";
import UserManagement from "./screens/admin/UserManagement";
import ListOfGroup from "./screens/ListOfGroup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WaitingRoomScreen />} />
        <Route path="/question" element={<AnswerScreen />} />
        <Route path="/waiting" element={<ListOfGroup />} />
        <Route path="/userlist" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
