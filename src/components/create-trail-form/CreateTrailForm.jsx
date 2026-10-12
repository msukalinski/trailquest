import { Link } from "react-router";

import './CreateTrailForm.css'
import useTrailForm from "../../hooks/useTrailForm";
import TrailForm from "../trail-form/TrailForm";

export default function CreateTrailForm({ onCreate }) {
    const form = useTrailForm(onCreate);

    return (
        <TrailForm
            {...form}
            cancelTo="/trails"
            submitLabel="Publish trail"
            pendingLabel="Publishing trail..."
            submitIcon="bi bi send"
        />
    );
}