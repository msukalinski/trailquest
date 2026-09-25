import './TrailSearch.css'

export default function TrailSearch() {
    return (
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
    );
}