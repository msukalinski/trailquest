import { Link, useNavigate } from "react-router";
import { useState } from "react";

import useUser from "../../hooks/useUser";

import './Header.css'

export default function Header() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loggingOut, setLoggingOut] = useState(false);
    const { user, initializing, logout } = useUser();

    const logoutHandler = async () => {
        if (loggingOut) {
            return;
        }

        setError('');
        setLoggingOut(true);

        try {
            navigate('/');
            await logout();
        } catch (err) {
            setError(err?.message || 'Could not log out. Please try again.');
        } finally {
            setLoggingOut(false);
        }
    }

    return (
        <header className="trail-header bg-white border-bottom sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light container py-3">
                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center gap-2 fw-bold"
                >
                    <span aria-hidden="true">
                        ▲▲
                    </span>

                    TrailQuest
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavigation"
                    aria-controls="mainNavigation"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="mainNavigation">
                    <ul className="navbar-nav mx-auto gap-lg-4">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active fw-semibold border-bottom border-2">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/trails" className="nav-link text-dark">
                                Explore
                            </Link>
                        </li>

                        {!initializing && user && (
                            <li className="nav-item">
                                <Link to="/my-trails" className="nav-link text-dark">
                                    My Trails
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                        {!initializing && (
                            user ? (
                                <>
                                    <Link to="/trails/create" className="btn text-white px-4 py-2 rounded-3">
                                        Share a trail
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn text-white px-3 py-2 rounded-3"
                                        onClick={logoutHandler}
                                        disabled={loggingOut}
                                        aria-busy={loggingOut}
                                    >
                                        {loggingOut ? 'Logging out...' : 'Log out'}
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="btn text-white px-3 py-2 rounded-3">
                                    Log in
                                </Link>
                            )
                        )}

                    </div>
                </div>
            </nav>
            {user && error && (
                <div className="container alert alert-danger py-2 mb-3" role="alert">
                    {error}
                </div>
            )}
        </header>
    );
}