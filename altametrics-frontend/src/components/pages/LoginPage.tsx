import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../state/slices/authSlice';
import { AppDispatch } from '../../state/store';
import { setError } from '../../state/slices/errorSlice';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    if (email && password) {
      dispatch(login({ email, password }));
    } else {
      dispatch(setError("Email and password are required !"))
    }
  };

  return (
    <div className="login-container">
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
