import TrailForm from "../trail-form/TrailForm";
import useTrailForm from "../../hooks/useTrailForm";

export default function EditTrailForm({
    trail,
    onEdit
}) {
    const form = useTrailForm(onEdit, trail);

    return (
        <TrailForm
            {...form}
            cancelTo={`/trails/${trail.id}/details`}
            submitLabel="Save changes"
            pendingLabel="Saving changes…"
            submitIcon="bi bi-check-lg"
        />
    );
}