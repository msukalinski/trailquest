import { Link } from "react-router";
import { useEffect, useState } from "react";

import { deleteTrail, getMyTrails } from "../../services/trailService";
import MyTrailsCard from "../my-trails-card/MyTrailsCard";
import useUser from "../../hooks/useUser";

import Loader from "../loader/Loader";
import ErrorMessage from "../error-message/ErrorMessage";

import './MyTrails.css'
import { getTotalFavouritesReceived } from "../../services/favouriteService";

export default function MyTrails() {
    const [loadResult, setLoadResult] = useState(null);
    const [sort, setSort] = useState('newest');

    const { user, initializing } = useUser();
    const userId = user?.id;

    const currentResult = loadResult?.userId === userId &&
        loadResult?.sort === sort
        ? loadResult
        : null;

    const trails = currentResult?.trails ?? [];
    const error = currentResult?.error;
    const loading = !currentResult;
    const [deletingId, setDeletingId] = useState(null);
    const [deleteError, setDeleteError] = useState('');
    const [favouriteCountError, setFavouriteCountError] = useState('');

    useEffect(() => {
        if (initializing || !userId) {
            return;
        }

        const controller = new AbortController();

        const loadUserTrails = async () => {
            try {
                const [data, totalFavourites] = await Promise.all([
                    getMyTrails(userId, controller.signal, { sort }),
                    getTotalFavouritesReceived(userId, controller.signal)
                ]);

                if (!controller.signal.aborted) {
                    setLoadResult({
                        userId,
                        sort,
                        trails: data,
                        totalFavourites
                    });
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setLoadResult({
                        userId,
                        sort,
                        error: err?.message || 'Could not load your trails.'
                    });
                }
            }
        };

        loadUserTrails();

        return () => controller.abort();
    }, [initializing, userId, sort]);

    const deleteTrailHandler = async (id, title) => {
        if (!userId || deletingId) {
            return;
        }

        const confirmed = window.confirm(`Are you sure you want to delete the following trail ${title}? This cannot be undone.`);

        if (!confirmed) {
            return;
        }

        setDeleteError('');
        setDeletingId(id);

        try {
            await deleteTrail(id);

            setLoadResult(current => {
                if (current?.userId !== userId || !current?.trails) {
                    return current;
                }

                return {
                    ...current,
                    trails: current.trails.filter(trail => trail.id !== id),
                };
            });
        } catch (err) {
            setDeleteError(err?.message || 'Could not delete this trail.');
            return;
        } finally {
            setDeletingId(null);
        }

        setFavouriteCountError('');

        try {
            const totalFavourites = await getTotalFavouritesReceived(userId);

            setLoadResult(current => {
                if (current?.userId !== userId) {
                    return current;
                }

                return {
                    ...current,
                    totalFavourites
                }
            })
        } catch {
            setFavouriteCountError('Trail deleted, but the favourites total count could not be refreshed.');
        }
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
                            <div className="my-trails-statistic-icon red">
                                <i className="bi bi-heart" aria-hidden="true" />
                            </div>

                            <div>
                                <strong>
                                    {loading
                                        ? '...'
                                        : error || favouriteCountError
                                            ? '-'
                                            : currentResult.totalFavourites}
                                </strong>
                                <span>Hikers saved your trails</span>

                                {favouriteCountError && (
                                    <small className="d-block text-danger mt-1" role="alert">
                                        {favouriteCountError}
                                    </small>
                                )}
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


                            <select
                                className="form-select"
                                aria-label="Sort trails"
                                value={sort}
                                onChange={(event) => setSort(event.target.value)}
                                disabled={loading || Boolean(deletingId)}
                            >
                                <option value="newest">Newest first</option>
                                <option value="oldest">Oldest first</option>
                            </select>
                        </div>
                    </div>

                    {deleteError && <ErrorMessage message={deleteError} />}

                    <div className="my-trails-grid">
                        {loading ? (
                            <Loader text='Loading trails...' />
                        ) : error ? (
                            <ErrorMessage message={error} />
                        ) : trails.length === 0 ? (
                            <strong>You haven't created any trails yet.</strong>
                        ) : (
                            trails.map(trail => (
                                <MyTrailsCard
                                    key={trail.id}
                                    {...trail}
                                    onDelete={deleteTrailHandler}
                                    deletingId={deletingId}
                                />)
                            )
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
}