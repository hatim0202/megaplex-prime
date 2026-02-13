# Megaplex Prime - Real Estate Website with Admin Panel

A full-stack real estate website with an interactive admin panel to manage content dynamically.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: SQLite

## Project Structure

```
megaplex-prime/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── megaplex.db (auto-generated)
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## Admin Login Credentials

- **Email**: admin@gmail.com
- **Password**: 1234

## Features

### Public Website
- **Hero Section**: Main landing area with project name and call-to-action
- **Project Overview**: Description of the project with details
- **Nearby Connectivity**: Information about nearby facilities (Metro, Airport, etc.)
- **Amenities**: List of amenities with icons
- **About Us**: Company information
- **Construction Updates**: Progress report with status indicators
- **FAQ Section**: Expandable frequently asked questions

### Admin Panel
After logging in, you can edit:

1. **Hero Section**: Title, subtitle, description
2. **Project Overview**: Title, subtitle, description, content
3. **Connectivity**: Title, subtitle, description
4. **Amenities**: Individual amenity titles and descriptions
5. **About Us**: Title, subtitle, description, content
6. **Construction Updates**: Update titles, descriptions, dates, and status
7. **FAQs**: Add, edit, delete questions and answers

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | Admin login |
| GET | `/api/content` | Get all content sections |
| GET | `/api/content/:section` | Get specific section |
| PUT | `/api/content/:section` | Update section content |
| GET | `/api/amenities` | Get all amenities |
| PUT | `/api/amenities/:id` | Update amenity |
| GET | `/api/faqs` | Get all FAQs |
| PUT | `/api/faqs/:id` | Update FAQ |
| POST | `/api/faqs` | Add new FAQ |
| DELETE | `/api/faqs/:id` | Delete FAQ |
| GET | `/api/updates` | Get all construction updates |
| PUT | `/api/updates/:id` | Update construction update |

## Hosting

The project is hosted on:
- **Frontend**: Netlify (or similar)
- **Backend**: Render (or similar)

## Environment Variables

For production, set the following environment variable:
```
REACT_APP_API_URL=<your-backend-url>
```

## License

This project is for educational purposes.
