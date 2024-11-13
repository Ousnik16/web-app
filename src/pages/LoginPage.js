import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function LoginPage({ setIsLoggedIn, setUserData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and Password are required!');
      return;
    }

    // Check if the user exists in the database
    const { data, error: fetchError } = await supabase
      .from('users')
      .select('id, email, password')
      .eq('email', email)
      .single();

    if (fetchError) {
      alert('User not found. Please sign up.');
      navigate('/signup'); // Redirect to signup if user is not found
    } else if (data.password === password) {
      setIsLoggedIn(true); // Log the user in
      setUserData({
        ...data,  // Set the user data to include email and other details
        tasks: [], // Initialize empty tasks or set as needed
        forgottenTasks: 0,
        totalTasks: 0,
        frequency: 0,
      });
      navigate('/profile'); // Redirect to profile page after successful login
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div>
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
}

export default LoginPage;
