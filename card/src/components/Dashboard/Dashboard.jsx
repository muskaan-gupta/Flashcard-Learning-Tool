import React from 'react';
// import Flashcards from '../Flashcards/Flashcards';
import { Link } from 'react-router-dom';
// import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/flashcards">Flashcards</Link>
      </nav>
      <Flashcards />
    </div>
  );
}

export default Dashboard;