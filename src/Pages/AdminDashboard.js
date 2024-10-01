import React, { useContext } from 'react';
import QRCodeScanner from '../components/QRCodeScanner';
import AuthContext from '../context/AuthContext';

const AdminDashboard = ({ token }) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="p-4 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Dashboard</h1>

      <QRCodeScanner token={token} />

      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
