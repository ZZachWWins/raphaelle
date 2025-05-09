import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ user, setShowAuth, handleLogout }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className="header">
      <img src="https://via.placeholder.com/150" alt="Raphaelle's News Logo" className="header-logo" />
      <h1 className="subtitle">Raphaelle's News</h1>
      <div className="auth-section">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="auth-btn">Logout</button>
          </>
        ) : (
          <button onClick={() => setShowAuth(true)} className="auth-btn">Login / Signup</button>
        )}
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/content" className="nav-link">Content</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
      <div className="action-cta-container">
        <div className="action-ticker">
          <span>Breaking News: Stay tuned for Raphaelle's latest updates!</span>
        </div>
        <button
          className="action-mobile-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide' : 'Show'} Actions
        </button>
        <div className={`action-cta-list ${isExpanded ? 'expanded' : ''}`}>
          <a href="https://rumble.com" className="action-cta-btn">Watch on Rumble</a>
          <a href="https://twitter.com" className="action-cta-btn">Follow on Twitter</a>
          <a href="https://facebook.com" className="action-cta-btn">Join on Facebook</a>
        </div>
      </div>
    </header>
  );
}

export default Header;