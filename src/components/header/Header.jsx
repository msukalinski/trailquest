import { Link } from "react-router";

import './Header.css'

export default function Header() {
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

                <div
                    className="collapse navbar-collapse"
                    id="mainNavigation"
                >
                    <ul className="navbar-nav mx-auto gap-lg-4">
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link active fw-semibold border-bottom border-2"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/trails"
                                className="nav-link text-dark"
                            >
                                Explore
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/my-trails"
                                className="nav-link text-dark"
                            >
                                My Trails
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                        <Link
                            to="/login"
                            className="text-decoration-none text-dark"
                        >
                            Sign in
                        </Link>

                        <Link
                            to="/trails/create"
                            className="btn text-white px-4 py-2 rounded-3"
                        >
                            Share a trail
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}