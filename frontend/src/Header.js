import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ user, setShowAuth, handleLogout }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="modern-header">
      <div className="header-container">
        <div className="header-brand">
          <img
            src="https://via.placeholder.com/140"
            alt="NOLAbutterfly Logo"
            className="header-logo"
          />
          <span className="header-tagline">NOLAbutterfly</span>
        </div>

        <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
          {isNavOpen ? '✕' : '☰'}
        </button>

        <nav className={`header-nav ${isNavOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsNavOpen(false)}>Home</Link>
          <Link to="/content" className="nav-link" onClick={() => setIsNavOpen(false)}>Content</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsNavOpen(false)}>About</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsNavOpen(false)}>Contact</Link>
        </nav>

        <div className="header-auth">
          {user ? (
            <>
              <span className="auth-greeting">Hey, {user.username}</span>
              <button onClick={handleLogout} className="auth-btn">Logout</button>
            </>
          ) : (
            <button onClick={() => setShowAuth(true)} className="auth-btn">Login / Signup</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;