import React from "react";
import Login from "./Login";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnswerScreen from "../../../kahootfptu/src/screens/AnswerScreen";
import ListOfParticipantsScreen from "./screens/ListOfParticipantsScreen";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<ListOfParticipantsScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/answer" element={<AnswerScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
