import { Link } from 'react-router';
import './PopularTrails.css'

export default function PopularTrails() {
    return (
        <section className="popular-trails container py-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="fw-bold mb-0"> Popular trails</h2>

                <Link to="/trails" className="text-decoration-none fw-semibold">
                    View all trails
                    <span className="ms-2">→</span>
                </Link>
            </div>

            <div className="row g-4">
                {/* First trail */}
                <div className="col-md-6 col-xl-4">
                    <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="position-relative ratio ratio-16x9">
                            <img
                                src="/images/seven-rila-lakes.jpg"
                                className="card-img-top object-fit-cover"
                                alt="Seven Rila Lakes"
                            />

                            <span
                                className="position-absolute top-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center m-3 shadow-sm"
                            >
                                <i className="bi bi-heart fs-5" />
                            </span>
                        </div>

                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">
                                Seven Rila Lakes
                            </h3>

                            <p className="text-secondary mb-3">
                                <i className="bi bi-geo-alt-fill me-2" />
                                Rila Mountain, Bulgaria
                            </p>

                            <div className="d-flex flex-wrap align-items-center gap-4 text-secondary">
                                <span>
                                    <i className="bi bi-person-walking me-2" />
                                    17 km
                                </span>

                                <span>
                                    <i className="bi bi-clock me-2" />
                                    6–8 hours
                                </span>

                                <span className="badge bg-danger-subtle text-danger px-3 py-2">
                                    Hard
                                </span>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Second trail */}
                <div className="col-md-6 col-xl-4">
                    <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="position-relative ratio ratio-16x9">
                            <img
                                src="/images/vitosha-golden-bridges.jpg"
                                className="card-img-top object-fit-cover"
                                alt="Vitosha Golden Bridges"
                            />

                            <span className="position-absolute top-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center m-3 shadow-sm">
                                <i className="bi bi-heart fs-5" />
                            </span>
                        </div>

                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">
                                Vitosha Golden Bridges
                            </h3>

                            <p className="text-secondary mb-3">
                                <i className="bi bi-geo-alt-fill me-2" />
                                Vitosha Mountain, Bulgaria
                            </p>

                            <div className="d-flex flex-wrap align-items-center gap-4 text-secondary">
                                <span>
                                    <i className="bi bi-person-walking me-2" />
                                    8 km
                                </span>

                                <span>
                                    <i className="bi bi-clock me-2" />
                                    3–4 hours
                                </span>

                                <span className="badge bg-success-subtle text-success px-3 py-2">
                                    Easy
                                </span>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Third trail */}
                <div className="col-md-6 col-xl-4">
                    <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="position-relative ratio ratio-16x9">
                            <img
                                src="/images/musala-peak.jpg"
                                className="card-img-top object-fit-cover"
                                alt="Musala Peak"
                            />

                            <span className="position-absolute top-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center m-3 shadow-sm">
                                <i className="bi bi-heart fs-5" />
                            </span>
                        </div>

                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">
                                Musala Peak
                            </h3>

                            <p className="text-secondary mb-3">
                                <i className="bi bi-geo-alt-fill me-2" />
                                Rila Mountain, Bulgaria
                            </p>

                            <div className="d-flex flex-wrap align-items-center gap-4 text-secondary">
                                <span>
                                    <i className="bi bi-person-walking me-2" />
                                    14 km
                                </span>

                                <span>
                                    <i className="bi bi-clock me-2" />
                                    6–9 hours
                                </span>

                                <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2">
                                    Moderate
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}