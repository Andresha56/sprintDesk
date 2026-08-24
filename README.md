# SprintDesk

> A focused, full-featured sprint management workspace for teams to collaborate on tasks, track progress, and analyze performance metrics in real-time.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**SprintDesk** is a modern web-based sprint management application that helps teams organize, prioritize, and execute their work efficiently. Built with React 19, TypeScript, and Vite for optimal performance, SprintDesk provides real-time task management, analytics dashboards, and an intuitive user interface for agile teams.

### Key Features

- 📋 **Task Board** - Organize tasks by status with drag-and-drop support and quick-action buttons
- 📊 **Analytics Dashboard** - Visual insights into task distribution, priority breakdown, and team performance
- 🔔 **Notifications** - Real-time notifications for task updates and team activities
- 🎨 **Theme Toggle** - Light and dark mode support with persistent user preferences
- 🔐 **Authentication** - Secure login with demo credentials for testing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ♿ **Accessibility** - Built with WCAG compliance and inclusive UI patterns

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 19.2, TypeScript 6.0, Vite 8.2 |
| **State Management** | Zustand 5.0 |
| **Routing** | React Router 7.18 |
| **Styling** | Tailwind CSS 3.4, PostCSS |
| **Data Visualization** | Recharts 3.10 |
| **Drag & Drop** | dnd-kit (core + sortable) |
| **HTTP Client** | TanStack React Query 5.102 |
| **Icons** | Lucide React 1.33 |
| **Testing** | Vitest, React Testing Library |
| **Linting** | Oxlint |

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher (or yarn/pnpm)
- Modern web browser with ES2020+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd accessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Demo Credentials

Login with the pre-configured demo account:
- **Username:** `emilys`
- **Password:** `emilyspass`

These credentials are available offline for testing and demonstration purposes.

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter with Oxlint
npm run lint

# Run test suite
npm run test
```

## Project Structure

```
src/
├── app/                          # Application routing and authentication
│   ├── AppRouter.tsx            # Main router configuration
│   └── AuthenticatedRoute.tsx    # Protected route wrapper
│
├── components/                   # Reusable React components
│   ├── board/                   # Task board components
│   │   ├── TaskCard.tsx
│   │   ├── TaskDrawer.tsx
│   │   ├── TaskModal.tsx
│   │   └── TaskRow.tsx
│   ├── layout/                  # Layout components
│   │   ├── AuthenticatedLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── PageHeader.tsx
│   ├── notifications/           # Notification components
│   ├── button/                  # Button components
│   ├── input/                   # Input components
│   └── select/                  # Select components
│
├── features/                     # Feature-specific pages
│   ├── auth/                    # Authentication pages
│   │   └── LoginPage.tsx
│   ├── board/                   # Board page
│   │   └── BoardPage.tsx
│   ├── dashboard/               # Dashboard page
│   │   └── DashboardPage.tsx
│   └── analytics/               # Analytics page
│       └── AnalyticsPage.tsx
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   └── useTheme.ts
│
├── store/                        # Zustand store
│   └── useBoardStore.ts         # Board state management
│
├── types/                        # TypeScript type definitions
│   └── index.ts
│
├── utils/                        # Utility functions
│   ├── formatRelativeTimes.ts
│   ├── getInitial.ts
│   └── getPriorityBreakdown.ts
│
├── constants/                    # Application constants
│   └── board.ts
│
└── App.tsx                       # Main application component
```

## Architecture

### State Management
- **Zustand Store** (`src/store/useBoardStore.ts`) manages all persisted client state:
  - Tasks and their metadata
  - Notifications
  - User theme preferences
  - Application state

### Data Flow
- Board metrics and analytics are computed directly from Zustand state
- Changes to tasks automatically propagate to all dependent views (board, dashboard, analytics)
- Notifications poll external services on authenticated shell mount and persist through the store

### Component Hierarchy
- `App.tsx` → `AppRouter.tsx` → Feature pages
- Protected routes are wrapped with `AuthenticatedRoute.tsx`
- Layout components (`Sidebar`, `PageHeader`) provide consistent UI structure

### Key Services
- **Authentication** (`hooks/useAuth.ts`) - Handles user login and session management
- **Theme Management** (`hooks/useTheme.ts`) - Manages light/dark mode preferences
- **Query Layer** (`query/index.ts`) - TanStack React Query integration

## Authentication

The application uses a lightweight authentication system with:
- Demo account functionality for offline testing
- JWT-based session tokens
- Protected routes that redirect unauthorized users to login
- Automatic session persistence using browser storage

For production deployment, integrate with a backend authentication service (DummyJSON, Firebase, Auth0, etc.).

## Performance Optimizations

- **Vite** - Lightning-fast development and optimized production builds
- **React 19** - Latest React features and performance improvements
- **TypeScript** - Type safety and better IDE support
- **Lazy Loading** - Route-based code splitting for smaller bundle sizes
- **State Normalization** - Zustand for efficient state management

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React hooks conventions
- Keep components focused and reusable
- Use Tailwind CSS utilities for styling
- Document complex logic with comments

### Testing
Run tests with:
```bash
npm run test
```

### Linting
Run linter to check code quality:
```bash
npm run lint
```

## Roadmap & Future Improvements

- [ ] Implement `@dnd-kit` drag-and-drop for task reordering
- [ ] Extract route components to lazy-loaded modules (performance optimization)
- [ ] Move authentication to dedicated API/query layer
- [ ] Add JWT refresh token interception
- [ ] Implement mock-data seeding for better testing
- [ ] Add WebSocket support for real-time collaboration
- [ ] Enable React Compiler for improved performance
- [ ] Expand test coverage with integration tests
- [ ] Add more analytics visualizations
- [ ] Implement task filters and advanced search

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the actual URL.

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Build fails
```bash
# Run type check
npx tsc --noEmit

# Check for lint errors
npm run lint
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, feature requests, or questions, please open an issue in the repository or contact the development team.

---

**Happy sprinting! 🚀**

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
