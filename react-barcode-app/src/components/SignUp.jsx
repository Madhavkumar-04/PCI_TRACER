import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const buttonStyle = {
  backgroundColor: '#000', // Black as the primary color
  color: '#e0e0e0', // Light text color
  border: 'none',
  borderRadius: '4px',
  padding: '0.75rem 1.5rem',
  cursor: 'pointer',
  fontSize: '1rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
};

const buttonHoverStyle = {
  backgroundColor: '#333', // Darker shade for hover
  transform: 'translateY(-2px)',
};

const buttonActiveStyle = {
  backgroundColor: '#000', // Primary color for active state
  transform: 'translateY(0)',
};

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/register', { name, email, password });
      console.log(res.data);
      // Redirect to home page after successful signup
      navigate('/form1');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container" style={{backgroundColor:'#1e1e1e', height:"auto", margin:'2rem'}}>
      <div className="auth-form" style={{ backgroundColor: '#1e1e1e', color: '#e0e0e0', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', maxWidth: '400px', margin: 'auto' }}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            style={{ width: '100%', padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #333', borderRadius: '4px', backgroundColor: '#333', color: '#e0e0e0' }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{ width: '100%', padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #333', borderRadius: '4px', backgroundColor: '#333', color: '#e0e0e0' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ width: '100%', padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #333', borderRadius: '4px', backgroundColor: '#333', color: '#e0e0e0' }}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            onMouseDown={(e) => e.currentTarget.style.backgroundColor = buttonActiveStyle.backgroundColor}
            onMouseUp={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          >
            Sign Up
          </button>
        </form>
        <a href='/login' style={{ color: '#e0e0e0', display: 'block', textAlign: 'center', marginTop: '1rem' }}>Login</a>
        <a href="http://localhost:5000/auth/google" style={{ color: '#e0e0e0', display: 'block', textAlign: 'center', marginTop: '0.5rem' }}>Login with Google</a>
        <a href="http://localhost:5000/auth/facebook" style={{ color: '#e0e0e0', display: 'block', textAlign: 'center', marginTop: '0.5rem' }}>Login with Facebook</a>
      </div>
    </div>
  );
};

export default Signup;
