# CareerSet - Job Portal Server

## Project Overview

CareerSet is a comprehensive job portal application built with the MERN stack. The server provides RESTful APIs for user authentication, company management, job postings, and application handling. It features secure authentication, file uploads, and a robust database structure.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Company Management**: Companies can register and manage their profiles
- **Job Postings**: Create, update, and delete job listings
- **Application System**: Users can apply for jobs with resume uploads
- **File Uploads**: Support for profile pictures and resume uploads via Cloudinary
- **Database Integration**: MongoDB with Mongoose for data modeling

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt/bcryptjs** - Password hashing
- **Cloudinary** - Cloud storage for files
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for file uploads)

## Installation

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the server root directory with the following variables:
   ```env
   PORT=6000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

## Starting the Server

### Development Mode
To start the server in development mode with automatic restarts:
```bash
npm run dev
```
or using nodemon directly:
```bash
nodemon index.js
```

### Production Mode
To start the server in production mode:
```bash
npm start
```

The server will start on port 6000 (or the port specified in your `.env` file).

## API Endpoints

### User Routes
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

### Company Routes
- `POST /api/v1/company/register` - Register a new company
- `POST /api/v1/company/login` - Company login
- `GET /api/v1/company/profile` - Get company profile
- `PUT /api/v1/company/profile` - Update company profile

### Job Routes
- `POST /api/v1/job/post` - Post a new job
- `GET /api/v1/job/get` - Get all jobs
- `GET /api/v1/job/get/:id` - Get job by ID
- `PUT /api/v1/job/update/:id` - Update job
- `DELETE /api/v1/job/delete/:id` - Delete job

### Application Routes
- `POST /api/v1/application/apply` - Apply for a job
- `GET /api/v1/application/get` - Get all applications
- `GET /api/v1/application/get/:id` - Get application by ID
- `DELETE /api/v1/application/delete/:id` - Delete application

## Database Schema

The application uses the following main schemas:
- **User**: Contains user information, education, and experience
- **Company**: Company profile and details
- **Job**: Job postings with requirements and details
- **Application**: Job applications with status tracking

## Environment Variables

Make sure to configure the following environment variables in your `.env` file:

- `PORT`: Server port (default: 6000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
