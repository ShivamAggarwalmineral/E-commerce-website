import React from 'react';
import ProductList from '../components/ProductList';
import FilterSortPanel from '../components/FilterSortPanel';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <FilterSortPanel />
            <ProductList />
        </div>
    );
};

export default Dashboard;