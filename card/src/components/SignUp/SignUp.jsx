import React, { useState } from 'react';
// import axios from 'axios';

function SignUp() {
  const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '' });

  const handleSignUp = () => {
    axios
      .post('http://localhost:5000/api/auth/signup', signUpData)
      .then(() => {
        alert('Sign up successful! Please log in.');
      })
      .catch((error) => {
        console.error('Sign up failed:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-200 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={signUpData.username}
            onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={handleSignUp}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
