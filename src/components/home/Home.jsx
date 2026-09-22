import { Link } from "react-router";

import './Home.css'

export default function Home() {
    return (
        <div className="min-vh-100 d-flex flex-column bg-white">

            <main className="home-main flex-grow-1">
                {/* Hero */}
                <section className="home-hero position-relative text-white">
                    <div className="container position-relative py-5 d-flex flex-column justify-content-center">
                        <div className="row align-items-center">
                            <div className="col-lg-7">
                                <h1 className="display-2 fw-bold mb-2">
                                    Find your next
                                    <br />
                                    adventure
                                </h1>

                                <p className="fs-4 mb-4"> Discover and share unforgettable hiking trails.</p>

                                <Link
                                    to="/trails"
                                    className="btn btn-lg text-white fw-semibold rounded-pill px-4 py-3"
                                >
                                    Explore trails
                                    <span className="ms-3">→</span>
                                </Link>
                            </div>

                            <div className="col-lg-5 d-none d-lg-flex justify-content-end">
                                <p className="fs-3 text-end lh-sm">
                                    Higher stories
                                    <br />
                                    Brighter days
                                </p>
                            </div>
                        </div>

                        <div className="position-absolute bottom-0 end-0 mb-5 me-4 d-none d-md-flex align-items-center gap-2">
                            <i className="bi bi-geo-alt-fill" />
                            <span>Seven Rila Lakes, Bulgaria</span>
                        </div>
                    </div>
                </section>

                {/* Search section */}
                <section className="home-search container position-relative px-3">
                    <div className="bg-white rounded-4 p-3 p-lg-4">
                        <form className="row g-3 align-items-center">
                            <div className="col-lg-4">
                                <div className="d-flex align-items-center gap-3 pe-lg-4">
                                    <i className="bi bi-geo-alt fs-2 text-dark" />

                                    <div className="flex-grow-1">
                                        <label
                                            htmlFor="trail-location"
                                            className="form-label fw-semibold mb-1"
                                        >
                                            Location
                                        </label>

                                        <select
                                            id="trail-location"
                                            className="form-select border-0 p-0 text-secondary shadow-none"
                                        >
                                            <option>
                                                Where do you want to hike?
                                            </option>
                                            <option>Rila Mountain</option>
                                            <option>Pirin Mountain</option>
                                            <option>Vitosha Mountain</option>
                                            <option>Rhodope Mountains</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-2">
                                <div className="d-flex align-items-center gap-3">
                                    <span aria-hidden="true"> ▲ </span>

                                    <div className="flex-grow-1">
                                        <label
                                            htmlFor="trail-difficulty"
                                            className="form-label fw-semibold mb-1"
                                        >
                                            Difficulty
                                        </label>

                                        <select
                                            id="trail-difficulty"
                                            className="form-select border-0 p-0 text-secondary shadow-none"
                                        >
                                            <option>Any difficulty</option>
                                            <option>Easy</option>
                                            <option>Moderate</option>
                                            <option>Hard</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="d-flex align-items-center gap-3">
                                    <i className="bi bi-bezier2 fs-3 text-dark" />

                                    <div className="flex-grow-1">
                                        <label
                                            htmlFor="trail-distance"
                                            className="form-label fw-semibold mb-1"
                                        >
                                            Distance
                                        </label>

                                        <select
                                            id="trail-distance"
                                            className="form-select border-0 p-0 text-secondary shadow-none"
                                        >
                                            <option>Any distance</option>
                                            <option>Under 5 km</option>
                                            <option>5–10 km</option>
                                            <option>10–20 km</option>
                                            <option>Over 20 km</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <button
                                    type="button"
                                    className="btn w-100 text-white fw-semibold py-3 rounded-3"
                                >
                                    <i className="bi bi-search me-2" />
                                    Search trails
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Popular trails */}
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
            </main>

        </div>
    );
}