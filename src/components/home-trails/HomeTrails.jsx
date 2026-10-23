import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import { getLatestTrails } from '../../services/trailService';

import HomeTrailCard from '../home-trail-card/HomeTrailCard';
import Loader from '../loader/Loader';
import ErrorMessage from '../error-message/ErrorMessage';

import './HomeTrails.css';

export default function HomeTrails() {
    const navigate = useNavigate();

    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const loadLatestTrails = async () => {
            try {
                const data = await getLatestTrails(controller.signal);

                if (!controller.signal.aborted) {
                    setTrails(data);
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error('Error fetching latest trails', err.message);

                    setError('Could not load trails. Please try again later.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        loadLatestTrails();

        return () => {
            controller.abort();
        }
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

            {loading ? (
                <Loader text='Loading latest trails...' />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : trails.length === 0 ? (
                <h2>No trails added yet.</h2>
            ) : (
                <div className='row g-4'>
                    {trails.map(trail => (
                        <HomeTrailCard
                            key={trail.id}
                            {...trail}
                            onClick={() => navigate(`/trails/${trail.id}/details`)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}