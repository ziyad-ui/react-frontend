import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { token } = await login({ email, password });
      onLogin(token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1 className="auth-title">Sign in to your dashboard</h1>
        {error && <p className="auth-error">{error}</p>}

        <label className="auth-label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="auth-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size="small" /> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

