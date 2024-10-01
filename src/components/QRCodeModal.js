import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeModal = ({ token, onClose }) => {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/users/qr-code', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQrCode(response.data.qrCode);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    fetchQrCode();
  }, [token]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Your QR Code</h2>
        {qrCode ? (
          <QRCodeCanvas value={qrCode} size={256} />
        ) : (
          <p>Loading QR Code...</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
