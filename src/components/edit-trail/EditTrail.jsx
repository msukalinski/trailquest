import { Navigate, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';

import { getTrailById, updateTrail } from '../../services/trailService';
import useTrailForm from '../../hooks/useTrailForm';
import useUser from '../../hooks/useUser';
import TrailForm from '../trail-form/TrailForm';
import ErrorMessage from '../error-message/ErrorMessage';
import Loader from '../loader/Loader';

import './EditTrail.css';

function EditFormWrapper({
    trailId,
    trail,
    onEdit
}) {
    const editForm = useTrailForm(onEdit, trail);

    return (
        <TrailForm
            {...editForm}
            cancelTo={`/trails/${trailId}/details`}
            submitLabel="Save changes"
            pendingLabel="Saving changes..."
            submitIcon="bi bi-check-lg"
        />
    )
}

export default function EditTrail() {
    const { trailId } = useParams();
    const { user } = useUser();
    const [loadResult, setLoadResult] = useState(null);
    const navigate = useNavigate();

    const { trail, loadError } = loadResult ?? {};
    const loading = loadResult?.trailId !== trailId;

    useEffect(() => {
        const controller = new AbortController();

        const loadTrail = async () => {
            try {
                const data = await getTrailById(trailId, controller.signal);

                if (!controller.signal.aborted) {
                    setLoadResult({ trailId, trail: data });
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setLoadResult({
                        trailId,
                        loadError: err?.message || 'Could not load this trail.',
                    });
                }
            }
        };

        loadTrail();

        return () => controller.abort();
    }, [trailId]);

    const editTrailHandler = async (changes) => {
        const editedTrail = await updateTrail(trailId, changes);
        navigate(`/trails/${editedTrail.id}/details`);
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
                        ) : loadError ? (
                            <ErrorMessage message={loadError} />
                        ) : !trail ? (
                            <p role="status">Trail not found.</p>
                        ) : trail.ownerId !== user?.id ? (
                            <Navigate
                                to={`/trails/${trailId}/details`}
                                replace
                            />
                        ) : (
                            <EditFormWrapper
                                key={trailId}
                                trailId={trailId}
                                trail={trail}
                                onEdit={editTrailHandler}
                            />
                        )}

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