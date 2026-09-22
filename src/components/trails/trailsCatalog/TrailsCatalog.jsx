import "./TrailsCatalog.css";

import TrailsCatalogCard from "./TrailsCatalogCard";
import TrailsCatalogFilters from "./TrailsCatalogFilters";

export default function TrailsCatalog() {
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
                        <TrailsCatalogCard
                            image="https://media.timeout.com/images/106041640/750/562/image.jpg"
                            title="Seven Rila Lakes"
                            location="Rila Mountain, Bulgaria"
                            description="A beautiful circular route passing through the famous glacial lakes of Rila."
                            distance="17 km"
                            duration="6–8 h"
                            elevation="550 m"
                            difficulty="Hard"
                            difficultyClass="hard"
                            detailsPath="/trails/1"
                        />

                        <TrailsCatalogCard
                            image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022.jpg"
                            title="Vitosha Golden Bridges"
                            location="Vitosha Mountain, Bulgaria"
                            description="A peaceful forest trail leading to one of Vitosha's most recognisable natural landmarks."
                            distance="8 km"
                            duration="3–4 h"
                            elevation="240 m"
                            difficulty="Easy"
                            difficultyClass="easy"
                            detailsPath="/trails/2"
                        />

                        <TrailsCatalogCard
                            image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022"
                            title="Musala Peak"
                            location="Rila Mountain, Bulgaria"
                            description="Climb to the highest summit in Bulgaria and enjoy breathtaking mountain views."
                            distance="14 km"
                            duration="6–9 h"
                            elevation="1,250 m"
                            difficulty="Moderate"
                            difficultyClass="moderate"
                            detailsPath="/trails/3"
                        />

                        <TrailsCatalogCard
                            image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022"
                            title="Koncheto Ridge"
                            location="Pirin Mountain, Bulgaria"
                            description="A challenging high-mountain route across one of Bulgaria's most dramatic ridges."
                            distance="18 km"
                            duration="8–10 h"
                            elevation="1,400 m"
                            difficulty="Hard"
                            difficultyClass="hard"
                            detailsPath="/trails/4"
                        />

                        <TrailsCatalogCard
                            image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022"
                            title="Botev Peak"
                            location="Balkan Mountains, Bulgaria"
                            description="A demanding route to the highest peak in the Balkan Mountains."
                            distance="21 km"
                            duration="8–10 h"
                            elevation="1,300 m"
                            difficulty="Hard"
                            difficultyClass="hard"
                            detailsPath="/trails/5"
                        />

                        <TrailsCatalogCard
                            image="https://www.mountain-forecast.com/system/images/25101/large/Vihren.jpg?1544231022"
                            title="Smolyan Lakes"
                            location="Rhodope Mountains, Bulgaria"
                            description="A relaxing woodland route connecting several peaceful mountain lakes."
                            distance="10 km"
                            duration="4–5 h"
                            elevation="320 m"
                            difficulty="Easy"
                            difficultyClass="easy"
                            detailsPath="/trails/6"
                        />
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