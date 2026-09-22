import { Link } from "react-router";

import './Register.css'

export default function Register() {
    return (
        <div className="register-page min-vh-100 d-flex flex-column">

            <main className="register-main flex-grow-1">
                <div className="container py-5">
                    <div className="register-card row g-0 mx-auto overflow-hidden">
                        {/* Image section */}
                        <section className="register-visual col-lg-6 d-none d-lg-flex">
                            <div className="register-visual-content">
                                <span className="register-eyebrow">
                                    <i className="bi bi-compass me-2" aria-hidden="true" />
                                    Join TrailQuest
                                </span>

                                <div className="mt-auto">
                                    <h1 className="register-visual-title">
                                        Start exploring the world around you.
                                    </h1>

                                    <p className="register-visual-description">
                                        Create an account and become part of a
                                        community that shares a passion for
                                        hiking and adventure.
                                    </p>

                                    <ul className="register-benefits">
                                        <li>
                                            <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                            Save your favourite trails
                                        </li>

                                        <li>
                                            <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                            Share your own hiking routes
                                        </li>

                                        <li>
                                            <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                            Discover new destinations
                                        </li>
                                    </ul>

                                    <div className="register-location">
                                        <i className="bi bi-geo-alt-fill" aria-hidden="true" />

                                        <span>Seven Rila Lakes, Bulgaria</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Form section */}
                        <section className="register-form-section col-lg-6">
                            <div className="register-form-wrapper">
                                <div className="register-form-heading">
                                    <span className="register-mobile-logo d-lg-none">
                                        ▲▲
                                    </span>

                                    <p className="register-small-title">
                                        TrailQuest
                                    </p>

                                    <h2>Create your account</h2>

                                    <p className="register-subtitle">
                                        Enter your information to begin your
                                        journey.
                                    </p>
                                </div>

                                <form className="register-form">
                                    {/* Username */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="username"
                                            className="form-label"
                                        >
                                            Username
                                        </label>

                                        <div className="register-input-wrapper">
                                            <i className="bi bi-person" aria-hidden="true" />

                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                className="form-control"
                                                placeholder="Choose a username"
                                                autoComplete="username"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="register-email"
                                            className="form-label"
                                        >
                                            Email address
                                        </label>

                                        <div className="register-input-wrapper">
                                            <i className="bi bi-envelope" aria-hidden="true" />

                                            <input
                                                type="email"
                                                id="register-email"
                                                name="email"
                                                className="form-control"
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="register-password"
                                            className="form-label"
                                        >
                                            Password
                                        </label>

                                        <div className="register-input-wrapper">
                                            <i className="bi bi-lock" aria-hidden="true" />

                                            <input
                                                type="password"
                                                id="register-password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Create a password"
                                                autoComplete="new-password"
                                            />
                                        </div>
                                    </div>

                                    {/* Confirm password */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="confirm-password"
                                            className="form-label"
                                        >
                                            Confirm password
                                        </label>

                                        <div className="register-input-wrapper">
                                            <i className="bi bi-shield-lock" aria-hidden="true" />

                                            <input
                                                type="password"
                                                id="confirm-password"
                                                name="confirmPassword"
                                                className="form-control"
                                                placeholder="Repeat your password"
                                                autoComplete="new-password"
                                            />
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <div className="register-terms form-check mb-4">
                                        <input
                                            type="checkbox"
                                            id="acceptTerms"
                                            name="acceptTerms"
                                            className="form-check-input"
                                        />

                                        <label
                                            htmlFor="acceptTerms"
                                            className="form-check-label"
                                        >
                                            I agree to the{" "}
                                            <Link to="/terms">
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link to="/privacy">
                                                Privacy Policy
                                            </Link>
                                            .
                                        </label>
                                    </div>

                                    <button
                                        type="button"
                                        className="register-submit-button btn w-100"
                                    >
                                        Create account
                                        <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
                                    </button>

                                    <p className="register-login-text">
                                        Already have an account?{" "}
                                        <Link to="/login">Sign in</Link>
                                    </p>
                                </form>

                                <div className="register-security-message">
                                    <i className="bi bi-shield-check" aria-hidden="true" />

                                    <span>
                                        Your information is kept private and
                                        secure.
                                    </span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}