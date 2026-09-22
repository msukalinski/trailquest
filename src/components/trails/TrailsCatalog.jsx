import { Link } from "react-router";

import "./TrailsCatalog.css";

function TrailCard({
    image,
    title,
    location,
    description,
    distance,
    duration,
    elevation,
    difficulty,
    difficultyClass,
    detailsPath,
}) {
    return (
        <article className="catalog-trail-card">
            <div className="catalog-card-image-wrapper">
                <img
                    src={image}
                    alt={title}
                    className="catalog-card-image"
                />

                <span
                    className={`catalog-difficulty ${difficultyClass}`}
                >
                    {difficulty}
                </span>

                <span
                    className="catalog-favourite"
                    aria-hidden="true"
                >
                    <i className="bi bi-heart" />
                </span>
            </div>

            <div className="catalog-card-content">
                <p className="catalog-card-location">
                    <i
                        className="bi bi-geo-alt-fill"
                        aria-hidden="true"
                    />
                    {location}
                </p>

                <h2>{title}</h2>

                <p className="catalog-card-description">
                    {description}
                </p>

                <div className="catalog-card-information">
                    <div>
                        <i
                            className="bi bi-signpost-2"
                            aria-hidden="true"
                        />

                        <span>
                            <strong>{distance}</strong>
                            Distance
                        </span>
                    </div>

                    <div>
                        <i
                            className="bi bi-clock"
                            aria-hidden="true"
                        />

                        <span>
                            <strong>{duration}</strong>
                            Duration
                        </span>
                    </div>

                    <div>
                        <i
                            className="bi bi-graph-up-arrow"
                            aria-hidden="true"
                        />

                        <span>
                            <strong>{elevation}</strong>
                            Elevation
                        </span>
                    </div>
                </div>

                <Link
                    to={detailsPath}
                    className="catalog-details-link"
                >
                    View trail details

                    <i
                        className="bi bi-arrow-right"
                        aria-hidden="true"
                    />
                </Link>
            </div>
        </article>
    );
}

