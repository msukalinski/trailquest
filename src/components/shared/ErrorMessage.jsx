import '/ErrorMessage.css'

export default function ErrorMessage({
    title,
    message,
}) {
    return (
        <div
            className="error-message"
            role="alert"
            aria-live="assertive"
        >
            <div className="error-message-icon" aria-hidden="true">
                <i className="bi bi-exclamation-triangle-fill" />
            </div>

            <div className="error-message-content">
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
        </div>
    );
}