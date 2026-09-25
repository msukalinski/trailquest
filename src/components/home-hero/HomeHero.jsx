import { Link } from 'react-router';
import './HomeHero.css'

export default function HomeHero() {
    return (
        <section className="home-hero position-relative text-white">
            <div className="container position-relative py-5 d-flex flex-column justify-content-center">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <h1 className="display-2 fw-bold mb-2">
                            Find your next
                            <br />
                            adventure
                        </h1>

                        <p className="fs-4 mb-4"> Discover and share unforgettable hiking trails.</p>

                        <Link
                            to="/trails"
                            className="btn btn-lg text-white fw-semibold rounded-pill px-4 py-3"
                        >
                            Explore trails
                            <span className="ms-3">→</span>
                        </Link>
                    </div>

                    <div className="col-lg-5 d-none d-lg-flex justify-content-end">
                        <p className="fs-3 text-end lh-sm">
                            Higher stories
                            <br />
                            Brighter days
                        </p>
                    </div>
                </div>

                <div className="position-absolute bottom-0 end-0 mb-5 me-4 d-none d-md-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt-fill" />
                    <span>Seven Rila Lakes, Bulgaria</span>
                </div>
            </div>
        </section>
    );
}