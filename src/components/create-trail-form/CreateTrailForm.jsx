import { Link } from "react-router";

import './CreateTrailForm.css'

export default function CreateTrailForm() {
    return (
        <form className="create-trail-form">
            {/* Basic information */}
            <section className="create-form-section">
                <div className="create-section-heading">
                    <div
                        className="create-section-icon"
                        aria-hidden="true"
                    >
                        <i className="bi bi-info-circle" />
                    </div>

                    <div>
                        <h2>Basic information</h2>
                        <p>Start with the name and location of the trail.</p>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-12">
                        <label htmlFor="trail-title" className="form-label">
                            Trail name
                            <span aria-hidden="true">*</span>
                        </label>

                        <input
                            type="text"
                            id="trail-title"
                            name="title"
                            className="form-control"
                            placeholder="For example: Seven Rila Lakes"
                        />
                    </div>

                    <div className="col-md-7">
                        <label htmlFor="trail-location" className="form-label">
                            Location
                            <span aria-hidden="true">*</span>
                        </label>

                        <div className="create-input-wrapper">
                            <i className="bi bi-geo-alt" aria-hidden="true" />

                            <input
                                type="text"
                                id="trail-location"
                                name="location"
                                className="form-control"
                                placeholder="Rila Mountain, Bulgaria"
                            />
                        </div>
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="trail-region" className="form-label">
                            Mountain or region
                        </label>

                        <select
                            id="trail-region"
                            name="region"
                            className="form-select"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select region
                            </option>

                            <option value="Rila">
                                Rila Mountain
                            </option>

                            <option value="Pirin">
                                Pirin Mountain
                            </option>

                            <option value="Vitosha">
                                Vitosha Mountain
                            </option>

                            <option value="Rhodope">
                                Rhodope Mountains
                            </option>

                            <option value="Balkan">
                                Balkan Mountains
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Trail details */}
            <section className="create-form-section">
                <div className="create-section-heading">
                    <div className="create-section-icon" aria-hidden="true">
                        <i className="bi bi-signpost-split" />
                    </div>

                    <div>
                        <h2>Trail details</h2>
                        <p>Give hikers an idea of what to expect from the route.</p>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-6">
                        <label htmlFor="trail-difficulty" className="form-label">
                            Difficulty
                            <span aria-hidden="true">*</span>
                        </label>

                        <select
                            id="trail-difficulty"
                            name="difficulty"
                            className="form-select"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select difficulty
                            </option>

                            <option value="Easy">
                                Easy
                            </option>

                            <option value="Moderate">
                                Moderate
                            </option>

                            <option value="Hard">
                                Hard
                            </option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="trail-distance" className="form-label">
                            Distance
                            <span aria-hidden="true">*</span>
                        </label>

                        <div className="create-input-unit">
                            <input
                                type="number"
                                id="trail-distance"
                                name="distance"
                                className="form-control"
                                placeholder="17"
                                min="0"
                                step="0.1"
                            />

                            <span>km</span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="trail-duration" className="form-label">
                            Estimated duration
                            <span aria-hidden="true">*</span>
                        </label>

                        <div className="create-input-unit">
                            <input
                                type="number"
                                id="trail-duration"
                                name="duration"
                                className="form-control"
                                placeholder="6"
                                min="0"
                                step="0.5"
                            />

                            <span>hours</span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="trail-elevation" className="form-label">
                            Elevation gain
                        </label>

                        <div className="create-input-unit">
                            <input
                                type="number"
                                id="trail-elevation"
                                name="elevation"
                                className="form-control"
                                placeholder="550"
                                min="0"
                            />

                            <span>metres</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Images and map */}
            <section className="create-form-section">
                <div className="create-section-heading">
                    <div className="create-section-icon" aria-hidden="true">
                        <i className="bi bi-image" />
                    </div>

                    <div>
                        <h2>Image and route</h2>
                        <p>Add an image {/* and an optional map link */} for the route.</p>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-12">
                        <label htmlFor="trail-image" className="form-label">
                            Image URL
                            <span aria-hidden="true">*</span>
                        </label>

                        <div className="create-input-wrapper">
                            <i className="bi bi-link-45deg" aria-hidden="true" />

                            <input
                                type="url"
                                id="trail-image"
                                name="imageUrl"
                                className="form-control"
                                placeholder="https://example.com/trail-image.jpg"
                            />
                        </div>

                        <p className="create-field-hint">Use a direct link to a landscape image of the trail.</p>
                    </div>

                    {/* <div className="col-12">
                        <label htmlFor="trail-map" className="form-label">
                            Map or route URL
                            <span className="create-optional">Optional</span>
                        </label>

                        <div className="create-input-wrapper">
                            <i className="bi bi-map" aria-hidden="true" />

                            <input
                                type="url"
                                id="trail-map"
                                name="mapUrl"
                                className="form-control"
                                placeholder="Google Maps, Garmin or another route link"
                            />
                        </div>
                    </div> */}
                </div>
            </section>

            {/* Description */}
            <section className="create-form-section">
                <div className="create-section-heading">
                    <div className="create-section-icon" aria-hidden="true">
                        <i className="bi bi-card-text" />
                    </div>

                    <div>
                        <h2>Trail description</h2>
                        <p>Describe the route, terrain and important things hikers should know.</p>
                    </div>
                </div>

                <label htmlFor="trail-description" className="form-label">
                    Description
                    <span aria-hidden="true">*</span>
                </label>

                <textarea
                    id="trail-description"
                    name="description"
                    className="form-control create-description"
                    placeholder="Describe the starting point, route conditions, landmarks and anything hikers should prepare for..."
                    rows="7"
                />

                <p className="create-field-hint">A useful description should include the terrain, trail markings and any difficult sections.
                </p>
            </section>

            {/* Buttons */}
            <div className="create-form-actions">
                <Link to="/trails" className="create-cancel-button btn">
                    Cancel
                </Link>

                <button type="button" className="create-submit-button btn">
                    <i className="bi bi-send me-2" aria-hidden="true" />
                    Publish trail
                </button>
            </div>
        </form>
    );
}