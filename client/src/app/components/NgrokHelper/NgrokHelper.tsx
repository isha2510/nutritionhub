import React, { useState } from 'react';
import { setNgrokUrl } from '../../utils/ngrok-helper';

const NgrokHelper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ngrokUrl, setNgrokUrlState] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ngrokUrl) {
      setNgrokUrl(ngrokUrl);
      setIsConfigured(true);
      setTimeout(() => setIsOpen(false), 1500);
    }
  };

  if (!isOpen && !isConfigured) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-md text-xs"
      >
        Configure Ngrok
      </button>
    );
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-green-600 text-white p-2 rounded-md text-xs"
      >
        Ngrok Connected
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Configure Ngrok Connection</h2>
        <p className="mb-4 text-sm">
          To use ngrok for mobile testing, enter the ngrok URL from your terminal below.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ngrok URL</label>
            <input
              type="text"
              value={ngrokUrl}
              onChange={(e) => setNgrokUrlState(e.target.value)}
              placeholder="https://a1b2c3d4.ngrok.io"
              className="w-full p-2 border rounded-md"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: https://a1b2c3d4.ngrok.io (without /api)
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
            >
              Connect
            </button>
          </div>
        </form>
        
        {isConfigured && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-sm">
            Ngrok URL configured successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default NgrokHelper; 