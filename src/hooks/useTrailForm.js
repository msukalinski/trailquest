import { useState } from "react";

import useForm from "./useForm";
import { validateTrail } from "../validation/validateTrail";

export default function useTrailForm(callback, initialTrail = {}) {
    const [touched, setTouched] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const submitHandler = async (formValues) => {
        setError('');
        setSubmitted(true);

        if (Object.keys(validateTrail(formValues)).length > 0) {
            return;
        }

        const trailData = {
            title: formValues.title.trim(),
            location: formValues.location.trim(),
            region: formValues.region.trim(),
            difficulty: formValues.difficulty,
            distance: Number(formValues.distance),
            duration: Number(formValues.duration),
            elevation: formValues.elevation.trim() === ''
                ? null
                : Number(formValues.elevation),
            imageUrl: formValues.imageUrl.trim(),
            description: formValues.description.trim(),
        };

        try {
            await callback(trailData);
        } catch (err) {
            setError(typeof err?.message === 'string' && err.message
                ? err.message
                : 'Could not save this trail. Please try again.');
        }
    };

    const { values, register, formAction } = useForm(submitHandler, {
        title: initialTrail.title ?? '',
        location: initialTrail.location ?? '',
        region: initialTrail.region ?? '',
        difficulty: initialTrail.difficulty ?? '',
        distance: String(initialTrail.distance ?? ''),
        duration: String(initialTrail.duration ?? ''),
        elevation: String(initialTrail.elevation ?? ''),
        imageUrl: initialTrail.imageUrl ?? '',
        description: initialTrail.description ?? '',
    });

    const onFieldBlur = (e) => {
        const name = e.target.name;

        if (name && Object.hasOwn(values, name)) {
            setTouched(current => ({...current, [name]: true}));
        }
    };

    return {
        register,
        formAction,
        errors: validateTrail(values),
        touched,
        submitted,
        onFieldBlur,
        error
    }
}