import './Loader.css'

export default function Loader({
    text
}) {
    return (
        <div
            className="loader-container"
            role="status"
            aria-live="polite"
        >
            <div className="loader-animation" aria-hidden="true">
                <span className="loader-ring" />

                <span className="loader-mountain">
                    ▲▲
                </span>
            </div>

            <p className="loader-text">{text}</p>
        </div>
    );
}