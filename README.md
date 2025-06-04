# Shekunj Frontend

This is the frontend repository for the **Shekunj** platform, built using modern web technologies to provide a smooth and responsive user experience.

---

## 🚀 Tech Stack

- **Framework**: React.js  
- **Styling**: SCSS  
- **State Management**: Redux   
- **API Handling**: Axios  

---

## 📦 Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 16)
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/jarvis8888/Shekunj-FE.git
cd Shekunj-FE

# Install dependencies
npm install
# or
yarn install

# Create a .env.local file and configure environment variables
cp .env.example .env.local
# (Edit values in .env.local as per your setup)

# Run the development server
npm run dev
# or
yarn dev

# The app will be available at http://localhost:3000

Shekunj-FE/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Next.js pages
│   ├── styles/          # Global/Tailwind styles
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API calls
│   └── contexts/        # React context providers
├── .env.local           # Environment variables
└── README.md

# Start development server
npm run dev

# Build the app for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

REACT_APP_API_URL=https://api.example.com
REACT_APP_API_URL=development


