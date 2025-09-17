# Quick Setup Guide

## Prerequisites

- Node.js (v18+)
- Backend API running on `http://localhost:3000`

## Environment Variables

Create a `.env` file in the frontend root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Optional
VITE_DEBUG=false
VITE_APP_NAME=ACME Demo
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Backend Setup

Make sure the backend is running:

```bash
# In backend directory
cd ../backend
npm install
npm run start:dev
```

## Testing the Application

1. **Open** `http://localhost:5173`
2. **Register** a new account
3. **Login** with your credentials
4. **Explore** the dashboard features

## Build for Production

```bash
npm run build
npm run preview
```

## Troubleshooting

### API Connection Issues
- Ensure backend is running on port 3000
- Check `VITE_API_URL` in `.env` file
- Verify CORS settings in backend

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Authentication Issues
- Clear browser localStorage
- Check network tab for API calls
- Verify JWT token format

For detailed information, see the main README.md file.
