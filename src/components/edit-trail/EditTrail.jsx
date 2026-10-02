import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';

import { getTrailById, updateTrail } from '../../services/trailService';
import EditTrailForm from '../edit-trail-form/EditTrailForm';
import Loader from '../loader/Loader';
import ErrorMessage from '../error-message/ErrorMessage';

import '../create-trail/CreateTrail.css';
import './EditTrail.css';

export default function EditTrail() {
    const { trailId } = useParams();
    const navigate = useNavigate();

    const [trail, setTrail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const loadTrail = async () => {
            setTrail(null);
            setLoading(true);
            setError('');

            try {
                const data = await getTrailById(trailId);

                if (!controller.signal.aborted) {
                    setTrail(data);
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error(err);
                    setError('Could not load this trail');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        loadTrail();

        return () => controller.abort();
    }, [trailId]);

    const editTrailHandler = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        const values = Object.fromEntries(new FormData(e.currentTarget));
        const changes = {
            ...values,
            distance: Number(values.distance),
            duration: Number(values.duration),
            elevation: Number(values.elevation),
        }

        try {
            const editedTrail = await updateTrail(trailId, changes);
            navigate(`/trails/${editedTrail.id}/details`);
            console.log(editedTrail);
        } catch (err) {
            console.error('Edit trail error', err.message);
            setError(err.message);
            return;
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="create-trail-page edit-trail-page">
            <section className="create-trail-hero">
                <div className="container">
                    <div className="create-trail-hero-content">
                        <p className="create-trail-label">Manage your route</p>
                        <h1>Edit trail</h1>
                        <p>Update the information you shared with other hikers.</p>
                    </div>
                </div>
            </section>

            <section className="create-trail-content">
                <div className="container">
                    <div className="create-trail-layout">
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <ErrorMessage message={error} />
                        ) : trail ? (
                            <EditTrailForm trail={trail} onEdit={editTrailHandler} submitting={submitting} />
                        ) : (
                            <strong>Trail not found</strong>
                        )
                        }
                        {/* <EditTrailForm onEdit={editTrailHandler} trail={trailData} /> */}

                        <aside className="create-trail-sidebar">
                            <section className="create-sidebar-card">
                                <div className="create-sidebar-heading">
                                    <i className="bi bi-pencil-square" aria-hidden="true" />
                                    <h2>Keep your trail accurate</h2>
                                </div>

                                <p>Check the route details before saving your changes.</p>
                                <ul>
                                    <li>
                                        <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                        Review distance and duration
                                    </li>
                                    <li>
                                        <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                        Update any changed trail conditions
                                    </li>
                                </ul>
                            </section>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}