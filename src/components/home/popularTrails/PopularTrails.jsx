import { Link } from 'react-router';
import { useEffect, useState } from 'react';

import './PopularTrails.css'
import TrailCard from './TrailCard';

export default function PopularTrails() {

    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        fetch(`${supabaseUrl}/rest/v1/trails?select=*&order=createdAt.desc&limit=3`, {
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
                // const result = Object.values(data)
                // .sort((a, b) => (b.createdAt).localeCompare(a.createdAt))
                // .slice(0, 3);

                setTrails(data);
            })
            // .then(data => console.log(data))
            .catch(err => console.log('Error fetching trails', err));
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
                        {trails.map(trail => <TrailCard key={trail.id} {...trail} />)}
                    </div>
                )
                : <h2>No trails added yet</h2>
            }
        </section>
    );
}