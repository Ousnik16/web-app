import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import Profile from './components/Profile';
import FrequencyGraph from './components/FrequencyGraph';
import './styles.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    tasks: [],
    forgottenTasks: 0,
    totalTasks: 0,
    frequency: 0,
    email: '', // Ensure email is part of the userData state
  });

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Navbar />}
        <div className="content-container">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <TodoList userData={userData} setUserData={setUserData} />
                ) : (
                  <LoginPage setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
                )
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<Profile userData={userData} />} />
            <Route path="/frequency-graph" element={<FrequencyGraph userData={userData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
