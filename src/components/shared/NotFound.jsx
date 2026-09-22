import { Link } from "react-router";

import './NotFound.css'

export default function NotFound() {
    return (
        <div className="not-found-page min-vh-100 d-flex flex-column">

            <main className="not-found-main flex-grow-1">
                <div className="container position-relative">
                    <section className="not-found-content">
                        <div
                            className="not-found-icon"
                            aria-hidden="true"
                        >
                            <i className="bi bi-signpost-split" />
                        </div>

                        <p className="not-found-code">404</p>

                        <p className="not-found-label">
                            Lost the trail?
                        </p>

                        <h1>This path doesn&apos;t lead anywhere.</h1>

                        <p className="not-found-description">
                            The page you are looking for may have been moved,
                            deleted or never existed. Let&apos;s help you find
                            your way back.
                        </p>

                        <div className="not-found-actions">
                            <Link
                                to="/"
                                className="not-found-home-button btn"
                            >
                                <i
                                    className="bi bi-house-door me-2"
                                    aria-hidden="true"
                                />
                                Back to home
                            </Link>

                            <Link
                                to="/trails"
                                className="not-found-trails-button btn"
                            >
                                Explore trails
                                <i
                                    className="bi bi-arrow-right ms-2"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>

                        <div className="not-found-message">
                            <i
                                className="bi bi-compass"
                                aria-hidden="true"
                            />

                            <span>
                                Every wrong turn can lead to a new adventure.
                            </span>
                        </div>
                    </section>
                </div>
            </main>

        </div>
    );
}