import { useState, useEffect, useMemo } from "react";
import { api } from "../api";
import RecipeForm from "../components/RecipeForm/RecipeForm";
import CategoryForm from "../components/CategoryForm/CategoryForm";
import "./RecipiPage.css";

// ─── Recipe Card ──────────────────────────────────────────────────────────────
const RecipeCard = ({ recipe, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <article className="recipe-card">
            <div className="recipe-card-header">
                <div className="recipe-card-meta">
                    <h3 className="recipe-card-title">{recipe.title}</h3>
                    {recipe.category && (
                        <span className="badge">{recipe.category.title}</span>
                    )}
                </div>
                <div className="recipe-card-actions">
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => onEdit(recipe)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(recipe._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <p className="recipe-card-desc">{recipe.desc}</p>

            <button
                className="recipe-card-toggle"
                onClick={() => setExpanded((v) => !v)}
            >
                {expanded ? "Hide details ▲" : "Show details ▼"}
            </button>

            {expanded && (
                <div className="recipe-card-details">
                    <div className="recipe-detail-block">
                        <h4 className="recipe-detail-title">🥕 Ingredients</h4>
                        <pre className="recipe-detail-text">{recipe.ingredients}</pre>
                    </div>
                    <div className="recipe-detail-block">
                        <h4 className="recipe-detail-title">📋 Instructions</h4>
                        <pre className="recipe-detail-text">{recipe.instructions}</pre>
                    </div>
                </div>
            )}
        </article>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const RecipePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeCategory, setActiveCategory] = useState("all");
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState(null);

    // ─── Load data ───────────────────────────────────────────────────────────
    useEffect(() => {
        const load = async () => {
            try {
                const [r, c] = await Promise.all([
                    api.get("/recipe"),
                    api.get("/category"),
                ]);
                setRecipes(r);
                setCategories(c);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // ─── Filtered recipes ─────────────────────────────────────────────────────
    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {
            const matchCategory =
                activeCategory === "all" ||
                recipe.category?._id === activeCategory;

            const matchSearch =
                search.trim() === "" ||
                recipe.title.toLowerCase().includes(search.toLowerCase());

            return matchCategory && matchSearch;
        });
    }, [recipes, activeCategory, search]);

    // ─── CRUD Handlers ─────────────────────────────────────────────────────────
    const openCreate = () => {
        setEditingRecipe(null);
        setModalOpen(true);
    };

    const openEdit = (recipe) => {
        setEditingRecipe(recipe);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingRecipe(null);
    };

    const handleRecipeSubmit = async (form) => {
        if (editingRecipe) {
            const updated = await api.put(`/recipe/${editingRecipe._id}`, form);
            setRecipes((prev) =>
                prev.map((r) => (r._id === updated._id ? updated : r))
            );
        } else {
            const created = await api.post("/recipe", form);
            setRecipes((prev) => [...prev, created]);
        }
        closeModal();
    };

    const handleDeleteRecipe = async (id) => {
        if (!window.confirm("Delete this recipe?")) return;
        await api.delete(`/recipe/${id}`);
        setRecipes((prev) => prev.filter((r) => r._id !== id));
    };

    // ─── Category CRUD ─────────────────────────────────────────────────────────
    const handleCreateCategory = async (title) => {
        const created = await api.post("/category", { title });
        setCategories((prev) => [...prev, created]);
    };

    const handleUpdateCategory = async (id, title) => {
        const updated = await api.put(`/category/${id}`, { title });
        setCategories((prev) =>
            prev.map((c) => (c._id === updated._id ? updated : c))
        );
    };

    const handleDeleteCategory = async (id) => {
        await api.delete(`/category/${id}`);
        setCategories((prev) => prev.filter((c) => c._id !== id));
        if (activeCategory === id) setActiveCategory("all");
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <main className="page">
                <div className="recipes-loading">Loading recipes…</div>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="page-header">
                <h1 className="page-title">My Recipes</h1>
                <button className="btn btn-primary" onClick={openCreate}>
                    + New Recipe
                </button>
            </div>

            {error && (
                <div className="alert alert-danger" style={{ marginBottom: "20px" }}>
                    {error}
                </div>
            )}

            <div className="recipes-layout">
                {/* ─── Sidebar ─── */}
                <aside className="recipes-sidebar">
                    <CategoryForm
                        categories={categories}
                        onCreate={handleCreateCategory}
                        onUpdate={handleUpdateCategory}
                        onDelete={handleDeleteCategory}
                    />
                </aside>

                {/* ─── Main Content ─── */}
                <section className="recipes-main">
                    {/* Filters */}
                    <div className="recipes-filters">
                        <div className="filter-chips">
                            <button
                                className={`filter-chip ${activeCategory === "all" ? "filter-chip--active" : ""}`}
                                onClick={() => setActiveCategory("all")}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat._id}
                                    className={`filter-chip ${activeCategory === cat._id ? "filter-chip--active" : ""}`}
                                    onClick={() => setActiveCategory(cat._id)}
                                >
                                    {cat.title}
                                </button>
                            ))}
                        </div>

                        <input
                            className="form-input recipes-search"
                            type="text"
                            placeholder="Search recipes…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Results info */}
                    <p className="recipes-count">
                        {filteredRecipes.length === 0
                            ? "No recipes found"
                            : `${filteredRecipes.length} recipe${filteredRecipes.length !== 1 ? "s" : ""}`}
                    </p>

                    {/* List */}
                    {filteredRecipes.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🍽️</div>
                            <h3>
                                {recipes.length === 0
                                    ? "No recipes yet"
                                    : "No matching recipes"}
                            </h3>
                            <p>
                                {recipes.length === 0
                                    ? 'Click "New Recipe" to add your first one!'
                                    : 'Try a different filter or search term.'}
                            </p>
                        </div>
                    ) : (
                        <div className="recipes-list">
                            {filteredRecipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe._id}
                                    recipe={recipe}
                                    onEdit={openEdit}
                                    onDelete={handleDeleteRecipe}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Modal */}
            {modalOpen && (
                <RecipeForm
                    recipe={editingRecipe}
                    categories={categories}
                    onSubmit={handleRecipeSubmit}
                    onClose={closeModal}
                />
            )}
        </main>
    );
};

export default RecipePage;
