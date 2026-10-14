import { useNavigate } from "react-router";
import { useState } from "react";

import RegisterForm from "../register-form/RegisterForm";
import useForm from "../../hooks/useForm";
import { registerUser } from "../../services/userService";

import './Register.css';

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const registerSubmitHandler = async ({ username, email, password, confirmPassword }) => {
        setError('');
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        if (!trimmedUsername || !trimmedEmail || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError('Enter a valid email address.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const data = await registerUser({
                username: trimmedUsername,
                email: trimmedEmail,
                password,
            });

            if (!data.session) {
                setError('Your account was created, but automatic log in failed. Please log in.');
                return;
            }

            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
        }
    };

    const { register, formAction } = useForm(
        registerSubmitHandler,
        { username: '', email: '', password: '', confirmPassword: '' }
    )

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
                        formAction={formAction}
                        register={register}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}