const difficultyBadgeColor = {
    Easy: 'badge bg-success-subtle text-success px-3 py-2',
    Moderate: 'badge bg-warning-subtle text-warning-emphasis px-3 py-2',
    Hard: 'badge bg-danger-subtle text-danger px-3 py-2',
}

export default function HomeTrailCard({
    imageUrl,
    title,
    location,
    distance,
    duration,
    difficulty
}) {


    return (
        <div className="col-md-6 col-xl-4">
            <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="position-relative ratio ratio-16x9">
                    <img
                        src={imageUrl}
                        className="card-img-top object-fit-cover"
                        alt={title}
                    />

                    <span
                        className="position-absolute top-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center m-3 shadow-sm"
                    >
                        <i className="bi bi-heart fs-5" />
                    </span>
                </div>

                <div className="card-body">
                    <h3 className="card-title h5 fw-bold">
                        {title}
                    </h3>

                    <p className="text-secondary mb-3">
                        <i className="bi bi-geo-alt-fill me-2" />
                        {location}
                    </p>

                    <div className="d-flex flex-wrap align-items-center gap-4 text-secondary">
                        <span>
                            <i className="bi bi-person-walking me-2" />
                            {distance} km
                        </span>

                        <span>
                            <i className="bi bi-clock me-2" />
                            {duration} hours
                        </span>

                        <span className={difficultyBadgeColor[difficulty]}>
                            {difficulty}
                        </span>
                    </div>
                </div>
            </article >
        </div >
    );
}