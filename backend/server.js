const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite Database Setup
const db = new sqlite3.Database('./megaplex.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables and default data
function initializeDatabase() {
  db.serialize(() => {
    // Create content table
    db.run(`CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT UNIQUE NOT NULL,
      title TEXT,
      subtitle TEXT,
      description TEXT,
      content TEXT,
      label TEXT,
      order_num INTEGER DEFAULT 0
    )`);

    // Create admin table
    db.run(`CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);

    // Insert default admin if not exists
    db.run(`INSERT OR IGNORE INTO admin (email, password) VALUES (?, ?)`, 
      ['admin@gmail.com', '1234'], 
      (err) => {
        if (err) console.error('Error inserting admin:', err);
      }
    );

    // Insert default content if not exists
    const defaultContent = [
      // Hero Section
      { section: 'hero', title: 'MEGAPLEX PRIME', subtitle: 'Premium Residential Project', description: 'Experience luxury living at its finest with Megaplex Prime - Where Dreams Meet Reality' },
      
      // Project Overview
      { section: 'overview', title: 'Project Overview', subtitle: 'About Our Project', description: 'Megaplex Prime is a premium residential project that offers modern living spaces with world-class amenities. Located in the heart of the city, it provides easy access to all major facilities.', content: 'Our project spans across 5 acres of lush green landscape with 4 towers comprising 400+ units. Each apartment is designed to maximize natural light and ventilation while maintaining privacy and comfort.' },
      
      // Nearby Connectivity
      { section: 'connectivity', title: 'Nearby Connectivity', subtitle: 'Well Connected', description: 'Strategically located with excellent connectivity to major landmarks', content: 'Metro Station: 500m | Airport: 15km | Railway Station: 3km | Shopping Mall: 1km | Hospital: 2km | School: 1.5km' },
      
      // Amenities
      { section: 'amenities', title: 'Amenities', subtitle: 'World Class Facilities', description: 'Enjoy a lifestyle of comfort and convenience' },
      
      // About Us
      { section: 'about', title: 'About Us', subtitle: 'Our Story', description: 'Building dreams since 2010', content: 'Megaplex Group is a renowned real estate developer with over 15 years of experience in creating landmark projects. We have delivered over 50 residential and commercial projects across the country.' },
      
      // Construction Updates
      { section: 'construction', title: 'Construction Updates', subtitle: 'Progress Report', description: 'Stay updated with our project progress' },
      
      // FAQ
      { section: 'faq', title: 'FAQ', subtitle: 'Frequently Asked Questions', description: 'Find answers to common questions' }
    ];

    const stmt = db.prepare(`INSERT OR IGNORE INTO content (section, title, subtitle, description, content) VALUES (?, ?, ?, ?, ?)`);
    defaultContent.forEach(item => {
      stmt.run(item.section, item.title, item.subtitle, item.description, item.content);
    });
    stmt.finalize();

    // Create amenities table
    db.run(`CREATE TABLE IF NOT EXISTS amenities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      icon TEXT
    )`);

    // Insert default amenities if not exists
    const defaultAmenities = [
      { title: 'Swimming Pool', description: 'Luxury pool for residents', icon: 'pool' },
      { title: 'Gymnasium', description: 'Fully equipped fitness center', icon: 'gym' },
      { title: 'Park', description: 'Beautiful landscaped gardens', icon: 'park' },
      { title: 'Security', description: '24/7 security with CCTV', icon: 'security' },
      { title: 'Parking', description: 'Covered parking space', icon: 'parking' },
      { title: 'Club House', description: 'Community hall for events', icon: 'club' }
    ];

    const amenityStmt = db.prepare(`INSERT OR IGNORE INTO amenities (title, description, icon) VALUES (?, ?, ?)`);
    defaultAmenities.forEach(item => {
      amenityStmt.run(item.title, item.description, item.icon);
    });
    amenityStmt.finalize();

    // Create faq table
    db.run(`CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT
    )`);

    // Insert default FAQs if not exists
    const defaultFaqs = [
      { question: 'What is the project completion date?', answer: 'The project is expected to be completed by December 2025.' },
      { question: 'What are the payment plans available?', answer: 'We offer flexible payment plans including construction-linked payments and subvented home loans.' },
      { question: 'Is the project RERA registered?', answer: 'Yes, the project is RERA registered with registration number P123456789.' },
      { question: 'What is the booking amount?', answer: 'The booking amount is Rs. 1,00,000 which is refundable.' }
    ];

    const faqStmt = db.prepare(`INSERT OR IGNORE INTO faqs (question, answer) VALUES (?, ?)`);
    defaultFaqs.forEach(item => {
      faqStmt.run(item.question, item.answer);
    });
    faqStmt.finalize();

    // Create construction updates table
    db.run(`CREATE TABLE IF NOT EXISTS updates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT,
      status TEXT
    )`);

    // Insert default updates if not exists
    const defaultUpdates = [
      { title: 'Foundation Work Completed', description: 'Foundation work for all towers completed successfully', date: '2024-01-15', status: 'completed' },
      { title: 'Structural Work - Tower A', description: 'Structural work for Tower A in progress', date: '2024-03-20', status: 'in-progress' },
      { title: 'MEP Installation', description: 'MEP installation started for Tower B', date: '2024-05-10', status: 'in-progress' },
      { title: 'Interior Work', description: 'Interior work to begin soon', date: '2024-07-01', status: 'upcoming' }
    ];

    const updateStmt = db.prepare(`INSERT OR IGNORE INTO updates (title, description, date, status) VALUES (?, ?, ?, ?)`);
    defaultUpdates.forEach(item => {
      updateStmt.run(item.title, item.description, item.date, item.status);
    });
    updateStmt.finalize();
  });
}

// API Routes

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (row) {
      return res.json({ success: true, message: 'Login successful' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Get all content sections
app.get('/api/content', (req, res) => {
  db.all('SELECT * FROM content ORDER BY id', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Get specific section content
app.get('/api/content/:section', (req, res) => {
  const { section } = req.params;
  db.get('SELECT * FROM content WHERE section = ?', [section], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(row || {});
  });
});

// Update content
app.put('/api/content/:section', (req, res) => {
  const { section } = req.params;
  const { title, subtitle, description, content } = req.body;
  
  db.run(
    'UPDATE content SET title = ?, subtitle = ?, description = ?, content = ? WHERE section = ?',
    [title, subtitle, description, content, section],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, message: 'Content updated successfully' });
    }
  );
});

// Get all amenities
app.get('/api/amenities', (req, res) => {
  db.all('SELECT * FROM amenities ORDER BY id', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Update amenity
app.put('/api/amenities/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  
  db.run(
    'UPDATE amenities SET title = ?, description = ? WHERE id = ?',
    [title, description, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, message: 'Amenity updated successfully' });
    }
  );
});

// Get all FAQs
app.get('/api/faqs', (req, res) => {
  db.all('SELECT * FROM faqs ORDER BY id', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Update FAQ
app.put('/api/faqs/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  
  db.run(
    'UPDATE faqs SET question = ?, answer = ? WHERE id = ?',
    [question, answer, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, message: 'FAQ updated successfully' });
    }
  );
});

// Add new FAQ
app.post('/api/faqs', (req, res) => {
  const { question, answer } = req.body;
  
  db.run(
    'INSERT INTO faqs (question, answer) VALUES (?, ?)',
    [question, answer],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Delete FAQ
app.delete('/api/faqs/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM faqs WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true, message: 'FAQ deleted successfully' });
  });
});

// Get all construction updates
app.get('/api/updates', (req, res) => {
  db.all('SELECT * FROM updates ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Update construction update
app.put('/api/updates/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, date, status } = req.body;
  
  db.run(
    'UPDATE updates SET title = ?, description = ?, date = ?, status = ? WHERE id = ?',
    [title, description, date, status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, message: 'Update saved successfully' });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
