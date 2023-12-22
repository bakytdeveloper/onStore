// client/src/components/ProductDetails/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
    const { productId } = useParams();
    const product = products.find((p) => p._id === productId);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <img src={product.images[0]} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <h3>Characteristics:</h3>
            <ul>
                {product.characteristics.map((characteristic) => (
                    <li key={characteristic.name}>
                        <strong>{characteristic.name}:</strong> {characteristic.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDetails;
