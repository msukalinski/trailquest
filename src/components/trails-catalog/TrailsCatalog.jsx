import { useEffect, useState } from "react";

import { getTrails } from "../../services/trailService";

import TrailsCatalogCard from "../trails-catalog-card/TrailsCatalogCard";
import TrailsCatalogSearch from "../trails-catalog-search/TrailsCatalogSearch";
import Loader from "../loader/Loader";
import ErrorMessage from "../error-message/ErrorMessage";

import "./TrailsCatalog.css";

export default function TrailsCatalog() {
    const PAGE_SIZE = 6;

    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [filters, setFilters] = useState({
        search: '',
        region: '',
        difficulty: '',
        sort: 'newest',
    });

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const searchHandler = (values) => {
        setLoading(true);
        setError('');
        setPage(1);

        setFilters({
            ...values,
            search: values.search.trim(),
        });
    }

    const pageChangeHandler = (nextPage) => {
        if (
            loading ||
            nextPage === page ||
            nextPage < 1 ||
            nextPage > totalPages
        ) {
            return;
        }

        setLoading(true);
        setError('');
        setPage(nextPage);
    }

    useEffect(() => {
        const controller = new AbortController();

        const loadTrails = async () => {
            try {
                const result = await getTrails(
                    controller.signal,
                    filters,
                    page,
                    PAGE_SIZE
                );

                if (!controller.signal.aborted) {
                    setTrails(result.trails);
                    setTotalCount(result.totalCount);
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error('Error fetching trails', err.message);

                    setError('Could not load trails. Please try again later.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        loadTrails();

        return () => {
            controller.abort();
        }
    }, [filters, page]);

    return (
        <div className="trails-catalog-page">

            {/* Catalog hero */}
            <section className="catalog-hero">
                <div className="container">
                    <div className="catalog-hero-content">
                        <p className="catalog-hero-label">
                            Discover Bulgaria
                        </p>

                        <h1>Find your perfect trail</h1>

                        <p>
                            Explore hiking routes, mountain peaks and
                            unforgettable places shared by our community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <TrailsCatalogSearch onSearch={searchHandler} />

            {/* Trails */}
            <section className="catalog-results-section">
                <div className="container">
                    <div className="catalog-results-heading">
                        <div>
                            <p className="catalog-results-label">
                                Explore routes
                            </p>

                            <h2>All trails</h2>
                        </div>

                        {!loading && !error && (
                            <p className="catalog-results-count">
                                Showing <strong>{trails.length}</strong> trails
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <Loader text='Loading trails...' />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : trails.length === 0 ? (
                        <h2>No trails found.</h2>
                    ) : (
                        <div className="catalog-grid">
                            {trails.map(trail => (
                                <TrailsCatalogCard key={trail.id} {...trail} />
                            ))}
                        </div>
                    )}

                    {/* Dynamic pagination */}
                    {!error && totalPages > 1 && (
                        <nav
                            className="catalog-pagination"
                            aria-label="Trails pagination"
                        >
                            <button
                                type="button"
                                className="catalog-page-button"
                                aria-label="Previous page"
                                disabled={loading || page === 1}
                                onClick={() => pageChangeHandler(page - 1)}
                            >
                                <i
                                    className="bi bi-chevron-left"
                                    aria-hidden="true"
                                />
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => {
                                const pageNumber = index + 1;

                                return (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        className={`catalog-page-button ${page === pageNumber ? 'active' : ''}`}
                                        aria-current={
                                            page === pageNumber ? 'page' : undefined
                                        }
                                        disabled={loading}
                                        onClick={() => pageChangeHandler(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            })}

                            <button
                                type="button"
                                className="catalog-page-button"
                                aria-label="Next page"
                                disabled={loading || page === totalPages}
                                onClick={() => pageChangeHandler(page + 1)}
                            >

                                <i
                                    className="bi bi-chevron-right"
                                    aria-hidden="true"
                                />
                            </button>
                        </nav>
                    )}
                </div>
            </section>
        </div>
    );
}