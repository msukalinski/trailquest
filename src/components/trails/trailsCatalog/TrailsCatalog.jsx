import { useEffect, useState } from "react";
import "./TrailsCatalog.css";

import TrailsCatalogCard from "./TrailsCatalogCard";
import TrailsCatalogFilters from "./TrailsCatalogFilters";

export default function TrailsCatalog() {
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        fetch(`${supabaseUrl}/rest/v1/trails`, {
            headers: {
                'apikey': supabaseKey
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
                setTrails(data);
            })
            .catch(err => console.log('Error fetching trails', err))
    }, []);

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
            <TrailsCatalogFilters />

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

                        <p className="catalog-results-count">
                            Showing <strong>6</strong> trails
                        </p>
                    </div>

                    <div className="catalog-grid">
                        {trails.map(trail => <TrailsCatalogCard key={trail.id} {...trail} />)}
                    </div>

                    {/* Static pagination */}
                    <nav
                        className="catalog-pagination"
                        aria-label="Trails pagination"
                    >
                        <button
                            type="button"
                            className="catalog-page-button"
                            aria-label="Previous page"
                        >
                            <i
                                className="bi bi-chevron-left"
                                aria-hidden="true"
                            />
                        </button>

                        <button
                            type="button"
                            className="catalog-page-button active"
                        >
                            1
                        </button>

                        <button
                            type="button"
                            className="catalog-page-button"
                        >
                            2
                        </button>

                        <button
                            type="button"
                            className="catalog-page-button"
                        >
                            3
                        </button>

                        <button
                            type="button"
                            className="catalog-page-button"
                            aria-label="Next page"
                        >
                            <i
                                className="bi bi-chevron-right"
                                aria-hidden="true"
                            />
                        </button>
                    </nav>
                </div>
            </section>
        </div>
    );
}