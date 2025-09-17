# Environment Variables Guide

## Required Variables

### VITE_API_URL
- **Description**: Backend API base URL
- **Default**: `http://localhost:3000`
- **Example**: `http://localhost:3000` or `https://api.production.com`

## Optional Variables

### VITE_DEBUG
- **Description**: Enable debug logging
- **Default**: `false`
- **Values**: `true` | `false`

### VITE_APP_NAME
- **Description**: Application display name
- **Default**: `ACME Demo`
- **Example**: `My Company Dashboard`

### VITE_APP_VERSION
- **Description**: Application version
- **Default**: `1.0.0`
- **Example**: `2.1.0`

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file** with your values:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_DEBUG=false
   VITE_APP_NAME=ACME Demo
   VITE_APP_VERSION=1.0.0
   ```

3. **Restart the development server:**
   ```bash
   npm run dev
   ```

## Environment-Specific Configurations

### Development
```env
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
```

### Staging
```env
VITE_API_URL=https://api-staging.example.com
VITE_DEBUG=false
```

### Production
```env
VITE_API_URL=https://api.example.com
VITE_DEBUG=false
```

## Important Notes

- All environment variables must be prefixed with `VITE_` to be accessible in the browser
- Changes to `.env` require restarting the development server
- Never commit `.env` files to version control
- Use `.env.example` as a template for team members
