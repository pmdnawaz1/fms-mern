import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch user data
    axios.get('http://localhost:5000/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => setUser(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}'s Profile</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
