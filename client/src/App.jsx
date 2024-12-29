import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from the backend
  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/news');
      setNewsList(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>News List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {newsList.map((news) => (
          <li
            key={news._id}
            style={{
              border: '1px solid #ccc',
              margin: '10px 0',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <h2>{news.title}</h2>
            <p>{news.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
