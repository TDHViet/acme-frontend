# ACME Demo Frontend

<p align="center">
  <img src="https://vitejs.dev/logo.svg" width="120" alt="Vite Logo" />
  <img src="https://react.dev/logo.svg" width="120" alt="React Logo" />
  <img src="https://tailwindcss.com/favicons/favicon.svg" width="120" alt="Tailwind CSS Logo" />
</p>

## 📖 Introduce about project

This is a simple demo application for achromatic acme app clone

## 🛠️ About the technology

### Framework
- **Built with React + Vite** - Modern React development with lightning-fast build tools

### UI Library
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Low-level UI primitives for building accessible components
- **ShadcnUI** - Beautifully designed components built on top of Radix UI

### Package Manager
- **NPM** - Node Package Manager for dependency management

### Backend Engine
- **Uses NestJS for deploy API** - Progressive Node.js framework for building efficient server-side applications

### Database
- **Connected to Supabase PostgreSQL** - Modern database platform with real-time capabilities

## ✨ Application Features

### 🔐 Login
- Users can enter their login credentials
- Calls API to verify if user exists in the system
- Secure JWT token-based authentication
- Automatic redirect to dashboard upon successful login

### 📝 Signup
- New users can register with name, email, and password
- Input validation and error handling
- Creates new user account in the database
- Redirects to login page after successful registration

### 📊 Dashboard
- Displays basic user information and statistics
- Interactive charts and data visualization
- Date range picker for filtering data
- Responsive design for all screen sizes
- Theme switching (light/dark mode)

## 🚀 How to run project

### 1. Clone the repository
```bash
git clone <your_repository_url>
cd <project_folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment setup
Create a `.env` file in the root directory:
```bash
VITE_API_URL=<Your_api_url>
```

Example:
```env
VITE_API_URL=http://localhost:3000
```

### 4. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** running on the specified URL

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # App shell: sidebar, header, route guards
│   ├── icons/brand-icons.tsx
│   └── mode-toggle.tsx
├── features/
│   ├── auth/                # Auth layout, password input, social buttons
│   └── dashboard/           # Date range filter, visitors chart, contact cards
├── pages/                   # Route components (lazy-loaded)
├── store/                   # Redux Toolkit store + auth slice
├── lib/                     # api client, token helpers, cn()
├── App.tsx                  # Routes
└── main.tsx                 # Providers (Redux, theme, tooltip, toaster)
```

### UI conventions

- Add UI primitives with `npx shadcn@latest add <component>` instead of writing them by hand.
- Use theme tokens (`bg-background`, `text-muted-foreground`, `bg-sidebar`...) — never raw `gray-*`/`black`/`white`.
- Theme is managed by `next-themes` (`light` / `dark` / `system`, stored under `theme` in localStorage).
- Toasts use `sonner` via `@/components/ui/sonner`.

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile (< 768px)**: Sidebar opens as a sheet (drawer)
- **≥ 768px**: Collapsible sidebar (icon rail when collapsed, toggle with `Ctrl/⌘ + B`; state persisted in a cookie)

## 🔐 Authentication Flow

### Login Process
1. User enters email and password
2. Form validation with Zod schema
3. API call to verify credentials
4. JWT token stored in localStorage (expiry checked client-side before entering protected routes)
5. Redirect to dashboard
6. Toast notification for success/error

### Registration Process
1. User enters name, email, and password
2. Form validation with password requirements
3. API call to create new user
4. Success message with redirect to login
5. Toast notification for feedback

### Protected Routes
- Routes wrapped with `ProtectedRoute` component
- Automatic redirect to login if not authenticated
- JWT token validation on route access

## 🎯 API Integration

### Base Configuration
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL
```

### Authentication Headers
```typescript
headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
}
```

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.


## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration flow
- [ ] User login flow
- [ ] Protected route access
- [ ] Responsive design on different screen sizes
- [ ] Theme switching functionality
- [ ] Dashboard interactions
- [ ] Toast notifications
- [ ] Form validation
- [ ] Error handling

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔍 Troubleshooting

### Common Issues

1. **API Connection Errors:**
   - Check if backend is running
   - Verify VITE_API_URL in .env file
   - Ensure CORS is configured correctly

2. **Build Errors:**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify environment variables

3. **Authentication Issues:**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify token format
