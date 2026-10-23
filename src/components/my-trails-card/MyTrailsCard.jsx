import { Link } from "react-router";

import './MyTrailsCard.css';

export default function MyTrailsCard({
    id,
    imageUrl,
    title,
    location,
    description,
    distance,
    duration,
    elevation,
    difficulty,
    status,
    statusClass,
    favourites,
    onDelete,
    deletingId
}) {
    return (
        <article className="my-trail-card">
            <div className="my-trail-image-wrapper">
                <img
                    src={imageUrl}
                    alt={title}
                    className="my-trail-image"
                />

                <span className={`my-trail-status ${statusClass}`}>
                    {status}
                </span>

                <span
                    className={`my-trail-difficulty ${difficulty?.toLowerCase()}`}
                >
                    {difficulty}
                </span>
            </div>

            <div className="my-trail-card-content">
                <p className="my-trail-location">
                    <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                    {location}
                </p>

                <h2>{title}</h2>

                <p className="my-trail-description">
                    {description}
                </p>

                <div className="my-trail-information">
                    <span>
                        <i className="bi bi-signpost-2" aria-hidden="true" />
                        {distance}
                    </span>

                    <span>
                        <i className="bi bi-clock" aria-hidden="true" />
                        {duration}
                    </span>

                    <span>
                        <i className="bi bi-graph-up-arrow" aria-hidden="true" />
                        {elevation}
                    </span>

                    <span>
                        <i className="bi bi-heart" aria-hidden="true" />
                        {favourites}
                    </span>
                </div>

                <div className="my-trail-actions">
                    <Link
                        to={`/trails/${id}/details`}
                        className="my-trail-view-button"
                    >
                        <i className="bi bi-eye" aria-hidden="true" />
                        View
                    </Link>

                    <Link
                        to={`/trails/${id}/edit`}
                        className="my-trail-edit-button"
                    >
                        <i className="bi bi-pencil" aria-hidden="true" />
                        Edit
                    </Link>

                    <button
                        type="button"
                        className="my-trail-delete-button"
                        onClick={() => onDelete(id, title)}
                        disabled={Boolean(deletingId)}
                        aria-busy={deletingId === id}
                    >
                        <i className="bi bi-trash3" aria-hidden="true" />
                        {deletingId === id ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </article>
    );
}

<span>
    {trail.favourites === 0
        ? 'No saves yet'
        : `Saved by ${trail.favourites} ${trail.favourites === 1
            ? 'hiker'
            : 'hikers'
        }`}
</span>