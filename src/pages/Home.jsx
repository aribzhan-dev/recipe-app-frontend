import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import "./Home.css";

const StatCard = ({ icon, label, value, color }) => (
    <div className="stat-card" style={{ "--accent": color }}>
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
        </div>
    </div>
);

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [r, c] = await Promise.all([
                    api.get("/recipe"),
                    api.get("/category"),
                ]);
                setRecipes(r);
                setCategories(c);
            } catch {
                // silent — user will see empty state
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const recentRecipes = recipes.slice(-3).reverse();

    if (loading) {
        return (
            <main className="page">
                <div className="home-loading">Loading dashboard…</div>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <Link to="/recipes" className="btn btn-primary">
                    + New Recipe
                </Link>
            </div>

            <div className="stats-grid">
                <StatCard
                    icon="📖"
                    label="Total Recipes"
                    value={recipes.length}
                    color="var(--color-primary)"
                />
                <StatCard
                    icon="🗂️"
                    label="Categories"
                    value={categories.length}
                    color="#4ade80"
                />
                <StatCard
                    icon="⭐"
                    label="Favorites"
                    value="—"
                    color="#fbbf24"
                />
            </div>

            <section className="home-section">
                <div className="home-section-header">
                    <h2 className="home-section-title">Recent Recipes</h2>
                    <Link to="/recipes" className="btn btn-ghost btn-sm">
                        View all →
                    </Link>
                </div>

                {recentRecipes.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">🍳</div>
                        <h3>No recipes yet</h3>
                        <p>Start by adding your first recipe!</p>
                    </div>
                ) : (
                    <div className="recent-list">
                        {recentRecipes.map((recipe) => (
                            <div key={recipe._id} className="recent-card">
                                <div className="recent-card-header">
                                    <span className="recent-card-title">{recipe.title}</span>
                                    {recipe.category && (
                                        <span className="badge">{recipe.category.title}</span>
                                    )}
                                </div>
                                <p className="recent-card-desc">{recipe.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default HomePage;