import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="border-top bg-white py-4 mt-auto">
            <div className="container">
                <div className="row align-items-center gy-4">
                    <div className="col-lg-5">
                        <div className="d-flex flex-wrap align-items-center gap-3">
                            <Link
                                to="/"
                                className="text-decoration-none fw-bold fs-4"
                                style={{
                                    color: "#163b2d",
                                    fontFamily: "Georgia, serif",
                                }}
                            >
                                <span
                                    className="me-2"
                                    aria-hidden="true"
                                    style={{
                                        color: "#245b46",
                                        letterSpacing: "-7px",
                                        paddingRight: "7px",
                                    }}
                                >
                                    ▲▲
                                </span>
                                TrailQuest
                            </Link>

                            <span className="vr d-none d-sm-block" />

                            <span className="text-secondary">
                                Hiking together for a brighter tomorrow.
                            </span>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <nav className="d-flex flex-wrap justify-content-lg-center gap-3 gap-xl-4">
                            <Link
                                to="/about"
                                className="text-decoration-none text-secondary"
                            >
                                About
                            </Link>

                            <Link
                                to="/community"
                                className="text-decoration-none text-secondary"
                            >
                                Community
                            </Link>

                            <Link
                                to="/help"
                                className="text-decoration-none text-secondary"
                            >
                                Help
                            </Link>

                            <Link
                                to="/terms"
                                className="text-decoration-none text-secondary"
                            >
                                Terms
                            </Link>

                            <Link
                                to="/privacy"
                                className="text-decoration-none text-secondary"
                            >
                                Privacy
                            </Link>
                        </nav>
                    </div>

                    <div className="col-lg-2">
                        <div className="d-flex justify-content-lg-end gap-3">
                            <a
                                href="https://www.instagram.com"
                                className="text-dark fs-5"
                                aria-label="Instagram"
                            >
                                <i className="bi bi-instagram" />
                            </a>

                            <a
                                href="https://www.facebook.com"
                                className="text-dark fs-5"
                                aria-label="Facebook"
                            >
                                <i className="bi bi-facebook" />
                            </a>

                            <a
                                href="https://www.youtube.com"
                                className="text-dark fs-5"
                                aria-label="YouTube"
                            >
                                <i className="bi bi-youtube" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}