import { Link } from "react-router";
import { useEffect, useState } from "react";

import { getMyTrails } from "../../services/trailService";
import MyTrailsCard from "../my-trails-card/MyTrailsCard";
import useUser from "../../hooks/useUser";

import Loader from "../loader/Loader";
import ErrorMessage from "../error-message/ErrorMessage";

import './MyTrails.css'

export default function MyTrails() {
    const [loadResult, setLoadResult] = useState(null);
    const { user, initializing } = useUser();
    const userId = user?.id;
    const currentResult = loadResult?.userId === userId ? loadResult : null;
    const trails = currentResult?.trails ?? [];
    const error = currentResult?.error;
    const loading = !currentResult;

    useEffect(() => {
        if (initializing || !userId) {
            return;
        }

        const controller = new AbortController();

        const loadUserTrails = async () => {
            try {
                const data = await getMyTrails(userId, controller.signal);

                if (!controller.signal.aborted) {
                    setLoadResult({ userId, trails: data });
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setLoadResult({
                        userId,
                        error: err?.message || 'Could not load your trails.'
                    });
                }
            }
        };

        loadUserTrails();

        return () => controller.abort();
    }, [initializing, userId]);

    if (initializing) {
        return (
            <Loader />
        )
    }

    if (!user) {
        return (
            <div className="container py-5">
                <p role="status">Sign in to view your trails.</p>
                <Link to="/login" className="btn btn-outline-success">Sign in</Link>
            </div>
        )
    }

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
                                <strong>{trails.length}</strong>
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
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <ErrorMessage message={error} />
                        ) : trails.length === 0 ? (
                            <strong>You haven't created any trails yet.</strong>
                        ) : (
                            trails.map(trail => <MyTrailsCard key={trail.id} {...trail} />)
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
}