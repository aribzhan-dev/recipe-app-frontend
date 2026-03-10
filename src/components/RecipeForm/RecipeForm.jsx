import { useState, useEffect } from "react";
import "./RecipeForm.css";

const EMPTY_FORM = {
    title: "",
    desc: "",
    ingredients: "",
    instructions: "",
    category: "",
};

const RecipeForm = ({ recipe, categories, onSubmit, onClose }) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (recipe) {
            setForm({
                title: recipe.title || "",
                desc: recipe.desc || "",
                ingredients: recipe.ingredients || "",
                instructions: recipe.instructions || "",
                category: recipe.category?._id || recipe.category || "",
            });
        } else {
            setForm(EMPTY_FORM);
        }
    }, [recipe]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await onSubmit(form);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const isEditing = !!recipe;

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">
                        {isEditing ? "Edit Recipe" : "New Recipe"}
                    </h2>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="form-group">
                        <label className="form-label">Title *</label>
                        <input
                            className="form-input"
                            name="title"
                            placeholder="e.g. Carbonara Pasta"
                            value={form.title}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Category *</label>
                        <select
                            className="form-select"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select category…</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description *</label>
                        <textarea
                            className="form-textarea"
                            name="desc"
                            placeholder="Briefly describe the dish…"
                            value={form.desc}
                            onChange={handleChange}
                            rows={2}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Ingredients *</label>
                        <textarea
                            className="form-textarea"
                            name="ingredients"
                            placeholder="List ingredients, one per line…"
                            value={form.ingredients}
                            onChange={handleChange}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Instructions *</label>
                        <textarea
                            className="form-textarea"
                            name="instructions"
                            placeholder="Step-by-step cooking instructions…"
                            value={form.instructions}
                            onChange={handleChange}
                            rows={5}
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading
                                ? isEditing
                                    ? "Saving…"
                                    : "Creating…"
                                : isEditing
                                    ? "Save changes"
                                    : "Create recipe"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecipeForm;
