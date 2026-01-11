# MAIO - Medical Appointment Integration Online

A comprehensive healthcare platform frontend enabling seamless appointment booking, medical history management, secure payments, and real-time doctor-patient communication.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Environment Configuration](#environment-configuration)
- [Architecture & Key Features](#architecture--key-features)
- [API Integration](#api-integration)
- [Authentication & Authorization](#authentication--authorization)
- [Available Scripts](#available-scripts)
- [Code Style & Linting](#code-style--linting)
- [Performance Optimizations](#performance-optimizations)
- [Contribution Guidelines](#contribution-guidelines)
- [Troubleshooting](#troubleshooting)

---

## Overview

**MAIO** is a modern healthcare application that connects patients with doctors for medical consultations. The platform streamlines appointment scheduling, manages medical records, processes secure payments, and facilitates real-time communication—all through an intuitive, responsive interface.

### Problem Solved

- **Appointment Friction**: Traditional booking systems are cumbersome; MAIO simplifies scheduling with instant availability checks and calendar integration
- **Medical Records**: Fragmented health data scattered across providers; MAIO centralizes patient medical history
- **Payment Complexity**: Insecure or outdated payment methods; MAIO integrates Stripe for PCI-compliant transactions
- **Communication Gap**: Async communication between doctors and patients; MAIO adds real-time chat via WebSockets

### User Roles

- **Patients**: Book appointments, view medical history, upload documents, process payments, chat with doctors
- **Doctors**: Manage schedules, view patient histories, approve appointments, consult in real-time
- **Admin**: Approve doctor registrations, manage platform compliance (backend-driven)

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Language** | TypeScript / JavaScript | 5.9.3 | Type safety, improved DX |
| **Framework** | React | 19.2.0 | UI library with modern hooks |
| **Build Tool** | Vite | 7.2.5 (rolldown-vite) | Lightning-fast build & HMR |
| **Routing** | React Router DOM | 7.9.6 | Client-side navigation |
| **State Management** | Redux Toolkit | 2.10.1 | Global state (if used) |
| **State (Local)** | Context API | - | Multi-step form state |
| **HTTP Client** | Axios | 1.13.2 | API communication with interceptors |
| **Data Fetching** | TanStack React Query | 5.90.11 | Server-state management, caching, sync |
| **Styling** | Tailwind CSS + DaisyUI | 4.1.17 + 5.5.5 | Utility-first CSS, component library |
| **Forms** | React Hook Form | 7.66.1 | Efficient, flexible form handling |
| **Notifications** | React Hot Toast | 2.6.0 | User feedback (alerts, confirmations) |
| **Real-time** | Socket.io Client | 4.8.3 | WebSocket-based live chat |
| **Calendar** | React Big Calendar | 1.19.4 | Appointment scheduling UI |
| **Payment** | Stripe.js + React Stripe.js | 8.6.0 + 5.4.1 | PCI-compliant card processing |
| **File Upload** | React Dropzone | 14.3.8 | Drag-drop file input |
| **Icons** | Lucide React + React Icons | 0.555.0 + 5.5.0 | Icon library |
| **Date Utilities** | date-fns | 4.1.0 | Date parsing & formatting |
| **Auth** | react-auth-kit | 2.12.6 | Cookie-based token storage & auth state |
| **Linting** | ESLint + TypeScript ESLint | 9.39.1 | Code quality & type checking |
| **Compiler** | Babel React Compiler | 1.0.0 | Auto-memoization optimization |

---

## Project Structure

```
src/
├── main.tsx                    # React entry point
├── App.jsx                     # Router configuration, global providers
├── index.css                   # Global styles (Tailwind + custom CSS variables)
│
├── assets/                     # Static images
│   ├── DrInfoImgs/            # Doctor info graphics
│   ├── DrSpecialityImgs/       # Specialty icons
│   ├── headerPhoto/           # Header images
│   └── navLogo/               # Logo files
│
├── Context/                    # React Context (form state)
│   ├── DoctorRegisterContext.jsx      # Multi-step doctor registration state
│   └── PatientRegisterContext.jsx     # Patient registration state
│
├── features/                   # Feature-specific components & hooks
│   ├── Admin/                 # Admin utilities
│   ├── Appointments/          # Booking, doctor info, calendar hooks
│   │   ├── BookingSlot.jsx
│   │   ├── DrInfo.jsx
│   │   ├── useAvailableDays.js
│   │   ├── useBookingDoctor.js
│   │   ├── useCreateReservation.js
│   │   ├── useDeleteAppointment.js
│   │   └── useGetReservation.js
│   ├── Authentication/         # Login, registration, protected routes
│   │   ├── DoctorRegisterWizard.jsx
│   │   ├── PatientRegisterFormWizard.jsx
│   │   ├── LoginForm.jsx
│   │   ├── ProtectedRoutes.jsx         # Role-based route protection
│   │   └── useLogin.js, useSignUp.js, etc.
│   ├── Doctors/               # Doctor-specific features
│   │   └── DoctorSettings.jsx
│   ├── Patients/              # Patient features
│   │   ├── MedicalHistory.jsx
│   │   ├── PatientSettings.jsx
│   │   ├── RescheduleModal.jsx
│   │   ├── MedicalHistory/    # Medical record components
│   │   ├── PatienInfo/        # Patient profile components
│   │   └── useGetMedicalHistory.js, etc.
│   ├── paymentMethods/        # Payment integration
│   │   ├── PaymentConfirmation.jsx
│   │   ├── Stripe/            # Stripe provider config
│   │   └── useCreatePaymentIntent.js
│   └── RealTime/              # WebSocket chat features
│
├── hooks/                      # Custom React hooks (if any shared)
│
├── pages/                      # Page-level components (routes)
│   ├── Home.jsx, Home2.jsx
│   ├── AllDoctors.jsx          # Doctor directory
│   ├── Doctor.jsx              # Single doctor details
│   ├── DoctorsBySpecialization.jsx
│   ├── Login.jsx, Register.jsx, EmailConfirmation.jsx
│   ├── MyAppointments.jsx
│   ├── PatientDashBoard.jsx, DoctorDashBoard.jsx
│   ├── PaymentPage.jsx, CardPaymentFormPage.jsx
│   ├── UploadPatientsFiles.jsx
│   ├── ChatPage.jsx
│   ├── ReschedulePage.jsx
│   ├── Unauthorized.jsx
│   └── ... (other page components)
│
├── services/                   # API communication
│   ├── axiosClient.js          # Axios instance with auth interceptors
│   ├── apiAuth.js              # Auth endpoints (register, login, reset)
│   ├── apiDoctors.js           # Doctor listing & filtering
│   ├── apiPatients.js          # Patient endpoints
│   ├── apiPayment.js           # Payment intent creation
│   ├── apiPatientFiles.js      # Medical file upload/download
│   ├── apiChat.js              # Chat/message endpoints
│   └── services.txt            # Documentation file
│
├── ui/                         # Reusable UI components
│   ├── AppLayout.jsx           # Main layout wrapper
│   ├── Header.jsx, footer.jsx  # Header/footer
│   ├── DoctorDashBoardLayout.jsx  # Dashboard template
│   ├── DashBoardHeader.jsx, DashBoardSideBar.jsx
│   ├── DoctorCard.jsx, DoctorList.jsx
│   ├── AppointmentCard.jsx
│   ├── FilterList.jsx, Search.jsx, SearchBar.jsx
│   ├── Button.jsx, TextArea.jsx
│   ├── Spinner.jsx
│   ├── PatientOverview.jsx, Allergies.jsx, Illnesses.jsx
│   ├── Hero.jsx, Home.jsx
│   ├── UserButton.jsx, UserList.jsx
│   ├── RelatedDoctors.jsx
│   ├── ContactInfo.jsx, PrimaryDiagnosis.jsx
│   └── drCardSpeciallity/     # Specialty card variants
│
└── utils/                      # Utility functions
    ├── authStore.js            # Auth state management (legacy/backup)
    ├── formatTime.js           # Date/time formatting
    └── sdsd.txt
```

### Folder Responsibility Summary

| Folder | Responsibility |
|--------|-----------------|
| `features/` | Business logic grouped by domain (Appointments, Patients, Doctors, etc.) |
| `pages/` | Route-level components that compose features and UI components |
| `ui/` | Reusable, layout-agnostic components (buttons, cards, headers) |
| `services/` | All backend API calls, organized by endpoint domain |
| `Context/` | React Context providers for form state management |
| `utils/` | Helper functions, constants, and utilities |
| `assets/` | Images, icons, and static files |

---

## Setup & Installation

### Prerequisites

- **Node.js**: v18+ (v20+ recommended)
- **npm** or **yarn**: For package management
- **Git**: For version control
- **.env file**: Configure backend URL (see [Environment Configuration](#environment-configuration))

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/engahmed25/MAIO-front.git
   cd MAIO-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   VITE_BACKEND_URL=http://localhost:9000
   ```
   
   *(See [Environment Configuration](#environment-configuration) for details)*

4. **Verify installation**
   ```bash
   npm run lint
   # Should pass with no errors
   ```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

- **Default URL**: `http://localhost:5173` (Vite default)
- **Hot Module Reloading (HMR)**: Enabled
- **TypeScript Checking**: Occurs during build; use `tsc -b` for type checking only
- **Press `o`** in the terminal to open automatically in browser

### Production Build

```bash
npm run build
```

- Bundles and minifies code
- Output: `dist/` directory
- Type checks with `tsc -b` before Vite build
- ~30-50% smaller bundle with tree-shaking and code splitting

### Preview Production Build Locally

```bash
npm run preview
```

- Serves the `dist/` folder locally to test production builds
- Useful before deployment to verify optimizations

---

## Environment Configuration

### Variables (Vite)

Vite exposes environment variables prefixed with `VITE_` to the client via `import.meta.env`.

#### Required

| Variable | Purpose | Default | Example |
|----------|---------|---------|---------|
| `VITE_BACKEND_URL` | Backend API base URL | `http://localhost:9000` | `https://api.maio.com` |

#### Configuration Files

- **Development**: `.env` or `.env.development`
- **Production**: `.env.production`
- **Vite docs**: https://vitejs.dev/guide/env-and-mode.html

#### Usage in Code

```javascript
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
```

**Note**: Only variables prefixed with `VITE_` are exposed. Server-only secrets (API keys, db passwords) should never be in `.env` files used by the frontend.

---

## Architecture & Key Features

### Authentication Flow

1. **User Registration**
   - Patient or Doctor selects role on `/register`
   - Multi-step form wizard captures credentials and profile info
   - Doctor registration requires admin approval before login

2. **Login**
   - Credentials sent to `/api/auth/login`
   - Backend returns JWT token in response
   - Token stored in HTTP-only cookie (`_auth`) via `react-auth-kit`

3. **Token Management**
   - **Storage**: HTTP-only cookies (secure, XSS-resistant)
   - **Interception**: Axios request interceptor extracts cookie and adds `Authorization: Bearer <token>` header
   - **Refresh**: Handled by backend; cookies automatically resent with requests

4. **Route Protection**
   - `ProtectedRoute` component wraps sensitive routes
   - Checks `useIsAuthenticated()` and `useAuthUser()` from `react-auth-kit`
   - Role-based access control: `allowedRoles={["patient", "doctor"]}`
   - Redirects to `/unauthorized` if access denied or `/wait` if doctor approval pending

### Key Features Breakdown

#### 1. Appointment Management
- **Discovery**: Browse all doctors, filter by specialization (`/doctors`, `/doctors/specialization/:specialization`)
- **Booking**: `BookingSlot.jsx` + `useCreateReservation.js` create reservations
- **Calendar**: `DoctorCalendarPage.jsx` with `react-big-calendar` for visual scheduling
- **Reschedule**: `ReschedulePage.jsx` allows patients to change appointment times
- **My Appointments**: `MyAppointments.jsx` shows patient's upcoming/past appointments

#### 2. Medical Records
- **Upload**: `UploadPatientsFiles.jsx` + `react-dropzone` for file submission
- **History**: `MedicalHistory.jsx` displays patient's medical timeline
- **Components**: Medications, vital signs, diagnoses, allergies organized in cards
- **Access**: Doctors can view patient files via `/doctor/patient/:patientId`

#### 3. Payments (Stripe Integration)
- **Intent Creation**: `useCreatePaymentIntent.js` calls backend to create Stripe `PaymentIntent`
- **Client Secret**: Backend returns secret for client-side card tokenization
- **Payment Form**: `CardPaymentFormPage.jsx` uses `@stripe/react-stripe-js` for secure input
- **Confirmation**: `PaymentConfirmation.jsx` handles post-payment logic
- **Flow**: Appointment booking → Payment → Confirmation page

#### 4. Real-Time Chat
- **Technology**: Socket.io (WebSocket fallbacks)
- **Room**: `ChatPage.jsx` at `/doctor/chat/:roomId` connects to WebSocket
- **Integration**: Bidirectional messaging between doctor and patient
- **Service**: `apiChat.js` manages message history, `RealTime/` folder for Socket.io setup

#### 5. Dashboards
- **Patient Dashboard** (`/patient/dashboard`): Overview, upcoming appointments, quick actions
- **Doctor Dashboard** (`/doctor/dashboard`): Schedules, patient list, settings
- **Layout**: `DoctorDashBoardLayout.jsx` provides sidebar + header template
- **Sidebar**: `DashBoardSideBar.jsx` with role-based navigation menu

### State Management

#### Global State (if Redux is used)
- Redux Toolkit for complex state (e.g., user auth details, appointments list)
- Access via hooks: `useDispatch()`, `useSelector()`
- **Location**: Redux setup would be in a `store/` folder (not visible in this structure; may be in progress)

#### Local State (Context API)
- **Doctor Registration**: `DoctorRegisterContext` manages multi-step form state
- **Patient Registration**: `PatientRegisterContext` manages patient form state
- **Use**: Step-by-step data collection without losing progress on back/forward navigation

#### Server State (React Query)
- **TanStack React Query**: Manages API data fetching, caching, synchronization
- **Hooks**: `useQuery()` for GET, `useMutation()` for POST/PUT/DELETE
- **Benefits**: Automatic refetching, background updates, offline support
- **Example**: `useGetReservation()`, `useGetMedicalHistory()`

### Error Handling

1. **HTTP Errors**
   - Axios interceptor catches 401 (unauthorized) → redirect to login
   - Catch blocks in API functions pass errors to React Query, which surfaces via hooks

2. **User Feedback**
   - Toast notifications via `react-hot-toast` (success, error, warning)
   - Example: `toast.error("Failed to book appointment")`

3. **Fallbacks**
   - Loading spinners (`Spinner.jsx`) during data fetching
   - Empty state messages when no data exists
   - Network error pages for critical failures

### Code Style & Performance

#### Code Style

- **TypeScript**: Used in config files (`vite.config.ts`), encouraged in components
- **Naming Conventions**:
  - Components: PascalCase (e.g., `DoctorCard.jsx`)
  - Hooks: camelCase, prefixed with `use` (e.g., `useBookingDoctor.js`)
  - Utilities: camelCase (e.g., `formatTime.js`)
- **File Organization**: Feature-based grouping by domain

#### ESLint Rules

- **Config**: `eslint.config.js` (modern flat config)
- **Rules**:
  - `@eslint/js`: Recommended JavaScript rules
  - `typescript-eslint`: Type checking rules
  - `react-hooks`: Enforce hooks rules of engagement
  - `react-refresh`: Warn on invalid Fast Refresh usage
- **Run**: `npm run lint`

#### Performance Optimizations

1. **React Compiler**: Babel plugin auto-memoizes components (enabled in `vite.config.ts`)
2. **Code Splitting**: Vite automatically splits chunks by route (lazy loading)
3. **React Query Caching**: Stale data is reused, reducing network requests
4. **Image Optimization**: Use asset imports for bundling (Vite handles hashing)
5. **Tailwind Purging**: Unused CSS removed in production builds
6. **Dynamic Imports**: Route components loaded on-demand with React Router

#### Accessibility Considerations

- **Semantic HTML**: Use `<button>`, `<form>`, `<nav>` for screen readers
- **ARIA Labels**: Add where needed (e.g., `aria-label`, `aria-describedby`)
- **Keyboard Navigation**: Ensure focus visible, tab order logical
- **Color Contrast**: Tailwind colors generally meet WCAG AA; test custom colors
- **Form Labels**: Always associate with inputs via `<label htmlFor>`

---

## API Integration

### Axios Setup

**File**: `src/services/axiosClient.js`

- **Base URL**: Reads from `VITE_BACKEND_URL` environment variable
- **Default Headers**: `Content-Type: application/json`
- **Request Interceptor**: Extracts JWT from `_auth` cookie, adds to `Authorization` header
- **Response Interceptor**: (Can be added for error handling, token refresh)

### API Modules

**Location**: `src/services/`

| Module | Endpoints | Purpose |
|--------|-----------|---------|
| `apiAuth.js` | `POST /api/auth/register/patient`, `POST /api/auth/register/doctor`, `POST /api/auth/login`, `POST /api/auth/forgot-password`, etc. | Authentication & account management |
| `apiDoctors.js` | `GET /api/doctors`, `GET /api/doctors/specialization/:specialization`, `GET /api/doctors/:id` | Doctor discovery & filtering |
| `apiPatients.js` | `GET /api/patients/:id`, `PUT /api/patients/:id`, `GET /api/patients/:patientId/medical-history` | Patient profile & records |
| `apiPayment.js` | `POST /api/payments/create-intent`, `POST /api/payments/confirm` | Stripe payment operations |
| `apiPatientFiles.js` | `POST /api/patient-files/upload`, `GET /api/patient-files/:patientId`, `DELETE /api/patient-files/:fileId` | Medical file management |
| `apiChat.js` | `GET /api/chat/:roomId`, `POST /api/chat/:roomId/message` | Chat history & messaging |

### Example API Call

```javascript
import axiosClient from "./axiosClient";

export async function getAppointments(patientId) {
  try {
    const response = await axiosClient.get(`/api/appointments?patientId=${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    throw error; // React Query will handle this
  }
}
```

### React Query Integration

```javascript
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../services/apiPatients";

function useGetAppointments(patientId) {
  return useQuery({
    queryKey: ["appointments", patientId],
    queryFn: () => getAppointments(patientId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Usage in component
export function MyAppointments() {
  const { data, isLoading, error } = useGetAppointments(patientId);
  
  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data.map(apt => <AppointmentCard key={apt.id} {...apt} />)}</div>;
}
```

---

## Authentication & Authorization

### JWT Tokens

- **Format**: Signed JWT with user claims (id, email, role, etc.)
- **Placement**: HTTP-only cookie (`_auth`)
- **Expiry**: Set by backend (typically 24h to 7d)

### Role-Based Access Control (RBAC)

```javascript
// ProtectedRoute with role check
<ProtectedRoute allowedRoles={["doctor"]}>
  <DoctorDashBoard />
</ProtectedRoute>

// If user role not in allowedRoles, redirects to /unauthorized
```

### Logout Flow

- **Method**: Delete `_auth` cookie
- **Implementation**: `useLogout()` hook calls backend logout endpoint
- **Redirect**: Return to login page

### Pending Doctor Approval

- Doctors cannot login until admin approves registration
- Frontend checks `localStorage.pendingDoctor` flag
- If set, redirects to `/wait` (wait approval page)
- Backend clears flag once approved

---

## Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **dev** | `npm run dev` | Start Vite dev server (HMR enabled) |
| **build** | `npm run build` | Type-check + minify for production |
| **lint** | `npm run lint` | Run ESLint on all files |
| **preview** | `npm run preview` | Serve production build locally |

### Extended Workflows

```bash
# Type checking only (no build)
npx tsc -b

# Lint with auto-fix (ESLint supports --fix for some rules)
npx eslint . --fix

# Build with detailed output
npm run build -- --outDir dist --minify esbuild
```

---

## Code Style & Linting

### ESLint Configuration

**File**: `eslint.config.js`

- **Parser**: TypeScript ESLint for `.ts` and `.tsx` files
- **Plugins**:
  - `@eslint/js`: Core JavaScript rules
  - `typescript-eslint`: Type checking rules
  - `react-hooks`: Hooks rules of engagement
  - `react-refresh`: Vite Fast Refresh compatibility
- **Run**: `npm run lint`
- **Fix**: `npx eslint . --fix` (for auto-fixable issues)

### TypeScript Configuration

**Files**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`

- **Target**: ES2020 (modern browsers)
- **Module**: ES Modules
- **JSX**: React 17+ (automatic transform via Vite)
- **Strict Mode**: Enabled (null checks, no `any`)

### Naming & Conventions

- **Components**: PascalCase
- **Hooks**: `use`-prefixed camelCase
- **Utils**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: Kebab-case (Tailwind utility-first)

---

## Performance Optimizations

1. **React Compiler** (Babel plugin)
   - Auto-memoizes components to prevent unnecessary re-renders
   - Configured in `vite.config.ts`

2. **Code Splitting**
   - Vite automatically splits chunks by route
   - Lazy load heavy features (e.g., calendar, payment)
   - Use dynamic imports: `const Component = lazy(() => import('./Heavy.jsx'))`

3. **Image Optimization**
   - Import images as modules (Vite hashes filenames)
   - Use WebP format when possible
   - Compress before uploading to `assets/`

4. **React Query Caching**
   - Stale data served from cache while fetching fresh data in background
   - Configurable `staleTime` and `cacheTime` per query
   - Reduces API calls and improves perceived performance

5. **CSS Optimization**
   - Tailwind purges unused styles in production
   - DaisyUI provides pre-built components (no extra CSS)
   - Custom CSS in `index.css` uses CSS variables for theming

6. **Bundle Analysis**
   ```bash
   npm run build -- --analyze  # (Requires plugin; not configured by default)
   ```
   Add Rollup plugin for visual bundle analysis if needed.

---

## Contribution Guidelines

### Before Starting

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Keep commits atomic and descriptive
3. Follow the code style guidelines above

### Code Review Checklist

- [ ] Code follows ESLint rules (`npm run lint`)
- [ ] TypeScript has no errors (`npx tsc -b`)
- [ ] Components are properly memoized if heavy
- [ ] API calls use React Query (not raw `useEffect` + `fetch`)
- [ ] Error handling included (try-catch, error toast)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Forms validated client-side with `react-hook-form`
- [ ] No sensitive data in logs or comments

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/appointment-filter

# Make changes, commit
git add .
git commit -m "feat: add appointment filtering by date"

# Push to remote
git push origin feature/appointment-filter

# Open pull request on GitHub/GitLab
```

### Writing Components

```jsx
// Use named exports for easier testing
export function MyComponent({ title, onAction }) {
  // Hooks at top
  const { data } = useQuery(...);
  const [state, setState] = useState(null);

  // Event handlers
  const handleClick = () => {
    onAction();
  };

  // Render
  return (
    <div className="...">
      <h1>{title}</h1>
      <button onClick={handleClick}>Action</button>
    </div>
  );
}

// Default export for routing
export default MyComponent;
```

### Writing Hooks

```javascript
// Custom hook for API calls + UI state
export function useGetDoctors(specialization) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["doctors", specialization],
    queryFn: () => getDoctors(specialization),
  });

  return { doctors: data || [], isLoading, error };
}

// Usage
const { doctors, isLoading } = useGetDoctors("Cardiology");
```

---

## Troubleshooting

### Common Issues

#### 1. **Port Already in Use (Dev Server)**
```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Or use different port:
npm run dev -- --port 3000
```

#### 2. **VITE_BACKEND_URL Not Defined**
- Create `.env` file in project root
- Add: `VITE_BACKEND_URL=http://localhost:9000`
- Restart dev server

#### 3. **ESLint Errors Not Auto-Fixing**
```bash
# Some rules require manual fixes; check the error message
npm run lint

# If auto-fixable:
npx eslint . --fix
```

#### 4. **TypeScript Errors in VSCode**
- Ensure TypeScript extension is installed
- Reload VSCode: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
- Check `tsconfig.json` is valid

#### 5. **Socket.io Connection Failed**
- Verify backend Socket.io server is running
- Check `VITE_BACKEND_URL` points to correct host
- Browser console may show connection errors; check backend logs

#### 6. **Stripe Payment Errors**
- Ensure Stripe publishable key is set in backend
- Use test card: `4242 4242 4242 4242` (any future expiry)
- Check browser Network tab for failed Stripe API calls

#### 7. **Medical Files Not Uploading**
- Verify backend file upload endpoint is configured
- Check file size limits (usually 10-50MB)
- Ensure backend has write permissions on upload directory
- Browser console may show multipart/form-data errors

#### 8. **JWT Token Expired**
- Backend should refresh token automatically (via cookie)
- If persistent, clear cookies: `document.cookie = '_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'`
- Then logout and re-login

### Debug Mode

```javascript
// In development, log Redux/React Query state
console.log("Auth State:", authUser());
console.log("Query Cache:", queryClient.getQueryData(["doctors"]));

// Monitor Network:
// Open DevTools → Network tab
// Filter by XHR to see API calls
```

### Useful Links

- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **React Router**: https://reactrouter.com/
- **React Query**: https://tanstack.com/query/latest
- **Tailwind**: https://tailwindcss.com/
- **Stripe.js**: https://stripe.com/docs/js
- **Socket.io Client**: https://socket.io/docs/v4/client-api/

---

## Important Notes for New Developers

1. **Environment Setup**: Always create `.env` file before running `npm run dev`
2. **Backend Dependency**: This frontend requires a running backend server (typically on `http://localhost:9000`)
3. **Cookie Security**: HTTP-only cookies are secure; never access them directly in JavaScript
4. **Real-Time Features**: Socket.io requires backend WebSocket server; some features fail gracefully offline
5. **Payment Testing**: Always use Stripe test keys in development; never hardcode production keys
6. **Medical Data**: Patient medical records are sensitive; ensure HIPAA compliance (backend responsibility)
7. **Form State Persistence**: Context API is used for multi-step forms; data is cleared on refresh (consider localStorage if needed)
8. **TypeScript Adoption**: Some files are `.js`, others `.tsx`; gradually migrate to TypeScript for better type safety

---

## Summary

**MAIO** is a modern healthcare platform built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Redux/Context API**. The architecture prioritizes:

- **Developer Experience**: Fast builds, type safety, ESLint enforcement
- **User Experience**: Responsive design, real-time updates, secure payments
- **Maintainability**: Feature-based folder structure, custom hooks, reusable components
- **Performance**: Code splitting, React Query caching, Tailwind optimization

For questions, refer to code comments, API documentation (backend), or the troubleshooting section above.

**Happy coding!** 🚀
# MAIO
# MAIO
