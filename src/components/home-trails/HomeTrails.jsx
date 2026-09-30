import { Link } from 'react-router';
import { useEffect, useState } from 'react';

import HomeTrailCard from '../home-trail-card/HomeTrailCard';
import { getLatestTrails } from '../../services/trailService';
import './HomeTrails.css';

export default function HomeTrails() {

    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const loadLatestTrails = async () => {
            try {
                const data = await getLatestTrails();
                setTrails(data);
            } catch (err) {
                console.error('Error fetching latest trails', err.message);
            }
        }
        loadLatestTrails();
    }, []);

    return (
        <section className="popular-trails container py-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="fw-bold mb-0"> Popular trails</h2>

                <Link to="/trails" className="text-decoration-none fw-semibold">
                    View all trails
                    <span className="ms-2">→</span>
                </Link>
            </div>

            {trails.length > 0
                ? (
                    <div className="row g-4">
                        {trails.map(trail => <HomeTrailCard key={trail.id} {...trail} />)}
                    </div>
                )
                : <h2>No trails added yet</h2>
            }
        </section>
    );
}