import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import { deleteTrail, getTrailById } from "../../services/trailService";
import useUser from "../../hooks/useUser";

import Loader from "../loader/Loader";
import ErrorMessage from "../error-message/ErrorMessage";
import NotFound from "../not-found/NotFound";
import './TrailDetails.css'
import { isTrailSaved, saveTrail, unsaveTrail } from "../../services/favouriteService";

export default function TrailDetails() {
    const { trailId } = useParams();
    const navigate = useNavigate();
    const { user, initializing } = useUser();
    const userId = user?.id;

    const [trail, setTrail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isSaved, setIsSaved] = useState(false);
    const [checkingFavourite, setCheckingFavourite] = useState(true);
    const [updatingFavourite, setUpdatingFavourite] = useState(false);
    const [favouriteError, setFavouriteError] = useState('');

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

    useEffect(() => {
        if (initializing) {
            return;
        }

        if (!userId) {
            setIsSaved(false);
            setCheckingFavourite(false);
            setFavouriteError('');
            return;
        }

        const controller = new AbortController();

        const loadFavouriteStatus = async () => {
            setCheckingFavourite(true);
            setFavouriteError('');
            setIsSaved(false);

            try {
                const saved = await isTrailSaved(trailId, userId, controller.signal);

                if (!controller.signal.aborted) {
                    setIsSaved(saved);
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error(err);
                    setFavouriteError(err?.message || 'Could not load saved status');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCheckingFavourite(false);
                }
            }
        }

        loadFavouriteStatus();

        return () => controller.abort();
    }, [trailId, userId, initializing]);

    const toggleFavouriteClickHandler = async () => {
        if (initializing || checkingFavourite || updatingFavourite) {
            return;
        }

        if (!userId || trail.ownerId === userId) {
            return;
        }

        setFavouriteError('');
        setUpdatingFavourite(true);

        try {
            if (isSaved) {
                await unsaveTrail(trailId, userId);
                setIsSaved(false);
            } else {
                await saveTrail(trailId, userId);
                setIsSaved(true);
            }
        } catch (err) {
            setFavouriteError(err?.message || 'Could not update your saved trails');
        } finally {
            setUpdatingFavourite(false);
        }
    }


    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!trail) return <NotFound />;

    const isOwner = Boolean(!initializing && user && user.id === trail.ownerId);

    const canSaveTrail = !initializing && Boolean(userId) && trail.ownerId !== userId;

    const rawUsername = trail.owner?.username?.trim() || '';

    const username = rawUsername
        ? `${rawUsername[0].toUpperCase()}${rawUsername.slice(1)}`
        : 'TrailQuest member';

    const usernameInitial = rawUsername
        ? rawUsername[0].toUpperCase()
        : 'TQ';

    const joinedAt = trail.owner?.created_at
        ? new Date(trail.owner.created_at)
        : null;

    const memberSince = joinedAt && !Number.isNaN(joinedAt.getTime())
        ? `${joinedAt.getUTCDate()}.${joinedAt.getUTCMonth() + 1}.${joinedAt.getUTCFullYear()}`
        : null;

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

                            {canSaveTrail ? (
                                <button
                                    type="button"
                                    className="trail-details-favourite-button"
                                    onClick={toggleFavouriteClickHandler}
                                    disabled={checkingFavourite || updatingFavourite}
                                    aria-pressed={isSaved}
                                >
                                    <i
                                        className={`bi ${isSaved ? 'bi-heart-fill' : 'bi-heart'}`}
                                        aria-hidden="true"
                                    />

                                    {checkingFavourite
                                        ? 'Checking...'
                                        : updatingFavourite
                                            ? 'Updating'
                                            : isSaved
                                                ? 'Saved'
                                                : 'Save trail'}
                                </button>

                            ) : isOwner ? (
                                <span className="trail-details-your-trail">
                                    <i className="bi bi-person-check-fill me-2" aria-hidden="true" />
                                    Your trail
                                </span>
                            ) : null}

                            {favouriteError && (
                                <p className="text-danger mt-2" role="alert">
                                    {favouriteError}
                                </p>
                            )}
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
                                        <span>Member since {memberSince}</span>
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

                            {/* Show only to the trail owner */}
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