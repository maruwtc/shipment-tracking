"use client"

import { useState } from 'react';
import { handleSubmit } from './api/handleSubmit';

const Home = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isFormat, setFormat] = useState<any>(null);

  const jsonData = JSON.stringify(responseData, null, 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-fit">
        <h1 className="text-2xl font-semibold mb-4">Shipment Tracker</h1>
        <div className="mb-4">
          <label htmlFor="trackingNumber" className="block text-gray-300">
            Enter Tracking Number:
          </label>
          <input
            type="text"
            id="trackingNumber"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => handleSubmit(trackingNumber, setResponseData, setError, setFormat)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
        {error && (
          <div className="text-red-600 mt-4">
            <h2>Error:</h2>
            <p>
              {error.message === 'Invalid Format'
                ? 'Invalid Format'
                : `HTTP Status Code: ${error.response?.status}`}
            </p>
            {error.response?.status === 404 && <p>Shipment was not found</p>}
            {error.response?.status === 400 && <p>Bad Request Error</p>}
          </div>
        )}
        {responseData && (isFormat == "DHL") && (
          <div className="mt-4 max-h-96 overflow-y-auto">
            <h2>DHL Response Data:</h2>
            <div className="bg-gray-700 p-4 rounded">
              <pre>{jsonData}</pre>
            </div>
          </div>
        )}
        {responseData && (isFormat == "SF") && (
          <div className="mt-4 max-h-96 overflow-y-auto">
            <h2>SF Express Response Data:</h2>
            <div className="bg-gray-700 p-4 rounded">
              <pre>{jsonData}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;