export default function TrailsCatalog() {
    return (
        <div className="trails-catalog-page min-vh-100 d-flex flex-column">

            <main className="catalog-main flex-grow-1">
                {/* Catalog hero */}
                <section className="catalog-hero">
                    <div className="container">
                        <div className="catalog-hero-content">
                            <p className="catalog-hero-label">
                                Discover Bulgaria
                            </p>

                            <h1>Find your perfect trail</h1>

                            <p>
                                Explore hiking routes, mountain peaks and
                                unforgettable places shared by our community.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="catalog-filter-section">
                    <div className="container">
                        <div className="catalog-filter-box">
                            <form className="row g-3">
                                <div className="col-lg-4">
                                    <label
                                        htmlFor="catalog-search"
                                        className="form-label"
                                    >
                                        Search trails
                                    </label>

                                    <div className="catalog-input-wrapper">
                                        <i
                                            className="bi bi-search"
                                            aria-hidden="true"
                                        />

                                        <input
                                            type="search"
                                            id="catalog-search"
                                            name="search"
                                            className="form-control"
                                            placeholder="Search by trail name..."
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 col-lg-2">
                                    <label
                                        htmlFor="catalog-location"
                                        className="form-label"
                                    >
                                        Location
                                    </label>

                                    <select
                                        id="catalog-location"
                                        name="location"
                                        className="form-select"
                                    >
                                        <option>All locations</option>
                                        <option>Rila Mountain</option>
                                        <option>Pirin Mountain</option>
                                        <option>Vitosha Mountain</option>
                                        <option>Rhodope Mountains</option>
                                        <option>Balkan Mountains</option>
                                    </select>
                                </div>

                                <div className="col-md-4 col-lg-2">
                                    <label
                                        htmlFor="catalog-difficulty"
                                        className="form-label"
                                    >
                                        Difficulty
                                    </label>

                                    <select
                                        id="catalog-difficulty"
                                        name="difficulty"
                                        className="form-select"
                                    >
                                        <option>Any difficulty</option>
                                        <option>Easy</option>
                                        <option>Moderate</option>
                                        <option>Hard</option>
                                    </select>
                                </div>

                                <div className="col-md-4 col-lg-2">
                                    <label
                                        htmlFor="catalog-sort"
                                        className="form-label"
                                    >
                                        Sort by
                                    </label>

                                    <select
                                        id="catalog-sort"
                                        name="sort"
                                        className="form-select"
                                    >
                                        <option>Most popular</option>
                                        <option>Newest</option>
                                        <option>Shortest distance</option>
                                        <option>Longest distance</option>
                                    </select>
                                </div>

                                <div className="col-lg-2 d-flex align-items-end">
                                    <button
                                        type="button"
                                        className="catalog-search-button btn w-100"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Trails */}
                <section className="catalog-results-section">
                    <div className="container">
                        <div className="catalog-results-heading">
                            <div>
                                <p className="catalog-results-label">
                                    Explore routes
                                </p>

                                <h2>All trails</h2>
                            </div>

                            <p className="catalog-results-count">
                                Showing <strong>6</strong> trails
                            </p>
                        </div>

                        <div className="catalog-grid">
                            <TrailCard
                                image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022"
                                title="Seven Rila Lakes"
                                location="Rila Mountain, Bulgaria"
                                description="A beautiful circular route passing through the famous glacial lakes of Rila."
                                distance="17 km"
                                duration="6–8 h"
                                elevation="550 m"
                                difficulty="Hard"
                                difficultyClass="hard"
                                detailsPath="/trails/1"
                            />

                            <TrailCard
                                image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022.jpg"
                                title="Vitosha Golden Bridges"
                                location="Vitosha Mountain, Bulgaria"
                                description="A peaceful forest trail leading to one of Vitosha's most recognisable natural landmarks."
                                distance="8 km"
                                duration="3–4 h"
                                elevation="240 m"
                                difficulty="Easy"
                                difficultyClass="easy"
                                detailsPath="/trails/2"
                            />

                            <TrailCard
                                image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022"
                                title="Musala Peak"
                                location="Rila Mountain, Bulgaria"
                                description="Climb to the highest summit in Bulgaria and enjoy breathtaking mountain views."
                                distance="14 km"
                                duration="6–9 h"
                                elevation="1,250 m"
                                difficulty="Moderate"
                                difficultyClass="moderate"
                                detailsPath="/trails/3"
                            />

                            <TrailCard
                                image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022"
                                title="Koncheto Ridge"
                                location="Pirin Mountain, Bulgaria"
                                description="A challenging high-mountain route across one of Bulgaria's most dramatic ridges."
                                distance="18 km"
                                duration="8–10 h"
                                elevation="1,400 m"
                                difficulty="Hard"
                                difficultyClass="hard"
                                detailsPath="/trails/4"
                            />

                            <TrailCard
                                image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022"
                                title="Botev Peak"
                                location="Balkan Mountains, Bulgaria"
                                description="A demanding route to the highest peak in the Balkan Mountains."
                                distance="21 km"
                                duration="8–10 h"
                                elevation="1,300 m"
                                difficulty="Hard"
                                difficultyClass="hard"
                                detailsPath="/trails/5"
                            />

                            <TrailCard
                                image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022"
                                title="Smolyan Lakes"
                                location="Rhodope Mountains, Bulgaria"
                                description="A relaxing woodland route connecting several peaceful mountain lakes."
                                distance="10 km"
                                duration="4–5 h"
                                elevation="320 m"
                                difficulty="Easy"
                                difficultyClass="easy"
                                detailsPath="/trails/6"
                            />
                        </div>

                        {/* Static pagination */}
                        <nav
                            className="catalog-pagination"
                            aria-label="Trails pagination"
                        >
                            <button
                                type="button"
                                className="catalog-page-button"
                                aria-label="Previous page"
                            >
                                <i
                                    className="bi bi-chevron-left"
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                className="catalog-page-button active"
                            >
                                1
                            </button>

                            <button
                                type="button"
                                className="catalog-page-button"
                            >
                                2
                            </button>

                            <button
                                type="button"
                                className="catalog-page-button"
                            >
                                3
                            </button>

                            <button
                                type="button"
                                className="catalog-page-button"
                                aria-label="Next page"
                            >
                                <i
                                    className="bi bi-chevron-right"
                                    aria-hidden="true"
                                />
                            </button>
                        </nav>
                    </div>
                </section>
            </main>

        </div>
    );
}