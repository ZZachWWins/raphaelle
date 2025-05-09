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
    <main className="main">
      <section className="landing-section">
        <h1 className="landing-title">Connect with Raphaelle (NOLAbutterfly)</h1>
        <p className="landing-text">
          Got a story tip, question, or just want to chat? Reach out to Raphaelle, your friendly NOLAbutterfly, and join the conversation on truth, freedom, and food sovereignty!
        </p>
        <div className="contact-container flex flex-col md:flex-row gap-8">
          {/* Contact Info */}
          <div className="flex-1 contact-info">
            <h2 className="content-title">Get in Touch</h2>
            <p className="contact-text">
              <strong>Email:</strong> <a href="mailto:raphaelle@nolabutterfly.com">raphaelle@nolabutterfly.com</a>
            </p>
            <p className="contact-text">
              <strong>Follow Raphaelle:</strong>
            </p>
            <div className="social-links">
              <a href="https://x.com/NOLAbutterfly" className="social-icon">Twitter</a>
              <a href="https://facebook.com/NOLAbutterfly" className="social-icon">Facebook</a>
              <a href="https://rumble.com/c/NOLAbutterfly" className="social-icon">Rumble</a>
              <a href="https://dailymotion.com/NOLAbutterfly" className="social-icon">Dailymotion</a>
            </div>
            <p className="contact-text mt-4">
              Want to dive deeper?{' '}
              <a href="/content" className="cta-btn inline-block">
                Explore Raphaelle’s Articles & Videos
              </a>
            </p>
          </div>

          {/* Contact Form */}
          <div className="flex-1 contact-form">
            <h2 className="content-title">Send a Message</h2>
            <form onSubmit={handleSubmit} className="upload-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="mb-4"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="mb-4"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="mb-4"
              />
              <button type="submit" className="upload-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {status && <p className="contact-text mt-4">{status}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;