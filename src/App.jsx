import React, { useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const summarizeArticle = async () => {
    setLoading(true);
    setError("");
    setSummary("");

    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: url,
        lang: 'en',
        engine: '2'
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setSummary(response.data.summary);
    } catch (err) {
      setError("Failed to summarize the article. Please check the URL or try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Article Summarizer</h1>
      <input
        type="text"
        placeholder="Enter article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="input"  
      />
      <button
        onClick={summarizeArticle}
        className="button" 
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {error && <p className="error">{error}</p>} 
      {summary && (
        <div className="summary">
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default App;
