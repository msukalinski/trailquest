import { Link } from "react-router";

import './MyTrails.css'

function MyTrailCard({
    id,
    image,
    title,
    location,
    description,
    distance,
    difficulty,
    difficultyClass,
    status,
    statusClass,
    views,
    favourites,
}) {
    return (
        <article className="my-trail-card">
            <div className="my-trail-image-wrapper">
                <img
                    src={image}
                    alt={title}
                    className="my-trail-image"
                />

                <span className={`my-trail-status ${statusClass}`}>
                    {status}
                </span>

                <span
                    className={`my-trail-difficulty ${difficultyClass}`}
                >
                    {difficulty}
                </span>
            </div>

            <div className="my-trail-card-content">
                <p className="my-trail-location">
                    <i
                        className="bi bi-geo-alt-fill"
                        aria-hidden="true"
                    />

                    {location}
                </p>

                <h2>{title}</h2>

                <p className="my-trail-description">
                    {description}
                </p>

                <div className="my-trail-information">
                    <span>
                        <i
                            className="bi bi-signpost-2"
                            aria-hidden="true"
                        />
                        {distance}
                    </span>

                    <span>
                        <i
                            className="bi bi-eye"
                            aria-hidden="true"
                        />
                        {views} views
                    </span>

                    <span>
                        <i
                            className="bi bi-heart"
                            aria-hidden="true"
                        />
                        {favourites}
                    </span>
                </div>

                <div className="my-trail-actions">
                    <Link
                        to={`/trails/${id}`}
                        className="my-trail-view-button"
                    >
                        <i
                            className="bi bi-eye"
                            aria-hidden="true"
                        />
                        View
                    </Link>

                    <Link
                        to={`/trails/${id}/edit`}
                        className="my-trail-edit-button"
                    >
                        <i
                            className="bi bi-pencil"
                            aria-hidden="true"
                        />
                        Edit
                    </Link>

                    <button
                        type="button"
                        className="my-trail-delete-button"
                    >
                        <i
                            className="bi bi-trash3"
                            aria-hidden="true"
                        />
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function MyTrails() {
    return (
        <div className="my-trails-page min-vh-100 d-flex flex-column">

            <main className="my-trails-main flex-grow-1">
                {/* Hero */}
                <section className="my-trails-hero">
                    <div className="container">
                        <div className="my-trails-hero-layout">
                            <div className="my-trails-hero-content">
                                <p className="my-trails-label">
                                    Your hiking collection
                                </p>

                                <h1>My Trails</h1>

                                <p>
                                    Manage the routes you have shared with the
                                    TrailQuest community.
                                </p>
                            </div>

                            <Link
                                to="/trails/create"
                                className="my-trails-create-button btn"
                            >
                                <i
                                    className="bi bi-plus-lg me-2"
                                    aria-hidden="true"
                                />
                                Create new trail
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="my-trails-statistics-section">
                    <div className="container">
                        <div className="my-trails-statistics">
                            <div className="my-trails-statistic">
                                <div className="my-trails-statistic-icon green">
                                    <i
                                        className="bi bi-signpost-split"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <strong>3</strong>
                                    <span>Total trails</span>
                                </div>
                            </div>

                            <div className="my-trails-statistic">
                                <div className="my-trails-statistic-icon orange">
                                    <i
                                        className="bi bi-cloud-check"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <strong>2</strong>
                                    <span>Published</span>
                                </div>
                            </div>

                            <div className="my-trails-statistic">
                                <div className="my-trails-statistic-icon blue">
                                    <i
                                        className="bi bi-file-earmark-text"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <strong>1</strong>
                                    <span>Draft</span>
                                </div>
                            </div>

                            <div className="my-trails-statistic">
                                <div className="my-trails-statistic-icon red">
                                    <i
                                        className="bi bi-heart"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <strong>284</strong>
                                    <span>Total favourites</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trails */}
                <section className="my-trails-content">
                    <div className="container">
                        <div className="my-trails-toolbar">
                            <div>
                                <p className="my-trails-toolbar-label">
                                    Your routes
                                </p>

                                <h2>Manage trails</h2>
                            </div>

                            <div className="my-trails-toolbar-controls">
                                <div
                                    className="my-trails-filter-buttons"
                                    aria-label="Filter trails"
                                >
                                    <button
                                        type="button"
                                        className="active"
                                    >
                                        All
                                    </button>

                                    <button type="button">
                                        Published
                                    </button>

                                    <button type="button">
                                        Drafts
                                    </button>
                                </div>

                                <select
                                    className="form-select"
                                    aria-label="Sort trails"
                                    defaultValue="newest"
                                >
                                    <option value="newest">
                                        Newest first
                                    </option>

                                    <option value="oldest">
                                        Oldest first
                                    </option>

                                    <option value="popular">
                                        Most popular
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="my-trails-grid">
                            <MyTrailCard
                                id="1"
                                image="/images/seven-rila-lakes.jpg"
                                title="Seven Rila Lakes"
                                location="Rila Mountain, Bulgaria"
                                description="A circular mountain route passing through the famous glacial lakes of Rila."
                                distance="17 km"
                                difficulty="Hard"
                                difficultyClass="hard"
                                status="Published"
                                statusClass="published"
                                views="1,248"
                                favourites="156"
                            />

                            <MyTrailCard
                                id="2"
                                image="/images/musala-peak.jpg"
                                title="Musala Peak"
                                location="Rila Mountain, Bulgaria"
                                description="A challenging climb to the highest summit in Bulgaria and the Balkan Peninsula."
                                distance="14 km"
                                difficulty="Moderate"
                                difficultyClass="moderate"
                                status="Published"
                                statusClass="published"
                                views="984"
                                favourites="128"
                            />

                            <MyTrailCard
                                id="3"
                                image="/images/vitosha-golden-bridges.jpg"
                                title="Vitosha Golden Bridges"
                                location="Vitosha Mountain, Bulgaria"
                                description="A peaceful forest trail leading to Vitosha's impressive stone river."
                                distance="8 km"
                                difficulty="Easy"
                                difficultyClass="easy"
                                status="Draft"
                                statusClass="draft"
                                views="0"
                                favourites="0"
                            />
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
}