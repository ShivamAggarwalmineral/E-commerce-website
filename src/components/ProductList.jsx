import React, { useState, useContext, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
import { FilterSortContext } from '../context/FilterSortContext';

const ProductList = () => {
    const [page, setPage] = useState(1);
    const { filters, sort } = useContext(FilterSortContext);
    const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(true);
    const { products, hasMore, loading } = useProducts(page, filters, sort, infiniteScrollEnabled);


    useEffect(() => {
        if (
            filters.category !== '' ||
            filters.rating > 0 ||
            filters.priceRange[0] !== 0 ||
            filters.priceRange[1] !== 1000
        ) {
            setInfiniteScrollEnabled(false);
        } else {
            setInfiniteScrollEnabled(true);
        }
    }, [filters]);

    return (
        <div>
            {infiniteScrollEnabled ? (
                <InfiniteScroll
                    dataLength={products.length}
                    next={() => setPage((prev) => prev + 1)}
                    hasMore={hasMore}
                    loader={<div>Loading...</div>}
                >
                    <div className="grid-layout">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </InfiniteScroll>
            ) : (
                <div className="grid-layout">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
