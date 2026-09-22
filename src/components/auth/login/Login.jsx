import { Link } from "react-router";

import './Login.css'

export default function Login() {
    return (
        <div className="login-page">
            <div className="container py-5">
                <div className="login-card row g-0 mx-auto overflow-hidden">
                    {/* Image section */}
                    <section className="login-visual col-lg-6 d-none d-lg-flex">
                        <div className="login-visual-content">
                            <span className="login-eyebrow">
                                <i
                                    className="bi bi-compass me-2"
                                    aria-hidden="true"
                                />
                                Welcome back
                            </span>

                            <div className="mt-auto">
                                <h1 className="login-visual-title">
                                    Your next adventure is waiting.
                                </h1>

                                <p className="login-visual-description">
                                    Sign in to save your favourite trails,
                                    share new routes and continue exploring.
                                </p>

                                <div className="login-location">
                                    <i
                                        className="bi bi-geo-alt-fill"
                                        aria-hidden="true"
                                    />

                                    <span>Seven Rila Lakes, Bulgaria</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Form section */}
                    <section className="login-form-section col-lg-6">
                        <div className="login-form-wrapper">
                            <div className="login-form-heading">
                                <span className="login-mobile-logo d-lg-none">
                                    ▲▲
                                </span>

                                <p className="login-small-title">
                                    TrailQuest
                                </p>

                                <h2>Sign in to your account</h2>

                                <p className="login-subtitle">
                                    Enter your details to continue your
                                    journey.
                                </p>
                            </div>

                            <form className="login-form">
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>

                                    <div className="login-input-wrapper">
                                        <i
                                            className="bi bi-envelope"
                                            aria-hidden="true"
                                        />

                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>

                                    <div className="login-input-wrapper">
                                        <i
                                            className="bi bi-lock"
                                            aria-hidden="true"
                                        />

                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                        />
                                    </div>
                                </div>

                                <div className="login-options d-flex align-items-center justify-content-between mb-4">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="rememberMe"
                                            name="rememberMe"
                                            className="form-check-input"
                                        />

                                        <label
                                            htmlFor="rememberMe"
                                            className="form-check-label"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <Link
                                        to="/forgot-password"
                                        className="login-forgot-link"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="button"
                                    className="login-submit-button btn w-100"
                                >
                                    Sign in
                                    <i
                                        className="bi bi-arrow-right ms-2"
                                        aria-hidden="true"
                                    />
                                </button>

                                <p className="login-register-text">
                                    Don&apos;t have an account?{" "}
                                    <Link to="/register">
                                        Create an account
                                    </Link>
                                </p>
                            </form>

                            <div className="login-security-message">
                                <i
                                    className="bi bi-shield-check"
                                    aria-hidden="true"
                                />

                                <span>
                                    Your information is kept private and
                                    secure.
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}