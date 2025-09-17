# ACME Demo Frontend

<p align="center">
  <img src="https://vitejs.dev/logo.svg" width="120" alt="Vite Logo" />
  <img src="https://react.dev/logo.svg" width="120" alt="React Logo" />
  <img src="https://tailwindcss.com/favicons/favicon.svg" width="120" alt="Tailwind CSS Logo" />
</p>

<p align="center">A modern React frontend application built with Vite, featuring authentication, responsive design, and interactive dashboards with real-time data visualization.</p>

## 🚀 Features

- **🔐 Authentication System**: Complete signup and login with JWT tokens
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🎨 Modern UI Components**: Built with shadcn/ui and Radix UI primitives
- **📊 Interactive Dashboard**: Real-time charts and data visualization with Recharts
- **📅 Date Range Picker**: Custom dual-month calendar with range selection
- **🌙 Dark/Light Theme**: System-aware theme switching
- **🔔 Toast Notifications**: User feedback with react-hot-toast
- **🛡️ Protected Routes**: Route protection with authentication guards
- **📱 PWA Ready**: Optimized for mobile and desktop experiences
- **⚡ Fast Development**: Vite for lightning-fast hot module replacement

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** running on `http://localhost:3000` (see [Backend README](../backend/README.md))

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd acme-demo/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Optional: Enable debug mode
VITE_DEBUG=false

# Optional: Application settings
VITE_APP_NAME=ACME Demo
VITE_APP_VERSION=1.0.0
```

**Required Environment Variables:**

| Variable | Description | Default Value | Required |
|----------|-------------|---------------|----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` | ✅ |
| `VITE_DEBUG` | Enable debug logging | `false` | ❌ |
| `VITE_APP_NAME` | Application name | `ACME Demo` | ❌ |
| `VITE_APP_VERSION` | Application version | `1.0.0` | ❌ |

### 4. Start the Development Server

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will start on `http://localhost:5173` (or the next available port).

## 🎯 Application Routes

| Route | Component | Description | Authentication |
|-------|-----------|-------------|----------------|
| `/` | Redirect | Redirects to `/auth/sign-in` | ❌ |
| `/auth/sign-in` | AuthSignIn | User login page | ❌ |
| `/auth/sign-up` | AuthSignUp | User registration page | ❌ |
| `/dashboard` | Dashboard | Main application dashboard | ✅ Required |

## 🏗️ Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx      # Button component
│   │   ├── card.tsx        # Card component
│   │   ├── input.tsx       # Input component
│   │   ├── calendar.tsx    # Calendar component
│   │   └── chart.tsx       # Chart components
│   ├── icons/              # Custom icon components
│   ├── AuthThemeSwitcher.tsx
│   ├── ProtectedRoute.tsx  # Route protection
│   ├── RangePicker.tsx     # Date range picker
│   ├── ChartBarInteractive.tsx
│   └── UserProfileDropdown.tsx
├── pages/                  # Page components
│   ├── AuthSignIn.tsx      # Login page
│   ├── AuthSignUp.tsx      # Registration page
│   ├── Dashboard.tsx       # Main dashboard
│   └── hooks.ts           # Custom hooks
├── lib/                   # Utility functions
│   └── utils.ts           # Common utilities
├── store.ts               # Redux store configuration
├── App.tsx                # Main application component
└── main.tsx               # Application entry point
```

## 🎨 UI Components & Styling

### Design System
- **Framework**: Tailwind CSS v4 with CSS variables
- **Component Library**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React icons
- **Theme**: CSS variables for light/dark mode support

### Key Components

#### Authentication Forms
- **Form Validation**: Zod schema validation with react-hook-form
- **Input Types**: Email, password with show/hide toggle
- **Social Login**: Google and Microsoft integration ready
- **Toast Notifications**: Success/error feedback

#### Dashboard Features
- **Responsive Sidebar**: Collapsible navigation with mobile drawer
- **Date Range Picker**: Dual-month calendar with preset options
- **Interactive Charts**: Bar charts with Recharts library
- **Data Visualization**: Real-time data updates
- **Theme Toggle**: System-aware dark/light mode

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues

# Type Checking
npx tsc --noEmit         # Type check without emitting files
```

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile (< 768px)**: Drawer navigation, stacked layouts
- **Tablet (768px - 1024px)**: Icon rail navigation
- **Desktop (> 1024px)**: Full sidebar with labels

### Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

## 🔐 Authentication Flow

### Login Process
1. User enters email and password
2. Form validation with Zod schema
3. API call to `/auth/login`
4. JWT token stored in localStorage
5. Redirect to dashboard
6. Toast notification for success/error

### Registration Process
1. User enters name, email, and password
2. Form validation with password requirements
3. API call to `/auth/signup`
4. Success message with redirect to login
5. Toast notification for feedback

### Protected Routes
- Routes wrapped with `ProtectedRoute` component
- Automatic redirect to login if not authenticated
- JWT token validation on route access

## 📊 State Management

### Redux Toolkit Store
```typescript
interface AuthState {
  token: string | null
  user: { id?: string; name?: string; email?: string } | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error?: string
}
```

### Async Actions
- `login(payload)`: User authentication
- `signup(payload)`: User registration
- `fetchMe()`: Get current user profile
- `logout()`: Clear authentication state

## 🎯 API Integration

### Base Configuration
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
```

### Authentication Headers
```typescript
headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
}
```

### Error Handling
- Network error handling
- API error responses
- User-friendly error messages
- Toast notifications for feedback

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Environment-Specific Builds
```bash
# Development
npm run dev

# Production preview
npm run build && npm run preview

# Custom environment
VITE_API_URL=https://api.production.com npm run build
```

### Deployment Options

#### Static Hosting (Vercel, Netlify)
```bash
npm run build
# Deploy dist/ folder
```

#### Docker Deployment
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📊 Assumptions & Trade-offs

### Assumptions

1. **Backend API**: Backend runs on `localhost:3000` by default
2. **Browser Support**: Modern browsers with ES2020+ support
3. **Network**: Reliable internet connection for API calls
4. **Authentication**: JWT tokens stored in localStorage
5. **Responsive**: Mobile-first design approach

### Trade-offs

1. **State Management**:
   - ✅ Redux Toolkit for predictable state updates
   - ❌ Additional complexity for simple state

2. **Form Validation**:
   - ✅ Zod provides type-safe validation
   - ❌ Runtime validation overhead

3. **Styling**:
   - ✅ Tailwind CSS for rapid development
   - ❌ Larger bundle size with unused styles

4. **Authentication Storage**:
   - ✅ localStorage for persistence across sessions
   - ❌ Vulnerable to XSS attacks (mitigated by proper sanitization)

5. **Bundle Size**:
   - ✅ Vite provides fast builds and HMR
   - ❌ Multiple dependencies increase bundle size

## 🔍 Troubleshooting

### Common Issues

1. **API Connection Errors:**
   ```bash
   # Check if backend is running
   curl http://localhost:3000/me
   
   # Verify environment variables
   echo $VITE_API_URL
   ```

2. **Build Errors:**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Check TypeScript errors
   npx tsc --noEmit
   ```

3. **Authentication Issues:**
   - Check JWT token in localStorage
   - Verify token expiration
   - Clear localStorage and re-login

4. **Styling Issues:**
   - Check Tailwind CSS configuration
   - Verify CSS variables are loaded
   - Check for conflicting styles

### Debug Mode

Enable debug logging:
```env
VITE_DEBUG=true
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration flow
- [ ] User login flow
- [ ] Protected route access
- [ ] Responsive design on different screen sizes
- [ ] Theme switching (light/dark mode)
- [ ] Date range picker functionality
- [ ] Chart interactions
- [ ] Toast notifications
- [ ] Form validation
- [ ] Error handling

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Support

For issues and questions:

1. Check the [React Documentation](https://react.dev/)
2. Review [Vite Documentation](https://vitejs.dev/)
3. Check [Tailwind CSS Documentation](https://tailwindcss.com/)
4. Review [shadcn/ui Documentation](https://ui.shadcn.com/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Future Enhancements

- [ ] Unit and integration tests
- [ ] E2E testing with Playwright
- [ ] PWA features (offline support, push notifications)
- [ ] Advanced data visualization
- [ ] Real-time updates with WebSockets
- [ ] Multi-language support (i18n)
- [ ] Advanced theming options
- [ ] Performance monitoring

---

**Built with ❤️ using React, Vite, TypeScript, and Tailwind CSS**