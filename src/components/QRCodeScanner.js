import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';

const QRCodeScanner = ({ token }) => {
  const [checkInCount, setCheckInCount] = useState(0);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    fetchCheckInCount();
  }, [token]);

  const fetchCheckInCount = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/attendance/count', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCheckInCount(response.data.count);
    } catch (error) {
      console.error('Error fetching check-in count:', error);
    }
  };

  const handleScan = async (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        const userId = parsedData.userId;

        await axios.post('http://localhost:8081/api/attendance/mark', { userId }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Attendance marked successfully');
        fetchCheckInCount();
      } catch (error) {
        console.error('Error processing QR scan:', error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg mb-4">Currently checked-in users: <span className="font-bold">{checkInCount}</span></p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
        onClick={() => setShowScanner(true)}
      >
        Scan QR Code
      </button>

      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowScanner(false)}
            >
              ✕
            </button>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '300px' }}
            />
            <p className="mt-4 text-center">Scan your QR code</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
