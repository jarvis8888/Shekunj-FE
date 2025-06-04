# Shekunj Frontend

This is the official frontend repository for the **Shekunj** platform. It is a modern web application built using React, SCSS, and Redux, following scalable and maintainable development practices.

---

## 🚀 Tech Stack

- **Library**: React.js (Functional Components + Hooks)
- **State Management**: Redux (with Redux Toolkit)
- **Styling**: SCSS (Modular & Global)
- **Routing**: React Router DOM
- **API Handling**: Axios / Fetch API
- **Form Handling**: React Hook Form / Formik (if used)
- **Authentication**: Token-based (JWT or similar)
- **Others**: ESLint, Prettier for code quality

---

## 📦 Installation

### Prerequisites

Ensure the following tools are installed:

- Node.js (>= 16)
- npm or yarn

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/jarvis8888/Shekunj-FE.git
cd Shekunj-FE

# Install dependencies
npm install
# or
yarn install

# Create a local environment file
cp .env.example .env.local
# (Update variables in .env.local as required)

# Start the development server
npm start
# or
yarn start

# App will run on http://localhost:3000
Shekunj-FE/
├── public/              # Static files and assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── redux/           # Redux store, slices, middleware
│   ├── routes/          # Route definitions using React Router
│   ├── styles/          # SCSS files
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom hooks
│   └── services/        # API service handlers
├── .env.local           # Environment variables
├── package.json         # Project dependencies and scripts
├── README.md            # Project documentation
└── index.js             # App entry point
# Start development server
npm start

# Build for production
npm run build

# Run code linter
npm run lint
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_URL=development
