import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegisterSubmit = async (formData) => {
        setLoading(true);
        setError("");

        try {
            await api.post("/auth/register", formData);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <RegisterForm
                onSubmit={handleRegisterSubmit}
                error={error}
                loading={loading}
            />
        </div>
    );
};

export default RegisterPage;
