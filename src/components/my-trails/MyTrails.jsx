import { Link } from "react-router";

import './MyTrails.css'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getMyTrails } from "../../services/trailService";
import MyTrailsCard from "../my-trails-card/MyTrailsCard";

export default function MyTrails() {
    const [trails, setTrails] = useState([]);
    const { user, initializing } = useContext(UserContext);
    const userId = user?.id;

    useEffect(() => {
        const loadUserTrails = async () => {
            try {
                const data = await getMyTrails(userId);
                console.log(data);
                setTrails(data);
            } catch (err) {
                console.error('Error fetching trails', err.message);
            }
        }

        if (initializing || !userId) return;

        loadUserTrails();
    }, [initializing, userId]);

    return (
        <div className="my-trails-page">

            {/* Hero */}
            <section className="my-trails-hero">
                <div className="container">
                    <div className="my-trails-hero-layout">
                        <div className="my-trails-hero-content">
                            <p className="my-trails-label">
                                Your hiking collection
                            </p>

                            <h1>My Trails</h1>

                            <p>
                                Manage the routes you have shared with the
                                TrailQuest community.
                            </p>
                        </div>

                        <Link
                            to="/trails/create"
                            className="my-trails-create-button btn"
                        >
                            <i className="bi bi-plus-lg me-2" aria-hidden="true" />
                            Create new trail
                        </Link>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="my-trails-statistics-section">
                <div className="container">
                    <div className="my-trails-statistics">
                        <div className="my-trails-statistic">
                            <div className="my-trails-statistic-icon green">
                                <i className="bi bi-signpost-split" aria-hidden="true" />
                            </div>

                            <div>
                                <strong>3</strong>
                                <span>Total trails</span>
                            </div>
                        </div>

                        <div className="my-trails-statistic">
                            <div className="my-trails-statistic-icon orange">
                                <i className="bi bi-cloud-check" aria-hidden="true" />
                            </div>

                            <div>
                                <strong>2</strong>
                                <span>Published</span>
                            </div>
                        </div>

                        <div className="my-trails-statistic">
                            <div className="my-trails-statistic-icon blue">
                                <i className="bi bi-file-earmark-text" aria-hidden="true" />
                            </div>

                            <div>
                                <strong>1</strong>
                                <span>Draft</span>
                            </div>
                        </div>

                        <div className="my-trails-statistic">
                            <div className="my-trails-statistic-icon red">
                                <i className="bi bi-heart" aria-hidden="true" />
                            </div>

                            <div>
                                <strong>284</strong>
                                <span>Total favourites</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trails */}
            <section className="my-trails-content">
                <div className="container">
                    <div className="my-trails-toolbar">
                        <div>
                            <p className="my-trails-toolbar-label">
                                Your routes
                            </p>

                            <h2>Manage trails</h2>
                        </div>

                        <div className="my-trails-toolbar-controls">
                            <div className="my-trails-filter-buttons" aria-label="Filter trails">
                                <button type="button" className="active">
                                    All
                                </button>

                                <button type="button">
                                    Published
                                </button>

                                <button type="button">
                                    Drafts
                                </button>
                            </div>

                            <select className="form-select" aria-label="Sort trails" defaultValue="newest">
                                <option value="newest">
                                    Newest first
                                </option>

                                <option value="oldest">
                                    Oldest first
                                </option>

                                <option value="popular">
                                    Most popular
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="my-trails-grid">
                        <MyTrailsCard
                            id="1"
                            image="/images/seven-rila-lakes.jpg"
                            title="Seven Rila Lakes"
                            location="Rila Mountain, Bulgaria"
                            description="A circular mountain route passing through the famous glacial lakes of Rila."
                            distance="17 km"
                            difficulty="Hard"
                            difficultyClass="hard"
                            status="Published"
                            statusClass="published"
                            views="1,248"
                            favourites="156"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}