// client/src/components/ProductList/ProductList.js
import React from 'react';
import ProductCard from './../ProductCard/ProductCard';
import './ProductList.css';
import {Link} from "react-router-dom";

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.map(product => (
                <Link to={`/details/${product._id}`}>
                <ProductCard
                    key={product._id}
                    images={product.images || []}
                    brand={product.brand}
                    description={product.description}
                    price={product.price}
                />
                </Link>
            ))}
        </div>
    );
};

export default ProductList;
