import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserDashboard from './Pages/UserDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import AuthContext, { AuthProvider } from './context/AuthContext';

const PrivateRoute = ({ children, isAdminRoute }) => {
  const { token, user } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdminRoute && !user.isAdmin) {
    return <Navigate to="/user-dashboard" replace />;
  }

  if (!isAdminRoute && user.isAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute isAdminRoute={false}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute isAdminRoute={true}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
