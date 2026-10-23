import './About.css'

const features = [
    {
        icon: "bi bi-compass",
        title: "Discover a trail",
        description: "Explore routes across Bulgaria and compare their distance, duration, and difficulty before choosing your next hike.",
    },
    {
        icon: "bi bi-signpost-split",
        title: "Share your route",
        description: "Help other hikers discover places you love by sharing a trail, a photo, and useful details about the journey.",
    },
    {
        icon: "bi bi-heart",
        title: "Save a favourite",
        description: "Keep the trails that catch your eye saved to your account, ready for your next day outdoors.",
    }
];

export default function About() {
    return (
        <section className="about-page" aria-labelledby="about-title">
            <div className="container">
                <div className="about-content">
                    <header className="about-hero">
                        <span className="about-label">
                            <i className="bi bi-tree" aria-hidden="true" />
                            Made for the outdoors
                        </span>

                        <h1 id="about-title">
                            About <span>TrailQuest</span>
                        </h1>

                        <p className="about-intro">
                            A place to discover hiking trails across Bulgaria,
                            share the routes you love, and find inspiration for
                            your next adventure.
                        </p>

                        <p className="about-story">
                            From a quiet forest walk to a challenging mountain hike,
                            TrailQuest helps you find a route at your own pace.
                        </p>
                    </header>

                    <div className="about-features">
                        {features.map(feature => (
                            <article className="about-feature" key={feature.title}>
                                <span className="about-feature-icon" aria-hidden="true">
                                    <i className={feature.icon} />
                                </span>
                                <h2>{feature.title}</h2>
                                <p>{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}