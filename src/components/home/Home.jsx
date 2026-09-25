import HomeHero from "../home-hero/HomeHero";
import HomeTrails from "../home-trails/HomeTrails";

import './Home.css'

export default function Home() {


    return (


        <div className="home-page bg-white">

            {/* Hero */}
            <HomeHero />

            {/* Search section */}
            {/* <TrailSearch /> located in not-used-components folder */}

            {/* Popular trails */}
            <HomeTrails />

        </div>
    );
}