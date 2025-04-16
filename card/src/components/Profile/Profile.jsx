import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Profile.css';

function Profile() {
  const [profileData, setProfileData] = useState({ username: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  return (
    <div className="profile-container">
      <h3>Profile</h3>
      <p>Username: {profileData.username}</p>
      <p>Email: {profileData.email}</p>
    </div>
  );
}

export default Profile;