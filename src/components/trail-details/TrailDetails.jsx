import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import { deleteTrail, getTrailById } from "../../services/trailService";
import useUser from "../../hooks/useUser";

import Loader from "../loader/Loader";
import ErrorMessage from "../error-message/ErrorMessage";
import NotFound from "../not-found/NotFound";
import './TrailDetails.css'

export default function TrailDetails() {
    const { trailId } = useParams();
    const navigate = useNavigate();
    const { user, initializing } = useUser();

    const [trail, setTrail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const controller = new AbortController();

        const loadTrail = async () => {
            setLoading(true);
            setError('');

            try {
                const data = await getTrailById(trailId, controller.signal);

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

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!trail) return <NotFound />;

    const isOwner = Boolean(!initializing && user && user.id === trail.ownerId);

    const usernameInitial = `${trail?.owner.username[0].toUpperCase()}`;
    const username = `${trail?.owner?.username[0].toUpperCase()}${trail?.owner?.username.slice(1)}`;
    const dateObj = new Date(trail?.owner?.created_at);

    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth();
    const day = dateObj.getUTCDate();
    
    const deleteTrailHandler = async () => {
        if (!isOwner) {
            return;
        }

        const confirmed = window.confirm(`Are you sure you want to delete the following trail: ${trail.title}? This cannot be undone.`);

        if (!confirmed) return;

        try {
            await deleteTrail(trailId);

            navigate('/trails');
        } catch (err) {
            console.error('Delete trail error', err.message);
            setError(err.message);
            return;
        }
    }

    return (
        <div className="trail-details-page">

            {/* Breadcrumb */}
            <section className="trail-details-navigation">
                <div className="container">
                    <nav aria-label="Breadcrumb">
                        <ol className="trail-details-breadcrumb">
                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            <li>
                                <i
                                    className="bi bi-chevron-right"
                                    aria-hidden="true"
                                />
                            </li>

                            <li>
                                <Link to="/trails">Trails</Link>
                            </li>

                            <li>
                                <i
                                    className="bi bi-chevron-right"
                                    aria-hidden="true"
                                />
                            </li>

                            <li aria-current="page">
                                {trail.title}
                            </li>
                        </ol>
                    </nav>
                </div>
            </section>

            {/* Trail image */}
            <section className="trail-details-hero-section">
                <div className="container">
                    <div className="trail-details-hero">
                        <img
                            src={trail.imageUrl}
                            alt={trail.title}
                        />

                        <div className="trail-details-hero-overlay" />

                        <div className="trail-details-badges">
                            <span className={
                                `trail-details-badge ${trail.difficulty?.toLowerCase()}`}>
                                {trail.difficulty}
                            </span>

                            <span className="trail-details-badge featured">
                                <i
                                    className="bi bi-star-fill"
                                    aria-hidden="true"
                                />
                                Popular trail
                            </span>
                        </div>

                        <div className="trail-details-hero-content">
                            <p>
                                <i
                                    className="bi bi-geo-alt-fill"
                                    aria-hidden="true"
                                />
                                {trail.location}
                            </p>

                            <h1>{trail.title}</h1>
                        </div>
                    </div>

                    {/* Action bar */}
                    <div className="trail-details-action-bar">
                        <div className="trail-details-author-summary">
                            <div
                                className="trail-details-avatar"
                                aria-hidden="true"
                            >
                                {usernameInitial}
                            </div>

                            <div>
                                <span>Shared by</span>
                                <strong>{username}</strong>
                            </div>
                        </div>

                        <div className="trail-details-actions">
                            <button
                                type="button"
                                className="trail-details-secondary-button"
                            >
                                <i
                                    className="bi bi-share"
                                    aria-hidden="true"
                                />
                                Share
                            </button>

                            <button
                                type="button"
                                className="trail-details-favourite-button"
                            >
                                <i
                                    className="bi bi-heart"
                                    aria-hidden="true"
                                />
                                Save trail
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details content */}
            <section className="trail-details-content">
                <div className="container">
                    <div className="trail-details-layout">
                        <div className="trail-details-primary">
                            {/* Main statistics */}
                            <div className="trail-details-statistics">
                                <div className="trail-details-statistic">
                                    <i
                                        className="bi bi-signpost-2"
                                        aria-hidden="true"
                                    />

                                    <div>
                                        <span>Distance</span>
                                        <strong>{trail.distance} km</strong>
                                    </div>
                                </div>

                                <div className="trail-details-statistic">
                                    <i className="bi bi-clock" aria-hidden="true" />

                                    <div>
                                        <span>Duration</span>
                                        <strong>{trail.duration} hours</strong>
                                    </div>
                                </div>

                                <div className="trail-details-statistic">
                                    <i className="bi bi-graph-up-arrow" aria-hidden="true" />
                                    <div>
                                        <span>Elevation</span>
                                        <strong>{trail.elevation == null
                                            ? 'Elevation not provided'
                                            : `${trail.elevation} m`}</strong>
                                    </div>
                                </div>

                                <div className="trail-details-statistic">
                                    <i className="bi bi-reception-4" aria-hidden="true" />

                                    <div>
                                        <span>Difficulty</span>
                                        <strong>{trail.difficulty}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <article className="trail-details-section">
                                <div className="trail-details-section-heading">
                                    <div
                                        className="trail-details-section-icon"
                                        aria-hidden="true"
                                    >
                                        <i className="bi bi-card-text" />
                                    </div>

                                    <h2>About this trail</h2>
                                </div>

                                <p>{trail.description}</p>
                            </article>
                        </div>

                        {/* Sidebar */}
                        <aside className="trail-details-sidebar">

                            <section className="trail-details-sidebar-card">
                                <h2>Shared by</h2>

                                <div className="trail-details-author">
                                    <div
                                        className="trail-details-author-avatar"
                                        aria-hidden="true"
                                    >
                                        {usernameInitial}
                                    </div>

                                    <div>
                                        <strong>{username}</strong>
                                        {!trail.owner && <span>Profile unavailable</span>}
                                        <span>Member since {`${day}.${month}.${year}`}</span>
                                    </div>
                                </div>

                                <p className="trail-details-author-description">
                                    Mountain enthusiast sharing favourite
                                    trails and hiking experiences.
                                </p>
                            </section>

                            <section className="trail-details-safety-card">
                                <i
                                    className="bi bi-shield-exclamation"
                                    aria-hidden="true"
                                />

                                <div>
                                    <h2>Stay safe</h2>

                                    <p>
                                        Check the weather forecast and
                                        always carry enough water, food and
                                        suitable clothing.
                                    </p>
                                </div>
                            </section>

                            {/* Show only to the trail owner later */}
                            {isOwner && (
                                <section className="trail-details-owner-card">
                                    <p>Owner controls</p>

                                    <Link
                                        to={`/trails/${trail.id}/edit`}
                                        className="trail-details-edit-button"
                                    >
                                        <i
                                            className="bi bi-pencil"
                                            aria-hidden="true"
                                        />
                                        Edit trail
                                    </Link>

                                    <button
                                        type="button"
                                        className="trail-details-delete-button"
                                        onClick={deleteTrailHandler}
                                    >
                                        <i
                                            className="bi bi-trash3"
                                            aria-hidden="true"
                                        />
                                        Delete trail
                                    </button>
                                </section>
                            )}
                        </aside>
                    </div>
                </div>
            </section>

        </div>
    );
}