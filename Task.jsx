// ShortenerForm.js

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
      // Call the shortenUrl function with longUrl and customSlug
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
    // Replace 'YOUR_BITLY_API_KEY' with your Rebrandly API key
    const apiKey = '627387310e3f4e20ae92e0f56aff4c78';
    const apiUrl = 'https://api.rebrandly.com/v1/links'; // Rebrandly API URL

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
        qrCode: '' // Rebrandly API does not provide QR codes by default, you may need to implement this separately
      };
    } catch (error) {
      throw new Error('Failed to shorten URL');
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter Long URL"
          required
        />
        <input
          type="text"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder="Custom Slug (Optional)"
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <input type="text" value={shortUrl} readOnly />
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;
