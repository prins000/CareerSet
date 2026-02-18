# CareerSet - Job Portal Client

## Project Overview

CareerSet is a modern job portal application built with React and Vite. The client-side application provides an intuitive interface for job seekers and companies to connect. It features a responsive design, real-time updates, and seamless user experience.

## Features

- **User Authentication**: Secure login and registration system
- **Company Profiles**: Companies can create and manage their profiles
- **Job Search**: Advanced job search and filtering capabilities
- **Job Applications**: Easy application process with resume uploads
- **Dashboard**: Personalized dashboard for users and companies
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Theme switching support
- **Real-time Updates**: Live status updates for applications

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **Tailwind CSS** - Styling framework
- **Radix UI** - Component library
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Cloudinary** - Image upload service

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the client root directory:
   ```env
   VITE_API_URL=http://localhost:6000
   ```

## Starting the Development Server

To start the development server with hot module replacement:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── store/         # Redux store configuration
│   ├── utils/         # Utility functions
│   ├── hooks/         # Custom React hooks
│   ├── assets/        # Static assets
│   └── App.jsx        # Main App component
├── public/            # Public assets
└── index.html         # HTML template
```

## Key Features

### Authentication System
- JWT token-based authentication
- Protected routes
- Automatic token refresh
- User session persistence

### Job Management
- Advanced search with filters
- Job categories and tags
- Saved job listings
- Application tracking

### User Dashboard
- Profile management
- Application history
- Job recommendations
- Notifications

### Company Portal
- Company profile management
- Job posting management
- Applicant tracking
- Analytics dashboard

## Environment Variables

Configure the following environment variables in your `.env` file:

- `VITE_API_URL`: Backend API URL (default: http://localhost:6000)

## Build and Deployment

### Production Build
To create an optimized production build:
```bash
npm run build
```

### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```

## Styling

The application uses Tailwind CSS for styling with:
- Custom design system
- Responsive breakpoints
- Dark mode support
- Component-based styling

## State Management

State is managed using Redux Toolkit with:
- Slices for different features
- Async thunks for API calls
- Persistent state using Redux Persist

## API Integration

The client communicates with the backend using:
- Axios for HTTP requests
- Interceptors for request/response handling
- Error handling and retry logic

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Follow the existing code style
5. Test your changes
6. Submit a pull request

## Code Quality

- ESLint for code linting
- Prettier for code formatting
- Component-based architecture
- TypeScript-ready structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the ISC License.
