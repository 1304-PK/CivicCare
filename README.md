# CivicCare

A full-stack platform empowering citizens to report civic issues and enabling government officers to take swift action. Built with **React**, **Express**, and **MySQL**.

## About the Project

CivicCare bridges the gap between citizens and government authorities, creating a transparent platform where civic issues are heard and resolved. From littering and road repairs to water supply disruptions and infrastructure concerns, CivicCare ensures complaints reach the right hands quickly.

## Key Features

- **Citizen Portal**: Report civic issues with detailed descriptions, location information, and supporting evidence (photos/documents)
- **Officer Dashboard**: Government officials can view complaints in their assigned areas and update resolution status
- **Area-Based Filtering**: Officers see only complaints from their jurisdiction
- **Complaint Tracking**: Users can view their past complaints and track resolution status
- **Secure Authentication**: JWT-based authentication with password encryption using bcrypt
- **File Uploads**: Support for attaching photos/evidence to complaints
- **Multi-State Support**: Complete list of Indian states and cities for location selection

## Tech Stack

### Frontend
- **React 19** with Vite for fast development and builds
- **React Router** for navigation
- **Lucide React** & **React Icons** for UI components
- **CSS** for styling with responsive design

### Backend
- **Express.js** for RESTful API
- **MySQL** with connection pooling for data persistence
- **JWT** for secure authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **CORS** enabled for cross-origin requests

### Database
- **MySQL** with connection pooling for efficient resource management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1304-PK/CivicCare.git
   cd CivicCare
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory:
   ```
   HOST=localhost
   USER=your_mysql_user
   PASSWORD=your_mysql_password
   database=civic_care_db
   JWT_KEY=your_jwt_secret_key
   ```

   Start the server:
   ```bash
   npm start
   ```
   The API will run on `http://localhost:3000`

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   ```

   Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`

### Database Setup

Create a MySQL database and import the necessary tables. The application expects tables for:
- `users` - Store user information and roles
- `complaints` - Store complaint details
- `complaint_updates` - Track complaint status updates

Refer to `server/db.js` for the connection configuration.

## Usage

### For Citizens
1. Visit the landing page and click **GET STARTED**
2. Sign up with your email and password
3. Log in to your dashboard
4. Click **Report a Complaint** to submit a new complaint
5. Fill in the complaint details (subject, description, location, evidence)
6. View your past complaints in **My Complaints**

### For Government Officers
1. Sign up/Log in with officer credentials
2. Access the **Officer Dashboard**
3. View complaints assigned to your area
4. Update complaint status and resolution details
5. Monitor complaint resolution metrics

## Project Structure

```
client/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/           # Page components (Landing, Dashboard, Forms, etc.)
│   ├── styles/          # CSS styling files
│   ├── utils/           # Utility functions
│   ├── router.jsx       # Route configuration
│   └── main.jsx         # Application entry point
└── package.json         # Frontend dependencies

server/
├── server.js            # Express server setup and routes
├── db.js                # MySQL connection configuration
└── package.json         # Backend dependencies
```

## API Endpoints

Key endpoints include:
- `POST /api/signup` - Register new user
- `POST /api/login` - Authenticate user
- `POST /upload-complaint` - Submit complaint with file upload
- `GET /api/get-complaint-form` - Verify user authorization
- `GET /api/complaints` - Retrieve user complaints
- `GET /api/officer-complaints` - Get complaints for officer's area
- `PATCH /api/complaint/:id` - Update complaint status

For detailed API documentation, refer to the server routes in `server/server.js`.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

**Pushkar** - [@1304-PK](https://github.com/1304-PK)

---

**Made with ❤️ to build better communities through transparency and accountability.**
