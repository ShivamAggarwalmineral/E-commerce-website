Design Decisions & Patterns:

Context API: Used the FilterSortContext to manage global state for filters and sorting across the app, which allows different components to access and modify the state without prop drilling.
Custom Hook (useProducts): This hook encapsulates the logic of fetching and processing product data, including sorting, filtering, and pagination.
Infinite Scroll: Utilized the react-infinite-scroll-component for seamless data loading as the user scrolls, providing a smooth user experience for large datasets.
Separation of Concerns: Kept the UI logic for rendering product cards separate from business logic, maintaining code clarity and reusability.



Optimizations:

Avoid Unnecessary Re-fetching: By maintaining the products in a state (allProducts), the app avoids re-fetching the same data on every page load, instead just applying filters to the data.
Efficient Data Processing: Filters and sorting are applied on the frontend after fetching the data, making the process faster without involving server-side changes or calls every time the user adjusts the filters.