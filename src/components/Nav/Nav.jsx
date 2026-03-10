import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">
                🍽️ RecipeApp
            </Link>

            <nav className="navbar-links">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        "navbar-link" + (isActive ? " navbar-link--active" : "")
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/recipes"
                    className={({ isActive }) =>
                        "navbar-link" + (isActive ? " navbar-link--active" : "")
                    }
                >
                    Recipes
                </NavLink>
            </nav>

            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                Logout
            </button>
        </header>
    );
};

export default Nav;
