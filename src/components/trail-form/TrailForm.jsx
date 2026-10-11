import { Link } from "react-router";
import { useFormStatus } from "react-dom";
import ErrorMessage from "../error-message/ErrorMessage";

function TrailFormContent({
    register,
    errors,
    touched,
    submitted,
    error,
    cancelTo,
    submitLabel,
    pendingLabel,
    submitIcon,
}) {
    const { pending } = useFormStatus();

    const isInvalid = (name) => Boolean((touched[name] || submitted) && errors[name]);

    const fieldProps = (name, baseClass = 'form-control') => ({
        ...register(name),
        id: `trail-${name}`,
        className: `${baseClass}${isInvalid(name) ? ' is-invalid' : ''}`,
        'aria-invalid': isInvalid(name),
        'aria-describedby': isInvalid(name) ? `trail-${name}-error` : undefined,
    });

    const showFieldError = (name) => isInvalid(name) ? (
        <div id={`trail-${name}-error`} className="invalid-feedback d-block" role="alert">
            {errors[name]}
        </div>
    ) : null;

    return (
        <>
            {!pending && error && (
                <div className="trail-form-error">
                    <ErrorMessage message={error} />
                </div>
            )}

            <fieldset className="border-0 p-0 m-0" disabled={pending} aria-busy={pending}>
                <section className="create-form-section">
                    <div className="create-section-heading">
                        <div className="create-section-icon" aria-hidden="true">
                            <i className="bi bi-info-circle" />
                        </div>

                        <div>
                            <h2>Basic information</h2>
                            <p>Give hikers the name and location of the trail.</p>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-12">
                            <label htmlFor="trail-title" className="form-label">
                                Trail name <span aria-hidden="true">*</span>
                            </label>

                            <input
                                {...fieldProps('title')}
                                type="text"
                                placeholder="For example: Seven Rila Lakes"
                                required
                            />
                            {showFieldError('title')}
                        </div>

                        <div className="col-md-7">
                            <label htmlFor="trail-location" className="form-label">
                                Location <span aria-hidden="true">*</span>
                            </label>

                            <div className="create-input-wrapper">
                                <i className="bi bi-geo-alt" aria-hidden="true" />
                                <input
                                    {...fieldProps('location')}
                                    type="text"
                                    placeholder="Rila Mountain, Bulgaria"
                                    required
                                />
                            </div>
                            {showFieldError('location')}
                        </div>

                        <div className="col-md-5">
                            <label htmlFor="trail-region" className="form-label">
                                Mountain or region
                            </label>

                            <select {...fieldProps('region', 'form-select')}>
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
                            <p>Give hikers an idea of what to expect from the route.</p>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <label htmlFor="trail-difficulty" className="form-label">
                                Difficulty <span aria-hidden="true">*</span>
                            </label>

                            <select {...fieldProps('difficulty', 'form-select')} required>
                                <option value="" disabled>Select difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Hard">Hard</option>
                            </select>
                            {showFieldError('difficulty')}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="trail-distance" className="form-label">
                                Distance <span aria-hidden="true">*</span>
                            </label>

                            <div className="create-input-unit">
                                <input
                                    {...fieldProps('distance')}
                                    type="number"
                                    placeholder="17"
                                    min="0"
                                    step="0.1"
                                    required
                                />
                                <span>km</span>
                            </div>
                            {showFieldError('distance')}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="trail-duration" className="form-label">
                                Estimated duration <span aria-hidden="true">*</span>
                            </label>

                            <div className="create-input-unit">
                                <input
                                    {...fieldProps('duration')}
                                    type="number"
                                    placeholder="6"
                                    min="0"
                                    step="0.5"
                                    required
                                />
                                <span>hours</span>
                            </div>
                            {showFieldError('duration')}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="trail-elevation" className="form-label">
                                Elevation gain
                            </label>

                            <div className="create-input-unit">
                                <input
                                    {...fieldProps('elevation')}
                                    type="number"
                                    placeholder="550"
                                    min="0"
                                />
                                <span>metres</span>
                            </div>
                            {showFieldError('elevation')}
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
                            <p>Use an image that shows the route.</p>
                        </div>
                    </div>

                    <label htmlFor="trail-imageUrl" className="form-label">
                        Image URL <span aria-hidden="true">*</span>
                    </label>

                    <div className="create-input-wrapper">
                        <i className="bi bi-link-45deg" aria-hidden="true" />
                        <input
                            {...fieldProps('imageUrl')}
                            type="url"
                            placeholder="https://example.com/trail-image.jpg"
                            required
                        />
                    </div>
                    {showFieldError('imageUrl')}
                    <p className="create-field-hint">Use a direct link to a landscape image of the trail.</p>
                </section>

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
                        Description <span aria-hidden="true">*</span>
                    </label>

                    <textarea
                        {...fieldProps('description', 'form-control create-description')}
                        placeholder="Describe the starting point, route conditions, landmarks and anything hikers should prepare for..."
                        rows="7"
                        required
                    />
                    {showFieldError('description')}
                    <p className="create-field-hint">
                        Include the terrain, trail markings and any difficult sections.
                    </p>
                </section>

                <div className="create-form-actions">
                    <Link
                        to={cancelTo}
                        className="create-cancel-button btn"
                        aria-disabled={pending}
                        tabIndex={pending ? -1 : undefined}
                        onClick={(event) => {
                            if (pending) event.preventDefault();
                        }}
                    >
                        Cancel
                    </Link>

                    <button type="submit" className="create-submit-button btn" disabled={pending}>
                        <i className={`${submitIcon} me-2`} aria-hidden="true" />
                        {pending ? pendingLabel : submitLabel}
                    </button>
                </div>
            </fieldset>
        </>
    )
}

export default function TrailForm({
    formAction,
    onFieldBlur,
    ...contentProps
}) {
    return (
        <form className="create-trail-form"
            action={formAction}
            onBlur={onFieldBlur}
            noValidate>
            <TrailFormContent {...contentProps} />
        </form>

    );
}