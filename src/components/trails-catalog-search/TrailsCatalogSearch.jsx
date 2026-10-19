import useForm from '../../hooks/useForm';
import './TrailsCatalogSearch.css'

export default function TrailsCatalogSearch({
    onSearch
}) {
    const { register, formAction } = useForm(onSearch, {
        search: '',
        region: '',
        difficulty: '',
        sort: 'newest',
    })

    return (
        <section className="catalog-filter-section">
            <div className="container">
                <div className="catalog-filter-box">
                    <form
                        className="row g-3"
                        action={formAction}
                        onReset={(event) => event.preventDefault()}
                    >
                        <div className="col-lg-4">
                            <label
                                htmlFor="catalog-search"
                                className="form-label"
                            >
                                Search trails
                            </label>

                            <div className="catalog-input-wrapper">
                                <i
                                    className="bi bi-search"
                                    aria-hidden="true"
                                />

                                <input
                                    {...register('search')}
                                    type="search"
                                    id="catalog-search"
                                    className="form-control"
                                    placeholder="Search by trail name..."
                                />
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-2">
                            <label
                                htmlFor="catalog-region"
                                className="form-label"
                            >
                                Region
                            </label>

                            <select
                                {...register('region')}
                                id="catalog-region"
                                className="form-select"
                            >
                                <option value="">All regions</option>
                                <option value="Rila">Rila Mountain</option>
                                <option value="Pirin">Pirin Mountain</option>
                                <option value="Vitosha">Vitosha Mountain</option>
                                <option value="Rhodope">Rhodope Mountains</option>
                                <option value="Balkan">Balkan Mountains</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-md-4 col-lg-2">
                            <label
                                htmlFor="catalog-difficulty"
                                className="form-label"
                            >
                                Difficulty
                            </label>

                            <select
                                {...register('difficulty')}
                                id="catalog-difficulty"
                                className="form-select"
                            >
                                <option value="">Any difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div className="col-md-4 col-lg-2">
                            <label
                                htmlFor="catalog-sort"
                                className="form-label"
                            >
                                Sort by
                            </label>

                            <select
                                {...register('sort')}
                                id="catalog-sort"
                                className="form-select"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="distance-asc">Shortest distance</option>
                                <option value="distance-desc">Longest distance</option>
                            </select>
                        </div>

                        <div className="col-lg-2 d-flex align-items-end">
                            <button
                                type="submit"
                                className="catalog-search-button btn w-100"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}