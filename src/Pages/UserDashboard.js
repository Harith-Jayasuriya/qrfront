import React, { useState, useContext } from 'react';
import QRCodeModal from '../components/QRCodeModal';
import AuthContext from '../context/AuthContext'; // Import the AuthContext

const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token, logout } = useContext(AuthContext); // Access token and logout from AuthContext

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">User Dashboard</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Show QR Code
        </button>
        <button
          onClick={logout} // Use the logout function from AuthContext
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      {isModalOpen && <QRCodeModal token={token} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default UserDashboard;
