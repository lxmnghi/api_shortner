
import React, { useState } from 'react';
import axios from 'axios';

const ShortenerForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQRCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await shortenUrl(longUrl, customSlug);
      if (response) {
        setShortUrl(response.shortUrl);
        setQRCode(response.qrCode);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const shortenUrl = async (longUrl, customSlug) => {
    const apiKey = '627387310e3f4e20ae92e0f56aff4c78';
    const apiUrl = 'https://api.rebrandly.com/v1/links';

    const headers = {
      'Content-Type': 'application/json',
      'apikey': apiKey
    };

    const body = {
      destination: longUrl
    };

    try {
      const response = await axios.post(apiUrl, body, { headers });
      return {
        shortUrl: response.data.shortUrl,
        qrCode: ''
      };
    } catch (error) {
      throw new Error('Failed to shorten URL');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter Long URL"
          required
        />
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
          type="text"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder="Custom Slug"
        />
        <button
          className="w-full bg-blue-500 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600"
          type="submit"
        >
          Shorten URL
        </button>
      </form>
      {shortUrl && (
        <div className="mt-4">
          <p className="font-semibold">Shortened URL:</p>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
            type="text"
            value={shortUrl}
            readOnly
          />
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;
