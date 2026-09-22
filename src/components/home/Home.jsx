import './Home.css'
import HeroSection from "./heroSection/HeroSection";
import TrailSearch from "./trailSearch/TrailSearch";
import PopularTrails from "./popularTrails/PopularTrails";

export default function Home() {
    return (
        <div className="home-page bg-white">

            {/* Hero */}
            <HeroSection />

            {/* Search section */}
            <TrailSearch />

            {/* Popular trails */}
            <PopularTrails />

        </div>
    );
}