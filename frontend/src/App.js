import React, { useState, useEffect } from 'react';
import './index.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Sample data for floor plans, gallery, and location
const floorPlans = [
  { id: 1, type: '2 BHK', size: '1200 sq.ft.', rooms: '2 Bedrooms + 2 Bathrooms', price: '₹85 Lakhs', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop' },
  { id: 2, type: '3 BHK', size: '1600 sq.ft.', rooms: '3 Bedrooms + 3 Bathrooms', price: '₹1.2 Crores', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop' },
  { id: 3, type: '4 BHK', size: '2200 sq.ft.', rooms: '4 Bedrooms + 4 Bathrooms', price: '₹1.8 Crores', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop' }
];

const galleryImages = [
  { id: 1, title: 'Exterior View', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop' },
  { id: 2, title: 'Lobby', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop' },
  { id: 3, title: 'Swimming Pool', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop' },
  { id: 4, title: 'Garden', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop' },
  { id: 5, title: 'Gymnasium', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop' },
  { id: 6, title: 'Club House', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop' },
  { id: 7, title: 'Parking Area', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&h=400&fit=crop' },
  { id: 8, title: 'Kids Play Area', image: 'https://images.unsplash.com/photo-1564429237816-22f636b2ab61?w=600&h=400&fit=crop' }
];

const locationData = [
  { id: 1, name: 'Metro Station', distance: '500m', icon: '🚇' },
  { id: 2, name: 'Railway Station', distance: '3 km', icon: '🚂' },
  { id: 3, name: 'Airport', distance: '15 km', icon: '✈️' },
  { id: 4, name: 'Shopping Mall', distance: '1 km', icon: '🛍️' },
  { id: 5, name: 'Hospital', distance: '2 km', icon: '🏥' },
  { id: 6, name: 'School', distance: '1.5 km', icon: '🎓' }
];

// Construction updates with progress
const constructionProgress = [
  { id: 1, title: 'Foundation Work', progress: 100, status: 'completed' },
  { id: 2, title: 'Structure Work', progress: 75, status: 'in-progress' },
  { id: 3, title: 'Electrical Work', progress: 50, status: 'in-progress' },
  { id: 4, title: 'Plumbing Work', progress: 40, status: 'in-progress' },
  { id: 5, title: 'Finishing Work', progress: 20, status: 'upcoming' }
];

// Home Page Component
function HomePage({ content, amenities, faqs, updates, onAdminClick }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const getContent = (section, field) => {
    const sectionData = content.find(c => c.section === section);
    return sectionData ? sectionData[field] : '';
  };

  const getAmenityIcon = (icon) => {
    const icons = {
      pool: '🏊',
      gym: '💪',
      park: '🌳',
      security: '🔒',
      parking: '🅿️',
      club: '🏠'
    };
    return icons[icon] || '⭐';
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <a href="/" className="logo">MEGAPLEX</a>
        <ul className="nav-links">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#amenities">Amenities</a></li>
          <li><a href="#floorplans">Floor Plans</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#updates">Updates</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <button className="admin-btn" onClick={onAdminClick}>Admin</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Megaplex Prime</h1>
          <h2>Your Dream Home Awaits</h2>
          <p>Experience luxury living spaces designed for modern families. Premium apartments with world-class amenities in the heart of the city.</p>
          <a href="#overview" className="cta-button">View Project</a>
        </div>
      </section>

      {/* Project Details Section */}
      <section id="overview" className="section project-details">
        <div className="section-title">
          <h2>Project Details</h2>
          <h3>Everything you need to know about your new home</h3>
        </div>
        <div className="details-grid">
          <div className="detail-card">
            <h4>Project Name</h4>
            <p>Megaplex Prime</p>
          </div>
          <div className="detail-card">
            <h4>Project Type</h4>
            <p>Residential</p>
          </div>
          <div className="detail-card">
            <h4>Total Units</h4>
            <p>200+</p>
          </div>
          <div className="detail-card">
            <h4>Area</h4>
            <p>5 Acres</p>
          </div>
          <div className="detail-card">
            <h4>Status</h4>
            <p>Under Construction</p>
          </div>
          <div className="detail-card">
            <h4>Rera Number</h4>
            <p>XYZ123456789</p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section overview">
        <div className="section-title">
          <h2>Project Overview</h2>
          <h3>Building your dreams with excellence</h3>
        </div>
        <div className="overview-content">
          <div className="overview-text">
            <h4>Welcome to Megaplex Prime</h4>
            <p>{getContent('overview', 'description') || 'Megaplex Prime is a prestigious residential project that offers a perfect blend of luxury and comfort. Located in the heart of the city, it provides easy access to all major landmarks and amenities.'}</p>
            <p>{getContent('overview', 'content') || 'Our thoughtfully designed apartments feature spacious layouts, premium finishes, and breathtaking views. With world-class amenities and a commitment to quality, Megaplex Prime sets a new standard in modern living.'}</p>
          </div>
          <div className="overview-image">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop" alt="Project Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="section amenities">
        <div className="section-title">
          <h2>Amenities</h2>
          <h3>World-class facilities for modern living</h3>
        </div>
        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <div className="amenity-card" key={index}>
              <div className="amenity-icon">{getAmenityIcon(amenity.icon)}</div>
              <h4>{amenity.title}</h4>
              <p>{amenity.description}</p>
            </div>
          ))}
          <div className="amenity-card">
            <div className="amenity-icon">🏊</div>
            <h4>Swimming Pool</h4>
            <p>Temperature-controlled pool for residents</p>
          </div>
          <div className="amenity-card">
            <div className="amenity-icon">💪</div>
            <h4>Gymnasium</h4>
            <p>State-of-the-art fitness center</p>
          </div>
          <div className="amenity-card">
            <div className="amenity-icon">🌳</div>
            <h4>Landscaped Gardens</h4>
            <p>Beautiful green spaces for relaxation</p>
          </div>
          <div className="amenity-card">
            <div className="amenity-icon">🔒</div>
            <h4>24/7 Security</h4>
            <p>Advanced security systems</p>
          </div>
          <div className="amenity-card">
            <div className="amenity-icon">🅿️</div>
            <h4>Parking</h4>
            <p>Ample parking space for residents</p>
          </div>
          <div className="amenity-card">
            <div className="amenity-icon">🏠</div>
            <h4>Club House</h4>
            <p>Exclusive club for residents</p>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section id="floorplans" className="section floor-plans">
        <div className="section-title">
          <h2>Floor Plans</h2>
          <h3>Choose your perfect living space</h3>
        </div>
        <div className="plans-grid">
          {floorPlans.map((plan) => (
            <div className="plan-card" key={plan.id}>
              <div className="plan-image">
                <img src={plan.image} alt={plan.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="plan-info">
                <h4>{plan.type}</h4>
                <p>Super Built-up Area: {plan.size}</p>
                <p>{plan.rooms}</p>
                <p>Starting Price: {plan.price}</p>
                <button className="plan-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section gallery">
        <div className="section-title">
          <h2>Gallery</h2>
          <h3>Experience our beautiful spaces</h3>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div className="gallery-item" key={image.id}>
              <img src={image.image} alt={image.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section location">
        <div className="section-title">
          <h2>Location Advantages</h2>
          <h3>Perfectly connected to everything you need</h3>
        </div>
        <div className="location-grid">
          {locationData.map((location) => (
            <div className="location-item" key={location.id}>
              <h4>{location.icon} {location.name}</h4>
              <p>Easy Access</p>
              <div className="distance">{location.distance}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Construction Updates Section */}
      <section id="updates" className="section updates">
        <div className="section-title">
          <h2>Construction Update</h2>
          <h3>Track the progress of your dream home</h3>
        </div>
        <div className="updates-container">
          {constructionProgress.map((update) => (
            <div className="update-item" key={update.id}>
              <h4>{update.title}</h4>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${update.progress}%` }}></div>
              </div>
              <div className="progress-label">
                <span>{update.status === 'completed' ? 'Completed' : update.status === 'in-progress' ? 'In Progress' : 'Upcoming'}</span>
                <span>{update.progress}%</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Download Brochure */}
        <div className="download-section">
          <button className="download-btn">Download Brochure</button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section faq">
        <div className="section-title">
          <h2>FAQ</h2>
          <h3>Frequently asked questions</h3>
        </div>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                <span>{openFaq === index ? '−' : '+'}</span>
              </div>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Megaplex Prime</h4>
            <p>Your dream home awaits at Megaplex Prime. Experience luxury living like never before.</p>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📍 123, Main Road, City Center</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@megaplexprime.com</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <p><a href="#overview">Overview</a></p>
            <p><a href="#amenities">Amenities</a></p>
            <p><a href="#location">Location</a></p>
            <p><a href="#faq">FAQ</a></p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <p><span>Facebook</span></p>
            <p><span>Instagram</span></p>
            <p><span>Twitter</span></p>
            <p><span>LinkedIn</span></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Megaplex Prime. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

// Login Component
function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        onLogin();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <button 
          onClick={onBack}
          style={{ marginTop: '15px', background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', width: '100%' }}
        >
          Back to Website
        </button>
      </div>
    </div>
  );
}

// Admin Panel Component
function AdminPanel({ onLogout }) {
  const [content, setContent] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [activeSection, setActiveSection] = useState('hero');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contentRes, amenitiesRes, faqsRes, updatesRes] = await Promise.all([
        fetch(`${API_BASE}/content`),
        fetch(`${API_BASE}/amenities`),
        fetch(`${API_BASE}/faqs`),
        fetch(`${API_BASE}/updates`)
      ]);

      setContent(await contentRes.json());
      setAmenities(await amenitiesRes.json());
      setFaqs(await faqsRes.json());
      setUpdates(await updatesRes.json());
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const updateContent = async (section, data) => {
    try {
      await fetch(`${API_BASE}/content/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      fetchData();
      alert('Content updated successfully!');
    } catch (err) {
      console.error('Error updating content:', err);
    }
  };

  const updateAmenity = async (id, data) => {
    try {
      await fetch(`${API_BASE}/amenities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      fetchData();
      setEditingItem(null);
      alert('Amenity updated successfully!');
    } catch (err) {
      console.error('Error updating amenity:', err);
    }
  };

  const updateFaq = async (id, data) => {
    try {
      await fetch(`${API_BASE}/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      fetchData();
      setEditingItem(null);
      alert('FAQ updated successfully!');
    } catch (err) {
      console.error('Error updating FAQ:', err);
    }
  };

  const addFaq = async () => {
    try {
      await fetch(`${API_BASE}/faqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: 'New Question', answer: 'New Answer' })
      });
      fetchData();
      alert('FAQ added successfully!');
    } catch (err) {
      console.error('Error adding FAQ:', err);
    }
  };

  const deleteFaq = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await fetch(`${API_BASE}/faqs/${id}`, { method: 'DELETE' });
      fetchData();
      alert('FAQ deleted successfully!');
    } catch (err) {
      console.error('Error deleting FAQ:', err);
    }
  };

  const updateConstructionUpdate = async (id, data) => {
    try {
      await fetch(`${API_BASE}/updates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      fetchData();
      setEditingItem(null);
      alert('Update saved successfully!');
    } catch (err) {
      console.error('Error saving update:', err);
    }
  };

  const getContent = (section) => {
    return content.find(c => c.section === section) || {};
  };

  const renderContentEditor = () => {
    const sectionData = getContent(activeSection);

    switch (activeSection) {
      case 'hero':
      case 'overview':
      case 'connectivity':
      case 'amenities':
      case 'about':
      case 'construction':
      case 'faq':
        return (
          <div className="admin-section">
            <h2>Edit {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section</h2>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                defaultValue={sectionData.title || ''}
                onChange={(e) => sectionData.title = e.target.value}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                defaultValue={sectionData.subtitle || ''}
                onChange={(e) => sectionData.subtitle = e.target.value}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                defaultValue={sectionData.description || ''}
                onChange={(e) => sectionData.description = e.target.value}
              />
            </div>
            {(activeSection === 'overview' || activeSection === 'about') && (
              <div className="form-group">
                <label>Content</label>
                <textarea
                  defaultValue={sectionData.content || ''}
                  onChange={(e) => sectionData.content = e.target.value}
                />
              </div>
            )}
            <button className="submit-btn" onClick={() => updateContent(activeSection, {
              title: sectionData.title,
              subtitle: sectionData.subtitle,
              description: sectionData.description,
              content: sectionData.content
            })}>Save Changes</button>
          </div>
        );

      case 'amenities-edit':
        return (
          <div className="admin-section">
            <h2>Edit Amenities</h2>
            <div className="editable-list">
              {amenities.map((amenity) => (
                <div className="editable-item" key={amenity.id}>
                  {editingItem === `amenity-${amenity.id}` ? (
                    <>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          defaultValue={amenity.title}
                          id={`amenity-title-${amenity.id}`}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          defaultValue={amenity.description}
                          id={`amenity-desc-${amenity.id}`}
                        />
                      </div>
                      <div className="editable-item-actions">
                        <button className="edit-btn" onClick={() => updateAmenity(amenity.id, {
                          title: document.getElementById(`amenity-title-${amenity.id}`).value,
                          description: document.getElementById(`amenity-desc-${amenity.id}`).value
                        })}>Save</button>
                        <button className="delete-btn" onClick={() => setEditingItem(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>{amenity.title}</h4>
                      <p>{amenity.description}</p>
                      <div className="editable-item-actions">
                        <button className="edit-btn" onClick={() => setEditingItem(`amenity-${amenity.id}`)}>Edit</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'faqs-edit':
        return (
          <div className="admin-section">
            <h2>Edit FAQs</h2>
            <div className="editable-list">
              {faqs.map((faq) => (
                <div className="editable-item" key={faq.id}>
                  {editingItem === `faq-${faq.id}` ? (
                    <>
                      <div className="form-group">
                        <label>Question</label>
                        <input
                          type="text"
                          defaultValue={faq.question}
                          id={`faq-question-${faq.id}`}
                        />
                      </div>
                      <div className="form-group">
                        <label>Answer</label>
                        <textarea
                          defaultValue={faq.answer}
                          id={`faq-answer-${faq.id}`}
                        />
                      </div>
                      <div className="editable-item-actions">
                        <button className="edit-btn" onClick={() => updateFaq(faq.id, {
                          question: document.getElementById(`faq-question-${faq.id}`).value,
                          answer: document.getElementById(`faq-answer-${faq.id}`).value
                        })}>Save</button>
                        <button className="delete-btn" onClick={() => setEditingItem(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>{faq.question}</h4>
                      <p>{faq.answer}</p>
                      <div className="editable-item-actions">
                        <button className="edit-btn" onClick={() => setEditingItem(`faq-${faq.id}`)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteFaq(faq.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button className="submit-btn" onClick={addFaq}>Add New FAQ</button>
          </div>
        );

      case 'updates-edit':
        return (
          <div className="admin-section">
            <h2>Edit Construction Updates</h2>
            <div className="editable-list">
              {updates.map((update) => (
                <div className="editable-item" key={update.id}>
                  {editingItem === `update-${update.id}` ? (
                    <>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          defaultValue={update.title}
                          id={`update-title-${update.id}`}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          defaultValue={update.description}
                          id={`update-desc-${update.id}`}
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="date"
                          defaultValue={update.date}
                          id={`update-date-${update.id}`}
                        />
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          defaultValue={update.status}
                          id={`update-status-${update.id}`}
                          style={{ width: '100%', padding: '12px', border: '1px solid #333', borderRadius: '5px', background: '#0a0a0a', color: '#fff' }}
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div className="editable-item-actions">
                        <button className="edit-btn" onClick={() => updateConstructionUpdate(update.id, {
                          title: document.getElementById(`update-title-${update.id}`).value,
                          description: document.getElementById(`update-desc-${update.id}`).value,
                          date: document.getElementById(`update-date-${update.id}`).value,
                          status: document.getElementById(`update-status-${update.id}`).value
                        })}>Save</button>
                        <button className="delete-btn" onClick={() => setEditingItem(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>{update.title}</h4>
                      <p>{update.description}</p>
                      <span className={`update-status ${update.status}`}>
                        {update.status === 'completed' ? 'Completed' : 
                         update.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      </span>
                      <div className="editable-item-actions">
                        <button className="edit-btn" onClick={() => setEditingItem(`update-${update.id}`)}>Edit</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Select a section to edit</div>;
    }
  };

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <h1>Admin Panel - Megaplex Prime</h1>
        <button onClick={onLogout}>Logout</button>
      </nav>
      <div className="admin-content">
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
          <div>
            <div className="admin-section">
              <h2>Sections</h2>
              <div className="form-group">
                <button 
                  className="submit-btn" 
                  style={{ width: '100%', marginBottom: '10px', background: activeSection === 'hero' ? '#ffd700' : '#1a1a1a', color: activeSection === 'hero' ? '#0a0a0a' : '#fff' }}
                  onClick={() => setActiveSection('hero')}
                >
                  Hero Section
                </button>
                <button 
                  className="submit-btn" 
                  style={{ width: '100%', marginBottom: '10px', background: activeSection === 'overview' ? '#ffd700' : '#1a1a1a', color: activeSection === 'overview' ? '#0a0a0a' : '#fff' }}
                  onClick={() => setActiveSection('overview')}
                >
                  Project Overview
                </button>
                <button 
                  className="submit-btn" 
                  style={{ width: '100%', marginBottom: '10px', background: activeSection === 'connectivity' ? '#ffd700' : '#1a1a1a', color: activeSection === 'connectivity' ? '#0a0a0a' : '#fff' }}
                  onClick={() => setActiveSection('connectivity')}
                >
                  Connectivity
                </button>
                <button 
                  className="submit-btn" 
                  style={{ width: '100%', marginBottom: '10px', background: activeSection === 'amenities-edit' ? '#ffd700' : '#1a1a1a', color: activeSection === 'amenities-edit' ? '#0a0a0a' : '#fff' }}
                  onClick={() => setActiveSection('amenities-edit')}
                >
                  Amenities
                </button>
                <button 
                  className="submit-btn" 
                  style={{ width: '100%', marginBottom: '10px', background: activeSection === 'about' ? '#ffd700' : '#1a1a1a', color: activeSection === 'about' ? '#0a0a0a' : '#fff' }}
                  onClick={() => setActiveSection('about')}
                >
                  About Us
                </button>
                <button 
                  className="submit-btn" 
                  style={{ width: '100%', marginBottom: '10px', background: activeSection === 'updates-edit' ? '#ffd700' : '#1a1a1a', color: activeSection === 'updates-edit' ? '#0a0a0a' : '#fff' }}
                  onClick={() => setActiveSection('updates-edit')}
                >
                  Construction Updates
                </button>
                <button 
                  className="submit-btn" 
                  style={{ width: '100%', marginBottom: '10px', background: activeSection === 'faqs-edit' ? '#ffd700' : '#1a1a1a', color: activeSection === 'faqs-edit' ? '#0a0a0a' : '#fff' }}
                  onClick={() => setActiveSection('faqs-edit')}
                >
                  FAQs
                </button>
              </div>
            </div>
          </div>
          <div>
            {renderContentEditor()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [view, setView] = useState('home'); // 'home', 'login', 'admin'
  const [content, setContent] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contentRes, amenitiesRes, faqsRes, updatesRes] = await Promise.all([
        fetch(`${API_BASE}/content`),
        fetch(`${API_BASE}/amenities`),
        fetch(`${API_BASE}/faqs`),
        fetch(`${API_BASE}/updates`)
      ]);

      setContent(await contentRes.json());
      setAmenities(await amenitiesRes.json());
      setFaqs(await faqsRes.json());
      setUpdates(await updatesRes.json());
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleAdminClick = () => {
    setView('login');
  };

  const handleLogin = () => {
    setView('admin');
  };

  const handleLogout = () => {
    setView('home');
  };

  const handleBack = () => {
    setView('home');
  };

  switch (view) {
    case 'login':
      return <Login onLogin={handleLogin} onBack={handleBack} />;
    case 'admin':
      return <AdminPanel onLogout={handleLogout} />;
    default:
      return (
        <HomePage
          content={content}
          amenities={amenities}
          faqs={faqs}
          updates={updates}
          onAdminClick={handleAdminClick}
        />
      );
  }
}

export default App;
