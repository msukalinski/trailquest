import { useFormStatus } from "react-dom";
import { Link } from "react-router";

function RegisterFormContent({ register, error }) {
    const { pending } = useFormStatus();

    return (
        <>
            {error && (
                <p className="alert alert-danger" role="alert">
                    {error}
                </p>
            )}


            <fieldset className="border-0 p-0 m-0" disabled={pending} aria-busy={pending}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>

                    <div className="register-input-wrapper">
                        <i className="bi bi-person" aria-hidden="true" />

                        <input
                            type="text"
                            id="username"
                            {...register('username')}
                            className="form-control"
                            placeholder="Choose a username"
                            autoComplete="username"
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="register-email" className="form-label">
                        Email address
                    </label>

                    <div className="register-input-wrapper">
                        <i className="bi bi-envelope" aria-hidden="true" />

                        <input
                            type="email"
                            id="register-email"
                            {...register('email')}
                            className="form-control"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="register-password" className="form-label">
                        Password
                    </label>

                    <div className="register-input-wrapper">
                        <i className="bi bi-lock" aria-hidden="true" />

                        <input
                            type="password"
                            id="register-password"
                            {...register('password')}
                            className="form-control"
                            placeholder="Create a password"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="confirm-password" className="form-label">
                        Confirm password
                    </label>

                    <div className="register-input-wrapper">
                        <i className="bi bi-shield-lock" aria-hidden="true" />

                        <input
                            type="password"
                            id="confirm-password"
                            {...register('confirmPassword')}
                            className="form-control"
                            placeholder="Repeat your password"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="register-submit-button btn w-100"
                    disabled={pending}
                >
                    {pending ? 'Creating account…' : 'Register'}
                    <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
                </button>
            </fieldset>
        </>
    )
}

export default function RegisterForm({
    formAction,
    register,
    error,
}) {
    return (
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

                <form className="register-form" action={formAction} noValidate>
                    <RegisterFormContent
                        error={error}
                        register={register}
                    />

                    <p className="register-login-text">
                        Already have an account?{" "}
                        <Link to="/login">Log in</Link>
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
    );
}