import { Link } from "react-router";

export default function LoginForm({
    onSubmit,
    error,
    submitting,
}) {
    return (
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

                <form className="login-form" onSubmit={onSubmit}>
                    {error && <p role="alert">{error}</p>}
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
                        type="submit"
                        className="login-submit-button btn w-100"
                    >
                        {submitting ? 'Signing in' : 'Sign in'}
                        {/* Sign in */}
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
    );
}