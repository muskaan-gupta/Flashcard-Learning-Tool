import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 flex flex-col items-center justify-center px-4 py-10">
        {!isLoggedIn ? (
          <div className="max-w-xl text-center space-y-6 bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to Flashcard Learning Tool</h1>
            <p className="text-gray-600 text-lg">
              Create, manage, and explore flashcards to make learning engaging and efficient.
              Sign up to begin or log in if you're already with us.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl">
                  Sign Up
                </Button>
              </Link>
            </div>
            <Routes>
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        ) : (
          <div className="w-full">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
