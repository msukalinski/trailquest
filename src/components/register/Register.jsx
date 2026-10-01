import { useNavigate } from "react-router";

import './Register.css'
import RegisterForm from "../register-form/RegisterForm";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const registerSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));
        const email = values.email.trim();
        const username = values.username.trim();
        const password = values.password;

        setError('');

        if (password !== values.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!username) {
            setError('Enter an username');
            return;
        }

        setSubmitting(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { username } }
            });

            if (error) {
                setError(error.message);
                return;
            }

            if (data.session) {
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="register-page">
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
                    <RegisterForm
                        onSubmit={registerSubmitHandler}
                        error={error}
                        submitting={submitting}
                    />
                </div>
            </div>
        </div>
    );
}