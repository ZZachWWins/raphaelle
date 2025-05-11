import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      await axios.post('/.netlify/functions/contact', formData);
      setStatus('Message sent successfully! Raphaelle will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main modern-contact">
      <section className="contact-section animate-fade-in">
        <h1 className="contact-title">Connect with NOLAbutterfly</h1>
        <p className="contact-subtitle">
          Reach out to Raphaelle for story tips, collabs, or to join the fight for truth and freedom!
        </p>
        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info-card">
            <h2 className="contact-info-title">Get in Touch</h2>
            <p className="contact-info-text">
              <strong>Email:</strong>{' '}
              <a href="mailto:raphaellereports@gmail.com" className="contact-link">
                raphaellereports@gmail.com
              </a>
            </p>
            <p className="contact-info-text">
              <strong>Follow Raphaelle:</strong>
            </p>
            <div className="social-links">
              <a href="https://x.com/NOLAbutterfly" className="social-icon">Twitter</a>
              <a href="https://facebook.com/NOLAbutterfly" className="social-icon">Facebook</a>
              <a href="https://rumble.com/user/NOLAbutterfly" className="social-icon">Rumble</a>
              <a href="https://dailymotion.com/NOLAbutterfly" className="social-icon">Dailymotion</a>
            </div>
            <a href="/content" className="cta-btn contact-cta">
              Explore Raphaelle’s Content
            </a>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="contact-info-title">Send a Message</h2>
            <form onSubmit={handleSubmit} className="modern-contact-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="form-input"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="form-input"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="form-textarea"
              />
              <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {status && <p className="form-status">{status}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;