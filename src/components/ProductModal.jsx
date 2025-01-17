import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

export default function ProductModal({ productId, open, handleClose }) {
    const modalRef = useRef();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (open && modalElement) {
            modalElement.showModal();
        } else if (modalElement) {
            modalElement.close();
        }

        return () => {
            if (modalElement && modalElement.open) {
                modalElement.close();
            }
        };
    }, [open]);

    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) {
            handleClose();
        }
    };

    if (!product) return <div>Loading...</div>;

    return createPortal(
        <div
            className="modal-backdrop"
            onClick={handleBackdropClick}
        >
            <dialog ref={modalRef} className="modal" onClose={handleClose} style={{ zIndex: 1010 }}>
                <div className="modal-content">
                    <button className="close-button" onClick={handleClose}>&times;</button>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <img src={product.image} alt={product.title} />
                </div>
            </dialog>
        </div>,
        document.getElementById('modal')
    );
}
