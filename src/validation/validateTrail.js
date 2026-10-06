const clean = (value) => String(value ?? '').trim();

export function validateTrail(values) {
    const errors = {};

    const title = clean(values.title);
    if (!title) {
        errors.title = 'Trail name is required.';
    } else if (title.length < 3) {
        errors.title = 'Trail name must be at least 3 characters long.';
    }

    const location = clean(values.location);

    if (!location) {
        errors.location = 'Location is required.';
    }else if (location.length < 3) {
        errors.location = 'Location must be at least 3 characters long.';
    }

    const allowedDifficulties = ['Easy', 'Moderate', 'Hard'];
    if (!allowedDifficulties.includes(values.difficulty)) {
        errors.difficulty = 'Select a difficulty';
    }

    const distanceText = clean(values.distance);
    const distance = Number(distanceText);
    if (!distanceText || !Number.isFinite(distance) || distance <= 0) {
        errors.distance = 'Distance must be greater than zero.';
    }

    const durationText = clean(values.duration);
    const duration = Number(durationText);
    if (!durationText || !Number.isFinite(duration) || duration <= 0) {
        errors.duration = 'Duration must be greater than zero.';
    }

    const elevationText = clean(values.elevation);
    if (elevationText) {
        const elevation = Number(elevationText);

        if (!Number.isFinite(elevation) || elevation < 0) {
            errors.elevation = 'Elevation must be zero or greater.';
        }
    }

    const imageUrl = clean(values.imageUrl);
    try {
        const url = new URL(imageUrl);

        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            errors.imageUrl = 'Enter an HTTP or HTTPS image URL.';
        }
    } catch {
        errors.imageUrl = 'Enter a valid image URL.';
    }

    const description = clean(values.description);
    if (description.length < 5) {
        errors.description = 'Description must be at least 5 characters long.';
    }

    return errors;
}