import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setCourses([]);

    try {
      const response = await fetch('http://localhost:3001/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setCourses(data.matches || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Find Your Ideal Course</h1>
      <input
        type="text"
        placeholder="What do you want to learn or build?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '70%', padding: '0.5rem', fontSize: '1rem' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Search
      </button>

      {loading && <p>Searching...</p>}

      {!loading && courses.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Recommended Courses:</h2>
          <ul>
            {courses.map((course) => (
              <li key={course.id} style={{ marginBottom: '1rem' }}>
                <strong>{course.title}</strong>
                <p>{course.offeredBy}</p>
                <p>{course.description}</p>              
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && courses.length === 0 && query && (
        <p style={{ marginTop: '1rem' }}>No results found.</p>
      )}
    </div>
  );
}

export default App;
