import { Link, useNavigate } from "react-router";

import './Login.css'
import LoginForm from "../login-form/LoginForm";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState('');

    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));
        const email = values.email.trim();
        const password = values.password;

        setError('');
        setSubmitting(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                setError(error.message);
                return;
            }

            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setSubmitting(false);
        }
    }

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
                    <LoginForm
                        onSubmit={loginSubmitHandler}
                        error={error}
                        submitting={submitting}
                    />
                </div>
            </div>
        </div>
    );
}