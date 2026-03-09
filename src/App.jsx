import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Home";
import RecipePage from "./pages/RecipiPage";
import NotFoundPage from "./pages/NotFound";
import Nav from "./components/Nav/Nav";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AuthRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <BrowserRouter>
      {isAuthenticated && <Nav onLogout={logout} />}
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <LoginPage onLogin={login} />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <RegisterPage />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <RecipePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
