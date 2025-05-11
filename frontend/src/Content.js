import React, { useState, useEffect } from 'react';
import axios from 'axios';

const publisherCode = '3ycfre';

function Content({ user }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [rumbleVideoId, setRumbleVideoId] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleImage, setArticleImage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const videosRes = await axios.get('/.netlify/functions/videos');
        const articlesRes = await axios.get('/.netlify/functions/articles');
        const combined = [
          ...(videosRes.data || []).map(item => ({ ...item, type: 'video' })),
          ...(articlesRes.data || []).map(item => ({ ...item, type: 'article' }))
        ];
        setContent(combined);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please log in to upload videos!');
    if (user.role !== 'admin') return alert('Only admins can upload videos!');
    if (!rumbleVideoId) return alert('Please enter a Rumble video ID!');

    try {
      const videoData = {
        title: videoTitle,
        description: videoDescription,
        rumbleVideoId,
        uploadedBy: user.username,
        isLive,
      };
      await axios.post('/.netlify/functions/videos', videoData);
      setVideoTitle('');
      setVideoDescription('');
      setRumbleVideoId('');
      setIsLive(false);
      const videosRes = await axios.get('/.netlify/functions/videos');
      const articlesRes = await axios.get('/.netlify/functions/articles');
      setContent([
        ...(videosRes.data || []).map(item => ({ ...item, type: 'video' })),
        ...(articlesRes.data || []).map(item => ({ ...item, type: 'article' }))
      ]);
      alert('Video uploaded successfully!');
    } catch (err) {
      alert('Video upload failed—check your input!');
    }
  };

  const handleArticleUpload = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please log in to upload articles!');
    if (user.role !== 'admin') return alert('Only admins can upload articles!');
    if (!articleTitle || !articleContent) return alert('Please enter article title and content!');

    try {
      const articleData = {
        title: articleTitle,
        content: articleContent,
        image: articleImage,
        uploadedBy: user.username,
      };
      await axios.post('/.netlify/functions/articles', articleData);
      setArticleTitle('');
      setArticleContent('');
      setArticleImage('');
      const videosRes = await axios.get('/.netlify/functions/videos');
      const articlesRes = await axios.get('/.netlify/functions/articles');
      setContent([
        ...(videosRes.data || []).map(item => ({ ...item, type: 'video' })),
        ...(articlesRes.data || []).map(item => ({ ...item, type: 'article' }))
      ]);
      alert('Article uploaded successfully!');
    } catch (err) {
      alert('Article upload failed—check your input!');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const filteredContent = content.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="main">
      {user && user.role === 'admin' ? (
        <>
          <form onSubmit={handleVideoUpload} className="upload-form">
            <h3 className="content-title">Upload Video</h3>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Video Title"
              required
            />
            <input
              type="text"
              value={rumbleVideoId}
              onChange={(e) => setRumbleVideoId(e.target.value)}
              placeholder="Rumble Video ID (e.g., v6p4qz4)"
              required
            />
            <label>
              <input
                type="checkbox"
                checked={isLive}
                onChange={(e) => setIsLive(e.target.checked)}
              />
              Mark as Live
            </label>
            <button type="submit" className="upload-btn">Upload Video</button>
          </form>
          <form onSubmit={handleArticleUpload} className="upload-form">
            <h3 className="content-title">Upload Article</h3>
            <input
              type="text"
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              placeholder="Article Title"
              required
            />
            <textarea
              value={articleContent}
              onChange={(e) => setArticleContent(e.target.value)}
              placeholder="Article Content"
              required
            />
            <input
              type="text"
              value={articleImage}
              onChange={(e) => setArticleImage(e.target.value)}
              placeholder="Image URL (optional)"
            />
            <button type="submit" className="upload-btn">Upload Article</button>
          </form>
        </>
      ) : user ? (
        <p className="no-upload">Only admins can upload content.</p>
      ) : (
        <p className="no-upload">Please log in to upload content.</p>
      )}

      <section className="content-search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search videos or articles..."
          className="search-bar"
        />
        <button onClick={handleClearSearch} className="clear-btn">
          Clear
        </button>
      </section>

      <section className="content-grid">
        {loading ? (
          <div className="loader">Loading Content...</div>
        ) : filteredContent.length === 0 ? (
          <p className="no-videos">No matching content found.</p>
        ) : (
          filteredContent.map((item) => (
            <div key={item._id} className="content-card">
              {item.type === 'video' ? (
                <>
                  <div className="videoWrapper">
                    <iframe
                      src={`https://rumble.com/embed/${item.rumbleVideoId}/?pub=${publisherCode}`}
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

export default Content;