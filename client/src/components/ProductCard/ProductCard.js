


// client/src/components/ProductCard/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ linkTo, images, brand, description, price }) => {



    return (
        <Link style={{textDecoration: "none"}}
              to={linkTo} className="product-card"
        > {/* Используем ссылку здесь */}
            {images.length > 0 && <img src={images[0]} alt={brand} className="product-image" />}
            <div className="product-info">
                <h3 className="product-title">{brand}</h3>
                <p className="product-description">{description.slice(0, 70)}</p>
                <p className="product-price">{price}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
