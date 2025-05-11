import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create mailto link with form data
  const mailtoLink = `mailto:raphaellereports@gmail.com?subject=Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;

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
            <form className="modern-contact-form">
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
              <a
                href={mailtoLink}
                className="form-submit-btn"
                onClick={(e) => {
                  if (!formData.name || !formData.email || !formData.message) {
                    e.preventDefault();
                    alert('Please fill out all fields before sending.');
                  }
                }}
              >
                Send Message
              </a>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;