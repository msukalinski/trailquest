import './TrailsCatalogFilters.css'

export default function TrailsCatalogFilters() {
    return (
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
    );
}