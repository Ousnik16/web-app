import React, { useState, useEffect } from 'react';

function Profile({ userData }) {
  const [forgottenPercentage, setForgottenPercentage] = useState(0);
  const [forgottenTasks, setForgottenTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    if (!userData) return;

    let total = 0;
    let forgotten = 0;

    userData.tasks.forEach((task) => {
      total++;
      if (!task.completed) {
        forgotten++;
      }
    });

    const percentage = total > 0 ? (forgotten / total) * 100 : 0;

    setTotalTasks(total);
    setForgottenTasks(forgotten);
    setForgottenPercentage(percentage);
  }, [userData]);

  if (!userData) {
    return <p>Loading...</p>; // Handle case where userData isn't available yet
  }

  return (
    <div className="profile-container">
      <div className="user-info">
        <div className="profile-img">
          {/* Assuming the profile image URL is available in userData.profilePicture */}
          <img src={userData.profilePicture} alt="Profile" className="profile-image" />
        </div>
        <div className="user-details">
          <h3>{userData.name}</h3>
          <p className="email-text">{userData.email}</p>

          {/* Box containing total tasks, forgotten tasks, and frequency */}
          <div className="stats-box">
            <p>Total Tasks: {totalTasks}</p>
            <p>Forgotten Tasks: {forgottenTasks}</p>
            <p>Frequency: {forgottenPercentage.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
