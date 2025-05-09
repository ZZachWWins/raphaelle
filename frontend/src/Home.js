import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home({ user }) {
  const [latestContent, setLatestContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const videosRes = await axios.get('/.netlify/functions/videos');
        const articlesRes = await axios.get('/.netlify/functions/articles');
        const combined = [
          ...(videosRes.data || []).map(item => ({ ...item, type: 'video' })),
          ...(articlesRes.data || []).map(item => ({ ...item, type: 'article' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
        setLatestContent(combined);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <main className="main">
      <section className="landing-section">
        <h1 className="landing-title">Welcome to Raphaelle's News</h1>
        <p className="landing-text">
          Your source for insightful articles and exclusive Rumble videos. Stay informed with Raphaelle's unique perspective.
        </p>
        <a href="/content" className="cta-btn">Explore Content</a>
      </section>
      <section className="content-grid">
        {loading ? (
          <div className="loader">Loading Latest Content...</div>
        ) : latestContent.length === 0 ? (
          <p className="no-videos">No content available yet.</p>
        ) : (
          latestContent.map((item) => (
            <div key={item._id} className="content-card">
              {item.type === 'video' ? (
                <>
                  <div className="videoWrapper">
                    <iframe
                      src={`https://rumble.com/embed/${item.rumbleVideoId}/?pub=3ycfre`}
                      frameBorder="0"
                      allowFullScreen
                      title={item.title}
                    ></iframe>
                  </div>
                  <h3 className="content-title">{item.title} {item.isLive && <span>(Live)</span>}</h3>
                  <p className="content-description">{item.description}</p>
                  <p className="content-uploader">By: {item.uploadedBy}</p>
                </>
              ) : (
                <>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <h3 className="content-title">{item.title}</h3>
                  <p className="content-text">{item.content.substring(0, 200)}...</p>
                  <p className="content-uploader">By: {item.uploadedBy}</p>
                </>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Home;