import { Link } from "react-router";

import './TrailsCatalogCard.css'

export default function TrailsCatalogCard({
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