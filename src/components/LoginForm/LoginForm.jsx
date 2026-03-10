import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ onSubmit, error, loading }) => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="auth-card">
            <h1 className="auth-logo">RecipeApp</h1>
            <p className="auth-subtitle">Welcome back! Sign in to your account</p>

            <form className="auth-form" onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-full"
                    disabled={loading}
                >
                    {loading ? "Signing in…" : "Sign in"}
                </button>
            </form>

            <p className="auth-footer">
                Don&apos;t have an account?{" "}
                <Link to="/register">Create account</Link>
            </p>
        </div>
    );
};

export default LoginForm;
