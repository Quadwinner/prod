import React, { useState } from 'react';
import './ContactPopup.css';

const ContactPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission, such as an API call
    console.log('Contact form submitted:', { name, email, message });
    
    // Show success message
    setSubmitted(true);
    
    // Reset form after 3 seconds and close popup
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
      setIsOpen(false);
    }, 3000);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="contact-us-container">
      <button 
        className="contact-us-button"
        onClick={togglePopup}
      >
        Contact Us
      </button>
      
      {isOpen && (
        <div className="contact-popup-overlay">
          <div className="contact-popup">
            <button className="close-button" onClick={togglePopup}>×</button>
            
            {!submitted ? (
              <>
                <h2>Contact Us</h2>
                <p>Have questions? We'd love to hear from you!</p>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-button">Send Message</button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPopup; 