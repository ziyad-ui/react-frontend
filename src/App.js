import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Navbar from './components/common/Navbar.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';

const App = () => {
  const [token, setToken] = React.useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  React.useEffect(() => {
    const stored = localStorage.getItem('authToken');
    if (stored) {
      setToken(stored);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="app-container">
        <Navbar isAuthenticated={!!token} onLogout={handleLogout} />
        <main className="app-main">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/dashboard"
              element={
                token ? <Dashboard token={token} /> : <Navigate to="/login" replace />
              }
            />
            <Route path="*" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
