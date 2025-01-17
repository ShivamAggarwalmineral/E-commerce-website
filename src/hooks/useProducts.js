import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useProducts = (page, filters, sort, infiniteScrollEnabled) => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            let url = `https://fakestoreapi.com/products?limit=10&page=${page}`;
            const response = await axios.get(url);

            const fetchedProducts = response.data;

            setAllProducts((prev) => [...prev, ...fetchedProducts]);

            setHasMore(fetchedProducts.length > 0);
        } catch (err) {
            setError('Error fetching products.');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    }, [page]);

    const filterAndSortProducts = useCallback(() => {
        let filteredProducts = [...allProducts];



        if (filters.category) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        if (filters.rating > 0) {
            filteredProducts = filteredProducts.filter(
                (product) => product.rating.rate >= filters.rating
            );
        }

        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange;
            filteredProducts = filteredProducts.filter(
                (product) => product.price >= minPrice && product.price <= maxPrice
            );
        }

        if (sort === 'price-low-to-high') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high-to-low') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating-high-to-low') {
            filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        }

        setProducts(filteredProducts);
    }, [allProducts, filters, sort]);

    useEffect(() => {
        fetchProducts();
    }, [page, fetchProducts]);

    useEffect(() => {
        filterAndSortProducts();
    }, [allProducts, filters, sort, filterAndSortProducts]);

    return {
        products,
        hasMore,
        loading,
        error,
    };
};

export default useProducts;
