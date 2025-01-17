import React, { useContext } from 'react';
import { FilterSortContext } from '../context/FilterSortContext';

const FilterSortPanel = () => {
    const { filters, setFilters, sort, setSort } = useContext(FilterSortContext);

    const handleCategoryChange = (e) => {
        setFilters((prev) => ({ ...prev, category: e.target.value }));
    };

    const handlePriceRangeChange = (e) => {
        const value = Number(e.target.value);
        setFilters((prev) => ({ ...prev, priceRange: [0, value] }));
    };

    const handleRatingChange = (e) => {
        setFilters((prev) => ({ ...prev, rating: Number(e.target.value) }));
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    return (
        <div className="filter-sort-panel">
            <div className="filter-sort-section">
                <label htmlFor="category">Category:</label>
                <select id="category" value={filters.category} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="electronics">Electronics</option>
                    <option value="men's clothing">Clothing</option>
                    {/* Add more categories if needed */}
                </select>
            </div>

            <div className="filter-sort-section">
                <label htmlFor="price-range">Price Range:</label>
                <div className="price-range">
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, priceRange: [Number(e.target.value), prev.priceRange[1]] }))
                        }
                    />
                    <span>to</span>
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={filters.priceRange[1]}
                        onChange={handlePriceRangeChange}
                    />
                </div>
            </div>

            <div className="filter-sort-section">
                <label htmlFor="rating">Rating:</label>
                <select id="rating" value={filters.rating} onChange={handleRatingChange}>
                    <option value={0}>All Ratings</option>
                    <option value={1}>1 Star & Up</option>
                    <option value={2}>2 Stars & Up</option>
                    <option value={3}>3 Stars & Up</option>
                    <option value={4}>4 Stars & Up</option>
                    <option value={5}>5 Stars</option>
                </select>
            </div>

            <div className="filter-sort-section">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sort} onChange={handleSortChange}>
                    <option value="price-low-to-high">Price: Low to High</option>
                    <option value="price-high-to-low">Price: High to Low</option>
                    <option value="rating-high-to-low">Rating: High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSortPanel;
