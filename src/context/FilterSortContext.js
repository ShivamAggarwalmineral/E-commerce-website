import React, { createContext, useState } from 'react';

export const FilterSortContext = createContext();

export const FilterSortProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        category: '',
        priceRange: [0, 1000],
        rating: 0
    });
    const [sort, setSort] = useState('price-low-to-high');

    return (
        <FilterSortContext.Provider value={{ filters, setFilters, sort, setSort }}>
            {children}
        </FilterSortContext.Provider>
    );
};
