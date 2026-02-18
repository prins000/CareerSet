# CareerSet - Job Portal

A comprehensive job portal application built with the MERN stack (MongoDB, Express.js, React, Node.js). CareerSet connects job seekers with companies through an intuitive and feature-rich platform.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Company Management**: Companies can register and manage their profiles
- **Job Postings**: Create, update, and delete job listings
- **Application System**: Users can apply for jobs with resume uploads
- **File Uploads**: Support for profile pictures and resume uploads via Cloudinary
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live status updates for applications
- **Dashboard**: Personalized dashboard for users and companies

## 🛠 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling framework
- **Radix UI** - Component library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Cloudinary** - Cloud storage for files

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** - [Download Git](https://git-scm.com/)
- **Cloudinary account** (for file uploads) - [Sign up for free](https://cloudinary.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
# Clone the repository from GitHub
git clone https://github.com/your-username/careerset-job-portal.git

# Navigate into the project directory
cd career-set-job-portal
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Go back to root directory
cd ..

# Install client dependencies
cd client
npm install

# Go back to root directory
cd ..
```

### 3. Environment Setup

#### Server Environment Setup

Create a `.env` file in the `server` directory:

```bash
cd server
```

Create `.env` file with the following content:

```env
# Server Configuration
PORT=6000

# Database
MONGODB_URI=mongodb://localhost:27017/careerset
# OR use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerset

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration (get from Cloudinary dashboard)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Client Environment Setup

Create a `.env` file in the `client` directory:

```bash
cd client
```

Create `.env` file with the following content:

```env
# API URL
VITE_API_URL=http://localhost:6000
```

### 4. Database Setup

#### Option 1: Local MongoDB
```bash
# Start MongoDB service (if installed locally)
# On Windows
net start MongoDB

# On macOS
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

#### Option 2: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `MONGODB_URI` in server `.env` file

### 5. Cloudinary Setup (for file uploads)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Go to Dashboard → Settings → API Keys
4. Copy your Cloud name, API Key, and API Secret
5. Update the Cloudinary variables in server `.env` file

## 🏃‍♂️ Running the Application

### Method 1: Run Both Servers Separately (Recommended for Development)

#### Start the Backend Server
```bash
# Navigate to server directory
cd server

# Start in development mode (with auto-restart)
npm run dev
# OR
nodemon index.js

# For production
npm start
```

The backend server will start on `http://localhost:6000`

#### Start the Frontend Server
Open a **new terminal window** and run:

```bash
# Navigate to client directory
cd client

# Start development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

### Method 2: Run Both with Concurrently (Alternative)

Install concurrently in root directory:

```bash
# In root directory
npm install concurrently --save-dev
```

Add to root `package.json` scripts:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && npm run dev",
    "client": "cd client && npm run dev"
  }
}
```

Then run:

```bash
npm run dev
```

## 🌐 Accessing the Application

Once both servers are running:

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:6000`
- **API Documentation**: `http://localhost:6000/api-docs` (if implemented)

## 📁 Project Structure

```
career-set-job-portal/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── controller/        # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middlewares
│   ├── utils/           # Utility functions
│   └── package.json
├── .gitignore
└── README.md
```

## 🔧 Available Scripts

### Server Scripts
```bash
cd server

npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if implemented)
```

### Client Scripts
```bash
cd client

npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify network connectivity for MongoDB Atlas

2. **Port Already in Use**
   ```bash
   # Kill process on port 6000 (Windows)
   netstat -ano | findstr :6000
   taskkill /PID <PID> /F
   
   # Kill process on port 6000 (macOS/Linux)
   lsof -ti:6000 | xargs kill -9
   ```

3. **CORS Errors**
   - Ensure frontend URL is in server CORS options
   - Check that both servers are running

4. **Cloudinary Upload Issues**
   - Verify Cloudinary credentials in `.env`
   - Check Cloudinary account limits

### Environment Variables Not Loading
```bash
# Restart servers after updating .env files
# Ensure .env files are in correct directories
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Upload the 'dist' folder to your hosting provider
```

### Backend Deployment (Heroku/Railway/Render)
```bash
cd server
# Set environment variables in hosting provider
# Deploy using provider's CLI or GitHub integration
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/company/register` - Company registration
- `POST /api/v1/company/login` - Company login

### Job Endpoints
- `GET /api/v1/job/get` - Get all jobs
- `POST /api/v1/job/post` - Post new job
- `PUT /api/v1/job/update/:id` - Update job
- `DELETE /api/v1/job/delete/:id` - Delete job

### Application Endpoints
- `POST /api/v1/application/apply` - Apply for job
- `GET /api/v1/application/get` - Get applications
- `DELETE /api/v1/application/delete/:id` - Delete application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Search existing [GitHub Issues](https://github.com/your-username/careerset-job-portal/issues)
3. Create a new issue with detailed information

---

**Happy Coding! 🎉**
