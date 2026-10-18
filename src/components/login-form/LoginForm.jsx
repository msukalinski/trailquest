import { useFormStatus } from "react-dom";
import { Link } from "react-router";

function LoginFormContent({
    register,
    error
}) {
    const { pending } = useFormStatus();

    return (
        <>
            {error && (
                <p className="alert alert-danger" role="alert">
                    {error}
                </p>
            )}

            <fieldset className="border-0 p-0 m-0" disabled={pending} aria-busy={pending}>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>

                    <div className="login-input-wrapper">
                        <i className="bi bi-envelope" aria-hidden="true" />

                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="form-control"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>

                    <div className="login-input-wrapper">
                        <i className="bi bi-lock" aria-hidden="true" />

                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            className="form-control"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="login-submit-button btn w-100"
                    disabled={pending}
                >
                    {pending ? 'Logging in…' : 'Log in'}
                    <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
                </button>
            </fieldset>
        </>
    );
}

export default function LoginForm({
    formAction,
    register,
    error,
    state
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

                    <h2>Log in to your account</h2>

                    <p className="login-subtitle">
                        Enter your details to continue your journey.
                    </p>
                    {state?.message && (
                        <p className="login-access-message">{state.message}</p>
                    )}

                </div>

                <form className="login-form" action={formAction} onReset={(event) => event.preventDefault()} noValidate>
                    <LoginFormContent
                        register={register}
                        error={error}
                    />

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