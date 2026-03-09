import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = async (formData) => {
        setLoading(true);
        setError("");

        try {
            const data = await api.post("/auth/login", formData);
            onLogin(data.token);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <LoginForm
                onSubmit={handleLoginSubmit}
                error={error}
                loading={loading}
            />
        </div>
    );
};

export default LoginPage;
