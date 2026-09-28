import { Link } from 'react-router';
import { useEffect, useState } from 'react';

import HomeTrailCard from '../home-trail-card/HomeTrailCard';
import { supabase } from '../../lib/supabase';
import './HomeTrails.css'

export default function HomeTrails() {

    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const loadLatestTrails = async () => {
            const { data, error } = await supabase
                .from('trails')
                .select('*')
                .order('createdAt', { ascending: false })
                .limit(3);

            if (error) {
                console.error('Error fetching latest trails', error.message);
                return;
            }
            setTrails(data);
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

            {/* <div className="row g-4">
                {trails.length === 0 && <h2>No trails added yet</h2>}

                {trails.map(trail => <TrailCard key={trail.id} {...trail} />)}
            </div> */}

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