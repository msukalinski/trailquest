import { Link } from "react-router";

import "../my-trails-card/MyTrailsCard.css";

export default function FavouriteTrailCard({
    id,
    imageUrl,
    title,
    location,
    description,
    distance,
    duration,
    elevation,
    difficulty,
    savedAt,
    onRemove,
    removingId
}) {
    const removing = removingId === id;
    const savedDate = savedAt
        ? new Date(savedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
        : null;

    return (
        <article className="my-trail-card">
            <div className="my-trail-image-wrapper">
                <img src={imageUrl} alt={title} className="my-trail-image" loading="lazy" />
                <span className={`my-trail-difficulty ${difficulty?.toLowerCase()}`}>
                    {difficulty}
                </span>
            </div>

            <div className="my-trail-card-content">
                <p className="my-trail-location">
                    <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                    {location}
                </p>

                <h3>{title}</h3>
                <p className="my-trail-description">{description}</p>

                <div className="my-trail-information">
                    <span>
                        <i className="bi bi-signpost-2" aria-hidden="true" />
                        {distance} km
                    </span>
                    <span>
                        <i className="bi bi-clock" aria-hidden="true" />
                        {duration} h
                    </span>
                    <span>
                        <i className="bi bi-graph-up-arrow" aria-hidden="true" />
                        {elevation} m
                    </span>
                </div>

                {savedDate && (
                    <p className="favourite-saved-date">
                        <i className="bi bi-heart-fill" aria-hidden="true" />
                        Saved on <time dateTime={savedAt}>{savedDate}</time>
                    </p>
                )}

                <div className="my-trail-actions favourite-trail-actions">
                    <Link
                        to={`/trails/${id}/details`}
                        className="my-trail-view-button"
                        aria-label={`View ${title}`}
                    >
                        <i className="bi bi-eye" aria-hidden="true" />
                        View trail
                    </Link>

                    <button
                        type="button"
                        className="favourite-remove-button"
                        onClick={() => onRemove(id)}
                        disabled={removingId !== null}
                        aria-busy={removing}
                        aria-label={`Remove ${title} from saved trails`}
                    >
                        <i className="bi bi-heartbreak" aria-hidden="true" />
                        {removing ? 'Removing...' : 'Remove save'}
                    </button>
                </div>
            </div>
        </article>
    );
}
