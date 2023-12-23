

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductDetails.css';
import cartIcon from './../Header/basket.png';

const ProductDetails = ({ products }) => {
    const { productId } = useParams();
    const product = products.find((p) => p._id === productId);

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (product) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleAddToCart = () => {
        console.log('Товар добавлен в корзину:', product);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const { images, brand, name, description, characteristics, price } = product;

    return (
        <div className="product-details-container">
            <div className="product-images">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${brand} ${name}`}
                        onClick={() => handleImageClick(image)}
                        className={selectedImage === image ? 'main-image' : 'thumbnail-image'}
                    />
                ))}
            </div>
            <div className="product-info">
                <img src={selectedImage} alt={`${brand} ${name}`} className="main-image" />
                <h1 className="product-title">{name}</h1>
                <h2 className="product-brand">{brand}</h2>
                <p className="product-description">{description}</p>
                <div className="product-characteristics">
                    <h3>Characteristics:</h3>
                    <ul>
                        {characteristics.map((characteristic, index) => (
                            <li key={index}>
                                <strong>{characteristic.name}:</strong> {characteristic.value}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="product-price">${price}</p>
                <div className="product-actions">
                    <button className="add-to-cart" onClick={handleAddToCart}>
                        <img src={cartIcon} alt="Cart" />
                        Add to Cart
                    </button>
                    <Link to="/">Back to Products</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;







