import { useEffect, useState } from "react";
import { Link } from "react-router";

import useUser from "../../hooks/useUser";
import { getFavouriteTrails, unsaveTrail } from "../../services/favouriteService";
import FavouriteTrailCard from "../favourites-trail-card/FavouriteTrailCard";
import Loader from "../loader/Loader";
import ErrorMessage from "../error-message/ErrorMessage";

import "../my-trails/MyTrails.css";
import "./Favourites.css";

export default function Favourites() {
    const [loadResult, setLoadResult] = useState(null);
    const [sort, setSort] = useState('newest');
    const [removingId, setRemovingId] = useState(null);
    const [removeError, setRemoveError] = useState('');

    const { user, initializing } = useUser();
    const userId = user?.id;

    const currentResult = loadResult?.userId === userId &&
        loadResult?.sort === sort
        ? loadResult
        : null;

    const trails = currentResult?.trails ?? [];
    const error = currentResult?.error;
    const loading = !currentResult;

    useEffect(() => {
        if (initializing || !userId) {
            return;
        }

        const controller = new AbortController();

        const loadFavourites = async () => {
            try {
                const data = await getFavouriteTrails(userId, controller.signal, { sort });

                if (!controller.signal.aborted) {
                    setLoadResult({ userId, sort, trails: data });
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setLoadResult({
                        userId,
                        sort,
                        error: err?.message || 'Could not load your saved trails.'
                    });
                }
            }
        };

        loadFavourites();

        return () => controller.abort();
    }, [initializing, userId, sort]);

    const removeFavouriteHandler = async (trailId) => {
        if (initializing || !userId || removingId !== null) {
            return;
        }

        setRemoveError('');
        setRemovingId(trailId);

        try {
            await unsaveTrail(trailId, userId);

            setLoadResult(current => {
                if (current?.userId !== userId || !current.trails) {
                    return current;
                }

                return {
                    ...current,
                    trails: current.trails.filter(trail => trail.id !== trailId)
                };
            });
        } catch (err) {
            setRemoveError(err?.message || 'Could not remove this saved trail.');
        } finally {
            setRemovingId(null);
        }
    };

    if (initializing) {
        return <Loader text="Loading your session..." />;
    }

    if (!userId) {
        return null;
    }

    return (
        <div className="my-trails-page favourites-page">
            <section className="my-trails-hero" aria-labelledby="favourites-title">
                <div className="container">
                    <div className="my-trails-hero-layout">
                        <div className="my-trails-hero-content">
                            <p className="my-trails-label">Your next adventure</p>
                            <h1 id="favourites-title">Saved trails</h1>
                            <p>
                                The routes you want to come back to, all in one place.
                                Find your next hike or make room for a new favourite.
                            </p>
                        </div>

                        <Link to="/trails" className="my-trails-create-button btn">
                            <i className="bi bi-compass me-2" aria-hidden="true" />
                            Explore trails
                        </Link>
                    </div>
                </div>
            </section>

            <section className="my-trails-statistics-section" aria-label="Saved trails total">
                <div className="container">
                    <div className="my-trails-statistics favourites-statistics">
                        <div className="my-trails-statistic">
                            <div className="my-trails-statistic-icon red">
                                <i className="bi bi-heart-fill" aria-hidden="true" />
                            </div>
                            <div aria-live="polite">
                                <strong>
                                    {loading
                                        ? '...'
                                        : error
                                            ? '—'
                                            : trails.length}
                                </strong>
                                <span>
                                    {trails.length === 1
                                        ? 'Trail saved'
                                        : 'Trails saved'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-trails-content" aria-labelledby="favourites-collection-title">
                <div className="container">
                    <div className="my-trails-toolbar">
                        <div>
                            <p className="my-trails-toolbar-label">Your collection</p>
                            <h2 id="favourites-collection-title">Ready when you are</h2>
                        </div>

                        <div className="my-trails-toolbar-controls favourites-sort">
                            <label htmlFor="favourites-sort">Sort by saved date</label>
                            <select
                                id="favourites-sort"
                                className="form-select"
                                value={sort}
                                onChange={(event) => {
                                    setRemoveError('');
                                    setSort(event.target.value);
                                }}
                                disabled={loading || removingId !== null}
                            >
                                <option value="newest">Newest saved</option>
                                <option value="oldest">Oldest saved</option>
                            </select>
                        </div>
                    </div>

                    {removeError && <ErrorMessage message={removeError} />}

                    {loading ? (
                        <Loader text="Loading your saved trails..." />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : trails.length === 0 ? (
                        <div className="favourites-empty">
                            <span className="favourites-empty-icon" aria-hidden="true">
                                <i className="bi bi-heart" />
                            </span>
                            <h3>No saved trails yet</h3>
                            <p>
                                Found a route you like? Open its details and select
                                “Save trail” to keep it here.
                            </p>
                            <Link to="/trails" className="favourites-empty-link">
                                Find a trail
                                <i className="bi bi-arrow-right" aria-hidden="true" />
                            </Link>
                        </div>
                    ) : (
                        <div className="my-trails-grid">
                            {trails.map(trail => (
                                <FavouriteTrailCard
                                    key={trail.id}
                                    {...trail}
                                    onRemove={removeFavouriteHandler}
                                    removingId={removingId}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
