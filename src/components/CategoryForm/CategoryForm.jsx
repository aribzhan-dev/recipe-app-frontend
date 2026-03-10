import { useState } from "react";
import "./CategoryForm.css";

const CategoryForm = ({ categories, onCreate, onUpdate, onDelete }) => {
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        setLoading(true);
        setError("");
        try {
            await onCreate(title.trim());
            setTitle("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (category) => {
        setEditingId(category._id);
        setEditTitle(category.title);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
    };

    const handleUpdate = async (id) => {
        if (!editTitle.trim()) return;
        setLoading(true);
        try {
            await onUpdate(id, editTitle.trim());
            cancelEdit();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this category?")) return;
        try {
            await onDelete(id);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="category-panel">
            <h2 className="category-panel-title">Categories</h2>

            {error && (
                <div className="alert alert-danger" style={{ marginBottom: "12px" }}>
                    {error}
                </div>
            )}

            <form className="category-add-form" onSubmit={handleCreate}>
                <input
                    className="form-input"
                    type="text"
                    placeholder="New category name…"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={loading || !title.trim()}
                >
                    Add
                </button>
            </form>

            <ul className="category-list">
                {categories.length === 0 && (
                    <li className="category-empty">No categories yet</li>
                )}
                {categories.map((cat) => (
                    <li key={cat._id} className="category-item">
                        {editingId === cat._id ? (
                            <div className="category-item-edit">
                                <input
                                    className="form-input form-input--sm"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    autoFocus
                                />
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleUpdate(cat._id)}
                                    disabled={loading}
                                >
                                    Save
                                </button>
                                <button className="btn btn-ghost btn-sm" onClick={cancelEdit}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="category-item-title">{cat.title}</span>
                                <div className="category-item-actions">
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => startEdit(cat)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(cat._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryForm;
