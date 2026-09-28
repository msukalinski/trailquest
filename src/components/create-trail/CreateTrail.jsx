import './CreateTrail.css'
import CreateTrailForm from "../create-trail-form/CreateTrailForm";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ErrorMessage from '../error-message/ErrorMessage';
import { supabase } from '../../lib/supabase';

export default function CreateTrail() {
    const navigate = useNavigate();
    const [error, setError] = useState('')

    const createTrailHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
        setError('');

        const formData = new FormData(e.currentTarget);

        const values = Object.fromEntries(formData);


        const newTrail = {
            ...values,
            distance: Number(values.distance),
            duration: Number(values.duration),
            elevation: Number(values.elevation),
        }

        const { data: createdTrail, error } = await supabase
            .from('trails')
            .insert(newTrail)
            .select()
            .single();

        if (error) {
            console.error('Create trail error', error);
            setError(error.message);
            return;
        }
        console.log(createdTrail);
        navigate(`/trails/${createdTrail.id}/details`);
    };

    return (
        <>
            {error && <ErrorMessage {...error} />}
            <div className="create-trail-page">

                {/* Hero */}
                <section className="create-trail-hero">
                    <div className="container">
                        <div className="create-trail-hero-content">
                            <p className="create-trail-label">Share your adventure</p>

                            <h1>Create a new trail</h1>

                            <p>Help other hikers discover a beautiful place by sharing the details of your route.</p>
                        </div>
                    </div>
                </section>

                <section className="create-trail-content">
                    <div className="container">
                        <div className="create-trail-layout">

                            {/* Form */}
                            <CreateTrailForm onCreate={createTrailHandler} />

                            {/* Sidebar */}
                            <aside className="create-trail-sidebar">
                                <section className="create-sidebar-card">
                                    <div className="create-sidebar-heading">
                                        <i className="bi bi-lightbulb" aria-hidden="true" />
                                        <h2>Before you publish</h2>
                                    </div>

                                    <p>Make your trail useful and safe for other hikers.</p>

                                    <ul>
                                        <li>
                                            <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                            Use accurate distance and duration
                                        </li>

                                        <li>
                                            <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                            Select the correct difficulty
                                        </li>

                                        <li>
                                            <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                            Mention dangerous trail sections
                                        </li>

                                        <li>
                                            <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                            Use a clear landscape image
                                        </li>
                                    </ul>
                                </section>

                                <section className="create-sidebar-card create-safety-card">
                                    <div className="create-sidebar-heading">
                                        <i className="bi bi-shield-check" aria-hidden="true" />
                                        <h2>Hiking responsibly</h2>
                                    </div>

                                    <p>Encourage hikers to respect nature, follow trail markings and check the weather before starting.</p>
                                </section>

                                <div className="create-sidebar-message">
                                    <i className="bi bi-tree-fill" aria-hidden="true" />
                                    <p>Leave nothing behind but footprints.</p>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section >
            </div >
        </>
    );
}