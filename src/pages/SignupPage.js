import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function SignupPage() {
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

    // Insert the new user data into the database
    const { data, error: signupError } = await supabase
      .from('users')
      .insert([{ email, password }]);

    if (signupError) {
      setError('Error signing up. Please try again.');
    } else {
      alert('User has successfully signed up!'); // Show success alert
      navigate('/'); // Redirect to login after signup
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <div>
        Already have an account? <a href="/">Login</a>
      </div>
    </div>
  );
}

export default SignupPage;
