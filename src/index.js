import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FilterSortProvider } from './context/FilterSortContext';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FilterSortProvider>
    <App />
  </FilterSortProvider>
);