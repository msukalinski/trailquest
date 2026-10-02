import { Link } from "react-router";

export default function EditTrailForm({
    trail,
    onEdit,
    submitting,
}) {


    return (
        <form className="create-trail-form" onSubmit={onEdit}>
            <section className="create-form-section">
                <div className="create-section-heading">
                    <div className="create-section-icon" aria-hidden="true">
                        <i className="bi bi-info-circle" />
                    </div>

                    <div>
                        <h2>Basic information</h2>
                        <p>Update the name and location of your trail.</p>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-12">
                        <label htmlFor="edit-trail-title" className="form-label">
                            Trail name <span aria-hidden="true">*</span>
                        </label>
                        <input
                            id="edit-trail-title"
                            name="title"
                            type="text"
                            className="form-control"
                            defaultValue={trail.title ?? ''}
                            required
                        />
                    </div>

                    <div className="col-md-7">
                        <label htmlFor="edit-trail-location" className="form-label">
                            Location <span aria-hidden="true">*</span>
                        </label>
                        <div className="create-input-wrapper">
                            <i className="bi bi-geo-alt" aria-hidden="true" />
                            <input
                                id="edit-trail-location"
                                name="location"
                                type="text"
                                className="form-control"
                                defaultValue={trail.location ?? ''}
                                required
                            />
                        </div>
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="edit-trail-region" className="form-label">
                            Mountain or region
                        </label>
                        <select
                            id="edit-trail-region"
                            name="region"
                            className="form-select"
                            defaultValue={trail.region ?? ''}
                        >
                            <option value="">Select region</option>
                            <option value="Rila">Rila Mountain</option>
                            <option value="Pirin">Pirin Mountain</option>
                            <option value="Vitosha">Vitosha Mountain</option>
                            <option value="Rhodope">Rhodope Mountains</option>
                            <option value="Balkan">Balkan Mountains</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="create-form-section">
                <div className="create-section-heading">
                    <div className="create-section-icon" aria-hidden="true">
                        <i className="bi bi-signpost-split" />
                    </div>

                    <div>
                        <h2>Trail details</h2>
                        <p>Check the route measurements and difficulty.</p>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-6">
                        <label htmlFor="edit-trail-difficulty" className="form-label">
                            Difficulty <span aria-hidden="true">*</span>
                        </label>
                        <select
                            id="edit-trail-difficulty"
                            name="difficulty"
                            className="form-select"
                            defaultValue={trail.difficulty ?? ''}
                            required
                        >
                            <option value="" disabled>Select difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="edit-trail-distance" className="form-label">
                            Distance <span aria-hidden="true">*</span>
                        </label>
                        <div className="create-input-unit">
                            <input
                                id="edit-trail-distance"
                                name="distance"
                                type="number"
                                min="0"
                                step="0.1"
                                className="form-control"
                                defaultValue={trail.distance ?? ''}
                                required
                            />
                            <span>km</span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="edit-trail-duration" className="form-label">
                            Estimated duration <span aria-hidden="true">*</span>
                        </label>
                        <div className="create-input-unit">
                            <input
                                id="edit-trail-duration"
                                name="duration"
                                type="number"
                                min="0"
                                step="0.5"
                                className="form-control"
                                defaultValue={trail.duration ?? ''}
                                required
                            />
                            <span>hours</span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="edit-trail-elevation" className="form-label">
                            Elevation gain
                        </label>
                        <div className="create-input-unit">
                            <input
                                id="edit-trail-elevation"
                                name="elevation"
                                type="number"
                                min="0"
                                className="form-control"
                                defaultValue={trail.elevation ?? ''}
                            />
                            <span>metres</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="create-form-section">
                <div className="create-section-heading">
                    <div className="create-section-icon" aria-hidden="true">
                        <i className="bi bi-image" />
                    </div>

                    <div>
                        <h2>Image and route</h2>
                        <p>Update the trail image if needed.</p>
                    </div>
                </div>

                <label htmlFor="edit-trail-image" className="form-label">
                    Image URL <span aria-hidden="true">*</span>
                </label>
                <div className="create-input-wrapper">
                    <i className="bi bi-link-45deg" aria-hidden="true" />
                    <input
                        id="edit-trail-image"
                        name="imageUrl"
                        type="url"
                        className="form-control"
                        defaultValue={trail.imageUrl ?? ''}
                        required
                    />
                </div>
            </section>

            <section className="create-form-section">
                <div className="create-section-heading">
                    <div className="create-section-icon" aria-hidden="true">
                        <i className="bi bi-card-text" />
                    </div>

                    <div>
                        <h2>Trail description</h2>
                        <p>Update anything hikers should know about the route.</p>
                    </div>
                </div>

                <label htmlFor="edit-trail-description" className="form-label">
                    Description <span aria-hidden="true">*</span>
                </label>
                <textarea
                    id="edit-trail-description"
                    name="description"
                    className="form-control create-description"
                    rows="7"
                    defaultValue={trail.description ?? ''}
                    required
                />
            </section>

            <div className="create-form-actions">
                <Link
                    to={`/trails/${trail.id}/details`}
                    className="create-cancel-button btn"
                >
                    Cancel
                </Link>

                <button
                    type="submit"
                    className="create-submit-button btn"
                    disabled={submitting}
                >
                    <i className="bi bi-check-lg me-2" aria-hidden="true" />
                    {submitting ? 'Saving...' : 'Save changes'}
                </button>
            </div>
        </form>
    );
}