import React, { useState } from 'react';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const maxTitleLength = 25;
    const trimmedTitle = (title) => {
        if (title.length <= maxTitleLength) return title;
        const lastSpaceIndex = title.lastIndexOf(' ', maxTitleLength);
        return lastSpaceIndex === -1 ? title.substring(0, maxTitleLength) : title.substring(0, lastSpaceIndex);
    };
    return (
        <div className="product-card">
            <article>
                <img src={product.image} alt={product.title} loading="lazy" />
                <div>
                    <h3 >{trimmedTitle(product.title)}</h3>
                    <p className='product-category'>{product.category}</p>
                    <p className='product-price'>${product.price}</p>
                    <p className='product-rating'>
                        {product.rating.rate} <span className='star'>&#9733;</span>
                    </p>
                </div>
                <p className='product-actions'>
                    <button onClick={() => setShowModal(true)}>View Details</button>
                </p>
            </article>
            <ProductModal productId={product.id} open={showModal} handleClose={() => setShowModal(false)} />
        </div>
    );
};

export default ProductCard;