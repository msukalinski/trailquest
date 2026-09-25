import { Link, useParams } from "react-router";

import './TrailDetails.css'
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import ErrorMessage from "../error-message/ErrorMessage";
import NotFound from "../not-found/NotFound";

export default function TrailDetails() {
    const { trailId } = useParams();

    const [trail, setTrail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const controller = new AbortController();

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        fetch(
            `${supabaseUrl}/rest/v1/trails?select=*&id=eq.${encodeURIComponent(trailId)}`,
            {
                headers: { apikey: supabaseKey },
                signal: controller.signal
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                return response.json();
            })
            .then(data => setTrail(data[0] ?? null))
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error(err);
                    setError('Could not load this trail.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

    }, [trailId]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!trail) return <NotFound />;

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

                            {/* <span>
                                A breathtaking journey through Bulgaria’s
                                most famous glacial lakes.
                            </span> */}
                        </div>
                    </div>

                    {/* Action bar */}
                    <div className="trail-details-action-bar">
                        <div className="trail-details-author-summary">
                            <div
                                className="trail-details-avatar"
                                aria-hidden="true"
                            >
                                AM
                            </div>

                            <div>
                                <span>Shared by</span>
                                <strong>Alex Morgan</strong>
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
                                    <i
                                        className="bi bi-clock"
                                        aria-hidden="true"
                                    />

                                    <div>
                                        <span>Duration</span>
                                        <strong>{trail.duration} hours</strong>
                                    </div>
                                </div>

                                <div className="trail-details-statistic">
                                    <i
                                        className="bi bi-graph-up-arrow"
                                        aria-hidden="true"
                                    />

                                    <div>
                                        <span>Elevation</span>
                                        <strong>{trail.elevation} m</strong>
                                    </div>
                                </div>

                                <div className="trail-details-statistic">
                                    <i
                                        className="bi bi-reception-4"
                                        aria-hidden="true"
                                    />

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

                            {/* Highlights Could implement later */}
                            {/* <section className="trail-details-section">
                                <div className="trail-details-section-heading">
                                    <div
                                        className="trail-details-section-icon"
                                        aria-hidden="true"
                                    >
                                        <i className="bi bi-stars" />
                                    </div>

                                    <h2>What to expect</h2>
                                </div>

                                <div className="trail-details-highlights">
                                    <div>
                                        <i
                                            className="bi bi-check-circle-fill"
                                            aria-hidden="true"
                                        />

                                        <span>
                                            Seven beautiful glacial lakes
                                        </span>
                                    </div>

                                    <div>
                                        <i
                                            className="bi bi-check-circle-fill"
                                            aria-hidden="true"
                                        />

                                        <span>
                                            Panoramic views over Rila
                                            Mountain
                                        </span>
                                    </div>

                                    <div>
                                        <i
                                            className="bi bi-check-circle-fill"
                                            aria-hidden="true"
                                        />

                                        <span>
                                            Clearly marked mountain paths
                                        </span>
                                    </div>

                                    <div>
                                        <i
                                            className="bi bi-check-circle-fill"
                                            aria-hidden="true"
                                        />

                                        <span>
                                            Steep and rocky sections
                                        </span>
                                    </div>

                                    <div>
                                        <i
                                            className="bi bi-check-circle-fill"
                                            aria-hidden="true"
                                        />

                                        <span>
                                            Limited shade on the higher
                                            sections
                                        </span>
                                    </div>

                                    <div>
                                        <i
                                            className="bi bi-check-circle-fill"
                                            aria-hidden="true"
                                        />

                                        <span>
                                            Suitable for experienced hikers
                                        </span>
                                    </div>
                                </div>
                            </section> */}

                            {/* Map */}
                            {/* <section className="trail-details-section">
                                <div className="trail-details-section-heading">
                                    <div
                                        className="trail-details-section-icon"
                                        aria-hidden="true"
                                    >
                                        <i className="bi bi-map" />
                                    </div>

                                    <h2>Route map</h2>
                                </div>

                                <div className="trail-details-map">
                                    <div className="trail-details-map-content">
                                        <div
                                            className="trail-details-map-icon"
                                            aria-hidden="true"
                                        >
                                            <i className="bi bi-map" />
                                        </div>

                                        <h3>Explore the route</h3>

                                        <p>
                                            Open the trail route in your
                                            preferred maps application.
                                        </p>

                                        <button
                                            type="button"
                                            className="trail-details-map-button"
                                        >
                                            <i
                                                className="bi bi-box-arrow-up-right"
                                                aria-hidden="true"
                                            />
                                            Open route map
                                        </button>
                                    </div>
                                </div>
                            </section> */}
                        </div>

                        {/* Sidebar */}
                        <aside className="trail-details-sidebar">

                            {/* Could also implement later */}
                            {/* <section className="trail-details-sidebar-card">
                                <h2>Trail overview</h2>

                                <dl className="trail-details-overview">
                                    <div>
                                        <dt>Route type</dt>
                                        <dd>Loop</dd>
                                    </div>

                                    <div>
                                        <dt>Highest point</dt>
                                        <dd>2,535 m</dd>
                                    </div>

                                    <div>
                                        <dt>Best season</dt>
                                        <dd>June – October</dd>
                                    </div>

                                    <div>
                                        <dt>Trail markings</dt>
                                        <dd>Yes</dd>
                                    </div>

                                    <div>
                                        <dt>Dogs allowed</dt>
                                        <dd>Yes, on a leash</dd>
                                    </div>
                                </dl>
                            </section> */}

                            <section className="trail-details-sidebar-card">
                                <h2>Shared by</h2>

                                <div className="trail-details-author">
                                    <div
                                        className="trail-details-author-avatar"
                                        aria-hidden="true"
                                    >
                                        AM
                                    </div>

                                    <div>
                                        <strong>Alex Morgan</strong>
                                        <span>Member since 2026</span>
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
                            <section className="trail-details-owner-card">
                                <p>Owner controls</p>

                                <Link
                                    to="/trails/1/edit"
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
                                >
                                    <i
                                        className="bi bi-trash3"
                                        aria-hidden="true"
                                    />
                                    Delete trail
                                </button>
                            </section>
                        </aside>
                    </div>
                </div>
            </section>

        </div>
    );
}