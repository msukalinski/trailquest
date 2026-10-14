import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

import LoginForm from "../login-form/LoginForm";
import useForm from "../../hooks/useForm";
import { login } from "../../services/userService";

import './Login.css';

export default function Login() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const loginSubmitHandler = async ({ email, password }) => {
        setError('');
        const trimmedEmail = email.trim();

        if (!trimmedEmail || !password) {
            setError('Email and password are required!');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError('Enter a valid email address.');
            return;
        }

        try {
            await login({
                email: trimmedEmail,
                password
            });

            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
        }
    };

    const { register, formAction } = useForm(
        loginSubmitHandler,
        { email: '', password: '' }
    );

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
                                    Log in to save your favourite trails,
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

                    <LoginForm
                        formAction={formAction}
                        register={register}
                        error={error}
                        state={state}
                    />
                </div>
            </div>
        </div>
    );
}