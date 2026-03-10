# RecipeApp — Frontend

A modern, full-featured Recipe Management System built with **React** and **Vite**. This application allows users to discover, create, and manage their favorite recipes with a sleek, dark-themed user interface.

## 🚀 Features

- **User Authentication**: Secure Login and Registration using JWT (stored in localStorage).
- **Dashboard**: Quick overview of your culinary statistics and recent recipes.
- **Recipe Management**:
  - Full CRUD functionality (Create, Read, Update, Delete).
  - Expandable recipe cards showing ingredients and step-by-step instructions.
  - Real-time search by recipe title.
- **Category System**:
  - Manage custom categories (Create, Edit, Delete).
  - Filter recipes instantly using category chips.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Premium UI**: Modern dark theme with glassmorphism, smooth transitions, and Inter typography.

## 🛠️ Tech Stack

- **Core**: React 19, Vite
- **Routing**: React Router Dom
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`)
- **API Handling**: Centralized Fetch API wrapper
- **Styling**: Vanilla CSS with a robust Design System (CSS Variables)
- **Icons**: Emoji-based and custom CSS components

## 📂 Project Structure

```text
src/
├── api/            # Centralized API service (Fetch wrapper)
├── components/     # Reusable UI components
│   ├── CategoryForm/
│   ├── RecipeForm/
│   ├── LoginForm/
│   ├── RegisterForm/
│   └── Nav/
├── hooks/          # Custom React hooks (useAuth)
├── pages/          # Full-page components (Home, Recipes, Login, etc.)
├── App.jsx         # Main application logic & routing
├── index.css       # Global design system & typography
└── main.jsx        # Entry point
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A running instance of the [RecipeApp Backend](https://github.com/aribzhan-dev/recipe-app-backend) (defaults to `http://localhost:3000`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aribzhan-dev/recipe-app-frontend.git
   cd recipe-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API endpoint:
   Open `src/api/index.js` and ensure the `BASE_URL` matches your backend URL:
   ```javascript
   const BASE_URL = "http://localhost:3000/api";
   ```

### Running the App

```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 🔒 Authentication

The app uses JWT-based authentication. Upon successful login, the token is saved in `localStorage`. The `api/index.js` wrapper automatically attaches the `Authorization: Bearer <token>` header to all protected requests.

---

Built with ❤️ by [aribzhan-dev](https://github.com/aribzhan-dev)
