import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFoundPage = () => (
    <div className="notfound-page">
        <div className="notfound-content">
            <span className="notfound-code">404</span>
            <h1 className="notfound-title">Page not found</h1>
            <p className="notfound-desc">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary">
                ← Back to Dashboard
            </Link>
        </div>
    </div>
);

export default NotFoundPage;
